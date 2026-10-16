// Runtime compartilhado das páginas das suítes (script clássico, sem inline). Fica em window.PF.
// O motor do scroll-craft publica --sc-p (0 a 1) em cada ato; aqui só lemos esse valor para dirigir interações próprias.
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches
  var PF = (window.PF = { lang: document.documentElement.lang || 'en', reduce: reduce })
  document.documentElement.classList.add('js')

  /** Chama fn(p) enquanto o elemento (um ato) está perto da tela. p vem de --sc-p; só chama quando muda. */
  PF.watch = function (el, fn) {
    if (!el) return
    var last = -1, live = true, raf = 0
    function tick() {
      raf = 0
      var p = parseFloat(el.style.getPropertyValue('--sc-p'))
      if (isNaN(p)) p = 0
      if (Math.abs(p - last) > 0.0004) { last = p; fn(p) }
      if (live) raf = requestAnimationFrame(tick)
    }
    function start() { if (!raf) raf = requestAnimationFrame(tick) }
    if (typeof IntersectionObserver === 'undefined') { start(); return }
    new IntersectionObserver(function (es) {
      live = es[0].isIntersecting
      if (live) start(); else if (raf) { cancelAnimationFrame(raf); raf = 0 }
    }, { rootMargin: '30% 0px 30% 0px' }).observe(el)
  }

  PF.clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)) }
  /** janela [a,b] de p mapeada para 0..1 */
  PF.win = function (p, a, b) { return PF.clamp((p - a) / (b - a), 0, 1) }
  PF.fmt = function (n, opt) {
    var tag = PF.lang === 'pt' ? 'pt-BR' : PF.lang === 'es' ? 'es-AR' : 'en-US'
    return n.toLocaleString(tag, opt || {})
  }
  PF.brl = function (n) { return 'R$ ' + PF.fmt(Math.round(n), { maximumFractionDigits: 0 }) }
})()
