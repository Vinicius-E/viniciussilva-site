// TI Sob Controle: a rolagem avança uma revisão de verdade (linhas dos 4 módulos, totais na barra de status), o controle
// deslizante mostra e aceita arrastar o progresso, e o fim é uma linha de comando que funciona.
(function () {
  var act = document.querySelector('.ti')
  if (!act || !window.PF) return
  var W = PF.win
  var mods = [].slice.call(act.querySelectorAll('.ti-pane')) // 4 painéis, na ordem dos módulos
  var navBtns = [].slice.call(act.querySelectorAll('.ti-side button'))
  var term = act.querySelector('.ti-term')
  var range = act.querySelector('.ti-play input')
  var rOut = act.querySelector('.ti-play output')
  var sSav = act.querySelector('[data-k="sav"] b')
  var sRev = act.querySelector('[data-k="rev"] b')
  var sMin = act.querySelector('[data-k="min"] b')
  var WIN = [[-0.08, 0.28], [0.28, 0.5], [0.5, 0.72], [0.72, 0.88]] // a primeira janela começa antes de 0: a superfície já nasce em andamento
  var TERM_AT = 0.88
  var user = false
  var inert = function (el, on) { if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert') }

  function render(p) {
    var active = p >= TERM_AT ? 4 : p < WIN[1][0] ? 0 : p < WIN[2][0] ? 1 : p < WIN[3][0] ? 2 : 3
    var sav = 0, rev = 0, min = 0
    mods.forEach(function (pane, i) {
      var on = i === active
      pane.setAttribute('data-on', on ? '1' : '0')
      inert(pane, !on)
      var rows = [].slice.call(pane.querySelectorAll('tbody tr'))
      var a = WIN[i][0], b = WIN[i][1], len = b - a
      rows.forEach(function (tr, j) {
        var s = a + (j / rows.length) * len * 0.85
        var r = W(p, s, s + len * 0.12)
        tr.style.setProperty('--r', r.toFixed(3))
        var bar = tr.querySelector('.ti-bar i'); if (bar) bar.style.setProperty('--w', (r * (parseFloat(bar.getAttribute('data-v')) || 0)).toFixed(3))
        var f = pane.querySelector('.ti-finds li[data-row="' + j + '"]')
        if (f) f.style.setProperty('--r', r.toFixed(3))
        if (r >= 1) {
          sav += parseFloat(tr.getAttribute('data-save')) || 0
          if (tr.getAttribute('data-st') === 'revogar') rev++
          min += parseFloat(tr.getAttribute('data-min')) || 0
        }
      })
    })
    if (sSav) sSav.textContent = PF.brl(sav)
    if (sRev) sRev.textContent = String(rev)
    if (sMin) sMin.textContent = String(min)
    var t = W(p, TERM_AT + 0.005, TERM_AT + 0.045) // o terminal só aparece depois que o último painel saiu
    term.style.setProperty('--term', t.toFixed(3))
    term.classList.toggle('on', t > 0.5)
    inert(term, t < 0.5)
    navBtns.forEach(function (b, i) {
      if (i === active) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current')
      if (i < 4) b.style.setProperty('--done', p >= WIN[i][1] ? '1' : '0')
    })
    if (!user && range) { range.value = (p * 100).toFixed(1); rOut.textContent = Math.round(p * 100) + '%' }
  }

  function scrollToP(p) {
    var top = act.getBoundingClientRect().top + window.scrollY
    var total = act.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + p * total, behavior: PF.reduce ? 'auto' : 'smooth' })
  }
  if (range) {
    range.addEventListener('input', function () { user = true; var v = parseFloat(range.value) / 100; rOut.textContent = Math.round(v * 100) + '%'; window.scrollTo({ top: act.getBoundingClientRect().top + window.scrollY + v * (act.offsetHeight - window.innerHeight), behavior: 'auto' }) })
    var release = function () { user = false }
    range.addEventListener('change', release); range.addEventListener('blur', release)
    range.addEventListener('pointerup', release)
  }
  navBtns.forEach(function (b, i) {
    b.addEventListener('click', function () { scrollToP(i < 4 ? (WIN[i][0] + WIN[i][1]) / 2 + 0.1 * (WIN[i][1] - WIN[i][0]) : 0.97) })
  })

  // linha de comando
  var form = act.querySelector('.ti-cmd')
  var input = form && form.querySelector('input')
  var log = act.querySelector('.ti-log')
  var cfg = form ? JSON.parse(form.getAttribute('data-cmds')) : null
  function say(txt, cls, href) {
    var li = document.createElement('li')
    if (cls) li.className = cls
    if (href) { var a = document.createElement('a'); a.href = href; a.textContent = txt; li.appendChild(a) } else li.textContent = txt
    log.appendChild(li)
    log.scrollTop = log.scrollHeight
  }
  function run(raw) {
    var q = raw.trim().toLowerCase().replace(/^(abrir|open|abre)\s+/, '')
    if (!q) return
    say(raw.trim(), 'in')
    if (['ajuda', 'help', '?', 'ayuda'].indexOf(q) >= 0) { cfg.helpLines.forEach(function (l) { say(l) }); return }
    if (['planos', 'plans', 'planes'].indexOf(q) >= 0) { cfg.planLines.forEach(function (l) { say(l, 'hi') }); return }
    if (['limpar', 'clear', 'limpiar'].indexOf(q) >= 0) { log.textContent = ''; return }
    var hit = null
    cfg.modules.forEach(function (m) { if (m.words.indexOf(q) >= 0) hit = m })
    if (hit) { say(cfg.opening.replace('{x}', hit.name), 'hi', hit.href); setTimeout(function () { location.href = hit.href }, 450); return }
    say(cfg.unknown.replace('{x}', raw.trim()))
  }
  if (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); run(input.value); input.value = '' })
    ;[].slice.call(act.querySelectorAll('.ti-chips button')).forEach(function (b) { b.addEventListener('click', function () { run(b.getAttribute('data-run')) }) })
  }

  render(0)
  PF.watch(act, render)
})()
