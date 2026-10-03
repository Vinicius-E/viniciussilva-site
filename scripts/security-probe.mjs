/* Sonda de segurança local (somente contra o próprio site, em 127.0.0.1): serve dist/ com os cabeçalhos de dist/_headers,
   verifica CSP e tenta XSS armazenado/refletido nas demos. node scripts/security-probe.mjs */
import { chromium } from 'playwright-core';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname, normalize, sep } from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const T = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain' };
const hdr = readFileSync('dist/_headers', 'utf8');
const global = {};
let cur = null;
for (const line of hdr.split(/\r?\n/)) {
  if (/^\/\*/.test(line)) { cur = true; continue; }
  if (/^\S/.test(line) && !line.startsWith('#')) cur = false;
  const m = line.match(/^\s+([A-Za-z-]+):\s*(.*)$/);
  if (cur && m) global[m[1]] = m[2];
}
const root = join(process.cwd(), 'dist');
const srv = createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  let p = normalize(decodeURIComponent(u.pathname)).replace(/^[\/]+/, '');
  const full = join(root, p);
  if (!full.startsWith(root + sep) && full !== root) { res.writeHead(403); return res.end(); }
  let f = full;
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  else if (!existsSync(f) && existsSync(f + '.html')) f += '.html';
  if (!existsSync(f)) { res.writeHead(404, global); return res.end('404'); }
  res.writeHead(200, { ...global, 'Content-Type': T[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
}).listen(4399, '127.0.0.1');

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const B = 'http://127.0.0.1:4399';
const fails = [];
const ok = (c, msg) => { if (!c) { fails.push(msg); console.log('FALHA', msg); } else console.log('ok   ', msg); };
const xss = '"><img src=x onerror="window.__pwned=1"><script>window.__pwned=1</script>';

// 1. CSP em páginas do site
for (const path of ['/', '/pt', '/es', '/portfolio', '/work/industrial-operations-platform']) {
  const ctx = await browser.newContext(); const page = await ctx.newPage(); const errs = [];
  page.on('console', (m) => /Content Security Policy|Refused to/i.test(m.text()) && errs.push(m.text().slice(0, 140)));
  await page.goto(B + path, { waitUntil: 'networkidle' });
  ok(errs.length === 0, `CSP sem violações em ${path}` + (errs[0] ? ' → ' + errs[0] : ''));
  await ctx.close();
}
// 2. cabeçalhos
const r = await fetch(B + '/portfolio');
for (const h of ['content-security-policy', 'strict-transport-security', 'x-frame-options', 'x-content-type-options', 'referrer-policy', 'permissions-policy', 'cross-origin-opener-policy']) ok(r.headers.has(h), `cabeçalho ${h}`);
ok((r.headers.get('content-security-policy') || '').includes("frame-ancestors 'none'") && !/unsafe-eval/.test(r.headers.get('content-security-policy') || ''), 'CSP sem unsafe-eval e com frame-ancestors none');
// 3. travessia de caminho
for (const p of ['/..%2f..%2fpackage.json', '/%2e%2e/%2e%2e/package.json', '/demos/../../package.json', '/..\..\package.json']) {
  const x = await fetch(B + p); const body = await x.text();
  ok(x.status !== 200 || !body.includes('viniciussilva-site'), `travessia bloqueada: ${p} (${x.status})`);
}
// 4. XSS armazenado e refletido em todas as demos
const slugs = readdirSync('dist/demos', { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
let xssFail = 0;
for (const slug of slugs) {
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  const errs = [];
  page.on('console', (m) => /Content Security Policy|Refused to/i.test(m.text()) && errs.push(m.text().slice(0, 100)));
  await page.goto(`${B}/demos/${slug}/index.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => (location.hash = '#/entrar')); await page.waitForSelector('.role'); await page.locator('.role').first().click(); await page.waitForSelector('.kpi .v');
  // grava registro malicioso pela própria API da demo (campos de texto) e navega pelas telas
  const cfg = await page.evaluate(() => window.__KIT.config);
  const rec = {};
  for (const f of cfg.entity.fields) {
    if (f.type === 'text' || f.type === 'longtext') rec[f.key] = xss.slice(0, f.max || 80);
    else if (f.type === 'select' || f.type === 'status') rec[f.key] = f.options[0].value;
    else if (f.type === 'date') rec[f.key] = '2026-01-01';
    else rec[f.key] = 1;
  }
  const created = await page.evaluate(async (b) => (await fetch('api/records', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) })).status, rec);
  for (const h of ['#/app/lista', '#/app', '#/app/lista?q=' + encodeURIComponent(xss), '#/app/<img src=x onerror=window.__pwned=1>']) {
    await page.evaluate((x) => (location.hash = x), h); await page.waitForTimeout(350);
  }
  await page.evaluate(() => (location.hash = '#/app/lista')); await page.waitForSelector('tbody tr');
  await page.locator('.rowbtn').first().click().catch(() => {}); await page.waitForTimeout(300);
  const pwned = await page.evaluate(() => window.__pwned === 1);
  const rawImg = await page.evaluate(() => !!document.querySelector('img[src="x"], img[onerror]'));
  if (pwned || rawImg || errs.length) { xssFail++; console.log('FALHA XSS', slug, { pwned, rawImg, errs }); }
  await ctx.close();
}
ok(xssFail === 0, `XSS armazenado/refletido: ${slugs.length - xssFail}/${slugs.length} demos imunes (CSP ativo)`);
await browser.close(); srv.close();
console.log(fails.length ? `\n${fails.length} falha(s)` : '\nTudo ok');
process.exit(fails.length ? 1 : 0);
