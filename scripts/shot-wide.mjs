/* Viewport screenshots on a wide monitor (1920×1000), light and dark, with motion ON,
   to check the left rail, the section counter and the section transitions.
   Usage: node scripts/shot-wide.mjs [baseUrl]  → .review/verify/wide-<scheme>-<n>.png */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4321';
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
mkdirSync('.review/verify', { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1000 }, colorScheme: scheme });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `.review/verify/wide-${scheme}-0.png` });
  const live = await page.evaluate(() => document.querySelector('.hero__mesh--wide')?.classList.contains('mesh--live'));
  const stops = scheme === 'dark' ? [0.16, 0.3, 0.52] : [0.3];
  let n = 1;
  for (const f of stops) {
    await page.evaluate((v) => window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * v, behavior: 'instant' }), f);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `.review/verify/wide-${scheme}-${n++}.png` });
  }
  console.log(scheme, 'mesh live:', live, 'errors:', errors.length ? errors.join(' | ') : 'none');
  await ctx.close();
}
await browser.close();
