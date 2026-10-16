// Carga Clara: o progresso do ato (--sc-p) dirige o divisor, a auditoria linha a linha, o recibo corrente e o colapso final.
(function () {
  var act = document.querySelector('.cc')
  if (!act || !window.PF) return
  var stage = act.querySelector('.cc-stage')
  var L = [].slice.call(act.querySelectorAll('.cc-col--billed li'))
  var R = [].slice.call(act.querySelectorAll('.cc-col--table li'))
  var out = act.querySelector('.cc-receipt output')
  var close = act.querySelector('.cc-close')
  var pairs = [].slice.call(act.querySelectorAll('.cc-pair'))
  var heroEls = [].slice.call(act.querySelectorAll('.cc-hero-cta'))
  var diffs = R.map(function (li) { return parseFloat(li.getAttribute('data-diff')) || 0 })
  var W = PF.win
  var set = function (k, v) { stage.style.setProperty(k, v) }
  var ease = function (t) { return 1 - Math.pow(1 - t, 3) }
  var inert = function (el, on) { if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert') }

  function render(p) {
    var hero = 1 - W(p, 0.07, 0.13)
    set('--hero', hero.toFixed(3))
    heroEls.forEach(function (e) { inert(e, hero < 0.05) })

    var audit = W(p, 0.12, 0.17) * (1 - W(p, 0.5, 0.55))
    set('--audit', audit.toFixed(3))
    var total = 0
    for (var i = 0; i < L.length; i++) {
      var s = 0.16 + i * 0.04
      var r = W(p, s, s + 0.04)
      L[i].style.setProperty('--r', r.toFixed(3))
      R[i].style.setProperty('--r', r.toFixed(3))
      total += Math.max(0, diffs[i]) * r
    }
    out.textContent = PF.brl(total)
    set('--rc', (W(p, 0.15, 0.19) * (1 - W(p, 0.84, 0.9))).toFixed(3))

    var pa = W(p, 0.54, 0.58) * (1 - W(p, 0.64, 0.66))
    var pb = W(p, 0.665, 0.685) * (1 - W(p, 0.745, 0.765))
    var pc = W(p, 0.77, 0.79) * (1 - W(p, 0.85, 0.88))
    set('--pa', pa.toFixed(3)); set('--pb', pb.toFixed(3)); set('--pc', pc.toFixed(3))
    ;[pa, pb, pc].forEach(function (v, k) { if (pairs[k]) { inert(pairs[k], v < 0.05); pairs[k].setAttribute('aria-hidden', v < 0.05 ? 'true' : 'false') } })

    // o equilíbrio pende para o lado do contrato e então o divisor colapsa
    var tip = 50 - 9 * W(p, 0.54, 0.86)
    var col = W(p, 0.88, 0.97)
    var split = col > 0 ? 41 * (1 - ease(col)) : tip
    set('--split', split.toFixed(2))
    set('--col', ease(col).toFixed(3))
    set('--mk', col > 0.35 ? '#12171d' : '#e8edf2') // a marca fica legível quando o fundo claro assume a tela
    var cl = W(p, 0.9, 0.96)
    set('--close', cl.toFixed(3))
    close.classList.toggle('on', cl > 0.5)
    inert(close, cl < 0.5)
  }

  render(0)
  PF.watch(act, render)
})()
