// Torre de Controle — tela interativa. Duas fontes de dados com a MESMA interface: Remote (API com token de leitura) e Demo (simulação no navegador).
// Sem dependências; nada de HTML montado por string com dados (só textContent/createElement) e nenhum estilo inline: compatível com CSP estrita.
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  // ───────── idiomas ─────────
  const D = {
    en: { skip: 'Skip to content', title: 'Control Tower', live: 'LIVE', tenant: 'Tenant', window: 'Window', theme: 'Toggle theme', signout: 'Sign out', map: 'Constellation of projects', st_ok: 'healthy', st_warn: 'warning', st_error: 'failing', st_silent: 'silent', maphint: 'Each dot is a project. Lines join projects that appear in the same trace (one operation crossing systems). Click a dot to filter.', projtable: 'Projects as a table', c_project: 'Project', c_status: 'Status', c_signals: 'Signals', c_errors: 'Errors', c_warns: 'Warnings', c_traces: 'Cross-project traces', c_last: 'Last signal', feed: 'Live signals', search: 'Search', searchph: 'Search message, code or project', allproj: 'All projects', level: 'Level', alllevels: 'All levels', kind: 'Kind', allkinds: 'All kinds', activity: 'Activity per minute', tl_alt: 'Signals per minute, stacked by level', topcodes: 'Top issues', sizes: 'Size and storage', devops: 'DevOps', detail: 'Signal detail', close: 'Close', signin: 'Sign in with a read token', signinhint: 'Paste the read token of a tenant (or the admin token). It stays only in this browser tab.', token: 'Read token', enter: 'Enter', demo: 'Explore the demo (simulated, in your browser)', bad_token: 'Invalid token.', no_data: 'No data in this window.', signals: 'signals', ago: 'ago', filter: 'Filter', journey: 'Journey of this operation across projects', envelope: 'Envelope', total_db: 'Database storage (sum)', total_img: 'Image size (sum)', max_disk: 'Highest disk usage', disk_top: 'Disk usage by project', deploys: 'Deploys in 7 days (sum)', build_avg: 'Average build time', build_max: 'Slowest build', demo_note: 'Demo mode: simulated, fictional data.', unit_now: 'now' },
    pt: { skip: 'Pular para o conteúdo', title: 'Torre de Controle', live: 'AO VIVO', tenant: 'Cliente', window: 'Janela', theme: 'Alternar tema', signout: 'Sair', map: 'Constelação de projetos', st_ok: 'saudável', st_warn: 'atenção', st_error: 'falhando', st_silent: 'em silêncio', maphint: 'Cada ponto é um projeto. As linhas ligam projetos que aparecem no mesmo trace (uma operação atravessando sistemas). Clique em um ponto para filtrar.', projtable: 'Projetos em tabela', c_project: 'Projeto', c_status: 'Situação', c_signals: 'Sinais', c_errors: 'Erros', c_warns: 'Avisos', c_traces: 'Traces entre projetos', c_last: 'Último sinal', feed: 'Sinais ao vivo', search: 'Buscar', searchph: 'Buscar mensagem, código ou projeto', allproj: 'Todos os projetos', level: 'Nível', alllevels: 'Todos os níveis', kind: 'Tipo', allkinds: 'Todos os tipos', activity: 'Atividade por minuto', tl_alt: 'Sinais por minuto, empilhados por nível', topcodes: 'Principais problemas', sizes: 'Tamanho e armazenamento', devops: 'DevOps', detail: 'Detalhe do sinal', close: 'Fechar', signin: 'Entrar com um token de leitura', signinhint: 'Cole o token de leitura de um cliente (ou o token de admin). Ele fica só nesta aba do navegador.', token: 'Token de leitura', enter: 'Entrar', demo: 'Explorar a demonstração (simulada, no seu navegador)', bad_token: 'Token inválido.', no_data: 'Sem dados nesta janela.', signals: 'sinais', ago: 'atrás', filter: 'Filtrar', journey: 'Jornada desta operação entre os projetos', envelope: 'Envelope', total_db: 'Armazenamento de bancos (soma)', total_img: 'Tamanho das imagens (soma)', max_disk: 'Maior uso de disco', disk_top: 'Uso de disco por projeto', deploys: 'Deploys em 7 dias (soma)', build_avg: 'Tempo médio de build', build_max: 'Build mais lento', demo_note: 'Modo demonstração: dados simulados e fictícios.', unit_now: 'agora' },
    es: { skip: 'Saltar al contenido', title: 'Torre de Control', live: 'EN VIVO', tenant: 'Cliente', window: 'Ventana', theme: 'Cambiar tema', signout: 'Salir', map: 'Constelación de proyectos', st_ok: 'saludable', st_warn: 'atención', st_error: 'fallando', st_silent: 'en silencio', maphint: 'Cada punto es un proyecto. Las líneas unen proyectos que aparecen en el mismo trace (una operación que cruza sistemas). Haz clic en un punto para filtrar.', projtable: 'Proyectos en tabla', c_project: 'Proyecto', c_status: 'Estado', c_signals: 'Señales', c_errors: 'Errores', c_warns: 'Avisos', c_traces: 'Traces entre proyectos', c_last: 'Última señal', feed: 'Señales en vivo', search: 'Buscar', searchph: 'Buscar mensaje, código o proyecto', allproj: 'Todos los proyectos', level: 'Nivel', alllevels: 'Todos los niveles', kind: 'Tipo', allkinds: 'Todos los tipos', activity: 'Actividad por minuto', tl_alt: 'Señales por minuto, apiladas por nivel', topcodes: 'Principales problemas', sizes: 'Tamaño y almacenamiento', devops: 'DevOps', detail: 'Detalle de la señal', close: 'Cerrar', signin: 'Entrar con un token de lectura', signinhint: 'Pega el token de lectura de un cliente (o el token de admin). Solo queda en esta pestaña del navegador.', token: 'Token de lectura', enter: 'Entrar', demo: 'Explorar la demo (simulada, en tu navegador)', bad_token: 'Token inválido.', no_data: 'Sin datos en esta ventana.', signals: 'señales', ago: 'atrás', filter: 'Filtrar', journey: 'Recorrido de esta operación entre proyectos', envelope: 'Sobre', total_db: 'Almacenamiento de bases (suma)', total_img: 'Tamaño de imágenes (suma)', max_disk: 'Mayor uso de disco', disk_top: 'Uso de disco por proyecto', deploys: 'Despliegues en 7 días (suma)', build_avg: 'Tiempo medio de build', build_max: 'Build más lento', demo_note: 'Modo demostración: datos simulados y ficticios.', unit_now: 'ahora' },
  };
  let lang = 'en';
  try { const q = new URLSearchParams(location.search).get('lang'); const s = localStorage.getItem('tower-lang'); lang = D[q] ? q : D[s] ? s : (navigator.language || 'en').slice(0, 2) in D ? (navigator.language || 'en').slice(0, 2) : 'en'; } catch { /* storage bloqueado */ }
  const t = (k) => (D[lang] && D[lang][k]) || D.en[k] || k;
  function applyLang() {
    document.documentElement.lang = lang;
    for (const n of document.querySelectorAll('[data-i18n]')) n.textContent = t(n.dataset.i18n);
    for (const n of document.querySelectorAll('[data-i18n-ph]')) n.placeholder = t(n.dataset.i18nPh);
    for (const n of document.querySelectorAll('[data-i18n-aria]')) n.setAttribute('aria-label', t(n.dataset.i18nAria));
    for (const b of document.querySelectorAll('[data-lang]')) b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    const fp = $('#fproj'); if (fp && fp.options[0]) fp.options[0].textContent = t('allproj');
  }

  // ───────── fontes de dados ─────────
  class Remote {
    constructor(token) { this.token = token; this.demo = false; }
    async get(path) {
      const r = await fetch(path, { headers: { Authorization: 'Bearer ' + this.token }, cache: 'no-store' });
      if (!r.ok) { const e = new Error('HTTP ' + r.status); e.status = r.status; throw e; }
      return r.json();
    }
    async tenants() { return (await this.get('/v1/tenants')).tenants; }
    async search(tenant, f) { const p = new URLSearchParams({ tenant, limit: String(f.limit || 80) }); for (const k of ['project', 'level', 'kind', 'trace', 'q']) if (f[k]) p.set(k, f[k]); return (await this.get('/v1/search?' + p)).signals; }
    overview(tenant, min) { return this.get('/v1/overview?tenant=' + tenant + '&minutes=' + min); }
    async timeline(tenant, min) { return (await this.get('/v1/timeline?tenant=' + tenant + '&minutes=' + Math.min(240, Math.max(15, min)))).buckets; }
    async metrics(tenant) { return (await this.get('/v1/metrics?tenant=' + tenant)).series; }
    step() {}
  }

  // simulação no navegador: mesma ideia do tower/sim.go (determinística, 28 projetos, operações encadeadas, rajadas de erro, métricas)
  const PROJECTS = ['estoque-certo', 'doca-livre', 'rota-fria', 'frete-justo', 'picking-express', 'devolve-ja', 'cotacao-rapida', 'incidente-zero', 'deploy-seguro', 'divida-tecnica', 'nuvem-enxuta', 'fatura-lupa', 'acesso-revisado', 'contrato-alerta', 'vaga-match', 'entrevista-pronta', 'freela-claro', 'temporada-limpa', 'pet-agenda', 'mesa-cheia', 'obra-diario', 'manutencao-os', 'garantia-facil', 'lote-rastro', 'frequencia-escolar', 'doacao-clara', 'evento-checklist', 'safra-controle'];
  const GROUPS = [7, 7, 3, 7, 4];
  const CHAINS = [
    [['estoque-certo', 'COUNT_RECORDED'], ['picking-express', 'WAVE_REPLANNED'], ['doca-livre', 'DOCK_SLOT_UPDATED'], ['frete-justo', 'FREIGHT_CHECKED']],
    [['devolve-ja', 'RETURN_RECEIVED'], ['estoque-certo', 'STOCK_ADJUSTED'], ['frete-justo', 'REVERSE_FREIGHT_BILLED']],
    [['deploy-seguro', 'CHANGE_APPROVED'], ['incidente-zero', 'INCIDENT_OPENED'], ['divida-tecnica', 'DEBT_REGISTERED']],
    [['nuvem-enxuta', 'IDLE_RESOURCE_FOUND'], ['fatura-lupa', 'SAVINGS_ESTIMATED'], ['contrato-alerta', 'RENEWAL_FLAGGED']],
    [['acesso-revisado', 'ORPHAN_ACCOUNT_FOUND'], ['incidente-zero', 'SECURITY_NOTICE_LOGGED']],
    [['vaga-match', 'ROLE_SCORED'], ['entrevista-pronta', 'PRACTICE_LOGGED'], ['freela-claro', 'INVOICE_DRAFTED']],
    [['obra-diario', 'SITE_LOG_ADDED'], ['manutencao-os', 'WORK_ORDER_OPENED'], ['garantia-facil', 'WARRANTY_CHECKED']],
    [['lote-rastro', 'BATCH_REGISTERED'], ['rota-fria', 'TRIP_ASSIGNED'], ['cotacao-rapida', 'QUOTE_REQUESTED']],
    [['frequencia-escolar', 'ABSENCE_ALERT'], ['evento-checklist', 'TASK_CREATED']],
    [['temporada-limpa', 'STAY_CREATED'], ['pet-agenda', 'SLOT_BOOKED'], ['mesa-cheia', 'BOOKING_CONFIRMED']],
    [['doacao-clara', 'DONATION_RECORDED'], ['safra-controle', 'ACTIVITY_FUNDED']],
  ];
  const ERRS = ['DB_TIMEOUT', 'UNHANDLED_EXCEPTION', 'QUEUE_BACKLOG', 'TEMP_EXCURSION', 'TARIFF_MISMATCH', 'ROLLBACK_TRIGGERED'];
  const rng = (a) => () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0; return h; };

  class Demo {
    constructor() { this.demo = true; this.r = rng(42); this.seq = 0; this.data = { alfa: [], beta: [] }; this.sick = {}; this.disk = {};
      const now = Date.now(); const start = Math.floor(now / 60000) * 60000 - 90 * 60000;
      for (let i = 0; i <= 90; i++) this.minute(start + i * 60000, 1, null); }
    id() { return 'dm' + (++this.seq).toString(36).padStart(8, '0') + Math.floor(this.r() * 1e4); }
    push(ten, ts, project, kind, level, code, msg, trace, data) { this.data[ten].push({ v: 1, id: this.id(), ts: new Date(ts).toISOString(), tenant: ten, project, env: 'prod', kind, level, code, msg, trace: trace || undefined, data: data || undefined }); }
    minute(m, keep, live) {
      for (const ten of ['alfa', 'beta']) {
        const sc = ten === 'beta' ? 0.6 : 1; const r = this.r;
        const T = (base) => live ? Date.now() : base + Math.floor(r() * 55000);
        const n = Math.round((1 + r() * 3) * sc);
        for (let i = 0; i < n; i++) { if (r() > keep) continue; const ch = CHAINS[Math.floor(r() * CHAINS.length)]; const trace = 'tr' + (m / 60000 % 10000 | 0) + Math.floor(r() * 10000); let ts = T(m); const broke = r() < 0.06;
          ch.forEach(([p, c], k) => { ts += 200 + Math.floor(r() * 1800); const bad = broke && k === ch.length - 1; this.push(ten, ts, p, 'log', bad ? 'error' : 'info', bad ? 'TRACE_STEP_FAILED' : c, bad ? 'operation chain failed' : 'chained operation step', trace, { step: k + 1, of: ch.length }); }); }
        for (const p of PROJECTS) {
          const key = ten + '|' + p;
          if (this.sick[key] > 0) { this.sick[key]--; if (r() <= keep) { for (let i = 0; i < 1 + Math.floor(r() * 3); i++) this.push(ten, T(m), p, 'log', 'error', ERRS[Math.floor(r() * ERRS.length)], 'failed to process request', '', { status: 500 }); this.push(ten, T(m), p, 'health', 'error', 'HEALTH_DEGRADED', 'health check failed'); } }
          else {
            if (r() < 0.5 * sc * keep) this.push(ten, T(m), p, 'log', 'info', 'REQUEST_OK', 'request served', '', { status: 200, ms: 20 + Math.floor(r() * 180) });
            if (r() < 0.04 * keep) this.push(ten, T(m), p, 'log', 'warn', 'SLOW_QUERY', 'slow query detected', '', { ms: 800 + Math.floor(r() * 1500) });
            if (r() < 0.004 * (live ? 6 : 1)) this.sick[key] = 3 + Math.floor(r() * 6);
            if (new Date(m).getMinutes() % 5 === 0 && r() <= keep) this.push(ten, T(m), p, 'health', 'info', 'HEALTH_OK', 'project healthy');
          }
          if (new Date(m).getMinutes() % 5 === hash(p) % 5 && r() <= Math.max(keep, 0.2)) {
            let d = this.disk[key] || (18 + hash(p) % 40); d += r() * 0.15; this.disk[key] = d;
            const mt = (name, unit, v) => this.push(ten, T(m), p, 'metric', 'info', 'METRIC_SAMPLE', name, '', { name, unit, value: Math.round(v * 100) / 100 });
            mt('storage.disk_pct', '%', Math.min(d, 97)); mt('storage.db_mb', 'MB', 120 + hash(p) % 900 + d * 3); mt('size.image_mb', 'MB', 38 + hash(p) % 160); mt('devops.build_seconds', 's', 40 + hash(p) % 90 + r() * 8); mt('devops.deploys_7d', '', 2 + hash(p) % 9);
          }
        }
      }
    }
    step() { this.minute(Math.floor(Date.now() / 60000) * 60000, 0.1, true); for (const k of Object.keys(this.data)) if (this.data[k].length > 20000) this.data[k].splice(0, this.data[k].length - 20000); }
    async tenants() { return [{ id: 'alfa', name: 'Customer Alfa' }, { id: 'beta', name: 'Customer Beta' }]; }
    async search(tenant, f) {
      const needle = (f.q || '').toLowerCase(); const out = [];
      const arr = this.data[tenant] || [];
      for (let i = arr.length - 1; i >= 0 && out.length < (f.limit || 80); i--) { const g = arr[i];
        if ((f.project && g.project !== f.project) || (f.level && g.level !== f.level) || (f.kind && g.kind !== f.kind) || (f.trace && g.trace !== f.trace)) continue;
        if (needle && !(g.msg + ' ' + g.code + ' ' + g.project).toLowerCase().includes(needle)) continue; out.push(g); }
      return out.sort((a, b) => (a.ts < b.ts ? 1 : -1));
    }
    async overview(tenant, min) {
      const now = Date.now(), from = now - min * 60000, last5 = now - 5 * 60000; const ps = {}, tp = {}, codes = {}, rec = {}; const levels = {};
      for (const g of this.data[tenant] || []) { const ts = Date.parse(g.ts); const p = ps[g.project] || (ps[g.project] = { project: g.project, total: 0, errors: 0, warns: 0, last: 0, traces: 0, last_error: '' });
        if (ts > p.last) p.last = ts; if (ts < from) continue; p.total++; levels[g.level] = (levels[g.level] || 0) + 1;
        if (g.level === 'error') { p.errors++; p.last_error = g.code; if (ts > last5) rec[g.project] = (rec[g.project] || 0) + 1; } else if (g.level === 'warn') p.warns++;
        if (g.level !== 'info') { const k = g.project + '|' + g.code + '|' + g.level; (codes[k] || (codes[k] = { code: g.code, level: g.level, project: g.project, count: 0 })).count++; }
        if (g.trace) (tp[g.trace] || (tp[g.trace] = new Set())).add(g.project); }
      const edges = {}; for (const s of Object.values(tp)) { if (s.size < 2) continue; const n = [...s].sort(); n.forEach((x) => ps[x].traces++); for (let i = 0; i < n.length; i++) for (let j = i + 1; j < n.length; j++) { const k = n[i] + '|' + n[j]; (edges[k] || (edges[k] = { a: n[i], b: n[j], count: 0 })).count++; } }
      const projects = Object.values(ps).map((p) => ({ project: p.project, total: p.total, errors: p.errors, warns: p.warns, traces: p.traces, last_error: p.last_error, last_seen: new Date(p.last).toISOString(),
        status: now - p.last > 30 * 60000 ? 'silent' : (rec[p.project] || 0) >= 3 || (p.errors > 0 && p.errors * 5 >= p.total) ? 'error' : p.errors || p.warns ? 'warn' : 'ok' }));
      return { projects: projects.sort((a, b) => (a.project < b.project ? -1 : 1)), edges: Object.values(edges).sort((a, b) => b.count - a.count).slice(0, 80), top_codes: Object.values(codes).sort((a, b) => b.count - a.count).slice(0, 12), levels };
    }
    async timeline(tenant, min) { min = Math.min(240, Math.max(15, min)); const end = Math.floor(Date.now() / 60000) * 60000; const start = end - (min - 1) * 60000; const b = Array.from({ length: min }, (_, i) => ({ t: new Date(start + i * 60000).toISOString(), info: 0, warn: 0, error: 0 }));
      for (const g of this.data[tenant] || []) { const i = Math.floor((Date.parse(g.ts) - start) / 60000); if (i >= 0 && i < min) b[i][g.level]++; } return b; }
    async metrics(tenant) { const m = {}; for (const g of this.data[tenant] || []) { if (g.kind !== 'metric') continue; const k = g.project + '|' + g.data.name; const s = m[k] || (m[k] = { project: g.project, name: g.data.name, unit: g.data.unit, points: [], last: 0 }); s.last = g.data.value; s.points.push(g.data.value); if (s.points.length > 40) s.points.shift(); } return Object.values(m); }
  }

  // ───────── estado e utilidades ─────────
  let src = null, tenant = '', win = 60, projFilter = '', timers = [], known = new Set(), lastOv = null, nodes = [], hover = null, pulses = [];
  const rel = (iso) => { const s = Math.max(0, (Date.now() - Date.parse(iso)) / 1000); return s < 60 ? Math.floor(s) + 's' : s < 3600 ? Math.floor(s / 60) + 'm' : Math.floor(s / 3600) + 'h'; };
  const cssv = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const num = (v, d = 0) => v.toLocaleString(lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US', { maximumFractionDigits: d });
  const stTxt = (s) => t('st_' + s);

  function schedule() {
    timers.forEach(clearInterval); timers = [];
    const every = (ms, f) => { f(); timers.push(setInterval(f, ms)); };
    every(3000, refreshFeed); every(4000, refreshOverview); every(10000, refreshTimeline); every(12000, refreshMetrics);
    if (src.demo) timers.push(setInterval(() => src.step(), 3000));
  }
  const guard = (f) => async () => { try { await f(); $('#live').classList.remove('off'); } catch (e) { if (e && (e.status === 401 || e.status === 403)) return logout(); $('#live').classList.add('off'); } };

  // ───────── desenhos ─────────
  const cv = $('#cv'), ctx = cv.getContext('2d');
  function layout(projects) {
    const W = cv.width, H = cv.height, cx = W / 2, cy = H / 2; const names = PROJECTS.slice(); for (const p of projects) if (!names.includes(p.project)) names.push(p.project);
    let idx = 0; const out = {}; const total = names.length; let gi = 0, acc = 0;
    names.forEach((n, i) => { while (gi < GROUPS.length && i >= acc + GROUPS[gi]) { acc += GROUPS[gi]; gi++; }
      const g = Math.min(gi, GROUPS.length - 1); const inG = i - acc; const size = GROUPS[g] || 1; const start = GROUPS.slice(0, g).reduce((a, b) => a + b, 0) / total * Math.PI * 2 - Math.PI / 2;
      const span = size / total * Math.PI * 2; const a = start + span * ((inG + 0.5) / size);
      const rad = Math.min(W, H) * (0.27 + (inG % 2) * 0.13); out[n] = { x: cx + Math.cos(a) * rad * 1.45, y: cy + Math.sin(a) * rad, g }; idx++; });
    return out;
  }
  function drawMap() {
    const W = cv.width, H = cv.height; ctx.clearRect(0, 0, W, H);
    if (!lastOv) return;
    const pos = layout(lastOv.projects); const col = { ok: cssv('--ok'), warn: cssv('--warn'), error: cssv('--err'), silent: cssv('--silent') };
    const cyan = cssv('--cy'); ctx.lineWidth = 1;
    for (const e of lastOv.edges) { const a = pos[e.a], b = pos[e.b]; if (!a || !b) continue; ctx.strokeStyle = cyan; ctx.globalAlpha = Math.min(0.55, 0.12 + e.count * 0.04); ctx.lineWidth = Math.min(3, 0.6 + e.count * 0.15); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(W / 2, H / 2, b.x, b.y); ctx.stroke(); }
    ctx.globalAlpha = 1; nodes = [];
    ctx.font = '11px system-ui, sans-serif'; ctx.textAlign = 'center';
    for (const p of lastOv.projects) { const q = pos[p.project]; if (!q) continue; const r = 6 + Math.min(14, Math.sqrt(p.total) * 0.9); nodes.push({ p, x: q.x, y: q.y, r });
      const c = col[p.status] || col.ok; const sel = projFilter === p.project;
      const g = ctx.createRadialGradient(q.x, q.y, 1, q.x, q.y, r * 2.6); g.addColorStop(0, c + '66'); g.addColorStop(1, c + '00'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x, q.y, r * 2.6, 0, 7); ctx.fill();
      ctx.fillStyle = c; ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, 7); ctx.fill();
      if (sel || (hover && hover.p.project === p.project)) { ctx.strokeStyle = cssv('--ink'); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(q.x, q.y, r + 4, 0, 7); ctx.stroke(); }
      ctx.fillStyle = cssv('--mut'); ctx.fillText(p.project.length > 16 ? p.project.slice(0, 15) + '…' : p.project, q.x, q.y + r + 13); }
    const now = performance.now(); pulses = pulses.filter((u) => now - u.t < 1100);
    for (const u of pulses) { const n = nodes.find((x) => x.p.project === u.project); if (!n) continue; const k = (now - u.t) / 1100; ctx.strokeStyle = u.c; ctx.globalAlpha = 1 - k; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(n.x, n.y, n.r + k * 26, 0, 7); ctx.stroke(); } ctx.globalAlpha = 1;
    if (hover) { const h = hover.p; const txt = h.project + ' · ' + stTxt(h.status) + ' · ' + h.total + ' ' + t('signals') + ' · ' + h.errors + ' err'; const w = ctx.measureText(txt).width + 16; const x = Math.min(W - w - 4, Math.max(4, hover.x - w / 2)); const y = hover.y - hover.r - 34 < 4 ? hover.y + hover.r + 24 : hover.y - hover.r - 34;
      ctx.fillStyle = cssv('--card'); ctx.strokeStyle = cssv('--cy'); ctx.lineWidth = 1; ctx.beginPath(); ctx.roundRect(x, y, w, 24, 8); ctx.fill(); ctx.stroke(); ctx.fillStyle = cssv('--ink'); ctx.textAlign = 'left'; ctx.fillText(txt, x + 8, y + 16); ctx.textAlign = 'center'; }
  }
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  (function loop() { if (pulses.length || hover) drawMap(); requestAnimationFrame(loop); })();
  const toCanvas = (e) => { const b = cv.getBoundingClientRect(); return { x: (e.clientX - b.left) * cv.width / b.width, y: (e.clientY - b.top) * cv.height / b.height }; };
  const hit = (e) => { const { x, y } = toCanvas(e); return nodes.find((n) => (n.x - x) ** 2 + (n.y - y) ** 2 <= (n.r + 6) ** 2) || null; };
  cv.addEventListener('mousemove', (e) => { const n = hit(e); if ((n && n.p.project) !== (hover && hover.p.project)) { hover = n; cv.style.cursor = n ? 'pointer' : 'default'; drawMap(); } });
  cv.addEventListener('mouseleave', () => { hover = null; drawMap(); });
  cv.addEventListener('click', (e) => { const n = hit(e); setProject(n && projFilter !== n.p.project ? n.p.project : ''); });

  function drawTimeline(b) {
    const c = $('#tl'), x = c.getContext('2d'), W = c.width, H = c.height; x.clearRect(0, 0, W, H);
    const max = Math.max(5, ...b.map((u) => u.info + u.warn + u.error)); const bw = W / b.length; const cols = [cssv('--cy'), cssv('--warn'), cssv('--err')];
    b.forEach((u, i) => { let y = H - 14; [['info', 0], ['warn', 1], ['error', 2]].forEach(([k, ci]) => { const h = (u[k] / max) * (H - 24); x.fillStyle = cols[ci]; x.fillRect(i * bw + 0.5, y - h, Math.max(1, bw - 1), h); y -= h; }); });
    x.fillStyle = cssv('--mut'); x.font = '11px system-ui'; x.fillText(String(max), 4, 12); x.fillText(t('unit_now'), W - 34, H - 2);
  }
  function spark(c, pts, color) {
    const x = c.getContext('2d'), W = c.width, H = c.height; x.clearRect(0, 0, W, H); if (pts.length < 2) return;
    const mn = Math.min(...pts), mx = Math.max(...pts); x.strokeStyle = color; x.lineWidth = 2; x.beginPath();
    pts.forEach((v, i) => { const px = (i / (pts.length - 1)) * (W - 4) + 2, py = H - 4 - ((v - mn) / Math.max(1e-9, mx - mn)) * (H - 8); i ? x.lineTo(px, py) : x.moveTo(px, py); }); x.stroke();
  }
  const metricCard = (name, value, extra, pts, color) => { const d = el('div', 'metric'); const n = el('div', 'n'); n.append(el('span', '', name), el('span', '', extra || '')); d.append(n, el('div', 'v', value)); if (pts && pts.length > 1) { const c = el('canvas'); c.width = 200; c.height = 34; c.setAttribute('aria-hidden', 'true'); d.append(c); spark(c, pts, color || cssv('--cy')); } return d; };

  // ───────── atualizações ─────────
  function badge(status) { const s = el('span', 'badge'); s.append(el('span', 'dot ' + status), document.createTextNode(stTxt(status))); return s; }
  function renderTable(ov) {
    const tb = $('#ptable tbody'); tb.replaceChildren();
    for (const p of ov.projects) { const tr = el('tr'); const b = el('button', '', p.project); b.type = 'button'; b.title = t('filter'); b.addEventListener('click', () => setProject(projFilter === p.project ? '' : p.project)); const td = el('td'); td.append(b); tr.append(td);
      const s = el('td'); s.append(badge(p.status)); tr.append(s, el('td', '', String(p.total)), el('td', '', String(p.errors)), el('td', '', String(p.warns)), el('td', '', String(p.traces)), el('td', '', p.last_seen ? rel(p.last_seen) + ' ' + t('ago') : '—')); tb.append(tr); }
  }
  function renderCodes(ov) {
    const ol = $('#codes'); ol.replaceChildren(); if (!ov.top_codes.length) { ol.append(el('li', 'empty', t('no_data'))); return; }
    const max = ov.top_codes[0].count;
    for (const c of ov.top_codes) { const li = el('li'); const top = el('div', 't'); top.append(el('span', '', c.code + ' · ' + c.project), el('span', '', String(c.count))); const bar = el('div', 'bar ' + (c.level === 'error' ? 'error' : 'warn')); const i = el('i'); i.style.width = Math.max(4, (c.count / max) * 100) + '%'; bar.append(i); li.append(top, bar); ol.append(li); }
  }
  async function refreshOverview() {
    const ov = await src.overview(tenant, win); lastOv = ov; renderTable(ov); renderCodes(ov); drawMap();
    const fp = $('#fproj'), cur = fp.value; const names = ov.projects.map((p) => p.project);
    if (fp.options.length - 1 !== names.length) { fp.replaceChildren(new Option(t('allproj'), '')); for (const n of names) fp.append(new Option(n, n)); fp.value = cur; }
  }
  function filters() { return { q: $('#q').value.trim(), project: $('#fproj').value, level: $('#flevel').value, kind: $('#fkind').value, limit: 80 }; }
  async function refreshFeed() {
    const sigs = await src.search(tenant, filters()); const ol = $('#list'); const fresh = [];
    ol.replaceChildren();
    for (const g of sigs) { const isNew = known.size && !known.has(g.id); if (isNew) fresh.push(g); const li = el('div', 'row-item' + (isNew ? ' new' : '')); li.tabIndex = 0; li.setAttribute('role', 'button');
      li.append(el('span', 'lv ' + g.level, g.level)); const m = el('div', 'm'); m.append(el('b', '', g.code), el('span', '', g.project + ' · ' + g.msg)); li.append(m, el('time', '', rel(g.ts)));
      const open = () => openDrawer(g); li.addEventListener('click', open); li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }); ol.append(li); }
    for (const g of sigs) known.add(g.id); if (known.size > 5000) known = new Set(sigs.map((g) => g.id));
    if (!reduce) for (const g of fresh.slice(0, 12)) pulses.push({ project: g.project, t: performance.now(), c: cssv(g.level === 'error' ? '--err' : g.level === 'warn' ? '--warn' : '--cy') });
    if (!sigs.length) ol.append(el('p', 'empty', t('no_data')));
    $('#count').textContent = sigs.length + ' ' + t('signals');
  }
  async function refreshTimeline() { drawTimeline(await src.timeline(tenant, win)); }
  async function refreshMetrics() {
    const ms = await src.metrics(tenant); const by = (n) => ms.filter((m) => m.name === n);
    const sz = $('#size'), dv = $('#devops'); sz.replaceChildren(); dv.replaceChildren();
    if (!ms.length) { sz.append(el('p', 'empty', t('no_data'))); return; }
    const sum = (arr) => arr.reduce((a, m) => a + m.last, 0);
    const disks = by('storage.disk_pct').sort((a, b) => b.last - a.last);
    sz.append(metricCard(t('total_db'), num(sum(by('storage.db_mb')) / 1024, 1) + ' GB'), metricCard(t('total_img'), num(sum(by('size.image_mb')) / 1024, 1) + ' GB'));
    if (disks[0]) sz.append(metricCard(t('max_disk'), num(disks[0].last, 1) + ' %', disks[0].project, disks[0].points, disks[0].last > 85 ? cssv('--err') : cssv('--cy')));
    const list = el('ol', 'bars'); list.setAttribute('aria-label', t('disk_top')); for (const d of disks.slice(0, 5)) { const li = el('li'); const top = el('div', 't'); top.append(el('span', '', d.project), el('span', '', num(d.last, 1) + ' %')); const bar = el('div', 'bar ' + (d.last > 85 ? 'error' : d.last > 70 ? 'warn' : 'ok')); const i = el('i'); i.style.width = Math.min(100, d.last) + '%'; bar.append(i); li.append(top, bar); list.append(li); } sz.append(list);
    const builds = by('devops.build_seconds'), dep = by('devops.deploys_7d');
    if (dep.length) dv.append(metricCard(t('deploys'), String(Math.round(sum(dep)))));
    if (builds.length) { const slow = builds.slice().sort((a, b) => b.last - a.last)[0]; dv.append(metricCard(t('build_avg'), num(sum(builds) / builds.length, 0) + ' s', '', slow.points), metricCard(t('build_max'), num(slow.last, 0) + ' s', slow.project, slow.points, cssv('--warn'))); }
  }

  // ───────── gaveta de detalhe ─────────
  async function openDrawer(g) {
    const d = $('#drawer'), body = $('#dbody'); body.replaceChildren(); d.hidden = false; $('#dclose').focus();
    const h = el('h3', '', g.code + ' — ' + g.project); body.append(h, el('p', 'muted', new Date(g.ts).toLocaleString() + ' · ' + g.kind + ' · ' + g.level + ' · ' + g.env));
    body.append(el('p', '', g.msg));
    if (g.trace) { try { const all = (await src.search(tenant, { trace: g.trace, limit: 50 })).sort((a, b) => (a.ts < b.ts ? -1 : 1)); if (all.length > 1) { body.append(el('h4', '', t('journey'))); const ol = el('ol', 'journey'); for (const s of all) { const li = el('li', s.level); li.textContent = s.project + ' — ' + s.code; ol.append(li); } body.append(ol); } } catch { /* sem jornada */ } }
    body.append(el('h4', '', t('envelope'))); body.append(el('pre', '', JSON.stringify(g, null, 2)));
  }
  $('#dclose').addEventListener('click', () => { $('#drawer').hidden = true; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('#drawer').hidden = true; });

  function setProject(p) { projFilter = p; $('#fproj').value = p; drawMap(); known = new Set(); refreshFeed(); }

  // ───────── entrada, tema, idioma ─────────
  async function start(source) {
    src = source; $('#login').hidden = true; $('#app').hidden = false;
    const ts = await src.tenants(); const sel = $('#tenant'); sel.replaceChildren(); for (const x of ts) sel.append(new Option(x.name + ' (' + x.id + ')', x.id)); tenant = ts[0].id; sel.value = tenant;
    if (src.demo) { const n = el('p', 'hint', t('demo_note')); n.id = 'demonote'; $('#main').prepend(n); n.style.gridColumn = '1 / -1'; }
    known = new Set(); lastOv = null; schedule();
  }
  function logout() { timers.forEach(clearInterval); timers = []; try { sessionStorage.removeItem('tower-token'); } catch { /* ok */ } $('#app').hidden = true; $('#login').hidden = false; const n = $('#demonote'); if (n) n.remove(); src = null; }
  // as funções agendadas já são protegidas: redefine com guarda
  const _f = refreshFeed, _o = refreshOverview, _t = refreshTimeline, _m = refreshMetrics;
  refreshFeed = guard(_f); refreshOverview = guard(_o); refreshTimeline = guard(_t); refreshMetrics = guard(_m);

  $('#lform').addEventListener('submit', async (e) => {
    e.preventDefault(); const tok = $('#tok').value.trim(); $('#lerr').textContent = '';
    try { const r = new Remote(tok); await r.tenants(); try { sessionStorage.setItem('tower-token', tok); } catch { /* ok */ } await start(r); }
    catch { $('#lerr').textContent = t('bad_token'); }
  });
  $('#demo').addEventListener('click', () => start(new Demo()));
  $('#logout').addEventListener('click', logout);
  $('#tenant').addEventListener('change', (e) => { tenant = e.target.value; known = new Set(); lastOv = null; projFilter = ''; $('#fproj').replaceChildren(new Option(t('allproj'), '')); schedule(); });
  $('#win').addEventListener('change', (e) => { win = Number(e.target.value); refreshOverview(); refreshTimeline(); });
  $('#filters').addEventListener('input', () => { known = new Set(); refreshFeed(); });
  $('#filters').addEventListener('submit', (e) => e.preventDefault());
  $('#theme').addEventListener('click', () => { const l = document.documentElement.dataset.theme === 'light'; document.documentElement.dataset.theme = l ? 'dark' : 'light'; try { localStorage.setItem('tower-theme', l ? 'dark' : 'light'); } catch { /* ok */ } drawMap(); if (src) refreshTimeline(); });
  for (const b of document.querySelectorAll('[data-lang]')) b.addEventListener('click', () => { lang = b.dataset.lang; try { localStorage.setItem('tower-lang', lang); } catch { /* ok */ } applyLang(); if (lastOv) { renderTable(lastOv); renderCodes(lastOv); } if (src) { refreshMetrics(); refreshFeed(); } });
  try { const th = localStorage.getItem('tower-theme'); if (th) document.documentElement.dataset.theme = th; } catch { /* ok */ }
  applyLang();
  // abre direto na demonstração com ?demo=1 (usado pela vitrine do portfólio)
  try { if (new URLSearchParams(location.search).get('demo') === '1') start(new Demo()); else { const tk = sessionStorage.getItem('tower-token'); if (tk) { const r = new Remote(tk); r.tenants().then(() => start(r)).catch(() => {}); } } } catch { /* ok */ }
})();
