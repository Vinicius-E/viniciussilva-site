/* Cropped viewport screenshots at scroll positions, for close visual review. */
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const BASE = process.argv[2] || 'http://127.0.0.1:4321';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const shots = [
  { name: 'h-hero', path: '/', vp: [1440, 900], y: 0 },
  { name: 'h-work', path: '/', vp: [1440, 900], sel: '#work' },
  { name: 'h-snapshot', path: '/', vp: [1440, 900], sel: '#snapshot' },
  { name: 'h-experience', path: '/', vp: [1440, 900], sel: '#experience' },
  { name: 'h-expertise', path: '/', vp: [1440, 900], sel: '#expertise' },
  { name: 'h-approach', path: '/', vp: [1440, 900], sel: '#approach' },
  { name: 'h-about', path: '/', vp: [1440, 900], sel: '#about' },
  { name: 'h-contact', path: '/', vp: [1440, 900], sel: '#contact' },
  { name: 'm-hero', path: '/', vp: [390, 844], y: 0 },
  { name: 'm-work', path: '/', vp: [390, 844], sel: '#work' },
  { name: 'm-experience', path: '/', vp: [390, 844], sel: '#experience' },
  { name: 'm-contact', path: '/', vp: [390, 844], sel: '#contact' },
  { name: 'c-hero', path: '/work/industrial-operations-platform', vp: [1440, 900], y: 0 },
  { name: 'c-arch', path: '/work/industrial-operations-platform', vp: [1440, 900], sel: '.arch' },
  { name: 'c-decisions', path: '/work/industrial-operations-platform', vp: [1440, 900], sel: '.decisions' },
  { name: 'c-future', path: '/work/industrial-operations-platform', vp: [1440, 900], sel: '.banner--warn' },
  { name: 'm-c-arch', path: '/work/industrial-operations-platform', vp: [390, 844], sel: '.arch' },
];

await mkdir('.review/shots', { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME, headless: true });

for (const s of shots) {
  const ctx = await browser.newContext({
    viewport: { width: s.vp[0], height: s.vp[1] },
    deviceScaleFactor: s.vp[0] < 500 ? 2 : 1,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  await page.goto(BASE + s.path, { waitUntil: 'networkidle' });
  if (s.sel) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 24, behavior: 'instant' });
    }, s.sel);
    await page.waitForTimeout(120);
  } else {
    await page.evaluate((y) => window.scrollTo(0, y), s.y || 0);
  }
  await page.screenshot({ path: `.review/shots/${s.name}.png` });
  await ctx.close();
  console.log('shot', s.name);
}
await browser.close();
