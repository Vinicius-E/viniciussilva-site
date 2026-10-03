// Ícones de traço (24×24), sem dependências. Uso: icon('check').
const P = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  alert: 'M12 4l9 16H3L12 4zM12 10v4M12 17.2v.1',
  shield: 'M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3zM9 12l2.2 2.2L15.5 10',
  chart: 'M4 20V10M10 20V4M16 20v-8M22 20H2',
  upload: 'M12 16V4M7 9l5-5 5 5M4 20h16',
  spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z',
  plus: 'M12 5v14M5 12h14',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  home: 'M4 11l8-7 8 7v9H4v-9zM10 20v-6h4v6',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 3.6-6 8-6s8 2 8 6',
  logout: 'M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10',
  sun: 'M12 16a4 4 0 100-8 4 4 0 000 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-4.3-4.3',
  x: 'M6 6l12 12M18 6L6 18',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  up: 'M12 19V5M6 11l6-6 6 6',
  down: 'M12 5v14M6 13l6 6 6-6',
  sort: 'M8 9l4-4 4 4M8 15l4 4 4-4',
  info: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5M12 8v.1',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  refresh: 'M20 11a8 8 0 00-14.5-3.5L4 9M4 4v5h5M4 13a8 8 0 0014.5 3.5L20 15M20 20v-5h-5',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  file: 'M7 3h7l5 5v13H7V3zM14 3v5h5',
};

export function icon(name, cls = '') {
  const ns = 'http://www.w3.org/2000/svg';
  const s = document.createElementNS(ns, 'svg');
  s.setAttribute('viewBox', '0 0 24 24');
  s.setAttribute('class', 'i ' + cls);
  s.setAttribute('aria-hidden', 'true');
  s.setAttribute('focusable', 'false');
  const p = document.createElementNS(ns, 'path');
  p.setAttribute('d', P[name] || P.info);
  s.appendChild(p);
  return s;
}
