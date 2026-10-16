// Agenda Cheia: índice que salta para cada objeto, objeto atual marcado e entrada escalonada dos objetos (opacidade a partir da posição).
(function () {
  var act = document.querySelector('.ag')
  if (!act || !window.PF) return
  var rail = act.querySelector('.ag-rail')
  var items = [].slice.call(act.querySelectorAll('.ag-obj, .ag-end'))
  var btns = [].slice.call(act.querySelectorAll('.ag-index button'))
  var pad = function () { return parseFloat(getComputedStyle(act.querySelector('.ag-stage')).getPropertyValue('--pad')) || 24 }

  // progresso em que cada objeto fica alinhado à esquerda (medido, não suposto)
  function targets() {
    var travel = Math.max(1, rail.scrollWidth - window.innerWidth)
    var first = items[0].offsetLeft
    return items.map(function (it) { return PF.clamp((it.offsetLeft - first) / travel, 0, 1) })
  }
  function go(i) {
    var t = targets()[i]
    var top = act.getBoundingClientRect().top + window.scrollY
    var total = act.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + t * total, behavior: PF.reduce ? 'auto' : 'smooth' })
  }
  btns.forEach(function (b, i) { b.addEventListener('click', function () { go(i) }) })

  function render() {
    var vw = window.innerWidth, pd = pad(), cur = 0, best = 1e9
    items.forEach(function (it, i) {
      var r = it.getBoundingClientRect()
      var s = 1 - PF.clamp((r.left - pd) / (vw * 0.85), 0, 1)
      it.style.setProperty('--s', s.toFixed(3))
      var d = Math.abs(r.left - pd)
      if (d < best) { best = d; cur = i }
    })
    btns.forEach(function (b, i) { if (i === cur) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current') })
  }
  render()
  PF.watch(act, render)
  window.addEventListener('resize', render)
})()
