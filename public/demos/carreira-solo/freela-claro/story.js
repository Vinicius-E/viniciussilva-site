// Variante de rolagem animada (design.motion = "scrollytelling"): quatro atos com dispositivos diferentes, nunca o mesmo duas vezes seguidas.
//   1. pin + texto cinético sobre uma cena procedural (galáxia, relevo ou sequência de imagens);
//   2. pan: os recursos viajam na lateral enquanto se rola na vertical;
//   3. flow + contagem + paralaxe: os números reais da demonstração;
//   4. pin + revelação em círculo que cresce, que resolve na chamada final.
// O motor é o scrollcraft (MIT, vendor/scrollcraft). O conteúdo é HTML real; canvas e SVG de cena são decorativos (aria-hidden).
import { icon } from './icons.js';
import { h, fmtKpi } from './ui.js';
import { t } from './i18n.js';
import { v } from './voice.js';
import { art } from './art.js';
import { countUp, motionOn } from './motion.js';
import { bindScene, mountStory, holdStory } from './scroll.js';

const cue = (el, spec, extra = {}) => { el.setAttribute('data-sc-cue', spec); for (const [k, val] of Object.entries(extra)) el.setAttribute(k, val); return el; };

export function storyActs({ cfg, cta }) {
  const D = cfg.design, L = cfg.landing, seed = D.art.seed;
  const pv = cfg.preview || { kpis: [] };
  const proof = (i) => L.proof[i] || L.proof[0];

  // ───── ato 1: pin + cinético ─────
  const stage1 = h('div', { class: 'hero-stage', 'data-sc-stage': '' },
    h('div', { class: 'sc-scrim sc-scrim--lead', 'aria-hidden': 'true' }),
    h('div', { class: 'sc-copy sc-copy--lead c-lead' },
      cue(h('p', { class: 'kick' }, D.copy.eyebrow || cfg.brand.tagline), '-0.4 0.42'),
      cue(h('h1', { id: 'main-h' }, L.headline), '-0.4 0.42', { 'data-sc-kinetic': 'words' }),
      cue(h('p', { class: 'sub' }, L.sub), '-0.35 0.4'),
      cue(h('div', { class: 'ctas' }, cta(), h('a', { class: 'btn btn-secondary btn-lg btn-on-dark', href: '#/planos' }, t('Ver planos'))), '-0.3 0.4')),
    h('div', { class: 'sc-copy sc-copy--center c-mid' }, cue(h('h2', { class: 'big' }, proof(0)), '0.4 0.72', { 'data-sc-kinetic': 'words' })),
    h('div', { class: 'sc-copy sc-copy--trail c-trail' },
      cue(h('h2', { class: 'big' }, proof(1)), '0.68 1.04 0.3 0.1', { 'data-sc-kinetic': 'words' }),
      cue(h('p', { class: 'sub' }, proof(2)), '0.74 1.04 0.3 0.1')),
    h('div', { class: 'story-progress', 'aria-hidden': 'true' }, h('i', { 'data-sc-progress': '' })));
  const act1 = h('section', { class: 'sc-act act-hero', 'data-sc-act': 'pin', 'data-sc-span': '3.6', 'aria-label': cfg.brand.name }, stage1);

  // ───── ato 2: pan ─────
  const rail = h('div', { class: 'rail', 'data-sc-pan': '0.12' },
    ...L.features.map((f, i) => h('article', { class: 'rcard' }, h('span', { class: 'ix', 'aria-hidden': 'true' }, String(i + 1).padStart(2, '0')),
      h('div', { class: 'ic' }, icon(f.icon)), h('h3', {}, f.title), h('p', {}, f.text))));
  const act2 = h('section', { class: 'sc-act act-rail', id: 'recursos', 'data-sc-act': 'pan', 'data-sc-span': '2.4', 'aria-labelledby': 'h-rec' },
    h('div', { class: 'rail-stage', 'data-sc-stage': '' }, h('div', { class: 'rail-head' }, cue(h('h2', { id: 'h-rec' }, v('featuresT')), '-0.2 1.1')), rail));

  // ───── ato 3: números reais, contagem e paralaxe ─────
  const figs = pv.kpis.slice(0, 3).map((k) => {
    const num = h('span', { class: 'v num' });
    countUp(num, k.value, (x, done) => fmtKpi(done ? x : Math.round(x), k.format), 1400);
    return h('div', { class: 'fig ' + (k.tone || ''), 'data-rv': 'up' }, num, h('span', { class: 'l' }, k.label), h('span', { class: 'hint' }, k.hint || ''));
  });
  const act3 = h('section', { class: 'act-count', 'data-sc-act': 'flow', 'aria-label': t('Números da demonstração') },
    h('div', { class: 'count-art a', 'data-sc-parallax': '-120', 'aria-hidden': 'true' }, art(D.art.style, seed + ':n1')),
    h('div', { class: 'count-art b', 'data-sc-parallax': '90', 'aria-hidden': 'true' }, art(D.art.style, seed + ':n2')),
    h('div', { class: 'wrap count-in' }, h('h2', { 'data-rv': 'up' }, t('Números da demonstração')), h('div', { class: 'figs' }, ...figs), h('p', { class: 'muted note', 'data-rv': 'up' }, t('Dados fictícios, calculados agora sobre o mesmo exemplo que você vê ao entrar.'))));

  // ───── ato 4: pin + círculo que cresce ─────
  const iris = h('div', { class: 'iris', 'data-sc-reveal': 'iris', 'data-sc-reveal-at': '0.04 0.62' }, h('div', { class: 'iris-art', 'aria-hidden': 'true' }, art(D.art.style, seed + ':cta')),
    h('div', { class: 'iris-copy' }, cue(h('h2', {}, v('ctaT')), '0.45 1.1 0.3 0.05'), cue(h('p', {}, v('ctaX', { r: cfg.roles.map((r) => r.label).join(t(' ou ')) })), '0.5 1.1 0.3 0.05'),
      cue(h('div', { class: 'ctas' }, cta('btn btn-lg btn-on')), '0.55 1.1 0.3 0.05')));
  const act4 = h('section', { class: 'sc-act act-close', 'data-sc-act': 'pin', 'data-sc-span': '2.2', 'aria-label': v('ctaT') },
    h('div', { class: 'close-stage', 'data-sc-stage': '' }, cue(h('p', { class: 'pre' }, cfg.brand.tagline), '-0.3 0.4'), iris));

  return {
    nodes: [act1, act2, act3, act4],
    // chamado depois de inserir os nós no DOM
    async start(root) {
      const animated = motionOn();
      const stop = bindScene({ act: act1, stage: stage1, scene: D.scene, seed, animated });
      document.documentElement.classList.toggle('story-static', !animated);
      if (animated) await mountStory(root, [stop]);
      else holdStory([stop]);
    },
  };
}
