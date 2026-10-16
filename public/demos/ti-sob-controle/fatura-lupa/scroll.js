// Rolagem animada (scrollytelling), JS puro: uma seção "pinned" (position: sticky) cuja altura de rolagem vira um progresso 0..1.
// Cenas: galaxy (partículas em espiral, canvas 2D), relief (camadas SVG com paralaxe), frames (sequência de imagens em canvas).
// Regras: a rolagem nunca é interceptada (só leitura passiva); rAF com suavização; pausa fora da viewport; menos partículas no celular;
// prefers-reduced-motion e automação veem um estado final estático, sem pinagem; o conteúdo é HTML real e o canvas é decorativo.
import { rng } from './art.js';

const NS = 'http://www.w3.org/2000/svg';
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;
const svgEl = (tag, attrs = {}) => { const e = document.createElementNS(NS, tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); return e; };

let current = null;
export function stopStory() { if (current) { current(); current = null; } }

// ───────── cena: galáxia ─────────
function galaxyScene(canvas, seed, mobile) {
  const R = rng('galaxy:' + seed), N = mobile ? 650 : 1700, arms = 3 + (R() > 0.5 ? 1 : 0);
  const P = { r: new Float32Array(N), a: new Float32Array(N), z: new Float32Array(N), c: new Uint8Array(N), q: new Uint8Array(N) };
  for (let i = 0; i < N; i++) {
    const r = Math.pow(R(), 1.5); P.r[i] = r;
    P.a[i] = ((i % arms) / arms) * Math.PI * 2 + r * 5.2 + (R() - 0.5) * (0.5 + r * 0.7);
    P.z[i] = R(); P.c[i] = R() < 0.18 ? 1 : R() < 0.55 ? 0 : 2; P.q[i] = R() < 0.5 ? 0 : R() < 0.6 ? 1 : 2;
  }
  const groups = []; for (let c = 0; c < 3; c++) for (let q = 0; q < 3; q++) groups.push({ c, q, idx: [] });
  for (let i = 0; i < N; i++) groups[P.c[i] * 3 + P.q[i]].idx.push(i);
  const alpha = [0.35, 0.65, 0.95];
  let ctx = canvas.getContext('2d'), W = 0, H = 0, dpr = 1, cols = ['#fff', '#fff', '#fff'], glow = null;
  const css = () => { const cs = getComputedStyle(canvas); cols = [cs.getPropertyValue('--story-a').trim() || '#9bbcf0', cs.getPropertyValue('--story-b').trim() || '#f2b134', '#ffffff']; };
  const resize = (w, hh) => {
    dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2); W = canvas.width = Math.max(2, Math.round(w * dpr)); H = canvas.height = Math.max(2, Math.round(hh * dpr)); css();
    glow = document.createElement('canvas'); glow.width = glow.height = 256; const g = glow.getContext('2d');
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128); grad.addColorStop(0, cols[1]); grad.addColorStop(0.25, cols[0]); grad.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grad; g.fillRect(0, 0, 256, 256);
  };
  const draw = (p, time) => {
    if (!W) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H);
    const zoom = 0.62 + ease(p) * 1.9, tilt = 0.4 + 0.45 * ease(clamp(p * 1.4)), rot = p * Math.PI * 1.7 + time * 0.00004;
    const cx = W * 0.5, cy = H * (0.52 - 0.06 * p), R0 = Math.min(W, H * 1.5) * 0.46 * zoom;
    ctx.globalAlpha = clamp(0.5 + p * 0.5) * 0.9;
    const gs = R0 * 0.9; ctx.drawImage(glow, cx - gs, cy - gs * tilt, gs * 2, gs * 2 * tilt);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(cx, cy); ctx.rotate(-0.32 + p * 0.2);
    for (const g of groups) {
      ctx.globalAlpha = alpha[g.q]; ctx.fillStyle = cols[g.c];
      for (const i of g.idx) {
        const r = P.r[i], ang = P.a[i] + rot * (1.25 - r * 0.95), s = (0.7 + P.z[i] * 1.7) * dpr * (0.55 + zoom * 0.35);
        ctx.fillRect(Math.cos(ang) * r * R0 - s / 2, Math.sin(ang) * r * R0 * tilt - s / 2, s, s);
      }
    }
    ctx.globalAlpha = 1;
  };
  return { resize, draw, idle: true };
}

