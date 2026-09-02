import { chromium } from 'playwright-core';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.argv[2] || 'http://127.0.0.1:4321';
const b = await chromium.launch({ executablePath: CHROME });
for (const [scheme, route, tag] of [
  ['dark', '/', 'home'],
  ['light', '/', 'home'],
  ['dark', '/work/industrial-operations-platform', 'case'],
]) {
  const ctx = await b.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: scheme,
    reducedMotion: 'reduce',
  });
  const p = await ctx.newPage();
  await p.goto(BASE + route, { waitUntil: 'networkidle' });
  await p.screenshot({ path: `.review/full-${tag}-${scheme}.png`, fullPage: true });
  await ctx.close();
  console.log('full-' + tag + '-' + scheme);
}
await b.close();
