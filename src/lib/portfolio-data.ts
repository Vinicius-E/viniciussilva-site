// GERADO por hive/scripts/portfolio/suites/gen-catalog-suites.mjs — não edite à mão.
// 5 produtos (suítes), 18 módulos; 10 dos 28 originais ficaram fora do portfólio (ver suites.mjs).
export type Lang = 'en' | 'pt' | 'es';
export type PortfolioCategory = 'platform' | 'logistics' | 'engineering' | 'career' | 'local' | 'impact';
export interface PortfolioText { summary: string; problem: string; highlight: string }
export interface PortfolioItem { slug: string; name: string; accent: string; glyph: string; category: PortfolioCategory; entity: string; href: string; hrefs?: Record<Lang, string>; txt: Record<Lang, PortfolioText> }
export const portfolioCategories: Record<PortfolioCategory, Record<Lang, string>> = {"platform":{"en":"Platform & operations","pt":"Plataforma e operação","es":"Plataforma y operación"},"logistics":{"en":"Logistics","pt":"Logística","es":"Logística"},"engineering":{"en":"Engineering & cloud","pt":"Engenharia e nuvem","es":"Ingeniería y nube"},"career":{"en":"Career & freelance","pt":"Carreira e autônomos","es":"Carrera y autónomos"},"local":{"en":"Local business","pt":"Negócios locais","es":"Negocios locales"},"impact":{"en":"Field & site records","pt":"Registros de campo e obra","es":"Registros de campo y obra"}};
export const portfolioStack = ["Go","Vanilla JS","LLM-assisted","WCAG AA"] as const;
export const portfolioUi = {
 "en": {
  "label": "Portfolio",
  "title": "5 products. 18 working modules. Open any of them.",
  "intro": "Each product groups related modules under one login and opens on its own presentation page, built for scrolling. Every module is a complete, usable system: two access profiles with different permissions, a guided form, searchable list, KPI dashboard and an AI-assistant panel. Modules are multi-tenant (two customers with isolated data) and available in English, Portuguese and Spanish. Everything runs in your browser with fictional data; nothing is sent to a server, and the AI panel is simulated by local rules in this static build. The presentation pages were checked automatically for accessibility (WCAG A/AA, at several scroll positions), horizontal overflow and working links, in three languages, on desktop and phone.",
  "note": "Open a product to see its presentation page, then jump into any module. Switch language and customer inside each module. The Control Tower is a separate system that collects signals from all the others.",
  "all": "All",
  "filterBy": "Filter by category",
  "carousel": "Portfolio projects",
  "project": "project",
  "of": "of",
  "problem": "Problem",
  "highlight": "Highlight",
  "tech": "Technology",
  "open": "Open the product",
  "opens": "opens in a new tab",
  "hint": "Each product opens on its presentation page. In a module, pick a profile on the login screen: no sign-up.",
  "prev": "Previous project",
  "next": "Next project",
  "jump": "Jump to a project",
  "seoTitle": "Portfolio: 5 products, 18 working modules"
 },
 "pt": {
  "label": "Portfólio",
  "title": "5 produtos. 18 módulos funcionando. Abra qualquer um.",
  "intro": "Cada produto reúne módulos relacionados num único acesso e abre na sua própria página de apresentação, feita para rolar. Cada módulo é um sistema completo e utilizável: dois perfis de acesso com permissões diferentes, formulário guiado, lista com busca, painel de indicadores e um painel de assistente de IA. Os módulos são multi-tenant (dois clientes com dados isolados) e estão em português, inglês e espanhol. Tudo roda no seu navegador com dados fictícios; nada é enviado a servidor, e o painel de IA é simulado por regras locais nesta versão estática. As páginas de apresentação foram verificadas automaticamente quanto a acessibilidade (WCAG A/AA, em várias posições de rolagem), estouro horizontal e links, em três idiomas, no computador e no celular.",
  "note": "Abra um produto para ver a página de apresentação e entre em qualquer módulo. Troque o idioma e o cliente dentro de cada módulo. A Torre de Controle é um sistema à parte que reúne os sinais de todos os outros.",
  "all": "Todos",
  "filterBy": "Filtrar por categoria",
  "carousel": "Projetos do portfólio",
  "project": "projeto",
  "of": "de",
  "problem": "Problema",
  "highlight": "Destaque",
  "tech": "Tecnologia",
  "open": "Abrir o produto",
  "opens": "abre em nova aba",
  "hint": "Cada produto abre na página de apresentação. Num módulo, escolha um perfil na tela de entrada: sem cadastro.",
  "prev": "Projeto anterior",
  "next": "Próximo projeto",
  "jump": "Ir para um projeto",
  "seoTitle": "Portfólio: 5 produtos, 18 módulos funcionando"
 },
 "es": {
  "label": "Portafolio",
  "title": "5 productos. 18 módulos funcionando. Abre cualquiera.",
  "intro": "Cada producto reúne módulos relacionados con un solo acceso y se abre en su propia página de presentación, hecha para desplazarse. Cada módulo es un sistema completo y utilizable: dos perfiles de acceso con permisos distintos, formulario guiado, lista con búsqueda, panel de indicadores y un panel de asistente de IA. Los módulos son multi-tenant (dos clientes con datos aislados) y están en español, inglés y portugués. Todo funciona en tu navegador con datos ficticios; no se envía nada a un servidor, y el panel de IA se simula con reglas locales en esta versión estática. Las páginas de presentación se verificaron automáticamente en accesibilidad (WCAG A/AA, en varias posiciones de desplazamiento), desbordamiento horizontal y enlaces, en tres idiomas, en computador y celular.",
  "note": "Abre un producto para ver su página de presentación y entra a cualquier módulo. Cambia el idioma y el cliente dentro de cada módulo. La Torre de Control es un sistema aparte que reúne las señales de todos los demás.",
  "all": "Todos",
  "filterBy": "Filtrar por categoría",
  "carousel": "Proyectos del portafolio",
  "project": "proyecto",
  "of": "de",
  "problem": "Problema",
  "highlight": "Destacado",
  "tech": "Tecnología",
  "open": "Abrir el producto",
  "opens": "se abre en una pestaña nueva",
  "hint": "Cada producto se abre en su página de presentación. En un módulo, elige un perfil en la pantalla de entrada: sin registro.",
  "prev": "Proyecto anterior",
  "next": "Siguiente proyecto",
  "jump": "Ir a un proyecto",
  "seoTitle": "Portafolio: 5 productos, 18 módulos funcionando"
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
  "slug": "carga-clara",
  "name": "Carga Clara",
  "accent": "#1d4f91",
  "glyph": "CC",
  "category": "logistics",
  "entity": "4 modules",
  "href": "/demos/carga-clara/index.html",
  "hrefs": {
   "en": "/demos/carga-clara/index.html",
   "pt": "/demos/carga-clara/pt/index.html",
   "es": "/demos/carga-clara/es/index.html"
  },
  "txt": {
   "en": {
    "summary": "Freight audit, dock scheduling, cold chain and cycle counting in one operation.",
    "problem": "Paying carriers more than the contract says, trucks idling at the gate, spoiled loads found by the customer, a warehouse that stops to count.",
    "highlight": "A split-screen page that audits eight freight bills against the tariff and totals the overcharge as you scroll."
   },
   "pt": {
    "summary": "Auditoria de frete, agenda de docas, cadeia fria e contagem cíclica numa operação só.",
    "problem": "Pagar à transportadora mais do que o contrato diz, caminhão parado no portão, carga estragada descoberta pelo cliente, armazém que para para contar.",
    "highlight": "Uma página em duas colunas que audita oito fretes contra a tabela e soma o que foi pago a mais enquanto você rola."
   },
   "es": {
    "summary": "Auditoría de flete, agenda de andenes, cadena de frío y conteo cíclico en una sola operación.",
    "problem": "Pagar al transportista más de lo que dice el contrato, camiones esperando en la puerta, carga dañada descubierta por el cliente, un almacén que se detiene para contar.",
    "highlight": "Una página en dos columnas que audita ocho fletes contra la tarifa y suma lo pagado de más mientras te desplazas."
   }
  }
 },
 {
  "slug": "ti-sob-controle",
  "name": "TI Sob Controle",
  "accent": "#1b6f50",
  "glyph": "TI",
  "category": "engineering",
  "entity": "4 modules",
  "href": "/demos/ti-sob-controle/index.html",
  "hrefs": {
   "en": "/demos/ti-sob-controle/index.html",
   "pt": "/demos/ti-sob-controle/pt/index.html",
   "es": "/demos/ti-sob-controle/es/index.html"
  },
  "txt": {
   "en": {
    "summary": "Access reviews, subscription audit, cloud cost and incident tracking in one console.",
    "problem": "Ex-employees with live accounts, licences nobody uses, idle servers and outages that teach nothing.",
    "highlight": "The page is the tool: scroll or drag a review bar, watch the savings add up, and finish at a working command line."
   },
   "pt": {
    "summary": "Revisão de acessos, auditoria de assinaturas, custo de nuvem e incidentes num só console.",
    "problem": "Ex-funcionários com conta ativa, licenças que ninguém usa, servidores ociosos e quedas que não ensinam nada.",
    "highlight": "A página é a ferramenta: role ou arraste a barra de revisão, veja a economia somar e termine numa linha de comando que funciona."
   },
   "es": {
    "summary": "Revisión de accesos, auditoría de suscripciones, costo de nube e incidentes en una sola consola.",
    "problem": "Ex empleados con cuenta activa, licencias que nadie usa, servidores ociosos y caídas que no enseñan nada.",
    "highlight": "La página es la herramienta: desplázate o arrastra la barra de revisión, mira cómo suma el ahorro y termina en una línea de comandos que funciona."
   }
  }
 },
 {
  "slug": "carreira-solo",
  "name": "Carreira Solo",
  "accent": "#b3411f",
  "glyph": "CS",
  "category": "career",
  "entity": "3 modules",
  "href": "/demos/carreira-solo/index.html",
  "hrefs": {
   "en": "/demos/carreira-solo/index.html",
   "pt": "/demos/carreira-solo/pt/index.html",
   "es": "/demos/carreira-solo/es/index.html"
  },
  "txt": {
   "en": {
    "summary": "Application funnel with fit score, interview practice and polite invoice reminders for solo professionals.",
    "problem": "Applying everywhere, rehearsing at random and chasing late payments awkwardly.",
    "highlight": "Four first-person verbs set at poster scale and swapped by colour cuts, then the page goes quiet."
   },
   "pt": {
    "summary": "Funil de vagas com nota de aderência, ensaio de entrevistas e lembretes educados de cobrança para quem trabalha por conta própria.",
    "problem": "Candidatar-se em todo lugar, ensaiar sem método e cobrar atrasos com constrangimento.",
    "highlight": "Quatro verbos em primeira pessoa em escala de cartaz, trocados por cortes de cor, e então a página silencia."
   },
   "es": {
    "summary": "Embudo de postulaciones con puntaje de ajuste, ensayo de entrevistas y recordatorios corteses de cobro para quien trabaja por cuenta propia.",
    "problem": "Postular en todas partes, ensayar sin método y cobrar atrasos con incomodidad.",
    "highlight": "Cuatro verbos en primera persona a escala de cartel, cambiados por cortes de color, y luego la página se calla."
   }
  }
 },
 {
  "slug": "agenda-cheia",
  "name": "Agenda Cheia",
  "accent": "#1f6b4a",
  "glyph": "AC",
  "category": "local",
  "entity": "4 modules",
  "href": "/demos/agenda-cheia/index.html",
  "hrefs": {
   "en": "/demos/agenda-cheia/index.html",
   "pt": "/demos/agenda-cheia/pt/index.html",
   "es": "/demos/agenda-cheia/es/index.html"
  },
  "txt": {
   "en": {
    "summary": "Pet grooming bookings, restaurant reservations, short-stay turnovers and maintenance orders under one login.",
    "problem": "Empty slots, no-shows, same-day turnovers and equipment that keeps breaking the same way.",
    "highlight": "A museum-style collection: every module gets the same factual label, generated from its real configuration."
   },
   "pt": {
    "summary": "Agenda de pet shop, reservas de restaurante, viradas de temporada e ordens de serviço no mesmo acesso.",
    "problem": "Horários vazios, faltas, viradas no mesmo dia e equipamento que quebra sempre do mesmo jeito.",
    "highlight": "Uma coleção de museu: cada módulo recebe a mesma etiqueta factual, montada a partir da configuração real."
   },
   "es": {
    "summary": "Agenda de peluquería canina, reservas de restaurante, recambios de temporada y órdenes de servicio con el mismo acceso.",
    "problem": "Horarios vacíos, ausencias, recambios el mismo día y equipos que se rompen siempre igual.",
    "highlight": "Una colección de museo: cada módulo recibe la misma etiqueta factual, generada desde su configuración real."
   }
  }
 },
 {
  "slug": "diario-de-campo",
  "name": "Diário de Campo",
  "accent": "#a23b2a",
  "glyph": "DC",
  "category": "impact",
  "entity": "3 modules",
  "href": "/demos/diario-de-campo/index.html",
  "hrefs": {
   "en": "/demos/diario-de-campo/index.html",
   "pt": "/demos/diario-de-campo/pt/index.html",
   "es": "/demos/diario-de-campo/es/index.html"
  },
  "txt": {
   "en": {
    "summary": "Construction diary, event checklist and harvest control with owned, dated items.",
    "problem": "Open items that never close, tasks forgotten on event day, no idea what each plot costs.",
    "highlight": "An editorial logbook that stamps each entry in the margin as you read, then asks you to sign the day."
   },
   "pt": {
    "summary": "Diário de obra, checklist de evento e controle de safra com itens que têm dono e prazo.",
    "problem": "Pendências que nunca fecham, tarefas esquecidas no dia do evento, sem saber quanto custa cada talhão.",
    "highlight": "Um livro de registro editorial que carimba cada entrada na margem enquanto você lê e depois pede que você assine o dia."
   },
   "es": {
    "summary": "Diario de obra, checklist de evento y control de cosecha con ítems que tienen responsable y plazo.",
    "problem": "Pendientes que nunca se cierran, tareas olvidadas el día del evento, sin saber cuánto cuesta cada parcela.",
    "highlight": "Un libro de registro editorial que sella cada entrada en el margen mientras lees y luego te pide firmar el día."
   }
  }
 }
];
