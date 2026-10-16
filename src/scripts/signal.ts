/* The page's one script (besides theme/lang/copy/analytics, which stay inline).
   - signal: scroll progress trace + one node per [data-signal] section
   - peak:   writes --wp (0..1) while the architecture diagram is pinned
   - hero:   writes --px/--py (pointer) and --sy (scroll) for contained parallax
   Native scroll only: no wheel/touch listeners, nothing is ever prevented.
   Reduced motion: no pinning, no parallax, no pulse; the static page is complete. */

const doc = document.documentElement;
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

/* ---------- signal ---------- */
const rail = document.querySelector<HTMLElement>('[data-rail]');
const readout = rail?.querySelector<HTMLElement>('.signal__readout') ?? null;
const prefix = rail?.dataset.prefix ?? '';
const sections = Array.from(document.querySelectorAll<HTMLElement>('main [data-signal]'));
const nodes = sections.map((sec) => {
  const el = document.createElement('i');
  el.className = 'signal__node';
  el.setAttribute('aria-hidden', 'true');
  rail?.appendChild(el);
  return { sec, el, frac: 0 };
});
let docMax = 1;
function layout() {
  docMax = Math.max(1, doc.scrollHeight - window.innerHeight);
  for (const n of nodes) {
    const top = n.sec.getBoundingClientRect().top + window.scrollY;
    n.frac = clamp(top / docMax);
    n.el.style.top = `calc(${n.frac.toFixed(4)} * (100vh - 7px))`;
  }
}

/* ---------- ambient background steps ---------- */
const steps2: [number, number, number][] = [
  [72, 22, 0.55], [26, 40, 0.9], [78, 55, 0.6], [30, 72, 0.9], [70, 30, 0.6], [24, 58, 0.9], [62, 78, 0.6], [40, 44, 0.9],
];
let lastStep = -2;
function setStep(i: number) {
  if (i === lastStep) return;
  lastStep = i;
  const [x, y, g] = steps2[(i + 1) % steps2.length];
  doc.style.setProperty('--gx', `${x}vw`);
  doc.style.setProperty('--gy', `${y}vh`);
  doc.style.setProperty('--grid-o', String(g));
  doc.style.setProperty('--grid-x', `${((i + 1) % 3) * -14}px`);
  doc.style.setProperty('--grid-y', `${((i + 1) % 2) * -18}px`);
}

/* ---------- peak ---------- */
const peak = document.querySelector<HTMLElement>('[data-peak]');
const stage = peak?.querySelector<HTMLElement>('.peak__stage') ?? null;
const steps = peak ? Array.from(peak.querySelectorAll<HTMLElement>('.peak__steps li')) : [];
const stepAt = steps.map((li) => Number(li.dataset.at ?? 0));
if (peak && !calm) peak.classList.add('peak--live');
let lastCurrent = -2;
function updatePeak() {
  if (!peak || !stage || calm) return;
  const r = peak.getBoundingClientRect();
  const pinTop = parseFloat(getComputedStyle(stage).top) || 0;
  const travel = Math.max(1, r.height - stage.offsetHeight);
  wpTarget = clamp((pinTop - r.top) / travel);
  if (!wpRaf) wpRaf = requestAnimationFrame(easeWp);
}
let wpTarget = 0;
let wpNow = -1;
let wpRaf = 0;
/* ease toward the scroll position so the assembly glides instead of stepping */
function easeWp() {
  wpRaf = 0;
  if (!peak) return;
  wpNow = wpNow < 0 ? wpTarget : wpNow + (wpTarget - wpNow) * 0.14;
  if (Math.abs(wpTarget - wpNow) < 0.0008) wpNow = wpTarget;
  const wp = wpNow;
  peak.style.setProperty('--wp', wp.toFixed(4));
  let cur = -1;
  stepAt.forEach((at, i) => {
    if (wp >= at) cur = i;
  });
  if (cur !== lastCurrent) {
    lastCurrent = cur;
    steps.forEach((li, i) => {
      li.classList.toggle('is-on', i <= cur);
      li.classList.toggle('is-current', i === cur);
    });
  }
  if (wpNow !== wpTarget) wpRaf = requestAnimationFrame(easeWp);
}

/* ---------- hero ---------- */
const hero = document.querySelector<HTMLElement>('[data-hero]');
let heroH = 1;
function updateHero() {
  if (!hero || calm) return;
  heroH = hero.offsetHeight || 1;
  hero.style.setProperty('--sy', clamp(window.scrollY / heroH).toFixed(3));
}
if (hero && !calm && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let raf = 0;
  hero.addEventListener('pointermove', (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const b = hero.getBoundingClientRect();
      hero.style.setProperty('--px', (((e.clientX - b.left) / b.width) * 2 - 1).toFixed(3));
      hero.style.setProperty('--py', (((e.clientY - b.top) / b.height) * 2 - 1).toFixed(3));
    });
  });
}

/* ---------- one rAF-throttled scroll pass ---------- */
let ticking = false;
let shown = '';
function frame() {
  ticking = false;
  const p = clamp(window.scrollY / docMax);
  if (rail) {
    rail.style.setProperty('--p', p.toFixed(4));
    let active = -1;
    nodes.forEach((n, i) => {
      const on = n.sec.getBoundingClientRect().top <= window.innerHeight * 0.45;
      n.el.classList.toggle('is-on', on);
      if (on) active = i;
    });
    setStep(active);
    const label = active >= 0 ? nodes[active].sec.dataset.signal ?? '' : '';
    if (readout && label !== shown) {
      shown = label;
      readout.textContent = label ? `${prefix} · ${label}` : '';
      readout.classList.toggle('is-shown', !!label);
    }
  }
  updatePeak();
  updateHero();
}
function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(frame);
  }
}
function relayout() {
  layout();
  onScroll();
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', relayout, { passive: true });
window.addEventListener('load', relayout);
if ('ResizeObserver' in window) new ResizeObserver(relayout).observe(document.body);
relayout();
