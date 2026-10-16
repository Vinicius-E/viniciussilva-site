// Landing do sistema de design: cinco composições (split, center, editorial, bento, mockup) e a variante de rolagem animada.
// Mesmo conteúdo (product.json), estruturas e ritmos diferentes; o CSS de cada uma está em identity.css (html[data-landing]).
import { icon } from './icons.js';
import { h, fmt, fmtKpi } from './ui.js';
import { t } from './i18n.js';
import { v } from './voice.js';
import { chart } from './charts.js';
import { art } from './art.js';
import { countUp } from './motion.js';
import { storyActs } from './story.js';

const rv = (el, kind = 'up') => { el.setAttribute('data-rv', kind); return el; };
const kids = (el) => { [...el.children].forEach((c) => rv(c)); return el; };

export function designLanding({ cfg, logo, langSwitch, themeBtn }) {
  const D = cfg.design, L = cfg.landing, kind = D.layout.landing, seed = D.art.seed, style = D.art.style;
  const story = D.motion === 'scrollytelling';
  const cta = (cls = 'btn btn-primary btn-lg') => h('a', { class: cls, href: '#/entrar' }, L.cta, icon('arrow'));
  const ctas = () => h('div', { class: 'ctas' }, cta(), h('a', { class: 'btn btn-secondary btn-lg', href: '#/planos' }, t('Ver planos')));
  const eyebrow = () => (D.copy.eyebrow ? h('p', { class: 'eyebrow' }, D.copy.eyebrow) : null);

  // painel em miniatura com os números reais da demonstração (cfg.preview vem do seed)
  const miniDash = (n = 3) => {
    const pv = cfg.preview || { kpis: [], chart: [] };
    const moneyChart = cfg.chart.format === 'money';
    const svg = chart(pv.chart, { kind: cfg.chart.kind, title: cfg.chart.title, design: true, fmtShort: moneyChart ? fmt.moneyShort : fmt.int, fmtFull: moneyChart ? fmt.money : fmt.int });
    const tiles = pv.kpis.slice(0, n).map((k) => {
      const val = h('span', { class: 'v num' });
      countUp(val, k.value, (x, done) => fmtKpi(done ? x : Math.round(x), k.format));
      return h('div', { class: 'mk ' + (k.tone || '') }, h('span', { class: 'l' }, k.label), val);
    });
    return h('div', { class: 'mini', 'aria-hidden': 'true' }, h('div', { class: 'mini-kpis' }, ...tiles), h('div', { class: 'mini-chart' }, h('p', { class: 'mini-t' }, cfg.chart.title), svg));
  };

  const nav = h('header', { class: 'pubnav' }, h('div', { class: 'wrap' }, logo(),
    h('nav', { 'aria-label': t('Principal') },
      h('a', { class: 'link', href: '#/recursos' }, t('Recursos')), h('a', { class: 'link', href: '#/planos' }, t('Planos')), h('a', { class: 'link', href: '#/duvidas' }, t('Dúvidas')),
      langSwitch(), themeBtn(), h('a', { class: 'btn btn-primary', href: '#/entrar' }, t('Entrar')))));

  // ───── heróis ─────
  const frame = (extra = '') => h('div', { class: 'art-frame ' + extra }, art(style, seed));
  const HEROES = {
    split: () => h('div', { class: 'wrap hero hero-split' },
      kids(h('div', { class: 'hero-copy' }, eyebrow(), h('h1', { id: 'main-h' }, L.headline), h('p', { class: 'sub' }, L.sub), ctas())),
      rv(h('div', { class: 'hero-visual', 'data-depth-root': '' }, frame(), h('div', { class: 'float float-card' }, miniDash(2)),
        h('div', { class: 'float float-chip', 'aria-hidden': 'true' }, icon('check'), L.proof[0])), 'zoom')),
    center: () => h('div', { class: 'wrap hero hero-center' },
      kids(h('div', { class: 'hero-copy' }, eyebrow(), h('h1', { id: 'main-h' }, L.headline), h('p', { class: 'sub' }, L.sub), ctas())),
      rv(h('div', { class: 'hero-band', 'data-depth-root': '' }, frame(), h('div', { class: 'float-card' }, miniDash(3))), 'zoom')),
    editorial: () => h('div', { class: 'wrap hero hero-editorial' },
      kids(h('div', { class: 'hero-copy' }, h('p', { class: 'kick' }, D.copy.eyebrow || cfg.brand.tagline), h('h1', { id: 'main-h' }, L.headline), h('p', { class: 'sub standfirst' }, L.sub), ctas())),
      rv(h('figure', { class: 'hero-fig' }, frame('arch'), h('figcaption', {}, h('span', { class: 'fig' }, 'Fig. 1'), cfg.brand.name + ' · ' + cfg.brand.tagline)), 'zoom')),
    bento: () => h('div', { class: 'wrap hero hero-bento' },
      kids(h('div', { class: 'hero-copy' }, eyebrow(), h('h1', { id: 'main-h' }, L.headline), h('p', { class: 'sub' }, L.sub), ctas())),
      h('div', { class: 'bento' },
        rv(h('div', { class: 'tile tile-dash', 'data-spot': '' }, miniDash(2)), 'up'),
        rv(h('div', { class: 'tile tile-art' }, art(style, seed + ':b')), 'up'),
        ...L.proof.slice(0, 2).map((p, i) => rv(h('div', { class: 'tile tile-proof p' + i, 'data-spot': '' }, icon('check'), h('p', {}, p)), 'up')))),
    mockup: () => h('div', { class: 'wrap hero hero-mockup' },
      kids(h('div', { class: 'hero-copy' }, eyebrow(), h('h1', { id: 'main-h' }, L.headline), h('p', { class: 'sub' }, L.sub), ctas())),
      rv(h('div', { class: 'mock-wrap', 'data-tilt': '' }, h('div', { class: 'mock-glow', 'aria-hidden': 'true' }, art(style, seed)),
        h('div', { class: 'browser', 'aria-hidden': 'true' },
          h('div', { class: 'bar' }, h('i'), h('i'), h('i'), h('span', { class: 'url' }, cfg.slug + '.hive.local')),
          h('div', { class: 'mock-body' }, h('div', { class: 'mock-side' }, icon('home'), icon('list'), icon('plus'), icon('user')), miniDash(3)))), 'zoom')),
  };

  const S = story ? storyActs({ cfg, cta }) : null;
  const hero = story ? null : HEROES[kind]();

  // ───── seções ─────
  const proof = story ? null : h('div', { class: 'wrap' }, h('div', { class: 'proof' }, h('ul', {}, ...L.proof.map((p) => rv(h('li', {}, h('span', { class: 'pi', 'aria-hidden': 'true' }, icon('check')), h('span', {}, p)))))));
  const feats = story ? null : h('section', { class: 'wrap section', id: 'recursos', 'aria-labelledby': 'h-rec' }, rv(h('h2', { id: 'h-rec' }, v('featuresT'))),
    h('div', { class: 'grid feat-grid' }, ...L.features.map((f, i) => rv(h('article', { class: 'card feat', 'data-spot': '' },
      h('span', { class: 'ix', 'aria-hidden': 'true' }, String(i + 1).padStart(2, '0')), h('div', { class: 'ic' }, icon(f.icon)), h('h3', {}, f.title), h('p', {}, f.text),
      kind === 'bento' ? h('div', { class: 'tile-bg', 'aria-hidden': 'true' }, art(style, seed + ':f' + i)) : null)))));
  const how = h('section', { class: 'wrap section', 'aria-labelledby': 'h-how' }, rv(h('h2', { id: 'h-how' }, v('stepsT'))),
    h('ol', { class: 'steps' }, ...L.steps.map((s) => rv(h('li', {}, h('h3', {}, s.title), h('p', {}, s.text))))));
  const plans = h('section', { class: 'wrap section', id: 'planos', 'aria-labelledby': 'h-pl' }, rv(h('h2', { id: 'h-pl' }, v('plansT'))), rv(h('p', { class: 'lead' }, v('plansLead'))),
    h('div', { class: 'grid c2 plan-grid' }, ...L.plans.map((p) => rv(h('article', { class: 'card plan' + (p.featured ? ' featured' : '') },
      p.featured ? h('span', { class: 'badge brand' }, t('Mais escolhido')) : null, h('h3', {}, p.name),
      h('p', { class: 'price num' }, p.price, ' ', h('small', {}, p.period)),
      h('ul', {}, ...p.items.map((i) => h('li', {}, icon('check'), i))),
      h('a', { class: 'btn ' + (p.featured ? 'btn-primary' : 'btn-secondary'), href: '#/entrar' }, t('Testar na demonstração')))))));
  const faq = h('section', { class: 'wrap section', id: 'duvidas', 'aria-labelledby': 'h-faq' }, rv(h('h2', { id: 'h-faq' }, v('faqT'))),
    h('div', { class: 'faq-list' }, ...L.faq.map((q) => rv(h('details', { class: 'faq' }, h('summary', {}, q.q), h('p', {}, q.a))))));
  const band = h('div', { class: 'wrap section' }, rv(h('div', { class: 'cta-band' }, h('div', { class: 'band-art', 'aria-hidden': 'true' }, art(style, seed + ':cta')),
    h('div', { class: 'band-copy' }, h('h2', {}, v('ctaT')), h('p', {}, v('ctaX', { r: cfg.roles.map((r) => r.label).join(t(' ou ')) })), h('a', { class: 'btn btn-lg btn-on', href: '#/entrar' }, L.cta, icon('arrow'))))));
  const foot = h('footer', { class: 'wrap footer' }, h('p', {}, '© ' + new Date().getFullYear() + ' ' + cfg.brand.name + '. ' + cfg.brand.tagline + '.'),
    h('p', {}, t('Contato: '), h('a', { href: 'mailto:' + cfg.brand.contact }, cfg.brand.contact)), h('p', {}, t('Esta é uma demonstração com dados fictícios.')));
  const page = h('div', { class: 'landing' + (story ? ' landing-story' : '') }, nav, h('main', { id: 'main' }, story ? h('a', { class: 'skip-story', href: '#/planos' }, t('Pular a apresentação')) : null, ...(story ? S.nodes : [hero]), proof, feats, how, plans, faq, band), foot);
  page.__story = S;
  return page;
}
