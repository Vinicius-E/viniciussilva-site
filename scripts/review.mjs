/* Visual + a11y review harness. Uses the system Chrome via playwright-core.
   node scripts/review.mjs [baseURL]  */

import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

const BASE = process.argv[2] || 'http://127.0.0.1:4321';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routes = [
  { name: 'home', path: '/' },
  { name: 'case', path: '/work/industrial-operations-platform' },
];
const viewports = [
  { tag: 'desktop', width: 1440, height: 1000 },
  { tag: 'mobile', width: 390, height: 844 },
];

await mkdir('.review', { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME, headless: true });

let axeTotal = 0;

for (const route of routes) {
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.tag === 'mobile' ? 2 : 1,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    await page.goto(BASE + route.path, { waitUntil: 'networkidle' });

    await page.screenshot({ path: `.review/${route.name}-${vp.tag}.png`, fullPage: true });

    // horizontal overflow report
    const overflow = await page.evaluate(() => {
      const de = document.documentElement;
      const vw = de.clientWidth;
      const offenders = [];
      for (const el of document.querySelectorAll('*')) {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 1 || r.left < -1) {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className && el.className.toString().slice(0, 60)) || '',
            right: Math.round(r.right),
            width: Math.round(r.width),
          });
        }
      }
      return { scrollW: de.scrollWidth, clientW: vw, offenders: offenders.slice(0, 12) };
    });
    const bad = overflow.scrollW > overflow.clientW + 1;
    console.log(
      `\n${route.name} @ ${vp.tag} (${vp.width}) — scrollW ${overflow.scrollW} / clientW ${overflow.clientW} ${bad ? '❌ OVERFLOW' : '✅'}`,
    );
    if (bad) overflow.offenders.forEach((o) => console.log('   ', JSON.stringify(o)));

    // axe on desktop only (same DOM)
    if (vp.tag === 'desktop') {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();
      axeTotal += results.violations.length;
      console.log(`   axe: ${results.violations.length} violation(s)`);
      for (const v of results.violations) {
        console.log(`    - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length})`);
        v.nodes.slice(0, 3).forEach((n) => console.log(`        ${n.target.join(' ')}`));
      }
    }
    await ctx.close();
  }
}

await browser.close();
console.log(`\n=== axe total violations: ${axeTotal} ===`);
process.exit(axeTotal > 0 ? 1 : 0);
