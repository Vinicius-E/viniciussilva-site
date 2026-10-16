// Arte própria do produto: SVG gerado de forma determinística a partir de uma semente (o mesmo produto sempre tem a mesma "cara").
// Sem imagens externas. As cores vêm das variáveis do tema (classes a1..a5, s1), então claro/escuro funcionam sozinhos.
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, ...kids) => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v != null) e.setAttribute(k, v);
  for (const c of kids) if (c) e.append(c);
  return e;
};
const f1 = (n) => Math.round(n * 10) / 10;

// semente -> gerador pseudoaleatório (xmur3 + mulberry32)
export function rng(seed) {
  let h = 1779033703 ^ String(seed).length;
  for (let i = 0; i < String(seed).length; i++) { h = Math.imul(h ^ String(seed).charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = (h = Math.imul(h ^ (h >>> 16), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) ^ (h >>> 16);
  const r = () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  r.range = (lo, hi) => lo + (hi - lo) * r();
  r.int = (lo, hi) => Math.floor(r.range(lo, hi + 1));
  r.pick = (arr) => arr[Math.floor(r() * arr.length)];
  return r;
}

// curva fechada suave por n pontos (Catmull-Rom -> Bézier)
function smoothClosed(pts) {
  const n = pts.length; let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    d += `C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return d + 'Z';
}
const blob = (R, cx, cy, r, wob = 0.35, n = 7) => smoothClosed(Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rad = r * (1 + (R() - 0.5) * wob * 2); return [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad]; }));

const GEN = {
  blobs(R, W, H, g) {
    const m = Math.min(W, H);
    g.append(el('path', { class: 'a1', d: blob(R, W * R.range(.5, .62), H * R.range(.45, .55), m * R.range(.36, .44)), opacity: '.96' }));
    g.append(el('path', { class: 'a3', d: blob(R, W * R.range(.25, .4), H * R.range(.62, .78), m * R.range(.22, .3)), opacity: '.9' }));
    g.append(el('path', { class: 'a2', d: blob(R, W * R.range(.68, .82), H * R.range(.2, .32), m * R.range(.14, .2), .3, 6) }));
    g.append(el('path', { class: 's1 nofill', d: blob(R, W * .5, H * .5, m * R.range(.46, .5), .22, 8), 'stroke-dasharray': '2 9' }));
    for (let i = 0; i < 14; i++) g.append(el('circle', { class: R() > .5 ? 'a2' : 'a4', cx: f1(R.range(.05, .95) * W), cy: f1(R.range(.05, .95) * H), r: f1(R.range(2, 6)) }));
    const sx = W * R.range(.12, .22), sy = H * R.range(.12, .22), s = m * .05;
    g.append(el('path', { class: 'a2', d: `M${f1(sx)} ${f1(sy - s)}Q${f1(sx)} ${f1(sy)} ${f1(sx + s)} ${f1(sy)}Q${f1(sx)} ${f1(sy)} ${f1(sx)} ${f1(sy + s)}Q${f1(sx)} ${f1(sy)} ${f1(sx - s)} ${f1(sy)}Q${f1(sx)} ${f1(sy)} ${f1(sx)} ${f1(sy - s)}Z` }));
  },
  contour(R, W, H, g) {
    const centers = [[W * R.range(.3, .45), H * R.range(.35, .5)], [W * R.range(.62, .78), H * R.range(.55, .72)]];
    centers.forEach(([cx, cy], ci) => {
      const ph = [R.range(0, 6.28), R.range(0, 6.28), R.range(0, 6.28)], am = [R.range(.05, .14), R.range(.03, .09), R.range(.02, .05)], fr = [2, 3, 5];
      for (let k = 1; k <= 11; k++) {
        const r0 = Math.min(W, H) * (ci ? .045 : .06) * k; let d = '';
        for (let i = 0; i <= 90; i++) {
          const a = (i / 90) * Math.PI * 2; let w = 1; for (let j = 0; j < 3; j++) w += am[j] * Math.sin(fr[j] * a + ph[j] + k * .15);
          d += (i ? 'L' : 'M') + f1(cx + Math.cos(a) * r0 * w * 1.15) + ' ' + f1(cy + Math.sin(a) * r0 * w);
        }
        g.append(el('path', { class: 's1 nofill', d: d + 'Z', opacity: String(f1(Math.max(.16, 1 - k * .08))), 'stroke-width': k % 4 === 0 ? 2 : 1.2 }));
      }
    });
    g.append(el('circle', { class: 'a2', cx: f1(W * R.range(.72, .86)), cy: f1(H * R.range(.14, .24)), r: f1(Math.min(W, H) * .07) }));
    g.append(el('circle', { class: 'a1', cx: f1(centers[0][0]), cy: f1(centers[0][1]), r: 6 }));
  },
  grid(R, W, H, g) {
    const u = 24, cols = Math.floor(W / u), rows = Math.floor(H / u);
    for (let x = 1; x < cols; x++) for (let y = 1; y < rows; y++) g.append(el('circle', { class: 's1dot', cx: x * u, cy: y * u, r: 1.3 }));
    let x = 2;
    while (x < cols - 3) {
      const w = R.int(2, 3), hh = R.int(3, rows - 6);
      g.append(el('rect', { class: R() > .72 ? 'a2' : R() > .45 ? 'a1' : 'a3', x: x * u, y: (rows - 2 - hh) * u, width: w * u - 6, height: hh * u, rx: 2 }));
      x += w + R.int(0, 1);
    }
    let px = u * R.int(2, 5), py = u * R.int(3, 6), d = `M${px} ${py}`; const nodes = [[px, py]];
    for (let i = 0; i < 6; i++) { if (i % 2) py += u * R.int(-3, 3); else px += u * R.int(2, 5); px = Math.min(px, W - u * 2); py = Math.max(u * 2, Math.min(py, H - u * 4)); d += `L${px} ${py}`; nodes.push([px, py]); }
    g.append(el('path', { class: 's1 nofill', d, 'stroke-width': 2.5 }));
    nodes.forEach(([a, b]) => g.append(el('circle', { class: 'a2', cx: a, cy: b, r: 6 })));
    for (let i = 0; i < 4; i++) { const cx = u * R.int(3, cols - 3), cy = u * R.int(2, rows - 3); g.append(el('path', { class: 's1 nofill', d: `M${cx - 8} ${cy}H${cx + 8}M${cx} ${cy - 8}V${cy + 8}`, 'stroke-width': 1.6 })); }
  },
  waves(R, W, H, g) {
    const cls = ['a3', 'a4', 'a1', 'a2', 'a3'];
    g.append(el('circle', { class: 'a2', cx: f1(W * R.range(.55, .75)), cy: f1(H * R.range(.2, .32)), r: f1(Math.min(W, H) * .13) }));
    for (let k = 0; k < 5; k++) {
      const base = H * (.36 + k * .13), A = H * R.range(.03, .08), fq = R.range(1, 2.4), ph = R.range(0, 6.28); let d = `M0 ${H}L0 ${f1(base)}`;
      for (let i = 0; i <= 48; i++) { const x = (i / 48) * W; d += `L${f1(x)} ${f1(base + A * Math.sin((x / W) * Math.PI * 2 * fq + ph))}`; }
      g.append(el('path', { class: cls[k], d: d + `L${W} ${H}Z`, opacity: String(f1(.55 + k * .1)) }));
    }
    for (let i = 0; i < 9; i++) g.append(el('circle', { class: 'a4', cx: f1(R.range(.05, .95) * W), cy: f1(R.range(.05, .4) * H), r: f1(R.range(1.5, 4)) }));
  },
  mosaic(R, W, H, g) {
    const n = 4, u = Math.min(W / n, H / n), ox = (W - u * n) / 2, oy = (H - u * n) / 2, cls = ['a1', 'a2', 'a3', 'a4', 'a1'];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const x = ox + i * u, y = oy + j * u, c = R.pick(cls), t = R.int(0, 6), rot = R.int(0, 3) * 90, h = u / 2;
      const gg = el('g', { transform: `rotate(${rot} ${f1(x + h)} ${f1(y + h)})` });
      if (t === 0) gg.append(el('path', { class: c, d: `M${f1(x)} ${f1(y)}H${f1(x + u)}A${f1(u)} ${f1(u)} 0 0 1 ${f1(x)} ${f1(y + u)}Z` }));
      else if (t === 1) gg.append(el('circle', { class: c, cx: f1(x + h), cy: f1(y + h), r: f1(h * .86) }));
      else if (t === 2) gg.append(el('path', { class: c, d: `M${f1(x)} ${f1(y + u)}A${f1(h)} ${f1(h)} 0 0 1 ${f1(x + u)} ${f1(y + u)}Z` }));
      else if (t === 3) gg.append(el('rect', { class: c, x: f1(x + 4), y: f1(y + 4), width: f1(u - 8), height: f1(u - 8), rx: 4 }));
      else if (t === 4) gg.append(el('circle', { class: 's1 nofill', cx: f1(x + h), cy: f1(y + h), r: f1(h * .7), 'stroke-width': 6 }));
      else if (t === 5) gg.append(el('path', { class: c, d: `M${f1(x + h)} ${f1(y + 3)}L${f1(x + u - 3)} ${f1(y + h)}L${f1(x + h)} ${f1(y + u - 3)}L${f1(x + 3)} ${f1(y + h)}Z` }));
      g.append(gg);
    }
  },
  rays(R, W, H, g) {
    const cx = W * R.range(.55, .7), cy = H * R.range(.55, .7), n = R.int(16, 24), L = Math.hypot(W, H);
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2, a1 = ((i + .55) / n) * Math.PI * 2, r = L * R.range(.28, .62);
      g.append(el('path', { class: i % 3 === 0 ? 'a4' : 'a3', d: `M${f1(cx)} ${f1(cy)}L${f1(cx + Math.cos(a0) * r)} ${f1(cy + Math.sin(a0) * r)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(cx + Math.cos(a1) * r)} ${f1(cy + Math.sin(a1) * r)}Z`, opacity: String(f1(R.range(.6, 1))) }));
    }
    [.22, .15, .08].forEach((k, i) => g.append(el('circle', { class: i === 2 ? 'a2' : i === 1 ? 'a1' : 's1 nofill', cx: f1(cx), cy: f1(cy), r: f1(Math.min(W, H) * k), 'stroke-width': 2 })));
  },
};

// heroArt devolve um <svg> decorativo (aria-hidden) que preenche o contêiner (slice).
export function art(style, seed, { w = 640, h = 520, label = '' } = {}) {
  const R = rng(style + ':' + seed);
  const svg = el('svg', { class: 'art', viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': 'true', focusable: 'false' });
  const g = el('g', { class: 'art-g' });
  (GEN[style] || GEN.blobs)(R, w, h, g);
  svg.append(g);
  if (label) svg.dataset.label = label;
  return svg;
}

// ícones de KPI: traço único e consistente; o formato e o tom escolhem o símbolo
const KP = {
  coin: 'M12 21a9 9 0 100-18 9 9 0 000 18zM14.8 9.2c-.6-.8-1.6-1.2-2.8-1.2-1.6 0-2.8.8-2.8 2s1.1 1.7 2.8 2 2.8.8 2.8 2-1.2 2-2.8 2c-1.2 0-2.2-.4-2.8-1.2M12 6.5V8M12 16v1.5',
  donut: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 3v9l6.4 6.4',
  stack: 'M12 4l9 4.5-9 4.5L3 8.5 12 4zM3 12.5l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5',
  pulse: 'M3 12h4l2.5-6 4 12 2.5-6H21',
  check: 'M12 21a9 9 0 100-18 9 9 0 000 18zM8 12.2l2.7 2.7L16 9.6',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  alert: 'M12 4l9 16H3L12 4zM12 10v4M12 17.2v.1',
};
export function kpiIcon(k) {
  let n = 'stack';
  if (k.tone === 'ok') n = 'check'; else if (k.tone === 'warn') n = 'clock'; else if (k.tone === 'bad') n = 'alert';
  else if (k.format === 'money') n = 'coin'; else if (k.format === 'percent') n = 'donut'; else n = 'pulse';
  const svg = el('svg', { class: 'i kpi-i', viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' });
  svg.append(el('path', { d: KP[n] }));
  return svg;
}
