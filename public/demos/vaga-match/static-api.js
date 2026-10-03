// API de demonstração 100% no navegador (sem servidor): replica as rotas do kit/server.go sobre dados fictícios.
// Os dados ficam no localStorage do visitante; nada é enviado a lugar nenhum.
(function () {
  const K = window.__KIT
  const cfg = K.config
  const ns = 'kit:' + cfg.slug + ':'
  const store = {
    get(k) { try { return localStorage.getItem(ns + k) } catch { return null } },
    set(k, v) { try { localStorage.setItem(ns + k, v) } catch { /* modo privado: segue em memória */ } },
    del(k) { try { localStorage.removeItem(ns + k) } catch { /* idem */ } },
  }
  const mem = { recs: null, role: null }

  const day = (off) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + off); return d.toISOString().slice(0, 10) }
  function seedRecords() {
    return K.seed.map((r, i) => {
      const o = { ...r, id: 'seed-' + String(i + 1).padStart(3, '0') }
      for (const f of cfg.entity.fields) {
        if (f.type === 'date' && typeof o[f.key] === 'string' && /^[+-]\d+d$/.test(o[f.key])) o[f.key] = day(parseInt(o[f.key], 10))
      }
      return o
    })
  }
  function load() {
    if (mem.recs) return mem.recs
    try { const s = store.get('recs'); if (s) return (mem.recs = JSON.parse(s)) } catch { /* recomeça do seed */ }
    return (mem.recs = seedRecords())
  }
  const save = () => store.set('recs', JSON.stringify(mem.recs))
  const role = () => cfg.roles_full.find((r) => r.id === (mem.role || store.get('role')))

  const num = (v) => { if (typeof v === 'number') return v; const n = parseFloat(String(v)); return isNaN(n) ? null : n }
  const field = (k) => cfg.entity.fields.find((f) => f.key === k)
  const display = (f, v) => { if (v == null) return ''; const o = (f.options || []).find((x) => x.value === String(v)); return o ? o.label : String(v) }

  function validate(inp, partial) {
    const out = {}
    if (inp.id) out.id = inp.id
    for (const f of cfg.entity.fields) {
      let v = inp[f.key]
      if (typeof v === 'string') v = v.trim()
      if (v === undefined || v === null || v === '') { if (f.required && !partial) throw http(422, f.label + ' é obrigatório'); continue }
      if (f.type === 'text' || f.type === 'longtext') {
        const max = f.max || (f.type === 'longtext' ? 2000 : 200)
        if (typeof v !== 'string' || [...v].length > max) throw http(422, f.label + ' deve ter até ' + max + ' caracteres')
        out[f.key] = v
      } else if (f.type === 'number' || f.type === 'money') {
        const n = num(v)
        if (n === null || n < 0 || n > 1e12) throw http(422, f.label + ' deve ser um número válido')
        out[f.key] = n
      } else if (f.type === 'date') {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(v)) || isNaN(Date.parse(v))) throw http(422, f.label + ' deve ser uma data válida')
        out[f.key] = String(v)
      } else if (f.type === 'select' || f.type === 'status') {
        if (!(f.options || []).some((o) => o.value === v)) throw http(422, f.label + ' tem uma opção inválida')
        out[f.key] = v
      }
    }
    return out
  }
  function http(status, error) { const e = new Error(error); e.status = status; return e }

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

  function list(q) {
    let rows = load().filter((r) => {
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

  function analyze(body) {
    let rec
    if (body.id) { rec = load().find((r) => r.id === body.id); if (!rec) throw http(404, 'Registro não encontrado.') } else rec = validate(body, true)
    const st = cfg.entity.fields.find((f) => f.type === 'status')
    const sv = (st.options || []).find((o) => o.value === rec[st.key])
    const lines = cfg.entity.fields.filter((f) => rec[f.key] !== undefined).map((f) => '• ' + f.label + ': ' + display(f, rec[f.key]))
    const tone = sv ? sv.tone : ''
    const next = tone === 'bad' ? 'Prioridade alta: trate este item primeiro e registre a decisão e o responsável.' : tone === 'warn' ? 'Atenção: acompanhe de perto e defina um prazo para resolver.' : 'Sem pendência: mantenha o acompanhamento de rotina.'
    return { result: '[Demonstração — análise por regras locais; em produção, um modelo de IA lê o registro e escreve o parecer]\n\nSituação atual: ' + (sv ? sv.label : '—') + '.\n' + next + '\n\nDados considerados:\n' + lines.join('\n') }
  }

  const route = async (method, path, body) => {
    const [p, qs] = path.split('?'); const q = new URLSearchParams(qs || '')
    if (p === 'config') return cfg.public
    if (p === 'login' && method === 'POST') {
      let r
      if (body.role) r = cfg.roles_full.find((x) => x.id === body.role)
      else r = cfg.roles_full.find((x) => x.email.toLowerCase() === String(body.email || '').trim().toLowerCase() && body.password === 'demo')
      if (!r) throw http(401, 'E-mail ou senha incorretos. No modo demonstração a senha é demo.')
      mem.role = r.id; store.set('role', r.id)
      return { role: r.id, label: r.label, user: r.user, email: r.email, can: r.can }
    }
    if (p === 'logout') { mem.role = null; store.del('role'); return { ok: true } }
    const me = role()
    if (!me) throw http(401, 'Sessão expirada. Entre novamente.')
    const need = (perm) => { if (!me.can.includes(perm)) throw http(403, 'Seu perfil (' + me.label + ') não tem permissão para esta ação.') }
    if (p === 'me') return { role: me.id, label: me.label, user: me.user, email: me.email, can: me.can }
    if (p === 'summary') return summarize(load())
    if (p === 'records' && method === 'GET') return list(q)
    if (p === 'records' && method === 'POST') {
      need('create'); const rec = validate(body, false)
      rec.id = 'n' + Date.now().toString(36) + Math.floor(Math.random() * 1000); load().push(rec); save(); return rec
    }
    const m = p.match(/^records\/(.+)$/)
    if (m) {
      const id = decodeURIComponent(m[1]); const recs = load(); const i = recs.findIndex((r) => r.id === id)
      if (i < 0) throw http(404, 'Registro não encontrado.')
      if (method === 'GET') return recs[i]
      if (method === 'PUT') { need('edit'); const patch = validate(body, true); for (const [k, v] of Object.entries(patch)) if (k !== 'id') recs[i][k] = v; save(); return recs[i] }
      if (method === 'DELETE') { need('delete'); recs.splice(i, 1); save(); return { ok: true } }
    }
    if (p === 'ai/analyze') { need('ai'); return analyze(body) }
    if (p === 'demo/reset') { need('reset'); mem.recs = seedRecords(); save(); return { ok: true } }
    throw http(404, 'Recurso não disponível nesta demonstração estática.')
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
