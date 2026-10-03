// GERADO por hive/scripts/portfolio/gen-catalog.mjs — não edite à mão.
export type Lang = 'en' | 'pt' | 'es';
export type PortfolioCategory = 'platform' | 'logistics' | 'engineering' | 'career' | 'local' | 'impact';
export interface PortfolioText { summary: string; problem: string; highlight: string }
export interface PortfolioItem { slug: string; name: string; accent: string; glyph: string; category: PortfolioCategory; entity: string; href: string; txt: Record<Lang, PortfolioText> }
export const portfolioCategories: Record<PortfolioCategory, Record<Lang, string>> = {"platform":{"en":"Platform & operations","pt":"Plataforma e operação","es":"Plataforma y operación"},"logistics":{"en":"Logistics","pt":"Logística","es":"Logística"},"engineering":{"en":"Engineering & cloud","pt":"Engenharia e nuvem","es":"Ingeniería y nube"},"career":{"en":"Career & freelance","pt":"Carreira e autônomos","es":"Carrera y autónomos"},"local":{"en":"Local business","pt":"Negócios locais","es":"Negocios locales"},"impact":{"en":"Social impact & field","pt":"Impacto social e campo","es":"Impacto social y campo"}};
export const portfolioStack = ["Go","Vanilla JS","LLM-assisted","WCAG AA"] as const;
export const portfolioUi = {
 "en": {
  "label": "Portfolio",
  "title": "29 working systems. Open any of them.",
  "intro": "Each project is a complete, usable web system: landing page, two access profiles with different permissions, a guided form, searchable list, KPI dashboard and an AI-assistant panel. Every demo is multi-tenant (two customers with isolated data) and available in English, Portuguese and Spanish. They run entirely in your browser with fictional data — nothing is sent to a server, and the AI panel is simulated by local rules in this static build. Every one passed an automated visual quality gate (contrast, focus, touch targets, responsive overflow).",
  "note": "Switch language and customer inside each demo. The Control Tower is a separate system that collects signals from all the others.",
  "all": "All",
  "filterBy": "Filter by category",
  "carousel": "Portfolio projects",
  "project": "project",
  "of": "of",
  "problem": "Problem",
  "highlight": "Highlight",
  "tech": "Technology",
  "open": "Open live demo",
  "opens": "opens in a new tab",
  "hint": "Pick a profile on the login screen — no sign-up.",
  "prev": "Previous project",
  "next": "Next project",
  "jump": "Jump to a project",
  "seoTitle": "Portfolio — 29 working systems"
 },
 "pt": {
  "label": "Portfólio",
  "title": "29 sistemas funcionando. Abra qualquer um.",
  "intro": "Cada projeto é um sistema web completo e utilizável: página de apresentação, dois perfis de acesso com permissões diferentes, formulário guiado, lista com busca, painel de indicadores e um painel de assistente de IA. Todas as demos são multi-tenant (dois clientes com dados isolados) e estão em português, inglês e espanhol. Rodam inteiramente no seu navegador com dados fictícios — nada é enviado a servidor, e o painel de IA é simulado por regras locais nesta versão estática. Cada um passou por um portão visual automatizado (contraste, foco, alvos de toque, estouro responsivo).",
  "note": "Troque o idioma e o cliente dentro de cada demo. A Torre de Controle é um sistema à parte que reúne os sinais de todos os outros.",
  "all": "Todos",
  "filterBy": "Filtrar por categoria",
  "carousel": "Projetos do portfólio",
  "project": "projeto",
  "of": "de",
  "problem": "Problema",
  "highlight": "Destaque",
  "tech": "Tecnologia",
  "open": "Abrir a demo ao vivo",
  "opens": "abre em nova aba",
  "hint": "Escolha um perfil na tela de entrada — sem cadastro.",
  "prev": "Projeto anterior",
  "next": "Próximo projeto",
  "jump": "Ir para um projeto",
  "seoTitle": "Portfólio — 29 sistemas funcionando"
 },
 "es": {
  "label": "Portafolio",
  "title": "29 sistemas funcionando. Abre cualquiera.",
  "intro": "Cada proyecto es un sistema web completo y utilizable: página de presentación, dos perfiles de acceso con permisos distintos, formulario guiado, lista con búsqueda, panel de indicadores y un panel de asistente de IA. Todas las demos son multi-tenant (dos clientes con datos aislados) y están en español, inglés y portugués. Funcionan por completo en tu navegador con datos ficticios: no se envía nada a un servidor, y el panel de IA se simula con reglas locales en esta versión estática. Cada una pasó por una verificación visual automatizada (contraste, foco, objetivos táctiles, desbordamiento responsivo).",
  "note": "Cambia el idioma y el cliente dentro de cada demo. La Torre de Control es un sistema aparte que reúne las señales de todos los demás.",
  "all": "Todos",
  "filterBy": "Filtrar por categoría",
  "carousel": "Proyectos del portafolio",
  "project": "proyecto",
  "of": "de",
  "problem": "Problema",
  "highlight": "Destacado",
  "tech": "Tecnología",
  "open": "Abrir la demo en vivo",
  "opens": "se abre en una pestaña nueva",
  "hint": "Elige un perfil en la pantalla de entrada — sin registro.",
  "prev": "Proyecto anterior",
  "next": "Siguiente proyecto",
  "jump": "Ir a un proyecto",
  "seoTitle": "Portafolio — 29 sistemas funcionando"
 }
};
export const portfolio: PortfolioItem[] = [
 {
  "slug": "control-tower",
  "name": "Control Tower",
  "accent": "#0a6c91",
  "glyph": "CT",
  "category": "platform",
  "entity": "signals",
  "href": "/demos/control-tower/index.html?demo=1",
  "txt": {
   "en": {
    "summary": "One screen for the messages, health, size and DevOps signals of every project, per tenant.",
    "problem": "Errors, successes and warnings scattered across many systems.",
    "highlight": "Cross-project traces, tenant isolation, live feed, size and storage panels"
   },
   "pt": {
    "summary": "Uma tela para as mensagens, a saúde, o tamanho e os sinais de DevOps de todos os projetos, por cliente.",
    "problem": "Erros, sucessos e avisos espalhados por vários sistemas.",
    "highlight": "Traces entre projetos, isolamento por cliente, fluxo ao vivo, painéis de tamanho e armazenamento"
   },
   "es": {
    "summary": "Una pantalla para los mensajes, la salud, el tamaño y las señales de DevOps de todos los proyectos, por cliente.",
    "problem": "Errores, aciertos y avisos dispersos en varios sistemas.",
    "highlight": "Traces entre proyectos, aislamiento por cliente, flujo en vivo, paneles de tamaño y almacenamiento"
   }
  }
 },
 {
  "slug": "estoque-certo",
  "name": "Estoque Certo",
  "accent": "#1d4f91",
  "glyph": "EC",
  "category": "logistics",
  "entity": "counts",
  "href": "/demos/estoque-certo/index.html",
  "txt": {
   "en": {
    "summary": "Cycle counting by ABC class, with AI-explained stock discrepancies.",
    "problem": "Inventory counts that stop the warehouse.",
    "highlight": "Variance approval threshold and audit trail"
   },
   "pt": {
    "summary": "Inventário cíclico sem parar o armazém.",
    "problem": "Conte um corredor por dia e feche o inventário sem parar a operação.",
    "highlight": "Divergência explicada: A IA sugere causas prováveis: troca de endereço, avaria, erro de entrada."
   },
   "es": {
    "summary": "Inventario cíclico sin parar el almacén.",
    "problem": "Cuenta un pasillo al día y cierra el inventario sin detener la operación.",
    "highlight": "Diferencia explicada: La IA sugiere causas probables: cambio de ubicación, avería, error de ingreso."
   }
  }
 },
 {
  "slug": "doca-livre",
  "name": "Doca Livre",
  "accent": "#0f5c4d",
  "glyph": "DL",
  "category": "logistics",
  "entity": "appointments",
  "href": "/demos/doca-livre/index.html",
  "txt": {
   "en": {
    "summary": "Dock-door scheduling with delay alerts and AI re-slotting.",
    "problem": "Trucks queueing at the gate.",
    "highlight": "Time-window model per dock and cargo type"
   },
   "pt": {
    "summary": "Agenda de docas sem fila de caminhão.",
    "problem": "Caminhão no horário certo, na doca certa, sem fila no portão.",
    "highlight": "Alerta de atraso: Veículo atrasado muda de cor e vira prioridade de replanejamento."
   },
   "es": {
    "summary": "Agenda de muelles sin filas de camiones.",
    "problem": "El camión a la hora justa, en el muelle correcto, sin fila en la puerta.",
    "highlight": "Alerta de retraso: Un vehículo atrasado cambia de color y se vuelve prioridad de replanificación."
   }
  }
 },
 {
  "slug": "rota-fria",
  "name": "Rota Fria",
  "accent": "#14598a",
  "glyph": "RF",
  "category": "logistics",
  "entity": "trips",
  "href": "/demos/rota-fria/index.html",
  "txt": {
   "en": {
    "summary": "Cold-chain trip log with temperature-excursion risk opinions.",
    "problem": "Spoiled loads discovered by the customer.",
    "highlight": "Per-lot release / segregate decision flow"
   },
   "pt": {
    "summary": "Cadeia fria monitorada de ponta a ponta.",
    "problem": "Temperatura fora da faixa? Você descobre antes de o cliente abrir a porta.",
    "highlight": "Alerta de excursão: Destaca viagens fora do limite do produto."
   },
   "es": {
    "summary": "Cadena de frío vigilada de punta a punta.",
    "problem": "¿Temperatura fuera de rango? Lo descubres antes de que el cliente abra la puerta.",
    "highlight": "Alerta de excursión: Destaca los viajes fuera del límite del producto."
   }
  }
 },
 {
  "slug": "frete-justo",
  "name": "Frete Justo",
  "accent": "#7a3b0a",
  "glyph": "FJ",
  "category": "logistics",
  "entity": "freights",
  "href": "/demos/frete-justo/index.html",
  "txt": {
   "en": {
    "summary": "Freight invoice audit against contracted tariff tables.",
    "problem": "Paying carriers more than the contract says.",
    "highlight": "Billed-vs-tariff diff with AI dispute drafts"
   },
   "pt": {
    "summary": "Auditoria de frete antes de pagar a fatura.",
    "problem": "Pague só o frete que a tabela justifica.",
    "highlight": "Diferença em R$: Veja quanto está sendo pago a mais."
   },
   "es": {
    "summary": "Auditoría de flete antes de pagar la factura.",
    "problem": "Paga solo el flete que la tarifa justifica.",
    "highlight": "Diferencia en R$: Mira cuánto se está pagando de más."
   }
  }
 },
 {
  "slug": "picking-express",
  "name": "Picking Express",
  "accent": "#5b2a86",
  "glyph": "PX",
  "category": "logistics",
  "entity": "waves",
  "href": "/demos/picking-express/index.html",
  "txt": {
   "en": {
    "summary": "Pick-wave planner by carrier cut-off and customer priority.",
    "problem": "Late dispatches from badly ordered picking.",
    "highlight": "Cut-off risk flags per wave"
   },
   "pt": {
    "summary": "Ondas de separação por prioridade e prazo.",
    "problem": "Separe primeiro o que vence primeiro.",
    "highlight": "Prioridade do cliente: Pedidos críticos sobem na fila."
   },
   "es": {
    "summary": "Olas de preparación por prioridad y plazo.",
    "problem": "Prepara primero lo que vence primero.",
    "highlight": "Prioridad del cliente: Los pedidos críticos suben en la fila."
   }
  }
 },
 {
  "slug": "devolve-ja",
  "name": "Devolve Já",
  "accent": "#8a2d2d",
  "glyph": "DJ",
  "category": "logistics",
  "entity": "returns",
  "href": "/demos/devolve-ja/index.html",
  "txt": {
   "en": {
    "summary": "Returns triage: resell, refurbish or scrap — and how much value was recovered.",
    "problem": "Returns that become pure loss.",
    "highlight": "Disposition recommendation per item"
   },
   "pt": {
    "summary": "Logística reversa que recupera valor.",
    "problem": "Devolução não precisa virar prejuízo.",
    "highlight": "Recomendação da IA: Revender, recondicionar ou descartar, com o motivo."
   },
   "es": {
    "summary": "Logística inversa que recupera valor.",
    "problem": "Una devolución no tiene por qué ser una pérdida.",
    "highlight": "Recomendación de la IA: Revender, reacondicionar o descartar, con el motivo."
   }
  }
 },
 {
  "slug": "cotacao-rapida",
  "name": "Cotação Rápida",
  "accent": "#1f4d5c",
  "glyph": "CR",
  "category": "logistics",
  "entity": "quotes",
  "href": "/demos/cotacao-rapida/index.html",
  "txt": {
   "en": {
    "summary": "Supplier quote comparison by total cost, lead time and terms.",
    "problem": "Buying on list price instead of total cost.",
    "highlight": "Side-by-side comparison with counter-offer drafts"
   },
   "pt": {
    "summary": "Compras comparadas em minutos.",
    "problem": "Três propostas na mesa, a melhor evidente.",
    "highlight": "Melhor custo total: Considera frete e prazo, não só o preço de tabela."
   },
   "es": {
    "summary": "Compras comparadas en minutos.",
    "problem": "Tres propuestas sobre la mesa, la mejor a la vista.",
    "highlight": "Mejor costo total: Considera flete y plazo, no solo el precio de lista."
   }
  }
 },
 {
  "slug": "incidente-zero",
  "name": "Incidente Zero",
  "accent": "#8c2a1f",
  "glyph": "IZ",
  "category": "engineering",
  "entity": "incidents",
  "href": "/demos/incidente-zero/index.html",
  "txt": {
   "en": {
    "summary": "Incident log with blameless post-mortems drafted by AI.",
    "problem": "Outages that teach nothing.",
    "highlight": "Severity and downtime tracking, action follow-up"
   },
   "pt": {
    "summary": "Incidentes e postmortems sem caça às bruxas.",
    "problem": "Do alerta ao aprendizado, sem apontar culpados.",
    "highlight": "Postmortem sem culpa: A IA estrutura causa, impacto e lições."
   },
   "es": {
    "summary": "Incidentes y postmortems sin caza de brujas.",
    "problem": "De la alerta al aprendizaje, sin culpables.",
    "highlight": "Postmortem sin culpa: La IA estructura causa, impacto y lecciones."
   }
  }
 },
 {
  "slug": "deploy-seguro",
  "name": "Deploy Seguro",
  "accent": "#264653",
  "glyph": "DS",
  "category": "engineering",
  "entity": "changes",
  "href": "/demos/deploy-seguro/index.html",
  "txt": {
   "en": {
    "summary": "Change management with risk rating and AI rollback-plan review.",
    "problem": "Production changes without a way back.",
    "highlight": "Mandatory rollback plan, two-level approval model"
   },
   "pt": {
    "summary": "Mudanças em produção com risco medido.",
    "problem": "Antes de subir, saiba o que pode dar errado.",
    "highlight": "Risco por mudança: Baixo, médio ou alto com justificativa."
   },
   "es": {
    "summary": "Cambios en producción con riesgo medido.",
    "problem": "Antes de desplegar, sabe qué puede salir mal.",
    "highlight": "Riesgo por cambio: Bajo, medio o alto con justificación."
   }
  }
 },
 {
  "slug": "divida-tecnica",
  "name": "Dívida Técnica",
  "accent": "#4a3b8c",
  "glyph": "DT",
  "category": "engineering",
  "entity": "debts",
  "href": "/demos/divida-tecnica/index.html",
  "txt": {
   "en": {
    "summary": "Tech-debt register ranked by impact and effort.",
    "problem": "\"We need to refactor\" that never gets prioritised.",
    "highlight": "Business-language argument generated per item"
   },
   "pt": {
    "summary": "Débito técnico priorizado por impacto.",
    "problem": "Transforme \"precisamos refatorar\" em prioridade defendável.",
    "highlight": "Impacto x esforço: Pague primeiro o que rende mais."
   },
   "es": {
    "summary": "Deuda técnica priorizada por impacto.",
    "problem": "Convierte \"hay que refactorizar\" en una prioridad defendible.",
    "highlight": "Impacto vs esfuerzo: Paga primero lo que más rinde."
   }
  }
 },
 {
  "slug": "nuvem-enxuta",
  "name": "Nuvem Enxuta",
  "accent": "#1b4a73",
  "glyph": "NE",
  "category": "engineering",
  "entity": "resources",
  "href": "/demos/nuvem-enxuta/index.html",
  "txt": {
   "en": {
    "summary": "Cloud FinOps: idle resources, right-sizing and shutdown advice.",
    "problem": "Paying for servers nobody uses.",
    "highlight": "Utilisation vs capacity, production protected by default"
   },
   "pt": {
    "summary": "FinOps simples para recursos ociosos.",
    "problem": "Servidor ligado sem uso é dinheiro jogado fora.",
    "highlight": "Uso x capacidade: CPU média mostra o que sobrou de folga."
   },
   "es": {
    "summary": "FinOps simple para recursos ociosos.",
    "problem": "Un servidor encendido sin uso es dinero tirado.",
    "highlight": "Uso vs capacidad: La CPU media muestra la holgura que sobró."
   }
  }
 },
 {
  "slug": "fatura-lupa",
  "name": "Fatura Lupa",
  "accent": "#6b2d5c",
  "glyph": "FL",
  "category": "engineering",
  "entity": "subscriptions",
  "href": "/demos/fatura-lupa/index.html",
  "txt": {
   "en": {
    "summary": "SaaS spend audit: paid seats vs active seats.",
    "problem": "Licences nobody logs in to.",
    "highlight": "Savings estimate per subscription"
   },
   "pt": {
    "summary": "Faturas de software sob auditoria.",
    "problem": "Pare de pagar por licença que ninguém usa.",
    "highlight": "Uso real: Compare assentos pagos com assentos ativos."
   },
   "es": {
    "summary": "Facturas de software bajo auditoría.",
    "problem": "Deja de pagar licencias que nadie usa.",
    "highlight": "Uso real: Compara puestos pagados con puestos activos."
   }
  }
 },
 {
  "slug": "acesso-revisado",
  "name": "Acesso Revisado",
  "accent": "#3b3b8a",
  "glyph": "AR",
  "category": "engineering",
  "entity": "accesses",
  "href": "/demos/acesso-revisado/index.html",
  "txt": {
   "en": {
    "summary": "Periodic access review with orphan-account detection and audit evidence.",
    "problem": "Ex-employees who still have access.",
    "highlight": "Least-privilege review workflow"
   },
   "pt": {
    "summary": "Revisão periódica de acessos, do jeito certo.",
    "problem": "Quem ainda tem acesso a quê? Revise em vez de adivinhar.",
    "highlight": "Órfãos e excessos: Ex-funcionários e acessos sem uso."
   },
   "es": {
    "summary": "Revisión periódica de accesos, bien hecha.",
    "problem": "¿Quién sigue con acceso a qué? Revisa en vez de adivinar.",
    "highlight": "Huérfanos y excesos: Ex empleados y accesos sin uso."
   }
  }
 },
 {
  "slug": "contrato-alerta",
  "name": "Contrato Alerta",
  "accent": "#17406b",
  "glyph": "CA",
  "category": "engineering",
  "entity": "contracts",
  "href": "/demos/contrato-alerta/index.html",
  "txt": {
   "en": {
    "summary": "Contract renewals and notice periods, never missed.",
    "problem": "Auto-renewals nobody noticed.",
    "highlight": "Notice-window alerts and renegotiation brief"
   },
   "pt": {
    "summary": "Nenhum vencimento de contrato passa batido.",
    "problem": "Renovou sem querer? Esse erro acaba aqui.",
    "highlight": "Prazo de aviso: Alerta antes do último dia de rescindir."
   },
   "es": {
    "summary": "Ningún vencimiento de contrato pasa desapercibido.",
    "problem": "¿Renovaste sin querer? Ese error se acaba aquí.",
    "highlight": "Plazo de aviso: Alerta antes del último día para rescindir."
   }
  }
 },
 {
  "slug": "vaga-match",
  "name": "Vaga Match",
  "accent": "#0b5d6b",
  "glyph": "VM",
  "category": "career",
  "entity": "roles",
  "href": "/demos/vaga-match/index.html",
  "txt": {
   "en": {
    "summary": "Job-application pipeline with fit score and red-flag detection.",
    "problem": "Applying everywhere and tracking nothing.",
    "highlight": "Contract type (PJ/EOR) and time-zone aware scoring"
   },
   "pt": {
    "summary": "Pipeline de candidaturas com decisão clara.",
    "problem": "Candidate-se onde há encaixe e acompanhe cada etapa.",
    "highlight": "Nota de encaixe: Stack, fuso, contrato e senioridade em uma nota."
   },
   "es": {
    "summary": "Pipeline de postulaciones con decisión clara.",
    "problem": "Postula donde hay encaje y sigue cada etapa.",
    "highlight": "Nota de encaje: Stack, huso horario, contrato y seniority en una sola nota."
   }
  }
 },
 {
  "slug": "entrevista-pronta",
  "name": "Entrevista Pronta",
  "accent": "#7a3512",
  "glyph": "EP",
  "category": "career",
  "entity": "practices",
  "href": "/demos/entrevista-pronta/index.html",
  "txt": {
   "en": {
    "summary": "Interview practice log with confidence tracking and AI feedback.",
    "problem": "Rehearsing randomly.",
    "highlight": "STAR-structure feedback per answer"
   },
   "pt": {
    "summary": "Prática diária para entrevistas em inglês.",
    "problem": "Treine hoje a pergunta que vão fazer amanhã.",
    "highlight": "Treino registrado: Data, tempo e nota de confiança."
   },
   "es": {
    "summary": "Práctica diaria para entrevistas en inglés.",
    "problem": "Practica hoy la pregunta que te harán mañana.",
    "highlight": "Práctica registrada: Fecha, duración y nota de confianza."
   }
  }
 },
 {
  "slug": "freela-claro",
  "name": "Freela Claro",
  "accent": "#0f4c5c",
  "glyph": "FC",
  "category": "career",
  "entity": "projects",
  "href": "/demos/freela-claro/index.html",
  "txt": {
   "en": {
    "summary": "Freelance proposals, receivables and polite collection drafts.",
    "problem": "Chasing late payments awkwardly.",
    "highlight": "Funnel plus overdue tracking"
   },
   "pt": {
    "summary": "Propostas e cobranças de quem trabalha por conta.",
    "problem": "Proposta enviada, projeto entregue, cobrança em dia.",
    "highlight": "Recebíveis: O que vai entrar e o que já atrasou."
   },
   "es": {
    "summary": "Propuestas y cobros para quien trabaja por cuenta propia.",
    "problem": "Propuesta enviada, proyecto entregado, cobro al día.",
    "highlight": "Cuentas por cobrar: Lo que va a entrar y lo que ya se atrasó."
   }
  }
 },
 {
  "slug": "temporada-limpa",
  "name": "Temporada Limpa",
  "accent": "#0e5a52",
  "glyph": "TL",
  "category": "local",
  "entity": "stays",
  "href": "/demos/temporada-limpa/index.html",
  "txt": {
   "en": {
    "summary": "Short-term rental stays and cleaning turnovers without calendar clashes.",
    "problem": "Same-day turnovers that catch you off guard.",
    "highlight": "Net result per stay after cleaning cost"
   },
   "pt": {
    "summary": "Hospedagens e faxinas sem conflito de agenda.",
    "problem": "Saiu um hóspede, entra a faxina; entra outro, tudo pronto.",
    "highlight": "Faxina por estadia: Custo de limpeza descontado do resultado."
   },
   "es": {
    "summary": "Alojamientos y limpiezas sin choques de agenda.",
    "problem": "Sale un huésped, entra la limpieza; llega otro, todo listo.",
    "highlight": "Limpieza por estadía: Costo de limpieza descontado del resultado."
   }
  }
 },
 {
  "slug": "pet-agenda",
  "name": "Pet Agenda",
  "accent": "#a14510",
  "glyph": "PA",
  "category": "local",
  "entity": "appointments",
  "href": "/demos/pet-agenda/index.html",
  "txt": {
   "en": {
    "summary": "Pet-grooming scheduling by professional, with no-show tracking.",
    "problem": "Empty slots and repeat no-shows.",
    "highlight": "AI-drafted reminders (sent by a human)"
   },
   "pt": {
    "summary": "Banho, tosa e cuidado sem buracos na agenda.",
    "problem": "Agenda cheia, tutor avisado e menos falta.",
    "highlight": "Controle de faltas: Veja quem mais falta e proponha pacote."
   },
   "es": {
    "summary": "Baño, corte y cuidado sin huecos en la agenda.",
    "problem": "Agenda llena, dueño avisado y menos faltas.",
    "highlight": "Control de faltas: Mira quién falta más y ofrece un paquete."
   }
  }
 },
 {
  "slug": "mesa-cheia",
  "name": "Mesa Cheia",
  "accent": "#8a1f3c",
  "glyph": "MC",
  "category": "local",
  "entity": "bookings",
  "href": "/demos/mesa-cheia/index.html",
  "txt": {
   "en": {
    "summary": "Restaurant reservations by shift with no-show and waitlist handling.",
    "problem": "Tables empty while a waitlist exists.",
    "highlight": "Confirmation drafts, occupancy by shift"
   },
   "pt": {
    "summary": "Reservas de restaurante sem mesa vazia.",
    "problem": "Reserva confirmada, mesa ocupada, menos \"no-show\".",
    "highlight": "Controle de no-show: Descubra quem falta e confirme antes."
   },
   "es": {
    "summary": "Reservas de restaurante sin mesas vacías.",
    "problem": "Reserva confirmada, mesa ocupada, menos \"no-show\".",
    "highlight": "Control de no-show: Descubre quién falta y confirma antes."
   }
  }
 },
 {
  "slug": "obra-diario",
  "name": "Obra Diário",
  "accent": "#6d4c1d",
  "glyph": "OD",
  "category": "local",
  "entity": "entries",
  "href": "/demos/obra-diario/index.html",
  "txt": {
   "en": {
    "summary": "Construction site diary with owned, dated pending items.",
    "problem": "Pending items that never close.",
    "highlight": "Weekly client summary drafted by AI"
   },
   "pt": {
    "summary": "Diário de obra com pendências que não somem.",
    "problem": "Cada dia de obra registrado, cada pendência com dono e prazo.",
    "highlight": "Pendências: Quem faz, até quando e se está atrasado."
   },
   "es": {
    "summary": "Diario de obra con pendientes que no desaparecen.",
    "problem": "Cada día de obra registrado, cada pendiente con responsable y plazo.",
    "highlight": "Pendientes: Quién lo hace, para cuándo y si está atrasado."
   }
  }
 },
 {
  "slug": "manutencao-os",
  "name": "Manutenção OS",
  "accent": "#41505e",
  "glyph": "MO",
  "category": "local",
  "entity": "orders",
  "href": "/demos/manutencao-os/index.html",
  "txt": {
   "en": {
    "summary": "Maintenance work orders ranked by criticality, with preventive-plan advice.",
    "problem": "Machines that keep breaking in the same way.",
    "highlight": "Downtime-hours tracking per equipment"
   },
   "pt": {
    "summary": "Ordens de serviço sem papel e sem esquecimento.",
    "problem": "Quebrou, abriu a ordem, resolveu e ficou registrado.",
    "highlight": "Criticidade: Equipamento parado sobe na fila."
   },
   "es": {
    "summary": "Órdenes de servicio sin papel y sin olvidos.",
    "problem": "Se rompió, se abrió la orden, se resolvió y quedó registrado.",
    "highlight": "Criticidad: El equipo detenido sube en la fila."
   }
  }
 },
 {
  "slug": "garantia-facil",
  "name": "Garantia Fácil",
  "accent": "#244a6b",
  "glyph": "GF",
  "category": "local",
  "entity": "equipment items",
  "href": "/demos/garantia-facil/index.html",
  "txt": {
   "en": {
    "summary": "Equipment warranty tracker with expiry alerts and claim drafts.",
    "problem": "Warranties that expire unnoticed.",
    "highlight": "Value-under-warranty overview"
   },
   "pt": {
    "summary": "Garantias de equipamentos que ninguém esquece.",
    "problem": "A garantia vence amanhã? Você sabe hoje.",
    "highlight": "Alerta de vencimento: Veja o que vence nos próximos 60 dias."
   },
   "es": {
    "summary": "Garantías de equipos que nadie olvida.",
    "problem": "¿La garantía vence mañana? Lo sabes hoy.",
    "highlight": "Alerta de vencimiento: Mira lo que vence en los próximos 60 días."
   }
  }
 },
 {
  "slug": "lote-rastro",
  "name": "Lote Rastro",
  "accent": "#3f5d2a",
  "glyph": "LR",
  "category": "local",
  "entity": "batches",
  "href": "/demos/lote-rastro/index.html",
  "txt": {
   "en": {
    "summary": "Batch traceability for small food producers, with recall drafting.",
    "problem": "Not knowing which batch to recall.",
    "highlight": "Ingredient-to-batch-to-customer traceability"
   },
   "pt": {
    "summary": "Rastreabilidade de lotes para produtor artesanal.",
    "problem": "Se der problema, você sabe exatamente qual lote recolher.",
    "highlight": "Validade: Lotes perto do vencimento em destaque."
   },
   "es": {
    "summary": "Trazabilidad de lotes para el productor artesanal.",
    "problem": "Si algo sale mal, sabes exactamente qué lote retirar.",
    "highlight": "Vencimiento: Lotes cerca del vencimiento destacados."
   }
  }
 },
 {
  "slug": "frequencia-escolar",
  "name": "Frequência Escolar",
  "accent": "#2a4d8f",
  "glyph": "FE",
  "category": "impact",
  "entity": "follow-ups",
  "href": "/demos/frequencia-escolar/index.html",
  "txt": {
   "en": {
    "summary": "Attendance early-warning for schools, using initials only.",
    "problem": "Dropout noticed too late.",
    "highlight": "Privacy-minimal data model, supportive family-talk script"
   },
   "pt": {
    "summary": "Alerta precoce de evasão, sem expor alunos.",
    "problem": "Quem está faltando demais? Descubra antes de virar evasão.",
    "highlight": "Alerta precoce: Aluno perto do limite legal de faltas em destaque."
   },
   "es": {
    "summary": "Alerta temprana de deserción, sin exponer a los alumnos.",
    "problem": "¿Quién está faltando demasiado? Descúbrelo antes de que sea deserción.",
    "highlight": "Alerta temprana: El alumno cerca del límite legal de faltas se destaca."
   }
  }
 },
 {
  "slug": "doacao-clara",
  "name": "Doação Clara",
  "accent": "#9a3412",
  "glyph": "DC",
  "category": "impact",
  "entity": "entries",
  "href": "/demos/doacao-clara/index.html",
  "txt": {
   "en": {
    "summary": "Donation transparency for small NGOs, per project.",
    "problem": "Donors not knowing where money went.",
    "highlight": "Per-project ledger and donor report draft"
   },
   "pt": {
    "summary": "Transparência de doações para ONGs pequenas.",
    "problem": "Mostre ao doador para onde foi cada real.",
    "highlight": "Transparência: Saldo e gastos visíveis em um painel."
   },
   "es": {
    "summary": "Transparencia de donaciones para ONG pequeñas.",
    "problem": "Muestra al donante adónde fue cada real.",
    "highlight": "Transparencia: Saldo y gastos visibles en un panel."
   }
  }
 },
 {
  "slug": "evento-checklist",
  "name": "Evento Checklist",
  "accent": "#5a2b81",
  "glyph": "EV",
  "category": "impact",
  "entity": "tasks",
  "href": "/demos/evento-checklist/index.html",
  "txt": {
   "en": {
    "summary": "Event production checklist with budget and risk flags.",
    "problem": "Forgotten tasks on event day.",
    "highlight": "Phase-based checklist, planned vs actual cost"
   },
   "pt": {
    "summary": "Produção de eventos sem tarefa esquecida.",
    "problem": "Do briefing ao último cabo desligado.",
    "highlight": "Orçamento: Previsto e realizado por fornecedor."
   },
   "es": {
    "summary": "Producción de eventos sin tareas olvidadas.",
    "problem": "Del brief al último cable desconectado.",
    "highlight": "Presupuesto: Previsto y realizado por proveedor."
   }
  }
 },
 {
  "slug": "safra-controle",
  "name": "Safra Controle",
  "accent": "#2f5d1f",
  "glyph": "SC",
  "category": "impact",
  "entity": "activities",
  "href": "/demos/safra-controle/index.html",
  "txt": {
   "en": {
    "summary": "Smallholder farm plots: cost, yield and season reading.",
    "problem": "No idea what each plot really costs.",
    "highlight": "Cost per plot and yield comparison"
   },
   "pt": {
    "summary": "Talhões, custos e colheita de pequeno produtor.",
    "problem": "Quanto custou cada talhão e quanto ele deu.",
    "highlight": "Custo por talhão: Insumos, mão de obra e máquinas."
   },
   "es": {
    "summary": "Parcelas, costos y cosecha del pequeño productor.",
    "problem": "Cuánto costó cada parcela y cuánto rindió.",
    "highlight": "Costo por parcela: Insumos, mano de obra y maquinaria."
   }
  }
 }
];
