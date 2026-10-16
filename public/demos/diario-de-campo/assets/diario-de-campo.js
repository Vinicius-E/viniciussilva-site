// Diário de Campo: o folio da margem mostra o capítulo atual e carimba, uma vez, cada entrada ao passar por ela.
// No colofão o visitante assina o dia e copia o registro (o texto sai do que a página realmente carimbou).
(function () {
  var chapters = [].slice.call(document.querySelectorAll('.dc-ch'))
  var folio = document.querySelector('.dc-folio')
  if (!chapters.length || !folio) return
  var title = folio.querySelector('[data-k="cap"]')
  var list = folio.querySelector('ol')
  var tag = PF.lang === 'pt' ? 'pt-BR' : PF.lang === 'es' ? 'es-AR' : 'en-US'
  var stamped = {}
  var logText = []
  var logBox = document.querySelector('.dc-log')

  function stamp(ch) {
    var key = ch.getAttribute('data-ch')
    var txt = ch.getAttribute('data-stamp')
    if (!txt || stamped[key]) return
    stamped[key] = true
    var d = new Date()
    var when = d.toLocaleDateString(tag, { day: '2-digit', month: 'short' }) + ' ' + d.toLocaleTimeString(tag, { hour: '2-digit', minute: '2-digit' })
    var li = document.createElement('li')
    var t = document.createElement('time'); t.textContent = when
    li.appendChild(t); li.appendChild(document.createTextNode(txt))
    list.appendChild(li)
    logText.push(when + ' · ' + txt)
    if (logBox) {
      var empty = logBox.querySelector('.empty'); if (empty) empty.remove()
      var l2 = document.createElement('li'); l2.textContent = when + ' · ' + txt; logBox.appendChild(l2)
    }
  }

  if (typeof IntersectionObserver !== 'undefined') {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return
        var ch = e.target
        title.textContent = ch.getAttribute('data-cap') || ''
        folio.setAttribute('data-tone', ch.getAttribute('data-tone') || 'light')
        folio.setAttribute('data-hidden', ch.getAttribute('data-ch') === '0' ? '1' : '0')
        stamp(ch)
      })
    }, { rootMargin: '-50% 0px -49% 0px', threshold: 0 })
    chapters.forEach(function (c) { io.observe(c) })
  }

  // assinatura e cópia
  var form = document.querySelector('.dc-sign')
  if (!form) return
  var input = form.querySelector('input'), sign = form.querySelector('button[type="submit"]'), copy = form.querySelector('button.ghost'), msg = form.querySelector('.dc-msg')
  var M = JSON.parse(form.getAttribute('data-msg'))
  var signed = false
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    var name = input.value.trim()
    if (!name || signed) { if (!name) { msg.textContent = M.need; input.focus() } return }
    // o colofão conta como entrada: se o visitante pulou direto para cá, os capítulos anteriores ainda não foram carimbados
    chapters.forEach(function (c) { stamp(c) })
    var d = new Date()
    var line = d.toLocaleDateString(tag, { day: '2-digit', month: 'short' }) + ' ' + d.toLocaleTimeString(tag, { hour: '2-digit', minute: '2-digit' }) + ' · ' + M.signed.replace('{x}', name)
    logText.push(line)
    var li = document.createElement('li'); li.textContent = line; logBox.appendChild(li)
    signed = true; sign.disabled = true; input.disabled = true; copy.disabled = false
    msg.textContent = M.done
  })
  copy.disabled = true
  copy.addEventListener('click', function () {
    var text = M.head + '\n' + logText.join('\n')
    var ok = function () { msg.textContent = M.copied }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, function () { msg.textContent = M.manual })
    else msg.textContent = M.manual
  })
})()
