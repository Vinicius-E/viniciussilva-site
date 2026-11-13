/* Playwright check of the built site (run `npm run preview` first).
   For every page × viewport: horizontal overflow, broken images, console/CSP errors,
   same-origin links and #anchors, touch-target size of the portfolio links, and a few
   content assertions (résumé alignment). Screenshots go to .review/verify/.
   Usage: node scripts/verify-pages.mjs [baseUrl] */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4321';
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PAGES = ['/', '/pt', '/es', '/portfolio', '/pt/portfolio', '/es/portfolio', '/work/industrial-operations-platform'];
const VIEWPORTS = [{ name: 'phone', width: 390, height: 844 }, { name: 'desktop', width: 1280, height: 800 }];
const OUT = '.review/verify';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const linkCache = new Map();
const problems = [];
const note = (where, msg) => problems.push(`${where}: ${msg}`);

for (const vp of VIEWPORTS) {
  for (const path of PAGES) {
    const where = `${vp.name} ${path}`;
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
    if (!res || res.status() >= 400) { note(where, `HTTP ${res?.status()}`); await ctx.close(); continue; }

    // scroll through the page so lazy images load and scroll reveals fire
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(vp.height * 0.7)) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
    await page.waitForTimeout(400);

    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const imgs = [...document.images].filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src'));
      const hidden = [...document.querySelectorAll('[data-reveal]')].filter((e) => getComputedStyle(e).opacity === '0').length;
      const small = [...document.querySelectorAll('.proj__cta, .card__link, .cat__extra a')]
        .map((e) => ({ t: e.textContent.trim().slice(0, 30), h: Math.round(e.getBoundingClientRect().height) }))
        .filter((e) => e.h < 44);
      const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
      const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
      return { overflow: de.scrollWidth - de.clientWidth, imgs, hidden, small, links, ids, text: document.body.innerText, lang: de.lang, title: document.title };
    });
    if (r.overflow > 0) note(where, `horizontal overflow ${r.overflow}px`);
    if (r.imgs.length) note(where, `broken images: ${r.imgs.join(', ')}`);
    if (r.hidden) note(where, `${r.hidden} [data-reveal] element(s) still invisible after scrolling`);
    if (r.small.length) note(where, `touch targets under 44px: ${JSON.stringify(r.small)}`);
    if (errors.length) note(where, `console errors: ${errors.slice(0, 3).join(' | ')}`);
    for (const bad of ['hotmail', 'viniciussilva.dev', 'Five years', 'Cinco anos', 'Cinco años', '29 working', '28 demos', 'Kafka'])
      if (r.text.includes(bad)) note(where, `unexpected text "${bad}"`);
    if (path.length <= 3 && !/Claude Code/.test(r.text)) note(where, 'home does not mention Claude Code');
    if (path.length <= 3 && !/Studio Z/.test(r.text)) note(where, 'home does not mention Studio Z');

    for (const href of new Set(r.links)) {
      if (href.startsWith('#')) { if (href.length > 1 && !r.ids.includes(href.slice(1))) note(where, `missing anchor ${href}`); continue; }
      if (/^(mailto:|tel:|https?:\/\/)/.test(href) && !href.startsWith(BASE)) continue;
      const url = new URL(href, BASE + path).href.split('#')[0];
      if (!linkCache.has(url)) linkCache.set(url, (await ctx.request.get(url)).status());
      if (linkCache.get(url) >= 400) note(where, `link ${href} -> HTTP ${linkCache.get(url)}`);
    }
    const file = `${OUT}/${vp.name}${path === '/' ? '-home' : path.replace(/\//g, '-')}.png`;
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: file, fullPage: true });
    console.log(`ok  ${where.padEnd(52)} lang=${r.lang} overflow=${r.overflow} links=${r.links.length}  "${r.title.slice(0, 60)}"`);
    await ctx.close();
  }
}
await browser.close();
console.log(`\nInternal links checked: ${linkCache.size}`);
if (problems.length) { console.log(`\n${problems.length} PROBLEM(S):\n- ` + problems.join('\n- ')); process.exit(1); }
console.log('\nAll checks passed.');
