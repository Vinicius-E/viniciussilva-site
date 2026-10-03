// Kit de Produto Hive — aplicação. Tudo vem de api/config (product.json): marca, copy, papéis, campos, KPIs, assistente.
import { icon } from './icons.js';
import { h, fmt, fmtKpi, fieldText, badge, toast, openModal, confirmDialog, stateBox, skeleton } from './ui.js';
import { chart } from './charts.js';
import { t, lang, setLang, setCurrency } from './i18n.js';

const root = document.getElementById('app');
let cfg = null; // configuração pública
let me = null; // sessão

// ───────── API (URLs relativas: o produto roda em / ou em /p/<slug>/) ─────────
async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch('api/' + path, {
    method, credentials: 'same-origin',
    headers: body ? { 'Content-Type': 'application/json' } : { Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = {};
  try { data = await res.json(); } catch { /* corpo vazio */ }
  if (!res.ok) {
    if (res.status === 401 && me) { me = null; go('#/entrar'); }
    const err = new Error(data.error || t('Algo deu errado. Tente novamente.'));
    err.status = res.status;
    throw err;
  }
  return data;
}

// ───────── tema ─────────
function storage(op, k, v) { try { return op === 'get' ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch { return null; } }
function applyTheme(t) { if (t) document.documentElement.dataset.theme = t; }
function currentTheme() { return document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
function toggleTheme() { const t = currentTheme() === 'dark' ? 'light' : 'dark'; applyTheme(t); storage('set', 'kit-theme', t); render(); }
const themeBtn = () => h('button', { class: 'btn btn-ghost', type: 'button', onclick: toggleTheme, 'aria-label': currentTheme() === 'dark' ? t('Mudar para o tema claro') : t('Mudar para o tema escuro') }, icon(currentTheme() === 'dark' ? 'sun' : 'moon'));

// ───────── roteamento ─────────
const go = (hash) => { if (location.hash === hash) render(); else location.hash = hash; };
window.addEventListener('hashchange', () => { if (cfg) render(); }); // antes do boot, quem renderiza é o próprio boot

function route() {
  const hsh = location.hash.replace(/^#/, '') || '/';
  const [, a, b] = hsh.split('/');
  if (a === 'app') return { name: 'app', page: b || 'painel' };
  if (a === 'entrar') return { name: 'login' };
  return { name: 'landing', anchor: ['recursos', 'planos', 'duvidas'].includes(a) ? a : null };
}

function setTitle(t) { document.title = t ? `${t} · ${cfg.brand.name}` : `${cfg.brand.name} — ${cfg.brand.tagline}`; }
function focusMain() { const m = document.getElementById('main-h'); if (m) { m.setAttribute('tabindex', '-1'); m.focus({ preventScroll: true }); } }

async function render() {
  const r = route();
  if (r.name === 'app' && !me) return go('#/entrar');
  if (r.name === 'login' && me) return go('#/app');
  root.replaceChildren();
  if (r.name === 'landing') { setTitle(''); root.append(landing()); if (r.anchor) document.getElementById(r.anchor)?.scrollIntoView(); else window.scrollTo(0, 0); return; }
  if (r.name === 'login') { setTitle(t('Entrar')); root.append(loginView()); return; }
  const pages = { painel: [t('Painel'), dashboardView], lista: [cap(cfg.entity.plural), listView], novo: [t('Novo {x}', { x: cfg.entity.singular }), wizardView], conta: [t('Minha conta'), accountView] };
  const [title, view] = pages[r.page] || pages.painel;
  setTitle(title);
  const body = h('main', { class: 'main', id: 'main' });
  root.append(shell(r.page, body));
  window.scrollTo(0, 0);
  await view(body, title);
  focusMain();
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const withTenant = (m) => { const x = (cfg.tenants || []).find((q) => q.id === m.tenant); if (x) m.tenantName = x.name; return m; };

// seletor de idioma (aparece quando o produto oferece mais de um) e de cliente (tenant)
function langSwitch() {
  const ls = cfg && cfg.langs;
  if (!ls || ls.length < 2) return null;
  return h('div', { class: 'langs', role: 'group', 'aria-label': t('Idioma') }, ...ls.map((l) => h('button', { type: 'button', class: 'btn btn-ghost lang', lang: l, 'aria-pressed': String(l === lang), onclick: () => setLang(l) }, l.toUpperCase())));
}
function tenantPicker() {
  const ts = cfg.tenants;
  if (!ts || ts.length < 2) return null;
  return h('div', { class: 'field' }, h('label', { for: 'tn' }, t('Cliente (tenant)')),
    h('select', { class: 'input', id: 'tn' }, ...ts.map((x) => h('option', { value: x.id }, x.name))),
    h('span', { class: 'help' }, t('Cada cliente tem dados e sessão isolados.')));
}

// ───────── marca ─────────
const logo = (href = '#/') => h('a', { class: 'logo', href, 'aria-label': t('{x} — página inicial', { x: cfg.brand.name }) }, h('span', { class: 'glyph', 'aria-hidden': 'true' }, cfg.brand.glyph), cfg.brand.name);

// ───────── landing ─────────
function previewCard() {
  const sample = [['mai', 21], ['jun', 24], ['jul', 23], ['ago', 27], ['set', 26], ['out', 31]].map(([l, v]) => ({ label: t(l), value: v }));
  const svg = chart(sample, { kind: cfg.chart.kind, title: t('Exemplo ilustrativo'), fmtShort: (v) => String(Math.round(v)), fmtFull: (v) => String(v) });
  svg.setAttribute('role', 'presentation'); svg.removeAttribute('aria-label');
  return h('div', { class: 'preview', 'aria-hidden': 'true' },
    h('div', { class: 'kpis', style: 'grid-template-columns:repeat(2,1fr)' },
      h('div', { class: 'kpi ok' }, h('span', { class: 'l' }, t('Conciliados')), h('span', { class: 'v' }, '27')),
      h('div', { class: 'kpi warn' }, h('span', { class: 'l' }, t('Pendentes')), h('span', { class: 'v' }, '3'))),
    svg, h('p', { class: 'cap' }, t('Ilustração com números de exemplo.')));
}

function landing() {
  const L = cfg.landing;
  const nav = h('header', { class: 'pubnav' }, h('div', { class: 'wrap' }, logo(),
    h('nav', { 'aria-label': t('Principal') },
      h('a', { class: 'link', href: '#/recursos' }, t('Recursos')), h('a', { class: 'link', href: '#/planos' }, t('Planos')), h('a', { class: 'link', href: '#/duvidas' }, t('Dúvidas')),
      langSwitch(), themeBtn(), h('a', { class: 'btn btn-primary', href: '#/entrar' }, t('Entrar')))));
  const hero = h('div', { class: 'wrap hero' },
    h('div', {}, h('span', { class: 'eyebrow' }, icon('shield'), t('IA que roda no seu computador')),
      h('h1', { id: 'main-h' }, L.headline), h('p', { class: 'sub' }, L.sub),
      h('div', { class: 'ctas' }, h('a', { class: 'btn btn-primary btn-lg', href: '#/entrar' }, L.cta, icon('arrow')), h('a', { class: 'btn btn-secondary btn-lg', href: '#/planos' }, t('Ver planos')))),
    previewCard());
  const proof = h('div', { class: 'wrap' }, h('div', { class: 'proof' }, h('ul', {}, ...L.proof.map((p) => h('li', {}, icon('check'), p)))));
  const feats = h('section', { class: 'wrap section', id: 'recursos', 'aria-labelledby': 'h-rec' }, h('h2', { id: 'h-rec' }, t('O que você ganha')),
    h('div', { class: 'grid c2 c4' }, ...L.features.map((f) => h('article', { class: 'card feat' }, h('div', { class: 'ic' }, icon(f.icon)), h('h3', {}, f.title), h('p', {}, f.text)))));
  const how = h('section', { class: 'wrap section', 'aria-labelledby': 'h-how' }, h('h2', { id: 'h-how' }, t('Como funciona')),
    h('ol', { class: 'steps' }, ...L.steps.map((s) => h('li', {}, h('h3', {}, s.title), h('p', {}, s.text)))));
  const plans = h('section', { class: 'wrap section', id: 'planos', 'aria-labelledby': 'h-pl' }, h('h2', { id: 'h-pl' }, t('Planos simples')),
    h('p', { class: 'lead' }, t('Sem fidelidade. Você começa pela demonstração, sem cadastro.')),
    h('div', { class: 'grid c2' }, ...L.plans.map((p) => h('article', { class: 'card plan' + (p.featured ? ' featured' : '') },
      p.featured ? h('span', { class: 'badge brand' }, t('Mais escolhido')) : null, h('h3', {}, p.name),
      h('p', { class: 'price num' }, p.price, ' ', h('small', {}, p.period)),
      h('ul', {}, ...p.items.map((i) => h('li', {}, icon('check'), i))),
      h('a', { class: 'btn ' + (p.featured ? 'btn-primary' : 'btn-secondary'), href: '#/entrar' }, t('Testar na demonstração'))))));
  const faq = h('section', { class: 'wrap section', id: 'duvidas', 'aria-labelledby': 'h-faq' }, h('h2', { id: 'h-faq', style: 'margin-bottom:24px' }, t('Dúvidas frequentes')),
    ...L.faq.map((q) => h('details', { class: 'faq' }, h('summary', {}, q.q), h('p', {}, q.a))));
  const band = h('div', { class: 'wrap section' }, h('div', { class: 'cta-band' }, h('h2', {}, t('Veja funcionando em dois cliques')),
    h('p', {}, t('Entre como {r} e explore com dados fictícios.', { r: cfg.roles.map((r) => r.label).join(t(' ou ')) })),
    h('a', { class: 'btn btn-primary btn-lg', href: '#/entrar' }, L.cta)));
  const foot = h('footer', { class: 'wrap footer' }, h('p', {}, '© ' + new Date().getFullYear() + ' ' + cfg.brand.name + '. ' + cfg.brand.tagline + '.'),
    h('p', {}, t('Contato: '), h('a', { href: 'mailto:' + cfg.brand.contact }, cfg.brand.contact)), h('p', {}, t('Esta é uma demonstração com dados fictícios.')));
  return h('div', {}, nav, h('main', { id: 'main' }, hero, proof, feats, how, plans, faq, band), foot);
}

// ───────── login ─────────
function loginView() {
  const errBox = h('div', { id: 'login-err', role: 'alert' });
  let tenant = cfg.tenant || (cfg.tenants && cfg.tenants[0] && cfg.tenants[0].id) || '';
  async function enter(body, btn) {
    const sel = document.getElementById('tn'); if (sel) tenant = sel.value; if (tenant) body = { ...body, tenant };
    errBox.replaceChildren();
    if (btn) btn.setAttribute('aria-busy', 'true');
    try { me = withTenant(await api('login', { method: 'POST', body })); toast(t('Bem-vindo, {x}.', { x: me.user.split(' ')[0] })); go('#/app'); }
    catch (e) { errBox.append(h('div', { class: 'alert' }, icon('alert'), h('span', {}, e.message))); }
    finally { if (btn) btn.removeAttribute('aria-busy'); }
  }
  const email = h('input', { class: 'input', id: 'em', type: 'email', autocomplete: 'username', required: true, value: cfg.roles[0].email });
  const pass = h('input', { class: 'input', id: 'pw', type: 'password', autocomplete: 'current-password', required: true, value: 'demo' });
  const form = h('form', { novalidate: true, class: 'formgrid', onsubmit: (e) => { e.preventDefault(); enter({ email: email.value, password: pass.value }, e.submitter); } },
    h('div', { class: 'field' }, h('label', { for: 'em' }, t('E-mail')), email),
    h('div', { class: 'field' }, h('label', { for: 'pw' }, t('Senha')), pass, h('span', { class: 'help' }, t('Na demonstração, a senha é “demo”.'))),
    h('button', { class: 'btn btn-primary', type: 'submit' }, t('Entrar')));
  return h('main', { class: 'auth', id: 'main' }, h('div', { class: 'panel' },
    h('div', {}, logo(), h('h1', { id: 'main-h', style: 'font-size:1.6rem;margin-top:16px' }, t('Entrar na demonstração')),
      h('p', { class: 'muted', style: 'margin-top:8px' }, t('Escolha um perfil para explorar com dados fictícios. Nada é enviado a ninguém.')), langSwitch()),
    tenantPicker(),
    h('div', { class: 'roles', role: 'group', 'aria-label': t('Perfis de demonstração') }, ...cfg.roles.map((r) =>
      h('button', { class: 'role', type: 'button', onclick: (e) => enter({ role: r.id }, e.currentTarget) },
        h('span', { class: 'av', 'aria-hidden': 'true' }, r.user.split(' ').map((w) => w[0]).slice(0, 2).join('')),
        h('span', {}, h('strong', {}, t('Entrar como {x}', { x: r.label })), h('span', { class: 'd' }, r.user + ' · ' + r.description)),
        icon('arrow')))),
    h('div', { class: 'or' }, t('ou use e-mail e senha')), errBox, form,
    h('a', { class: 'backlink', href: '#/' }, t('← Voltar para a página inicial'))));
}

// ───────── shell ─────────
function shell(page, body) {
  const nav = [['painel', t('Painel'), 'home', '#/app'], ['lista', cap(cfg.entity.plural), 'list', '#/app/lista']];
  if (me.can.includes('create')) nav.push(['novo', t('Novo'), 'plus', '#/app/novo']);
  nav.push(['conta', t('Conta'), 'user', '#/app/conta']);
  return h('div', { class: 'shell' },
    h('div', {}, h('div', { class: 'demo' }, t('Modo demonstração — todos os dados são fictícios') + (me.tenantName ? ' · ' + t('Cliente: {x}', { x: me.tenantName }) : '')),
      h('header', { class: 'topbar' }, h('div', { class: 'wrap' }, logo('#/app'),
        h('div', { class: 'who' }, langSwitch(), themeBtn(), h('div', { class: 'nm' }, h('strong', {}, me.user), h('br'), h('span', { class: 'muted' }, me.label)),
          h('button', { class: 'btn btn-ghost', type: 'button', 'aria-label': t('Sair'), onclick: logout }, icon('logout')))))),
    h('div', { class: 'shell-body' },
      h('nav', { class: 'side', 'aria-label': t('Seções') }, ...nav.map(([id, label, ic, href]) => h('a', { href, 'aria-current': id === page ? 'page' : null }, icon(ic), label))), body));
}
async function logout() { try { await api('logout', { method: 'POST', body: {} }); } catch { /* sair deve sempre funcionar */ } me = null; toast(t('Você saiu.')); go('#/'); }

const pageHead = (title, sub, ...actions) => h('header', {}, h('div', {}, h('h1', { id: 'main-h' }, title), sub ? h('p', { class: 'muted' }, sub) : null), h('div', { class: 'actions', style: 'margin:0' }, ...actions));

function errorState(retry, msg) {
  return stateBox({ icon: 'alert', bad: true, title: t('Não conseguimos carregar'), text: msg || t('Verifique sua conexão e tente de novo.'), action: h('button', { class: 'btn btn-secondary', type: 'button', onclick: retry }, icon('refresh'), t('Tentar de novo')) });
}

// ───────── painel ─────────
async function dashboardView(body, title) {
  const kpiBox = h('section', { class: 'kpis', 'aria-label': t('Indicadores') }, ...[0, 1, 2, 3].map(() => skeleton('k')));
  const chartBox = h('div', {}, skeleton('c'));
  const attnBox = h('div', {}, skeleton('k'));
  body.append(pageHead(t('Olá, {x}', { x: me.user.split(' ')[0] }), t('Resumo da sua operação neste momento.'),
    me.can.includes('create') ? h('a', { class: 'btn btn-primary', href: '#/app/novo' }, icon('plus'), t('Novo {x}', { x: cfg.entity.singular })) : null),
    kpiBox,
    h('div', { class: 'two' },
      h('section', { class: 'panel-card', 'aria-labelledby': 'ch-t' }, h('header', {}, h('h2', { id: 'ch-t', style: 'font-size:1.2rem' }, cfg.chart.title)), chartBox),
      h('section', { class: 'panel-card', 'aria-labelledby': 'at-t' }, h('header', {}, h('h2', { id: 'at-t', style: 'font-size:1.2rem' }, t('Precisam da sua atenção'))), attnBox)));
  const load = async () => {
    try {
      const sum = await api('summary');
      kpiBox.replaceChildren(...sum.kpis.map((k) => h('div', { class: 'kpi ' + (k.tone || '') }, h('span', { class: 'l' }, k.label), h('span', { class: 'v num' }, fmtKpi(k.value, k.format)), h('span', { class: 'hint' }, k.hint || ''))));
      const f = cfg.chart.format === 'money' ? { s: fmt.moneyShort, f: fmt.money } : { s: fmt.int, f: fmt.int };
      chartBox.replaceChildren(chart(sum.chart, { kind: cfg.chart.kind, title: cfg.chart.title, fmtShort: f.s, fmtFull: f.f }),
        h('table', { class: 'sr' }, h('caption', {}, cfg.chart.title), h('thead', {}, h('tr', {}, h('th', { scope: 'col' }, t('Período')), h('th', { scope: 'col' }, t('Valor')))),
          h('tbody', {}, ...sum.chart.map((p) => h('tr', {}, h('td', {}, p.label), h('td', {}, f.f(p.value)))))));
      const st = statusField();
      const bad = await api('records?size=5&' + st.key + '=' + (st.options.find((o) => o.tone === 'bad') || st.options[0]).value);
      const warn = await api('records?size=5&' + st.key + '=' + (st.options.find((o) => o.tone === 'warn') || st.options[0]).value);
      const rows = [...bad.items, ...warn.items].slice(0, 5);
      const money = cfg.entity.fields.find((f) => f.type === 'money');
      attnBox.replaceChildren(rows.length ? h('ul', { class: 'attn' }, ...rows.map((r) => h('li', {}, h('button', { type: 'button', onclick: () => openRecord(r.id, load) },
        h('span', {}, h('strong', {}, String(r[cfg.entity.primary])), money ? h('br') : null, money ? h('span', { class: 'muted' }, fieldText(money, r[money.key])) : null), badge(st, r[st.key]))))) :
        stateBox({ icon: 'check', title: t('Tudo em dia'), text: t('Nada precisa da sua atenção agora.') }));
    } catch (e) { kpiBox.replaceChildren(); chartBox.replaceChildren(errorState(() => { chartBox.replaceChildren(skeleton('c')); load(); }, e.message)); attnBox.replaceChildren(); }
  };
  load();
}
const statusField = () => cfg.entity.fields.find((f) => f.type === 'status');

// ───────── lista ─────────
const ls = { q: '', sort: '', dir: 'desc', page: 1, filters: {} };
async function listView(body) {
  const cols = cfg.entity.fields.filter((f) => f.table);
  const first = cfg.entity.primary;
  const selects = cfg.entity.fields.filter((f) => f.type === 'status' || f.type === 'select').slice(0, 2);
  const out = h('div', {});
  const search = h('input', { class: 'input', id: 'q', type: 'search', placeholder: t('Buscar por qualquer campo'), value: ls.q, autocomplete: 'off' });
  let timer;
  search.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { ls.q = search.value; ls.page = 1; load(); }, 250); });
  const filterEls = selects.map((f) => {
    const sel = h('select', { class: 'input', id: 'f-' + f.key, 'aria-label': t('Filtrar por {x}', { x: f.label.toLowerCase() }), onchange: (e) => { ls.filters[f.key] = e.target.value; ls.page = 1; load(); } },
      h('option', { value: '' }, t('Todas: {x}', { x: f.label.toLowerCase() })), ...f.options.map((o) => h('option', { value: o.value, selected: ls.filters[f.key] === o.value }, o.label)));
    return sel;
  });
  // em telas estreitas a tabela vira cartões (sem cabeçalho clicável): a ordenação ganha um seletor próprio
  const sortSel = h('select', { class: 'input only-narrow', id: 'sortsel', 'aria-label': t('Ordenar por'), onchange: (e) => { const [k, d] = e.target.value.split(':'); ls.sort = k; ls.dir = d; ls.page = 1; load(); } },
    ...cols.flatMap((f) => (f.type === 'status' ? [] : [['desc', t(f.type === 'date' ? 'mais recente' : f.type === 'text' ? 'Z–A' : 'maior')], ['asc', t(f.type === 'date' ? 'mais antigo' : f.type === 'text' ? 'A–Z' : 'menor')]].map(([d, tt]) =>
      h('option', { value: f.key + ':' + d, selected: ls.sort === f.key && ls.dir === d }, t('Ordenar: {x} ({y})', { x: f.label.toLowerCase(), y: tt }))))));
  body.append(pageHead(cap(cfg.entity.plural), t('Busque, filtre e ordene. Abra um item para ver os detalhes.'),
    cfg.import && cfg.import.enabled && me.can.includes('create') ? h('button', { class: 'btn btn-secondary', type: 'button', onclick: () => openImport(() => load()) }, icon('upload'), cfg.import.label) : null,
    me.can.includes('create') ? h('a', { class: 'btn btn-primary', href: '#/app/novo' }, icon('plus'), t('Novo {x}', { x: cfg.entity.singular })) : null),
    h('div', { class: 'toolbar', role: 'search' }, h('div', { class: 'search' }, h('label', { class: 'sr', for: 'q' }, t('Buscar')), icon('search'), search), ...filterEls, sortSel),
    out, h('p', { class: 'sr', role: 'status', id: 'list-live' }));
  async function load() {
    out.replaceChildren(h('div', { class: 'tablewrap' }, h('div', { style: 'padding:16px;display:grid;gap:12px' }, skeleton(), skeleton(), skeleton(), skeleton())));
    const p = new URLSearchParams({ page: ls.page, size: 8 });
    if (ls.q) p.set('q', ls.q); if (ls.sort) { p.set('sort', ls.sort); p.set('dir', ls.dir); }
    for (const [k, v] of Object.entries(ls.filters)) if (v) p.set(k, v);
    let data;
    try { data = await api('records?' + p); } catch (e) { out.replaceChildren(h('div', { class: 'tablewrap' }, errorState(load, e.message))); return; }
    document.getElementById('list-live').textContent = t('{n} resultado(s)', { n: data.total });
    if (!data.total) {
      const filtering = ls.q || Object.values(ls.filters).some(Boolean);
      out.replaceChildren(h('div', { class: 'tablewrap' }, stateBox({ icon: 'search', title: filtering ? t('Nenhum resultado') : t('Nada por aqui ainda'),
        text: filtering ? t('Tente outro termo ou limpe os filtros.') : t('Quando houver {x}, eles aparecem aqui.', { x: cfg.entity.plural }),
        action: filtering ? h('button', { class: 'btn btn-secondary', type: 'button', onclick: () => { ls.q = ''; ls.filters = {}; ls.page = 1; render(); } }, t('Limpar filtros')) : (me.can.includes('create') ? h('a', { class: 'btn btn-primary', href: '#/app/novo' }, t('Criar o primeiro')) : null) })));
      return;
    }
    const sortKey = ls.sort || (cols.find((c) => c.type === 'date') || {}).key;
    const th = (f) => {
      const active = sortKey === f.key;
      return h('th', { scope: 'col', class: f.type === 'money' || f.type === 'number' ? 'r' : '', 'aria-sort': active ? (ls.dir === 'asc' ? 'ascending' : 'descending') : 'none' },
        h('button', { type: 'button', onclick: () => { ls.dir = active && ls.dir === 'desc' ? 'asc' : (active ? 'desc' : (f.type === 'text' ? 'asc' : 'desc')); ls.sort = f.key; ls.page = 1; load(); } }, f.label, icon(active ? (ls.dir === 'asc' ? 'up' : 'down') : 'sort')));
    };
    const tbl = h('table', {}, h('caption', { class: 'sr' }, cap(cfg.entity.plural)), h('thead', {}, h('tr', {}, ...cols.map(th), h('th', { scope: 'col' }, h('span', { class: 'sr' }, t('Ações'))))),
      h('tbody', {}, ...data.items.map((r) => h('tr', {}, ...cols.map((f) => {
        const cell = f.type === 'status' ? badge(f, r[f.key]) : fieldText(f, r[f.key]);
        return h('td', { 'data-l': f.label, class: (f.type === 'money' || f.type === 'number' ? 'r num ' : '') + (f.key === first ? 'first' : '') }, cell);
      }), h('td', { 'data-l': t('Ações'), class: 'r act' },h('button', { class: 'rowbtn', type: 'button', onclick: () => openRecord(r.id, load) }, t('Ver detalhes'), h('span', { class: 'sr' }, t(' de {x}', { x: r[first] }))))))));
    const pager = h('div', { class: 'pager' }, h('span', { class: 'muted' }, t('{n} {x} · página {p} de {q}', { n: data.total, x: data.total === 1 ? cfg.entity.singular : cfg.entity.plural, p: data.page, q: data.pages })),
      h('div', { class: 'actions', style: 'margin:0' },
        h('button', { class: 'btn btn-secondary', type: 'button', disabled: data.page <= 1, onclick: () => { ls.page--; load(); } }, t('Anterior')),
        h('button', { class: 'btn btn-secondary', type: 'button', disabled: data.page >= data.pages, onclick: () => { ls.page++; load(); } }, t('Próxima'))));
    out.replaceChildren(h('div', { class: 'tablewrap' }, tbl, pager));
  }
  load();
}

// ───────── importação (arquivo entra, lançamentos saem) ─────────
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1] || '');
    r.onerror = () => reject(new Error('Não consegui ler o arquivo.'));
    r.readAsDataURL(file);
  });
}

