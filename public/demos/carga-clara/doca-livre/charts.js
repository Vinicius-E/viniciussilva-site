// Gráficos em SVG puro (sem biblioteca). Cada gráfico traz descrição textual e tabela oculta para leitores de tela.
import { drawOnView } from "./motion.js";
const NS = 'http://www.w3.org/2000/svg';
const s = (tag, attrs = {}, text) => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (text != null) e.textContent = text;
  return e;
};

function niceMax(v) {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  for (const m of [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (m * p >= v) return m * p;
  return v;
}

// points: [{label, value}], kind: 'bar' | 'line', fmt: valor -> texto curto, fmtFull: valor -> texto completo
export function chart(points, opts) {
  if (opts.design) return chartX(points, opts);
  const { kind = 'bar', title, fmtShort, fmtFull } = opts;
  const W = 640, H = 280, L = 76, R = 16, T = 28, B = 36;
  const max = niceMax(Math.max(0, ...points.map((p) => p.value)));
  const iw = W - L - R, ih = H - T - B;
  const svg = s('svg', { class: 'chart', viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': `${title}. ` + points.map((p) => `${p.label}: ${fmtFull(p.value)}`).join('; ') });
  for (let i = 0; i <= 4; i++) {
    const y = T + ih - (ih * i) / 4;
    svg.append(s('line', { class: 'grid-l', x1: L, x2: W - R, y1: y, y2: y }));
    svg.append(s('text', { x: L - 8, y: y + 4, 'text-anchor': 'end' }, fmtShort((max * i) / 4)));
  }
  const step = iw / points.length;
  const xs = points.map((_, i) => L + step * i + step / 2);
  const ys = points.map((p) => T + ih - (p.value / max) * ih);
  if (kind === 'bar') {
    const bw = Math.min(54, step * 0.6);
    points.forEach((p, i) => {
      const hh = Math.max(p.value > 0 ? 2 : 0, ih - (ys[i] - T));
      svg.append(s('rect', { class: 'bar', x: xs[i] - bw / 2, y: T + ih - hh, width: bw, height: hh, rx: 5 }));
      if (p.value > 0) svg.append(s('text', { class: 'val', x: xs[i], y: T + ih - hh - 6, 'text-anchor': 'middle' }, fmtShort(p.value)));
    });
  } else {
    svg.append(s('polyline', { class: 'ln', points: xs.map((x, i) => `${x},${ys[i]}`).join(' ') }));
    xs.forEach((x, i) => svg.append(s('circle', { class: 'dot', cx: x, cy: ys[i], r: 5 })));
  }
  points.forEach((p, i) => svg.append(s('text', { x: xs[i], y: H - 10, 'text-anchor': 'middle' }, p.label)));
  return svg;
}

// ───────── versão do sistema de design: curva suave, área em degradê, desenho animado e dica ao passar o mouse ─────────
let uid = 0;
function curve(xs, ys) { // Catmull-Rom -> Bézier (monotonia suficiente para séries curtas)
  let d = `M${xs[0]} ${ys[0]}`;
  for (let i = 0; i < xs.length - 1; i++) {
    const p0 = i ? i - 1 : 0, p3 = i + 2 < xs.length ? i + 2 : i + 1, k = 6;
    const c1x = xs[i] + (xs[i + 1] - xs[p0]) / k, c1y = ys[i] + (ys[i + 1] - ys[p0]) / k, c2x = xs[i + 1] - (xs[p3] - xs[i]) / k, c2y = ys[i + 1] - (ys[p3] - ys[i]) / k;
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${xs[i + 1]} ${ys[i + 1]}`;
  }
  return d;
}

function chartX(points, { kind = 'bar', title, fmtShort, fmtFull }) {
  const W = 640, H = 280, L = 76, R = 16, T = 28, B = 36, id = 'cg' + ++uid;
  const max = niceMax(Math.max(0, ...points.map((p) => p.value)));
  const iw = W - L - R, ih = H - T - B;
  const svg = s('svg', { class: 'chart chart-x', viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': `${title}. ` + points.map((p) => `${p.label}: ${fmtFull(p.value)}`).join('; ') });
  const defs = s('defs'); const grad = s('linearGradient', { id, x1: 0, y1: 0, x2: 0, y2: 1 });
  grad.append(s('stop', { class: 'g0', offset: '0' }), s('stop', { class: 'g1', offset: '1' })); defs.append(grad); svg.append(defs);
  for (let i = 0; i <= 4; i++) {
    const y = T + ih - (ih * i) / 4;
    svg.append(s('line', { class: 'grid-l', x1: L, x2: W - R, y1: y, y2: y }), s('text', { x: L - 8, y: y + 4, 'text-anchor': 'end' }, fmtShort((max * i) / 4)));
  }
  const step = iw / points.length, xs = points.map((_, i) => Math.round(L + step * i + step / 2)), ys = points.map((p) => Math.round(T + ih - (p.value / max) * ih));
  const top = points.reduce((m, p, i) => (p.value > points[m].value ? i : m), 0);
  if (kind === 'bar') {
    const bw = Math.min(54, step * 0.6);
    points.forEach((p, i) => {
      const hh = Math.max(p.value > 0 ? 2 : 0, ih - (ys[i] - T));
      const r = s('rect', { class: 'bar' + (i === top && points.length > 2 ? ' hi' : ''), x: xs[i] - bw / 2, y: T + ih - hh, width: bw, height: hh, rx: Math.min(8, bw / 3) });
      r.style.setProperty('--i', i); svg.append(r);
      if (p.value > 0) { const v = s('text', { class: 'val', x: xs[i], y: T + ih - hh - 6, 'text-anchor': 'middle' }, fmtShort(p.value)); v.style.setProperty('--i', i); svg.append(v); }
    });
  } else {
    const d = curve(xs, ys);
    svg.append(s('path', { class: 'area', d: `${d}L${xs[xs.length - 1]} ${T + ih}L${xs[0]} ${T + ih}Z`, fill: `url(#${id})` }), s('path', { class: 'ln', d, pathLength: 1 }));
    xs.forEach((x, i) => { const c = s('circle', { class: 'dot', cx: x, cy: ys[i], r: 5 }); c.style.setProperty('--i', i); svg.append(c); });
  }
  points.forEach((p, i) => svg.append(s('text', { x: xs[i], y: H - 10, 'text-anchor': 'middle' }, p.label)));
  // dica ao passar o mouse (decorativa: a tabela oculta já entrega os dados a leitores de tela)
  const tip = s('g', { class: 'tip', 'aria-hidden': 'true' }), box = s('rect', { rx: 6, height: 26 }), tx = s('text', { 'text-anchor': 'middle', y: 17 });
  tip.append(box, tx); svg.append(tip);
  const hit = s('rect', { x: L, y: T, width: iw, height: ih, fill: 'transparent' }); svg.append(hit);
  hit.addEventListener('pointermove', (e) => {
    const r = svg.getBoundingClientRect(), x = ((e.clientX - r.left) / r.width) * W, i = Math.max(0, Math.min(points.length - 1, Math.floor((x - L) / step)));
    const txt = `${points[i].label}: ${fmtFull(points[i].value)}`; tx.textContent = txt; const w = txt.length * 7.2 + 18;
    box.setAttribute('width', w); box.setAttribute('x', -w / 2); tx.setAttribute('x', 0);
    const px = Math.max(L + w / 2, Math.min(W - R - w / 2, xs[i])), py = Math.max(2, ys[i] - 40);
    tip.setAttribute('transform', `translate(${px} ${py})`); tip.classList.add('on');
  });
  hit.addEventListener('pointerleave', () => tip.classList.remove('on'));
  drawOnView(svg);
  return svg;
}
