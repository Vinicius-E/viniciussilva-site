// Movimento do Kit (JS puro, sem biblioteca): revelação ao rolar, contagem de números, gráficos que se desenham,
// transições de tela (View Transitions API, com alternativa), indicador de navegação e efeitos de ponteiro.
// Regras: nada roda com prefers-reduced-motion nem sob automação (capturas e testes veem o estado final);
// só transform/opacity; nenhuma medição de layout dentro de laços de animação.
const root = document.documentElement;
const reducedMQ = matchMedia('(prefers-reduced-motion: reduce)');
let enabled = false;
export const motionOn = () => enabled;
export const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

export function initMotion(design) {
  const q = new URLSearchParams(location.search).get('motion'); // ?motion=on|off força (útil para demonstrar e depurar)
  const level = design.motion || 'subtle';
  const apply = () => {
    enabled = level !== 'none' && !reducedMQ.matches && q !== 'off' && (navigator.webdriver !== true || q === 'on');
    root.classList.toggle('mo', enabled);
    root.dataset.motionLevel = enabled ? level : 'off';
  };
  apply();
  reducedMQ.addEventListener('change', apply);
}

// ───────── revelação ao rolar (IntersectionObserver, escalonada) ─────────
let io = null;
export function reveal(scope = document) {
  if (!enabled) return;
  io = io || new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  scope.querySelectorAll('[data-rv]:not(.in)').forEach((node) => {
    if (!node.style.getPropertyValue('--i')) {
      const sibs = [...node.parentElement.children].filter((c) => c.hasAttribute('data-rv'));
      node.style.setProperty('--i', String(sibs.indexOf(node) % 6));
    }
    io.observe(node);
  });
}

// ───────── número que sobe ─────────
// format(valor, final) devolve o texto; o valor final fica num .sr para leitores de tela
export function countUp(node, to, format, duration = 1000) {
  if (!enabled || !Number.isFinite(to) || to === 0) { node.textContent = format(to, true); return; }
  const live = document.createElement('span'); live.setAttribute('aria-hidden', 'true'); live.textContent = format(0, false);
  const sr = document.createElement('span'); sr.className = 'sr'; sr.textContent = format(to, true);
  node.replaceChildren(sr, live);
  const run = () => {
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      live.textContent = format(to * (1 - Math.pow(1 - p, 4)), p === 1);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const watch = new IntersectionObserver((es) => { if (es[0].isIntersecting) { watch.disconnect(); run(); } }, { threshold: 0.4 });
  watch.observe(node);
}

// ───────── gráficos: desenham ao entrar na tela ─────────
export function drawOnView(svg) {
  if (!enabled) { svg.classList.add('drawn'); return; }
  const w = new IntersectionObserver((es) => { if (es[0].isIntersecting) { w.disconnect(); requestAnimationFrame(() => svg.classList.add('drawn')); } }, { threshold: 0.3 });
  w.observe(svg);
}

// ───────── transições de tela ─────────
export async function transition(update, cls = 'vt-page') {
  if (!enabled || !document.startViewTransition) { await update(); return false; }
  root.classList.add(cls);
  const vt = document.startViewTransition(update);
  try { await vt.updateCallbackDone; } catch { /* a atualização trata os próprios erros */ }
  vt.finished.finally(() => root.classList.remove(cls)).catch(() => {});
  return true;
}

// troca de tema com círculo que cresce a partir do botão
export function themeSwitch(apply, origin) {
  if (!enabled || !document.startViewTransition || !origin) { apply(); return; }
  const r = origin.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.classList.add('vt-theme');
  const vt = document.startViewTransition(apply);
  vt.ready.then(() => root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] }, { duration: 560, easing: 'cubic-bezier(.2,.7,.2,1)', pseudoElement: '::view-transition-new(root)' })).catch(() => {});
  vt.finished.finally(() => root.classList.remove('vt-theme')).catch(() => {});
}

// ───────── indicador deslizante da navegação (FLIP) ─────────
let prevInd = null;
export function navIndicator(nav) {
  const cur = nav.querySelector('[aria-current="page"]');
  if (!cur) { prevInd = null; return; }
  const ind = document.createElement('span'); ind.className = 'ind'; ind.setAttribute('aria-hidden', 'true');
  nav.prepend(ind);
  const to = { x: cur.offsetLeft, y: cur.offsetTop, w: cur.offsetWidth, h: cur.offsetHeight };
  const set = (p) => { ind.style.width = p.w + 'px'; ind.style.height = p.h + 'px'; ind.style.transform = `translate(${p.x}px,${p.y}px)`; };
  if (enabled && prevInd) {
    set(prevInd); ind.style.transition = 'none'; void ind.offsetWidth; ind.style.transition = '';
    requestAnimationFrame(() => set(to));
  } else set(to);
  prevInd = to;
}
export const resetIndicator = () => { prevInd = null; };

// ───────── ponteiro: brilho (data-spot), inclinação (data-tilt) e profundidade (data-depth) ─────────
let pointerOn = false;
export function pointerFX() {
  if (pointerOn || !enabled || !finePointer()) return;
  pointerOn = true;
  let raf = 0, ev = null;
  const frame = () => {
    raf = 0; if (!ev) return;
    const spot = ev.target.closest && ev.target.closest('[data-spot]');
    if (spot) { const r = spot.getBoundingClientRect(); spot.style.setProperty('--px', (ev.clientX - r.left) + 'px'); spot.style.setProperty('--py', (ev.clientY - r.top) + 'px'); }
    const tilt = document.querySelector('[data-tilt]');
    if (tilt) {
      const r = tilt.getBoundingClientRect();
      if (ev.clientY > r.top - 200 && ev.clientY < r.bottom + 200) {
        const nx = ((ev.clientX - r.left) / r.width - 0.5) * 2, ny = ((ev.clientY - r.top) / r.height - 0.5) * 2;
        tilt.style.setProperty('--rx', (-ny * 3.5).toFixed(2) + 'deg'); tilt.style.setProperty('--ry', (nx * 5).toFixed(2) + 'deg');
      }
    }
    const dep = document.querySelector('[data-depth-root]');
    if (dep) { const nx = ev.clientX / innerWidth - 0.5, ny = ev.clientY / innerHeight - 0.5; dep.style.setProperty('--mx', nx.toFixed(3)); dep.style.setProperty('--my', ny.toFixed(3)); }
  };
  addEventListener('pointermove', (e) => { ev = e; if (!raf) raf = requestAnimationFrame(frame); }, { passive: true });
}

// barra de navegação pública ganha sombra ao rolar (um único listener passivo)
let scrollOn = false;
export function scrolledFlag() {
  if (scrollOn) return; scrollOn = true;
  let raf = 0;
  const f = () => { raf = 0; root.classList.toggle('scrolled', scrollY > 8); };
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(f); }, { passive: true }); f();
}
