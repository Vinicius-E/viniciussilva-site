/* Reduced-motion and keyboard-only checks. node scripts/verify-a11y-motion.mjs [--base URL] [--out DIR] */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
const BASE = process.argv.includes('--base') ? process.argv[process.argv.indexOf('--base') + 1] : 'http://127.0.0.1:4321';
const OUT = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : '.review/a11y';
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });

// 1. reduced motion
for (const lang of ['', 'pt', 'es']) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/${lang}`, { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => {
    const peak = document.querySelector('[data-peak]');
    const stage = peak.querySelector('.peak__stage');
    const steps = [...peak.querySelectorAll('.peak__steps li')];
    const visible = (el) => { const s = getComputedStyle(el); return s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > 0.99; };
    const pulse = document.querySelector('.mesh__pulse');
    const reveal = [...document.querySelectorAll('[data-reveal]')].filter((e) => +getComputedStyle(e).opacity < 0.99).length;
    return {
      live: peak.classList.contains('peak--live'),
      stageSticky: getComputedStyle(stage).position,
      peakHeightVH: +(peak.getBoundingClientRect().height / innerHeight).toFixed(2),
      stepsVisible: steps.filter(visible).length + '/' + steps.length,
      wp: getComputedStyle(peak).getPropertyValue('--wp').trim(),
      pulseAnim: pulse ? getComputedStyle(pulse).animationName : null,
      heroTransform: getComputedStyle(document.querySelector('.hero__mesh--wide')).transform,
      hiddenReveal: reveal,
    };
  });
  console.log('reduced', lang || 'en', JSON.stringify(r));
  await ctx.close();
}

// 2. keyboard only (en, light)
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto(BASE + '/', { waitUntil: 'networkidle' });
const seen = [];
for (let i = 0; i < 60; i++) {
  await p.keyboard.press('Tab');
  const info = await p.evaluate(() => {
    const a = document.activeElement;
    if (!a || a === document.body) return null;
    const cs = getComputedStyle(a);
    const r = a.getBoundingClientRect();
    return { tag: a.tagName.toLowerCase(), text: (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 28), outline: cs.outlineStyle + ' ' + cs.outlineWidth, inView: r.bottom > 0 && r.top < innerHeight, href: a.getAttribute('href') };
  });
  if (!info) break;
  seen.push(info);
  if (i === 3) await p.screenshot({ path: `${OUT}/focus-4th.png` });
}
console.log('tab stops:', seen.length);
console.log(seen.map((s) => `${s.tag}:${s.text}`).join(' | '));
console.log('without visible outline:', seen.filter((s) => s.outline.startsWith('none')).length);
// skip link + enter on a nav anchor
await p.goto(BASE + '/', { waitUntil: 'networkidle' });
await p.keyboard.press('Tab');
const skip = await p.evaluate(() => document.activeElement?.textContent?.trim());
await p.keyboard.press('Enter');
await p.waitForTimeout(300);
console.log('skip link:', skip, '-> focus at', await p.evaluate(() => location.hash));
// theme toggle by keyboard
await p.focus('#theme-toggle');
await p.keyboard.press('Enter');
await p.waitForTimeout(900);
console.log('theme after Enter:', await p.evaluate(() => document.documentElement.dataset.theme));
// scroll never prevented: dispatch a cancelable wheel/touch and see defaultPrevented
const prevented = await p.evaluate(() => {
  const w = new WheelEvent('wheel', { deltaY: 100, cancelable: true, bubbles: true });
  document.body.dispatchEvent(w);
  const t = new Event('touchmove', { cancelable: true, bubbles: true });
  document.body.dispatchEvent(t);
  return [w.defaultPrevented, t.defaultPrevented];
});
console.log('wheel/touch defaultPrevented:', prevented);
await b.close();
