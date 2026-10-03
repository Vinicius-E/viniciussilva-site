/* Confere cada demonstração publicada em /demos/<slug>/ e a página /portfolio (carrossel + axe).
   node scripts/portfolio-check.mjs [baseURL] */
import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync, mkdirSync } from 'node:fs';

const BASE = process.argv[2] || 'http://127.0.0.1:4321';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const slugs = readdirSync('public/demos', { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
mkdirSync('.review', { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const bad = [];
const rows = [];

for (const slug of slugs) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  page.on('pageerror', (e) => errs.push(String(e)));
  page.on('requestfailed', (r) => errs.push('falhou: ' + r.url()));
  const r = { slug, ok: true, notes: [] };
  try {
    await page.goto(`${BASE}/demos/${slug}/index.html`, { waitUntil: 'networkidle' });
    const h1 = await page.locator('h1').first().innerText();
    if (!h1.trim()) r.notes.push('sem h1');
    await page.evaluate(() => (location.hash = '#/entrar'));
    await page.waitForSelector('.role');
    await page.locator('.role').first().click();
    await page.waitForSelector('.kpi .v', { timeout: 8000 });
    const kpis = await page.locator('.kpi .v').allInnerTexts();
    if (kpis.length < 3 || kpis.every((k) => /^(0|R\$\s?0,00)$/.test(k.trim()))) r.notes.push('KPIs vazios: ' + kpis.join('|'));
    if (!(await page.locator('svg.chart').count())) r.notes.push('sem gráfico');
    await page.evaluate(() => (location.hash = '#/app/lista'));
    await page.waitForSelector('tbody tr');
    const n = await page.locator('tbody tr').count();
    if (n < 5) r.notes.push('lista com ' + n + ' linhas');
    await page.locator('.rowbtn').first().click();
    await page.waitForSelector('dialog[open]');
    const ia = page.locator('dialog .actions button.btn-secondary');
    if (await ia.count()) { await ia.first().click(); await page.waitForSelector('dialog .aibox pre', { timeout: 6000 }); }
    else r.notes.push('sem botão de IA');
    const ax = await new AxeBuilder({ page }).analyze();
    const serious = ax.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    if (serious.length) r.notes.push('axe: ' + serious.map((v) => v.id).join(','));
  } catch (e) {
    r.notes.push('erro: ' + String(e).split('\n')[0]);
  }
  if (errs.length) r.notes.push('console: ' + errs.slice(0, 2).join(' / '));
  r.ok = r.notes.length === 0;
  rows.push(r);
  if (!r.ok) bad.push(r);
  await ctx.close();
}
for (const r of rows) console.log((r.ok ? 'OK   ' : 'FALHA') + ' ' + r.slug + (r.notes.length ? '  ' + r.notes.join(' ; ') : ''));

// página do catálogo: carrossel, teclado, filtro, axe, 3 larguras
let pf = 0;
for (const [tag, w, h] of [['desktop', 1440, 1000], ['tablet', 820, 1000], ['mobile', 390, 844]]) {
  for (const scheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await page.goto(BASE + '/portfolio', { waitUntil: 'networkidle' });
    const count = () => page.locator('[data-count]').innerText();
    if ((await count()) !== '1 / 28') { console.log('FALHA contador inicial', await count()); pf++; }
    await page.locator('[data-next]').click();
    if ((await count()) !== '2 / 28') { console.log('FALHA next', await count()); pf++; }
    await page.locator('[data-region]').focus();
    await page.keyboard.press('ArrowRight');
    if ((await count()) !== '3 / 28') { console.log('FALHA teclado', await count()); pf++; }
    await page.locator('[data-rail] button[data-slug="vaga-match"]').click();
    if (!(await page.locator('#vaga-match').evaluate((e) => !e.hasAttribute('inert')))) { console.log('FALHA rail'); pf++; }
    await page.locator('.chip[data-cat="career"]').click();
    if ((await count()) !== '1 / 3') { console.log('FALHA filtro', await count()); pf++; }
    await page.locator('.chip[data-cat="all"]').click();
    const ov = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (ov) { console.log('FALHA overflow horizontal', tag); pf++; }
    const ax = await new AxeBuilder({ page }).analyze();
    const ser = ax.violations.filter((v) => ['serious', 'critical', 'moderate'].includes(v.impact));
    if (ser.length) { console.log('FALHA axe', tag, scheme, ser.map((v) => v.id + ':' + v.nodes.length + ' ' + (v.nodes[0]?.html || '').slice(0, 90)).join(' | ')); pf++; }
    if (errs.length) { console.log('FALHA console', errs.slice(0, 2)); pf++; }
    await page.screenshot({ path: `.review/portfolio-${tag}-${scheme}.png`, fullPage: false });
    await ctx.close();
  }
}
await browser.close();
console.log(`\nDemos: ${rows.length - bad.length}/${rows.length} ok · Catálogo: ${pf === 0 ? 'ok' : pf + ' falha(s)'}`);
process.exit(bad.length || pf ? 1 : 0);
