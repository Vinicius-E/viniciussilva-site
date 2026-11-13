/* Clicks every dot of the /portfolio constellation with a real mouse click and checks
   that the page jumps to that project. Desktop and phone compositions.
   Usage: node scripts/verify-dots.mjs [baseUrl] */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4321';
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
mkdirSync('.review/verify', { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
let failed = 0;
for (const vp of [{ n: 'wide', width: 1920, height: 1000, sky: 'wide' }, { n: 'desktop', width: 1280, height: 800, sky: 'wide' }, { n: 'phone', width: 390, height: 844, sky: 'tall' }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/portfolio', { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `.review/verify/dots-${vp.n}.png` });
  const links = page.locator(`.pfhero__sky--${vp.sky} .sky__link`);
  const n = await links.count();
  for (let i = 0; i < n; i++) {
    await page.goto(BASE + '/portfolio', { waitUntil: 'load' });
    const star = page.locator(`.pfhero__sky--${vp.sky} .sky__link`).nth(i).locator('.sky__star');
    await star.scrollIntoViewIfNeeded();
    const box = await star.boundingBox();
    const href = await page.locator(`.pfhero__sky--${vp.sky} .sky__link`).nth(i).getAttribute('href');
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2); // real click at the dot: fails if anything covers it
    await page.waitForTimeout(3000); // smooth scroll over a long page needs time to settle
    const r = await page.evaluate((h) => {
      const el = document.querySelector(h);
      return { hash: location.hash, top: el ? Math.round(el.getBoundingClientRect().top) : null };
    }, href);
    const ok = r.hash === href && r.top !== null && r.top >= 0 && r.top < vp.height * 0.6;
    if (!ok) failed++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${vp.n.padEnd(8)} ${href.padEnd(24)} hash=${r.hash} targetTop=${r.top}`);
  }
  await ctx.close();
}
await browser.close();
if (failed) { console.log(`\n${failed} dot(s) did not navigate.`); process.exit(1); }
console.log('\nAll dots navigate.');
