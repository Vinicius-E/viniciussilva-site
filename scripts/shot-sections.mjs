/* Element screenshots of the home sections, for a visual check.
   Usage: node scripts/shot-sections.mjs [baseUrl]  → .review/verify/sec-<viewport>-<id>.png */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4321';
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const IDS = ['ai', 'expertise', 'experience'];
mkdirSync('.review/verify', { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
for (const vp of [{ n: 'desktop', width: 1280, height: 800 }, { n: 'phone', width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.screenshot({ path: `.review/verify/sec-${vp.n}-hero.png` });
  for (const id of IDS) {
    const el = page.locator(`#${id}`);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await el.screenshot({ path: `.review/verify/sec-${vp.n}-${id}.png` });
  }
  await ctx.close();
}
await browser.close();
console.log('done');