function openImport(refresh) {
  const out = h('div', { 'aria-live': 'polite' });
  const file = h('input', { class: 'input', id: 'imp-file', type: 'file', accept: '.pdf,.txt,.csv,application/pdf,text/plain' });
  const paste = h('textarea', { class: 'input', id: 'imp-text', rows: 4, placeholder: '03/09/2026 Fornecedor - descrição R$ 1.234,56' });
  const read = h('button', { class: 'btn btn-primary', type: 'button' }, 'Ler e mostrar a lista');
  const cols = cfg.entity.fields.filter((f) => f.key === cfg.entity.primary || f.type === 'date' || f.type === 'money' || f.type === 'status');
  const body = [
    h('p', { class: 'muted' }, cfg.import.hint),
    h('p', {}, h('a', { href: 'api/import/sample', download: 'extrato-exemplo.pdf' }, 'Baixar um PDF de exemplo para testar')),
    h('div', { class: 'field' }, h('label', { for: 'imp-file' }, 'Arquivo (PDF, .txt ou .csv — até 5 MB)'), file),
    h('div', { class: 'field' }, h('label', { for: 'imp-text' }, 'Ou cole o texto do extrato'), paste),
    h('div', { class: 'actions' }, read), out,
  ];
  const m = openModal(cfg.import.label, body, { wide: true });
  read.addEventListener('click', async () => {
    read.setAttribute('aria-busy', 'true'); read.disabled = true;
    out.replaceChildren(h('div', { class: 'aibox' }, skeleton(), skeleton()));
    try {
      const f = file.files[0];
      const payload = f ? { name: f.name, data: await fileToBase64(f) } : { text: paste.value };
      const p = await api('import', { method: 'POST', body: payload });
      if (!p.records.length) {
        out.replaceChildren(stateBox({ icon: 'search', title: 'Nada encontrado', text: 'Não achei linhas com data e valor. Confira o arquivo ou cole o texto do extrato.' }),
          rejectedList(p.rejected));
        return;
      }
      const rows = p.records.slice(0, 60);
      const tbl = h('div', { class: 'tablewrap', style: 'max-height:260px;overflow:auto' }, h('table', {},
        h('caption', { class: 'sr' }, 'Lançamentos encontrados'),
        h('thead', {}, h('tr', {}, ...cols.map((c) => h('th', { scope: 'col' }, c.label)))),
        h('tbody', {}, ...rows.map((r) => h('tr', {}, ...cols.map((c) => h('td', { 'data-l': c.label }, c.type === 'status' ? badge(c, r[c.key]) : fieldText(c, r[c.key]))))))));
      const go = h('button', { class: 'btn btn-primary', type: 'button' }, 'Importar ' + p.records.length + ' ' + (p.records.length === 1 ? cfg.entity.singular : cfg.entity.plural));
      go.addEventListener('click', async () => {
        go.setAttribute('aria-busy', 'true'); go.disabled = true;
        try { const d = await api('import/confirm', { method: 'POST', body: { records: p.records } }); toast(d.created + ' ' + cfg.entity.plural + ' importados.'); m.close(); refresh && refresh(); }
        catch (e) { toast(e.message, 'bad'); go.removeAttribute('aria-busy'); go.disabled = false; }
      });
      out.replaceChildren(h('p', {}, h('strong', {}, p.records.length + ' encontrados'), ' (leitura ' + (p.source === 'ai' ? 'pela IA' : 'por linhas') + '). Confira antes de importar; entram como “pendente” para conferência.'),
        tbl, rejectedList(p.rejected), h('div', { class: 'actions' }, go));
    } catch (e) { out.replaceChildren(h('div', { class: 'alert' }, icon('alert'), h('span', {}, e.message))); }
    finally { read.removeAttribute('aria-busy'); read.disabled = false; }
  });
}

