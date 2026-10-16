// Carreira Solo: cada palavra entra por um corte de fundo (clip-path) dirigido pelo progresso do ato; a última camada é o fechamento.
(function () {
  var act = document.querySelector('.cs')
  if (!act || !window.PF) return
  var layers = [].slice.call(act.querySelectorAll('.cs-layer'))
  var mark = act.querySelector('.cs-mark')
  // início de cada corte (a primeira camada está sempre inteira)
  var START = [0, 0.12, 0.30, 0.48, 0.68]
  var DUR = 0.07
  var ease = function (t) { return 1 - Math.pow(1 - t, 3) }
  var inert = function (el, on) { if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert') }

  function render(p) {
    var top = 0
    layers.forEach(function (el, i) {
      var f = i === 0 ? 1 : ease(PF.win(p, START[i], START[i] + DUR))
      el.style.setProperty('--f', f.toFixed(3))
      if (f > 0.5) top = i
    })
    layers.forEach(function (el, i) { inert(el, i !== top) })
    // a marca e o idioma ficam legíveis sobre o fundo que está na frente
    mark.classList.toggle('cs-ground-l', top === 1 || top === 4)
    mark.style.color = top === 1 || top === 4 ? '#1b2013' : '#f1eee3'
  }
  // ajuste exato: cada palavra ocupa a largura útil do quadro (a largura das letras varia, então a fórmula do CSS é só o ponto de partida)
  var stage = act.querySelector('.cs-stage')
  function fit() {
    var cs = getComputedStyle(stage)
    var pad = parseFloat(getComputedStyle(act.querySelector('.cs-word')).left) || 0
    var avail = stage.clientWidth - 2 * pad
    var maxH = stage.clientHeight * (stage.clientWidth < 760 ? 0.4 : 0.58)
    ;[].slice.call(act.querySelectorAll('.cs-word')).forEach(function (w) {
      var cur = parseFloat(getComputedStyle(w).fontSize)
      var wd = w.getBoundingClientRect().width
      if (wd > 0) w.style.fontSize = Math.min((avail / wd) * cur, maxH) + 'px'
    })
  }
  fit()
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit)
  window.addEventListener('resize', fit)
  render(0)
  PF.watch(act, render)
})()
