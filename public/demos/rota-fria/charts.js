// Gráficos em SVG puro (sem biblioteca). Cada gráfico traz descrição textual e tabela oculta para leitores de tela.
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
export function chart(points, { kind = 'bar', title, fmtShort, fmtFull }) {
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