function rejectedList(rej) {
  if (!rej || !rej.length) return null;
  return h('details', {}, h('summary', {}, rej.length + ' linha(s) ignorada(s)'), h('ul', {}, ...rej.slice(0, 20).map((r) => h('li', {}, (r.line ? r.line + ' — ' : '') + r.reason))));
}
// ───────── detalhe (modal) ─────────
async function openRecord(id, refresh) {
  let rec;
  try { rec = await api('records/' + encodeURIComponent(id)); }
  catch (e) { toast(e.status === 404 ? t('Este item não existe mais.') : e.message, 'bad'); refresh && refresh(); return; }
  const st = statusField();
  const aiOut = h('div', { 'aria-live': 'polite' });
  const body = [h('dl', { class: 'kv' }, ...cfg.entity.fields.map((f) => h('div', {}, h('dt', {}, f.label), h('dd', {}, f.type === 'status' ? badge(f, rec[f.key]) : fieldText(f, rec[f.key])))))];
  const acts = [];
  if (me.can.includes('edit')) {
    const sel = h('select', { class: 'input', id: 'chg', 'aria-label': t('Alterar {x}', { x: st.label.toLowerCase() }) }, ...st.options.map((o) => h('option', { value: o.value, selected: rec[st.key] === o.value }, o.label)));
    body.push(h('div', { class: 'field' }, h('label', { for: 'chg' }, t('Alterar {x}', { x: st.label.toLowerCase() })), sel));
    acts.push(h('button', { class: 'btn btn-primary', type: 'button', onclick: async () => { try { await api('records/' + id, { method: 'PUT', body: { [st.key]: sel.value } }); toast(t('Situação atualizada.')); m.close(); refresh && refresh(); } catch (e) { toast(e.message, 'bad'); } } }, t('Salvar situação')));
  }
  if (cfg.ai.enabled && me.can.includes('ai')) acts.push(aiButton(() => ({ id }), aiOut));
  if (me.can.includes('delete')) acts.push(h('button', { class: 'btn btn-danger', type: 'button', onclick: async () => {
    if (!(await confirmDialog({ title: t('Apagar {x}?', { x: cfg.entity.singular }), text: t('Esta ação não pode ser desfeita.'), confirm: t('Apagar'), danger: true }))) return;
    try { await api('records/' + id, { method: 'DELETE' }); toast(t('Apagado.')); m.close(); refresh && refresh(); } catch (e) { toast(e.message, 'bad'); } } }, icon('trash'), t('Apagar')));
  if (!me.can.includes('edit') && !me.can.includes('delete')) body.push(h('p', { class: 'alert info' }, icon('info'), t('Seu perfil ({x}) pode consultar e pedir análise, mas não alterar.', { x: me.label })));
  body.push(aiOut, h('div', { class: 'actions' }, ...acts));
  const m = openModal(String(rec[cfg.entity.primary]), body);
}