// ───────── cena: relevo em camadas (SVG, paralaxe) ─────────
function reliefScene(box, seed) {
  const R = rng('relief:' + seed), W = 1600, H = 900;
  const svg = svgEl('svg', { class: 'story-svg', viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'xMidYMax slice', 'aria-hidden': 'true', focusable: 'false' });
  const stars = svgEl('g', { class: 'rl-stars' });
  for (let i = 0; i < 46; i++) stars.append(svgEl('circle', { cx: Math.round(R() * W), cy: Math.round(R() * H * 0.5), r: (0.8 + R() * 1.6).toFixed(1), class: 'rl-star' }));
  const sun = svgEl('circle', { class: 'rl-sun', cx: W * lerp(0.35, 0.65, R()), cy: H * 0.62, r: 92 });
  svg.append(stars, sun);
  const layers = [];
  for (let k = 0; k < 6; k++) {
    const base = H * (0.46 + k * 0.095), amp = 70 + (5 - k) * 18 + R() * 30; let d = `M-100 ${H + 10}L-100 ${base}`;
    const pts = 40; let y = base; const ph = R() * 9, f = 1.4 + R() * 1.6;
    for (let i = 0; i <= pts; i++) {
      const x = -100 + (i / pts) * (W + 200); y = base + Math.sin(x / W * Math.PI * f + ph) * amp * 0.5 + Math.sin(x / W * Math.PI * f * 2.7 + ph * 1.7) * amp * 0.28 + (R() - 0.5) * amp * 0.16;
      d += `L${Math.round(x)} ${Math.round(y)}`;
    }
    const g = svgEl('g', { class: 'rl-layer rl' + k }); g.append(svgEl('path', { d: d + `L${W + 100} ${H + 10}Z` })); svg.append(g); layers.push(g);
  }
  box.append(svg);
  const draw = (p) => {
    sun.setAttribute('cy', (H * 0.62 - ease(clamp(p * 1.15)) * H * 0.34).toFixed(1));
    sun.setAttribute('r', (92 + p * 70).toFixed(1));
    stars.setAttribute('opacity', (1 - clamp(p * 1.6) * 0.7).toFixed(2));
    layers.forEach((g, k) => {
      const d = (k + 1) / layers.length, s = 1 + p * 0.5 * d * d, ty = -p * 70 * d - (1 - d) * p * -30;
      g.setAttribute('transform', `translate(${W / 2} ${H}) scale(${s.toFixed(4)}) translate(${-W / 2} ${(ty / s).toFixed(1) - H})`);
    });
  };
  return { draw, svg, resize() {}, idle: false };
}

// ───────── cena: sequência de imagens ─────────
function framesScene(canvas, spec, mobile, fallback) {
  const total = spec.count, stride = mobile ? 2 : 1, imgs = new Array(total).fill(null), ctx = canvas.getContext('2d');
  let W = 0, H = 0, last = 0, dead = false;
  const url = (i) => `scene/frame-${String(i + 1).padStart(4, '0')}.${spec.ext}`;
  const order = [0, total - 1]; for (const s of [16, 8, 4, 2, 1]) for (let i = 0; i < total; i += s) if (i % stride === 0 && !order.includes(i)) order.push(i);
  let pos = 0, active = 0;
  const pump = () => {
    while (active < 4 && pos < order.length && !dead) {
      const i = order[pos++]; active++;
      const im = new Image(); im.decoding = 'async';
      im.onload = () => { imgs[i] = im; active--; if (i === 0) paint(last); pump(); };
      im.onerror = () => { active--; if (i === 0 && !dead) { dead = true; fallback(); } else pump(); };
      im.src = url(i);
    }
  };
  const paint = (p) => {
    if (!W) return; last = p;
    const want = Math.round(clamp(p) * (total - 1)); let i = want; while (i >= 0 && !imgs[i]) i--; if (i < 0) { i = want; while (i < total && !imgs[i]) i++; }
    const im = imgs[i]; if (!im) return;
    const k = Math.max(W / im.naturalWidth, H / im.naturalHeight), w = im.naturalWidth * k, hh = im.naturalHeight * k;
    ctx.drawImage(im, (W - w) / 2, (H - hh) / 2, w, hh);
  };
  pump();
  return { resize(w, hh) { const d = Math.min(devicePixelRatio || 1, 1.5); W = canvas.width = Math.round(w * d); H = canvas.height = Math.round(hh * d); paint(last); }, draw: paint, idle: false, stop() { dead = true; } };
}

