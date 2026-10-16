/* Verification matrix: screenshots + axe + overflow + console errors.
   node scripts/verify-matrix.mjs [--base URL] [--out DIR] [--langs en,pt,es] [--themes light,dark]
        [--sizes 1440x900,820x1100,390x844] [--stops] [--reduced] [--axe]
   Needs Chrome (playwright-core) and a running `npm run preview`. Output dir is git-ignored (.review/). */
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const flag = (k) => process.argv.includes('--' + k);
const BASE = arg('base', 'http://127.0.0.1:4321');
const OUT = arg('out', '.review/matrix');
const langs = arg('langs', 'en,pt,es').split(',');
const themes = arg('themes', 'light,dark').split(',');
const paths = arg('paths', '/').split(',');
const sizes = arg('sizes', '1440x900,820x1100,390x844').split(',').map((s) => s.split('x').map(Number));
const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch({ executablePath: CHROME });
const report = [];
for (const lang of langs) {
  for (const theme of themes) {
    for (const [w, h] of sizes) {
      const ctx = await b.newContext({
        viewport: { width: w, height: h },
        colorScheme: theme,
        reducedMotion: flag('reduced') ? 'reduce' : 'no-preference',
        deviceScaleFactor: 1,
        hasTouch: w < 700,
      });
      const p = await ctx.newPage();
      const errors = [];
      p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      p.on('pageerror', (e) => errors.push(String(e)));
      await p.addInitScript((t) => localStorage.setItem('theme', t), theme);
      for (const pp of paths) {
      const path = lang === 'en' ? pp : '/' + lang + (pp === '/' ? '' : pp);
      await p.goto(BASE + path, { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready);
      const tag = `${lang}-${theme}-${w}${pp === '/' ? '' : '-' + pp.slice(1).replace(/\W/g, '')}${flag('reduced') ? '-reduced' : ''}`;
      await p.waitForTimeout(1100);
      await p.screenshot({ path: `${OUT}/${tag}-top.png` });
      if (flag('stops')) {
        const peakBox = await p.evaluate(() => {
          const el = document.querySelector('[data-peak]');
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { top: r.top + scrollY, h: r.height };
        });
        if (peakBox) {
          for (const f of [0.05, 0.3, 0.6, 1]) {
            const y = peakBox.top - 68 + (peakBox.h - h) * f;
            await p.evaluate((yy) => window.scrollTo(0, yy), Math.max(0, y));
            await p.waitForTimeout(450);
            await p.screenshot({ path: `${OUT}/${tag}-peak-${Math.round(f * 100)}.png` });
          }
        }
      }
      if (flag('sections')) {
        const ids = await p.evaluate(() => Array.from(document.querySelectorAll('main section[id]')).map((s) => s.id));
        for (const id of ids) {
          await p.evaluate((i) => document.getElementById(i).scrollIntoView({ block: 'start', behavior: 'instant' }), id);
          await p.waitForTimeout(900);
          await p.screenshot({ path: `${OUT}/${tag}-sec-${id}.png` });
        }
      }
      const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      let axe = null;
      if (flag('axe')) {
        // reveal everything first so contrast is measured on the final, visible state
        await p.evaluate(async () => {
          const H = document.documentElement.scrollHeight;
          for (let y = 0; y < H; y += 400) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 30));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 900));
        });
        const src = require('axe-core').source;
        await p.evaluate(src);
        axe = await p.evaluate(async () => {
          const r = await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] });
          return r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes[0]?.html?.slice(0, 140), target: v.nodes[0]?.target?.join(' ') }));
        });
      }
      report.push({ tag, overflow, errors, axe });
      console.log(tag, 'overflow=' + overflow, 'errors=' + errors.length, axe ? 'axe=' + axe.length : '');
      }
      await ctx.close();
    }
  }
}
writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 1));
await b.close();
