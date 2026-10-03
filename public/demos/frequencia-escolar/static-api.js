// API de demonstração 100% no navegador (sem servidor): replica as rotas do kit/server.go (+ multi-tenant e idiomas)
// sobre dados fictícios. Os dados ficam no localStorage do visitante, separados por tenant e idioma; nada sai do navegador.
(function () {
  const K = window.__KIT
  const slug = K.slug
  const ok = (l) => (K.langs.includes(l) ? l : null)
  function pickLang() {
    let l = null
    try { l = ok(new URLSearchParams(location.search).get('lang')) } catch { /* sem URL */ }
    try { l = l || ok(localStorage.getItem('kit-lang')) } catch { /* sem storage */ }
    return l || K.defaultLang
  }
  const lang = pickLang()
  const cfg = K.configs[lang]
  const base = 'kit:' + slug + ':'
  const store = {
    get(k) { try { return localStorage.getItem(base + k) } catch { return null } },
    set(k, v) { try { localStorage.setItem(base + k, v) } catch { /* modo privado: segue em memória */ } },
    del(k) { try { localStorage.removeItem(base + k) } catch { /* idem */ } },
  }
  const mem = { recs: {}, session: null }

  const tenants = cfg.tenants || []
  const tenantIdx = (id) => Math.max(0, tenants.findIndex((t) => t.id === id))
  const num = (v) => { if (typeof v === 'number') return v; const n = parseFloat(String(v)); return isNaN(n) ? null : n }
  const field = (k) => cfg.entity.fields.find((f) => f.key === k)
  const display = (f, v) => { if (v == null) return ''; const o = (f.options || []).find((x) => x.value === String(v)); return o ? o.label : String(v) }
  const http = (status, error) => { const e = new Error(error); e.status = status; return e }

  const day = (off) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + off); return d.toISOString().slice(0, 10) }
  function baseSeed() {
    return K.seeds[lang].map((r, i) => {
      const o = { ...r, id: 'seed-' + String(i + 1).padStart(3, '0') }
      for (const f of cfg.entity.fields) {
        if (f.type === 'date' && typeof o[f.key] === 'string' && /^[+-]\d+d$/.test(o[f.key])) o[f.key] = day(parseInt(o[f.key], 10))
      }
      return o
    })
  }
  // mesmo algoritmo de kit/tenant.go (VariantSeed): clientes diferentes enxergam números diferentes
  function seedFor(tenant) {
    const seed = baseSeed()
    const idx = tenantIdx(tenant)
    if (idx <= 0) return seed
    let n = seed.length - idx
    if (n < 3) n = seed.length
    const out = []
    for (let i = seed.length - 1; i >= seed.length - n; i--) {
      const r = { ...seed[i] }
      for (const f of cfg.entity.fields) {
        if (f.type !== 'money' && f.type !== 'number') continue
        const v = num(r[f.key]); if (v === null) continue
        const k = 1 + 0.17 * idx
        r[f.key] = f.type === 'money' ? Math.round((v * k) / 10) * 10 : Math.round(v * k)
      }
      r.id = 'seed-' + String(out.length + 1).padStart(3, '0')
      out.push(r)
    }
    return out
  }
  const ns = (tenant) => (tenant || '_') + ':' + lang + ':recs'
  function load(tenant) {
    const key = ns(tenant)
    if (mem.recs[key]) return mem.recs[key]
    try { const s = store.get(key); if (s) return (mem.recs[key] = JSON.parse(s)) } catch { /* recomeça do seed */ }
    return (mem.recs[key] = seedFor(tenant))
  }
  const save = (tenant) => store.set(ns(tenant), JSON.stringify(mem.recs[ns(tenant)]))
  function session() {
    if (mem.session) return mem.session
    try { const s = JSON.parse(store.get('session') || 'null'); if (s && cfg.roles_full.some((r) => r.id === s.role)) return (mem.session = s) } catch { /* sem sessão */ }
    return null
  }

  function validate(inp, partial) {
    const out = {}
    if (inp.id) out.id = inp.id
    for (const f of cfg.entity.fields) {
      let v = inp[f.key]
      if (typeof v === 'string') v = v.trim()
      if (v === undefined || v === null || v === '') { if (f.required && !partial) throw http(422, f.label + (lang === 'pt' ? ' é obrigatório' : lang === 'es' ? ' es obligatorio' : ' is required')); continue }
      if (f.type === 'text' || f.type === 'longtext') {
        const max = f.max || (f.type === 'longtext' ? 2000 : 200)
        if (typeof v !== 'string' || [...v].length > max) throw http(422, f.label + ' ≤ ' + max)
        out[f.key] = v
      } else if (f.type === 'number' || f.type === 'money') {
        const n = num(v)
        if (n === null || n < 0 || n > 1e12) throw http(422, f.label + ': número inválido / invalid number')
        out[f.key] = n
      } else if (f.type === 'date') {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(v)) || isNaN(Date.parse(v))) throw http(422, f.label + ': data inválida / invalid date')
        out[f.key] = String(v)
      } else if (f.type === 'select' || f.type === 'status') {
        if (!(f.options || []).some((o) => o.value === v)) throw http(422, f.label + ': opção inválida / invalid option')
        out[f.key] = v
      }
    }
    return out
  }

  function summarize(recs) {
    const kpis = cfg.kpis.map((k) => {
      let sum = 0, n = 0
      for (const r of recs) {
        if (k.where && Object.entries(k.where).some(([a, b]) => String(r[a]) !== b)) continue
        n++
        const v = num(r[k.field]); if (v !== null) sum += v
      }
      const value = k.metric === 'sum' ? sum : k.metric === 'avg' ? (n ? sum / n : 0) : n
      return { label: k.label, value, format: k.format, hint: k.hint, tone: k.tone }
    })
    const ch = cfg.chart
    const f = field(ch.groupBy)
    const tot = {}
    for (const r of recs) tot[String(r[ch.groupBy])] = (tot[String(r[ch.groupBy])] || 0) + (ch.metric === 'count' ? 1 : num(r[ch.valueField]) || 0)
    const chart = (f.options || []).map((o) => ({ label: o.label, value: tot[o.value] || 0 })).sort((a, b) => b.value - a.value)
    return { kpis, chart }
  }

  function list(recs, q) {
    let rows = recs.filter((r) => {
      for (const f of cfg.entity.fields) if ((f.type === 'status' || f.type === 'select') && q.get(f.key) && String(r[f.key]) !== q.get(f.key)) return false
      const needle = (q.get('q') || '').trim().toLowerCase()
      return !needle || cfg.entity.fields.some((f) => display(f, r[f.key]).toLowerCase().includes(needle))
    })
    let sortKey = q.get('sort'); let desc = q.get('dir') === 'desc'
    if (!field(sortKey || '')) { sortKey = ''; const d = cfg.entity.fields.find((f) => f.type === 'date'); if (d) { sortKey = d.key; desc = true } }
    const sf = field(sortKey)
    if (sf) {
      rows = rows.slice().sort((a, b) => {
        let c
        if (sf.type === 'number' || sf.type === 'money') c = (num(a[sortKey]) || 0) - (num(b[sortKey]) || 0)
        else c = display(sf, a[sortKey]).toLowerCase().localeCompare(display(sf, b[sortKey]).toLowerCase())
        return desc ? -c : c
      })
    }
    let size = parseInt(q.get('size'), 10); if (!(size >= 1 && size <= 100)) size = 10
    const pages = Math.max(1, Math.ceil(rows.length / size))
    const page = Math.min(Math.max(1, parseInt(q.get('page'), 10) || 1), pages)
    return { items: rows.slice((page - 1) * size, page * size), total: rows.length, page, pages }
  }

  const AI_TXT = {
    pt: ['[Demonstração — análise por regras locais; em produção, um modelo de IA lê o registro e escreve o parecer]', 'Situação atual', 'Prioridade alta: trate este item primeiro e registre a decisão e o responsável.', 'Atenção: acompanhe de perto e defina um prazo para resolver.', 'Sem pendência: mantenha o acompanhamento de rotina.', 'Dados considerados'],
    en: ['[Demo — analysis by local rules; in production an AI model reads the record and writes the opinion]', 'Current status', 'High priority: handle this item first and record the decision and the owner.', 'Attention: follow it closely and set a deadline to resolve it.', 'No pending issue: keep the routine follow-up.', 'Data considered'],
    es: ['[Demostración — análisis por reglas locales; en producción un modelo de IA lee el registro y redacta el dictamen]', 'Estado actual', 'Prioridad alta: atiende este elemento primero y registra la decisión y el responsable.', 'Atención: haz un seguimiento cercano y define un plazo para resolverlo.', 'Sin pendientes: mantén el seguimiento de rutina.', 'Datos considerados'],
  }
  function analyze(recs, body) {
    let rec
    if (body.id) { rec = recs.find((r) => r.id === body.id); if (!rec) throw http(404, 'Not found') } else rec = validate(body, true)
    const st = cfg.entity.fields.find((f) => f.type === 'status')
    const sv = (st.options || []).find((o) => o.value === rec[st.key])
    const lines = cfg.entity.fields.filter((f) => rec[f.key] !== undefined).map((f) => '• ' + f.label + ': ' + display(f, rec[f.key]))
    const T = AI_TXT[lang]
    const tone = sv ? sv.tone : ''
    const next = tone === 'bad' ? T[2] : tone === 'warn' ? T[3] : T[4]
    return { result: T[0] + '\n\n' + T[1] + ': ' + (sv ? sv.label : '—') + '.\n' + next + '\n\n' + T[5] + ':\n' + lines.join('\n') }
  }

  const publicCfg = (s) => ({ ...cfg.public, langs: K.langs, tenants, tenant: s ? s.tenant : '', currency: cfg.currency || '' })
  const route = async (method, path, body) => {
    const [p, qs] = path.split('?'); const q = new URLSearchParams(qs || '')
    const s = session()
    if (p === 'config') return publicCfg(s)
    if (p === 'login' && method === 'POST') {
      let r
      if (body.role) r = cfg.roles_full.find((x) => x.id === body.role)
      else r = cfg.roles_full.find((x) => x.email.toLowerCase() === String(body.email || '').trim().toLowerCase() && body.password === 'demo')
      if (!r) throw http(401, lang === 'pt' ? 'E-mail ou senha incorretos. No modo demonstração a senha é demo.' : lang === 'es' ? 'Correo o contraseña incorrectos. En modo demostración la contraseña es demo.' : 'Wrong email or password. In demo mode the password is demo.')
      const tenant = tenants.length ? (body.tenant || tenants[0].id) : ''
      if (tenants.length && !tenants.some((t) => t.id === tenant)) throw http(400, 'Unknown tenant')
      mem.session = { role: r.id, tenant }; store.set('session', JSON.stringify(mem.session))
      return { role: r.id, label: r.label, user: r.user, email: r.email, can: r.can, tenant }
    }
    if (p === 'logout') { mem.session = null; store.del('session'); return { ok: true } }
    const me = s && cfg.roles_full.find((r) => r.id === s.role)
    if (!me) throw http(401, lang === 'pt' ? 'Sessão expirada. Entre novamente.' : lang === 'es' ? 'Sesión expirada. Entra de nuevo.' : 'Session expired. Sign in again.')
    const need = (perm) => { if (!me.can.includes(perm)) throw http(403, me.label + ': 403') }
    const tn = s.tenant
    if (p === 'me') return { role: me.id, label: me.label, user: me.user, email: me.email, can: me.can, tenant: tn }
    const recs = load(tn)
    if (p === 'summary') return summarize(recs)
    if (p === 'records' && method === 'GET') return list(recs, q)
    if (p === 'records' && method === 'POST') {
      need('create'); const rec = validate(body, false)
      rec.id = 'n' + Date.now().toString(36) + Math.floor(Math.random() * 1000); recs.push(rec); save(tn); return rec
    }
    const m = p.match(/^records\/(.+)$/)
    if (m) {
      const id = decodeURIComponent(m[1]); const i = recs.findIndex((r) => r.id === id)
      if (i < 0) throw http(404, 'Not found')
      if (method === 'GET') return recs[i]
      if (method === 'PUT') { need('edit'); const patch = validate(body, true); for (const [k, v] of Object.entries(patch)) if (k !== 'id') recs[i][k] = v; save(tn); return recs[i] }
      if (method === 'DELETE') { need('delete'); recs.splice(i, 1); save(tn); return { ok: true } }
    }
    if (p === 'ai/analyze') { need('ai'); return analyze(recs, body) }
    if (p === 'demo/reset') { need('reset'); mem.recs[ns(tn)] = seedFor(tn); save(tn); return { ok: true } }
    throw http(404, 'Not available in this static demo')
  }

  const realFetch = window.fetch.bind(window)
  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input.url
    if (!/^(\.\/)?api\//.test(url)) return realFetch(input, init)
    const method = ((init && init.method) || 'GET').toUpperCase()
    let body = {}
    try { body = init && init.body ? JSON.parse(init.body) : {} } catch { body = {} }
    const path = url.replace(/^(\.\/)?api\//, '')
    const reply = (status, data) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
    try { return reply(200, await route(method, path, body)) } catch (e) { return reply(e.status || 500, { error: e.message }) }
  }
})()