function aiButton(getBody, outEl) {
  const btn = h('button', { class: 'btn btn-secondary', type: 'button' }, icon('spark'), cfg.ai.label);
  btn.addEventListener('click', async () => {
    btn.setAttribute('aria-busy', 'true'); btn.disabled = true;
    outEl.replaceChildren(h('div', { class: 'aibox' }, skeleton(), skeleton()));
    try {
      const r = await api('ai/analyze', { method: 'POST', body: getBody() });
      outEl.replaceChildren(h('div', { class: 'aibox' }, h('strong', {}, t('Análise da IA')), h('pre', {}, r.result), h('span', { class: 'muted', style: 'font-size:.85rem' }, t('A IA sugere; a decisão final é sua.'))));
    } catch (e) { outEl.replaceChildren(h('div', { class: 'alert' }, icon('alert'), h('span', {}, e.message))); }
    finally { btn.removeAttribute('aria-busy'); btn.disabled = false; }
  });
  return btn;
}

// ───────── assistente de 2 passos ─────────
let draft = {}; let step = 0;
function inputFor(f, id, value) {
  const common = { id, name: f.key, class: 'input', 'aria-describedby': id + '-h ' + id + '-e' };
  if (f.type === 'select' || f.type === 'status') return h('select', common, h('option', { value: '' }, t('Selecione…')), ...f.options.map((o) => h('option', { value: o.value, selected: value === o.value }, o.label)));
  if (f.type === 'longtext') return h('textarea', { ...common, maxlength: f.max || 2000 }, value || '');
  const type = f.type === 'date' ? 'date' : (f.type === 'money' || f.type === 'number') ? 'text' : 'text';
  return h('input', { ...common, type, value: value ?? '', inputmode: f.type === 'money' || f.type === 'number' ? 'decimal' : null, maxlength: f.max || null, autocomplete: 'off' });
}
async function wizardView(body) {
  if (!me.can.includes('create')) { body.append(pageHead(t('Novo {x}', { x: cfg.entity.singular })), stateBox({ icon: 'shield', title: t('Seu perfil não pode criar'), text: t('Entre como {x} para criar.', { x: (cfg.roles.find((r) => r.can.includes('create')) || {}).label }), action: h('a', { class: 'btn btn-secondary', href: '#/app' }, t('Voltar ao painel')) })); return; }
  const wrap = h('div', { class: 'wiz' });
  body.append(pageHead(t('Novo {x}', { x: cfg.entity.singular }), t('Dois passos rápidos.')), wrap);
  const draw = () => {
    const S = cfg.wizard[step];
    const fields = S.fields.map((k) => cfg.entity.fields.find((f) => f.key === k));
    const errs = h('div', { id: 'form-errs' });
    const form = h('form', { novalidate: true, class: 'formgrid cols', 'aria-labelledby': 'wz-t' }, ...fields.map((f) => {
      const id = 'fd-' + f.key;
      return h('div', { class: 'field' + (f.type === 'longtext' ? ' wide' : ''), 'data-key': f.key },
        h('label', { for: id }, f.label, f.required ? h('span', { class: 'req', 'aria-hidden': 'true' }, ' *') : h('span', { class: 'muted', style: 'font-weight:400' }, t(' (opcional)'))),
        inputFor(f, id, draft[f.key]), h('span', { class: 'help', id: id + '-h' }, f.help || ''), h('span', { class: 'err', id: id + '-e' }));
    }));
    const collect = () => { for (const f of fields) { const el = form.querySelector('[name="' + f.key + '"]'); draft[f.key] = el.value; } };
    const validate = () => {
      collect(); let firstBad = null; const msgs = [];
      for (const f of fields) {
        const el = form.querySelector('[name="' + f.key + '"]'); const e = form.querySelector('#fd-' + f.key + '-e'); e.replaceChildren(); el.removeAttribute('aria-invalid');
        const v = String(draft[f.key] ?? '').trim(); let msg = '';
        if (f.required && !v) msg = t('{x} é obrigatório.', { x: f.label });
        else if (v && (f.type === 'money' || f.type === 'number') && !(parseFloat(v.replace(',', '.')) >= 0)) msg = t('{x} deve ser um número, como 1250,90.', { x: f.label });
        if (msg) { e.append(icon('alert'), msg); el.setAttribute('aria-invalid', 'true'); msgs.push(msg); firstBad = firstBad || el; }
      }
      errs.replaceChildren(msgs.length ? h('div', { class: 'alert', role: 'alert' }, icon('alert'), h('span', {}, t('Corrija {n} campo(s) para continuar.', { n: msgs.length }))) : '');
      if (firstBad) firstBad.focus();
      return !msgs.length;
    };
    const aiOut = h('div', { 'aria-live': 'polite' });
    const last = step === cfg.wizard.length - 1;
    const submitBtn = h('button', { class: 'btn btn-primary', type: 'submit', form: 'wizform' }, last ? t('Salvar') + ' ' + cfg.entity.singular : t('Continuar'), last ? icon('check') : icon('arrow'));
    form.id = 'wizform';
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault(); if (!validate()) return;
      if (!last) { step++; draw(); return; }
      submitBtn.setAttribute('aria-busy', 'true'); submitBtn.disabled = true;
      const payload = { ...draft }; for (const f of cfg.entity.fields) if ((f.type === 'money' || f.type === 'number') && payload[f.key]) payload[f.key] = String(payload[f.key]).replace(',', '.');
      try { await api('records', { method: 'POST', body: payload }); toast(t('Salvo.')); draft = {}; step = 0; ls.page = 1; ls.q = ''; ls.filters = {}; go('#/app/lista'); }
      catch (e) { errs.replaceChildren(h('div', { class: 'alert', role: 'alert' }, icon('alert'), h('span', {}, e.message))); submitBtn.removeAttribute('aria-busy'); submitBtn.disabled = false; }
    });
    const back = step > 0 ? h('button', { class: 'btn btn-secondary', type: 'button', onclick: () => { collect(); step--; draw(); } }, t('Voltar')) : h('a', { class: 'btn btn-secondary', href: '#/app/lista' }, t('Cancelar'));
    const aiBtn = last && cfg.ai.enabled && me.can.includes('ai') ? aiButton(() => { collect(); const p = { ...draft }; for (const f of cfg.entity.fields) if ((f.type === 'money' || f.type === 'number') && p[f.key]) p[f.key] = String(p[f.key]).replace(',', '.'); return p; }, aiOut) : null;
    wrap.replaceChildren(
      h('ol', { class: 'stepper', 'aria-label': t('Progresso') }, ...cfg.wizard.map((s, i) => h('li', { 'aria-current': i === step ? 'step' : null, class: i < step ? 'done' : '' }, h('span', { class: 'n' }, i < step ? icon('check') : String(i + 1)), s.title))),
      h('div', { class: 'card', style: 'margin-top:16px;display:grid;gap:16px' }, h('div', {}, h('h2', { id: 'wz-t', style: 'font-size:1.3rem' }, t('Passo {a} de {b}: {c}', { a: step + 1, b: cfg.wizard.length, c: S.title })), h('p', { class: 'muted' }, S.help)),
        errs, form, aiBtn ? h('div', {}, aiBtn) : null, aiOut,
        h('div', { class: 'actions' }, back, submitBtn)));
    form.querySelector('input,select,textarea')?.focus({ preventScroll: true });
  };
  draw();
}