// ───────── ligação de uma cena a um ato do motor ─────────
// O motor (vendor/scrollcraft) publica --sc-p (0..1) no elemento do ato; aqui a cena lê esse valor, suaviza (lerp) e desenha.
// Sem motor (movimento reduzido ou automação) a cena é desenhada uma vez, num quadro final estável.
export function bindScene({ act, stage, scene, seed, animated }) {
  const mobile = matchMedia('(max-width: 860px)').matches;
  const canvas = document.createElement('canvas'); canvas.className = 'scene-canvas'; canvas.setAttribute('aria-hidden', 'true');
  stage.prepend(canvas);
  let eng;
  const mount = () => {
    if (scene.type === 'relief') { canvas.hidden = true; eng = reliefScene(stage, seed); }
    else if (scene.type === 'frames' && scene.frames) eng = framesScene(canvas, scene.frames, mobile, () => { eng = galaxyScene(canvas, seed, mobile); size(); });
    else eng = galaxyScene(canvas, seed, mobile);
  };
  const size = () => { const r = stage.getBoundingClientRect(); if (r.width && eng && eng.resize) eng.resize(r.width, r.height); };
  const readP = () => { const x = parseFloat(act.style.getPropertyValue('--sc-p')); return Number.isFinite(x) ? x : 0; };
  let cur = 0, raf = 0, visible = true, last = 0, ro = null, io = null;
  const t0 = performance.now();
  const frame = (now) => {
    raf = 0;
    const dt = Math.min(64, now - last); last = now;
    const target = readP();
    cur += (target - cur) * (1 - Math.pow(1 - 0.12, dt / 16.7));
    if (Math.abs(target - cur) < 0.0004) cur = target;
    eng.draw(cur, now - t0);
    if (visible && (eng.idle || cur !== target)) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  requestAnimationFrame(() => {
    mount(); size();
    if (!animated) { eng.draw(scene.type === 'galaxy' ? 0.4 : 0.5, 0); ro = new ResizeObserver(() => { size(); eng.draw(scene.type === 'galaxy' ? 0.4 : 0.5, 0); }); ro.observe(stage); return; }
    io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) kick(); else if (raf) { cancelAnimationFrame(raf); raf = 0; } }, { rootMargin: '10% 0px' }); io.observe(stage);
    addEventListener('scroll', kick, { passive: true });
    ro = new ResizeObserver(() => { size(); kick(); }); ro.observe(stage); kick();
  });
  const stop = () => { cancelAnimationFrame(raf); removeEventListener('scroll', kick); io && io.disconnect(); ro && ro.disconnect(); eng && eng.stop && eng.stop(); };
  return stop;
}

// ───────── motor (scrollcraft, MIT) ─────────
export async function mountStory(root, stops) {
  stopStory();
  let api = null;
  try { await import('./vendor/scrollcraft/scrollcraft.js'); api = window.ScrollCraft.mount(root); } catch { /* sem motor: a página fica estática, mas completa */ }
  current = () => { api && api.destroy(); stops.forEach((s) => s()); };
}

// sem motor (movimento reduzido ou automação): só guarda a limpeza da cena estática
export function holdStory(stops) { stopStory(); current = () => stops.forEach((s) => s()); }
