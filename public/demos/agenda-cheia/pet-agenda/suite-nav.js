// Barra de módulos da suíte (script clássico, sem inline, compatível com CSP script-src 'self').
// Mostra a suíte, os módulos irmãos e a volta à apresentação. O idioma segue a mesma regra do static-api.js.
(function () {
  var S = window.__SUITE, K = window.__KIT
  if (!S || !K) return
  var lang = K.defaultLang
  try {
    var q = new URLSearchParams(location.search).get('lang')
    var s = null
    try { s = localStorage.getItem('kit-lang') } catch (e) { s = null }
    var ok = function (l) { return l && S.langs[l] ? l : null }
    lang = ok(q) || ok(s) || K.defaultLang
  } catch (e) { lang = K.defaultLang }
  var L = S.langs[lang]
  var T = { pt: ['Módulos da suíte', 'Voltar à apresentação'], en: ['Suite modules', 'Back to the overview'], es: ['Módulos de la suite', 'Volver a la presentación'] }[lang]
  var el = function (tag, cls, txt) { var n = document.createElement(tag); if (cls) n.className = cls; if (txt) n.textContent = txt; return n }

  var bar = el('nav', 'suite-bar')
  bar.setAttribute('aria-label', T[0])
  var home = el('a', 'suite-home')
  home.href = L.home
  home.title = T[1]
  home.appendChild(el('span', 'suite-arrow', '←'))
  home.appendChild(el('b', '', S.name))
  bar.appendChild(home)
  var list = el('ul', 'suite-mods')
  L.modules.forEach(function (m) {
    var li = el('li')
    var a = el('a', 'suite-mod', m.name)
    a.href = '../' + m.slug + '/index.html?lang=' + lang + '#/entrar'
    if (m.slug === S.current) { a.setAttribute('aria-current', 'page'); a.href = '#/app' }
    li.appendChild(a)
    list.appendChild(li)
  })
  bar.appendChild(list)
  document.body.insertBefore(bar, document.getElementById('app'))
})()