// ───────── conta ─────────
async function accountView(body) {
  body.append(pageHead(t('Minha conta'), t('Seu perfil de demonstração e preferências.')),
    h('section', { class: 'panel-card' }, h('h2', { style: 'font-size:1.2rem' }, me.user), h('p', { class: 'muted' }, me.email),
      h('p', {}, h('span', { class: 'badge brand' }, me.label)),
      h('p', {}, t('Neste perfil você pode: {x}.', { x: [t('consultar'), ...me.can.map((c) => t({ create: 'criar', edit: 'editar', delete: 'apagar', ai: 'usar a IA', reset: 'restaurar a demonstração' }[c]))].join(', ') }))),
    h('section', { class: 'panel-card' }, h('h2', { style: 'font-size:1.2rem' }, t('Aparência')), h('div', { class: 'actions', style: 'margin:0;justify-content:flex-start' }, h('button', { class: 'btn btn-secondary', type: 'button', onclick: toggleTheme }, icon(currentTheme() === 'dark' ? 'sun' : 'moon'), t(currentTheme() === 'dark' ? 'Usar tema claro' : 'Usar tema escuro')))),
    me.can.includes('reset') ? h('section', { class: 'panel-card' }, h('h2', { style: 'font-size:1.2rem' }, t('Demonstração')), h('p', { class: 'muted' }, t('Apaga o que você criou e restaura os dados fictícios originais.')),
      h('div', {}, h('button', { class: 'btn btn-danger', type: 'button', onclick: async () => { if (await confirmDialog({ title: t('Restaurar a demonstração?'), text: t('Tudo o que você criou ou alterou será descartado.'), confirm: t('Restaurar'), danger: true })) { try { await api('demo/reset', { method: 'POST', body: {} }); toast(t('Demonstração restaurada.')); } catch (e) { toast(e.message, 'bad'); } } } }, icon('refresh'), t('Restaurar dados')))) : null,
    h('div', {}, h('button', { class: 'btn btn-secondary', type: 'button', onclick: logout }, icon('logout'), t('Sair'))));
}

// ───────── início ─────────
async function boot() {
  applyTheme(storage('get', 'kit-theme'));
  try { cfg = await api('config'); }
  catch { root.replaceChildren(stateBox({ icon: 'alert', bad: true, title: t('Produto indisponível'), text: t('Não foi possível carregar agora. Tente novamente em instantes.'), action: h('button', { class: 'btn btn-secondary', onclick: () => location.reload() }, t('Recarregar')) })); return; }
  document.documentElement.style.setProperty('--brand', cfg.brand.accent);
  setCurrency(cfg.currency);
  try { me = withTenant(await api('me')); } catch { me = null; }
  await render();
}
boot();

