/* =========================================================================
   UI + editorial copy, per locale. Language-neutral facts (name, email,
   URLs, dates, tech names) stay in src/lib/site.ts and the content
   collections. PT-BR and ES strings are pending native review — see README.
   The Industrial Operations Platform case study stays English-only for V1;
   `caseNotice` is shown on the PT/ES routes.
   ========================================================================= */

const en = {
  nav: { work: 'Work', experience: 'Experience', expertise: 'Expertise', contact: 'Contact', portfolio: 'Portfolio' },
  a11y: {
    theme: 'Switch colour theme',
    themeLabel: 'Theme',
    home: 'home',
    skip: 'Skip to content',
    primaryNav: 'Primary',
    footerNav: 'Footer',
    changeLanguage: 'Change language',
    newTab: '(opens in a new tab)',
  },
  header: { resume: 'Résumé' },
  meta: {
    titleSuffix: 'Java · Spring Boot · Distributed Systems',
    description:
      'Senior software engineer, backend-focused: Java, Spring Boot, microservices and event-driven integrations with RabbitMQ, PostgreSQL and AWS, with React, Angular and TypeScript on the front end. 5+ years in production enterprise systems and hands-on AI-assisted development with Claude Code, Codex and AI agents. Based in Blumenau, Brazil, working with international teams.',
  },
  role: 'Senior Software Engineer · Backend & Full Stack',
  hero: {
    title: 'Engineering reliable software for real-world operations.',
    sub: '5+ years building production enterprise systems. Backend first: Java and Spring Boot microservices, REST APIs and event-driven integrations with RabbitMQ, PostgreSQL and AWS. Full-stack delivery with React, Angular and TypeScript, and hands-on AI-assisted development with Claude Code, Codex and AI agents.',
    ctaWork: 'View selected work',
    ctaContact: 'Get in touch',
    resume: 'Résumé (PDF)',
    availability:
      'Open to full-time, international senior software engineering roles. Currently building an industrial operations platform independently, directly with the client.',
    location:
      'Based in Blumenau, Santa Catarina, Brazil · UTC−3 · Working remotely with international teams',
  },
  work: {
    label: 'Selected Work',
    heading: 'Systems built and owned end to end.',
    intro:
      'A few projects that show how I work — from the operational problem to the running system. Selected, not exhaustive.',
    rolePrefix: 'Role',
    readCase: 'Read the full case study →',
    caseInEnglish: '(in English)',
    mini1Eyebrow: 'Senior Sistemas · GED / ECM · digital signatures',
    mini1Title: 'Document & Signature Platform',
    mini1Body:
      'Feature delivery end to end across Java / Spring Boot services and Angular, with event-driven RabbitMQ integrations across dozens of microservices.',
    mini2Eyebrow: 'Cast Group · enterprise & public-sector delivery',
    mini2Title: 'Multi-client Engineering',
    mini2Body:
      'Full-stack delivery for Bosch (international, English-speaking), TJMG, Usiminas, Prodemge and Studio Z — React and Angular front ends over Java, Spring Boot, Quarkus and Node.js services.',
    note: 'Client-specific operational, financial and infrastructure detail is omitted or anonymised.',
  },
  snapshot: {
    srHeading: 'Engineering snapshot',
    items: [
      { label: '5+ years', line: 'Professional software engineering' },
      { label: 'Enterprise', line: 'Product teams and regulated domains' },
      { label: 'International', line: 'English-speaking, distributed teams' },
      { label: 'End-to-end', line: 'Requirements, architecture, delivery, evolution' },
    ],
  },
  experience: {
    label: 'Experience',
    heading: "Where I've done this.",
    currentLabel: 'Mar 2026 – Present · Independent Software Engineer (Contractor)',
    currentBody:
      'Designing and building a modular, on-premise MES/WMS platform end to end for a plastic-injection manufacturer: Java / Spring Boot, PostgreSQL, React Native / Expo (web and mobile) and Docker, running on the factory network. Warehouse management is delivered; real-time machine monitoring is a pilot in validation; production planning covers work orders, per-machine queues, downtime and scrap. Built with an AI-assisted workflow (Claude Code and Codex) and 2,400+ automated tests. Senior engineer and sole owner, not a company or an agency.',
    readCase: 'Read the case study →',
    employmentHeading: 'Employment history',
    linkedinFull: 'Full history on LinkedIn',
    downloadResume: 'Download résumé',
    present: 'Present',
    periodTodo: 'period from CV',
  },
  expertise: {
    label: 'Expertise',
    heading: 'What I bring to a system.',
    intro: 'Grouped by capability. Filled marker: core, used daily. Hollow: working knowledge.',
    groups: [{"name":"Backend & Distributed Systems","core":5,"items":["Java","Spring Boot","REST APIs","Microservices","RabbitMQ","Event-driven architecture","Node.js","Quarkus","SOAP / WSDL","JWT / RBAC"]},{"name":"Data","core":2,"items":["PostgreSQL","SQL","Spring Data JPA / Hibernate","Flyway","MongoDB","SQLite"]},{"name":"Full-Stack","core":3,"items":["React","Angular","TypeScript","Next.js","Vue.js","React Native / Expo","RxJS"]},{"name":"Cloud & Delivery","core":4,"items":["AWS (S3, Lambda)","Docker","CI/CD","Git","Jenkins","GitLab","Azure DevOps","Red Hat OpenShift","Kibana / Logstash"]},{"name":"Engineering Practice","core":1,"items":["JUnit / Mockito","Code review","System design","OpenAPI / Swagger","Agile / Scrum","Release planning","Jira"]},{"name":"AI-Assisted Engineering","core":3,"items":["Claude Code","Codex","AI agents","MCP (Model Context Protocol)","Claude skills","Prompt engineering","Local LLMs (llama.cpp)","Retrieval over embeddings"]}],
  },
  how: {
    label: 'How I Work',
    heading: "One loop, whether it's a team's codebase or a client's problem.",
    steps: [
      {
        name: 'Understand',
        line: 'Start from the operational problem and the people who have it, not the feature list.',
      },
      {
        name: 'Design',
        line: 'Choose the simplest architecture that satisfies the real requirements, and make the trade-offs explicit.',
      },
      {
        name: 'Build',
        line: 'Implement in small, verifiable increments, with tests that prove behaviour.',
      },
      {
        name: 'Validate',
        line: 'Check against the requirements and real usage; fix what the feedback surfaces.',
      },
      {
        name: 'Evolve',
        line: 'Keep the system maintainable as it grows, and treat the roadmap as hypotheses, not promises.',
      },
    ],
  },
  about: {
    label: 'About',
    p1: 'I\'m a Senior Software Engineer with 5+ years building software for enterprise product teams and, more recently, directly for an industrial client. My focus is backend engineering in Java and Spring Boot — REST APIs, event-driven microservices, distributed systems — with the full-stack range in React and Angular to deliver a complete product. I work with AI tools every day (Claude Code, Codex and agents and skills I build myself), and I own the work from the first conversation to production.',
    p2: "Right now I'm building an industrial operations platform end to end for a manufacturing client — in the room for requirements, architecture, trade-offs and the long tail of maintenance and evolution. That end-to-end responsibility is the part of the work I care most about; it's an engineering engagement, not a company or an agency.",
    factLocation: 'Location',
    factWork: 'Work',
    factLanguages: 'Languages',
    workValue: 'Remote, with international teams',
    relocationConfirm: 'confirm public wording',
    languagesValue: 'Portuguese (native) · English (advanced, C1)',
  },
  closing: {
    aria: 'Get in touch',
    line: "If any of this matches what you're hiring for or building, the next step is a short conversation.",
    cta: 'Get in touch',
  },
  contact: {
    heading: "Let's talk.",
    emailMe: 'Get in touch',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    resume: 'Résumé (PDF)',
    copy: 'Copy',
    copied: 'Copied',
  },
  footer: {
    email: 'Email',
    legal: '· Based in Blumenau, Brazil (UTC−3) · Built with Astro',
    backToTop: 'Back to top',
  },
  sys: {
    signal: 'Signal',
    hero: {
      tags: ["Java · Spring Boot","Event-driven · RabbitMQ","React · TypeScript","Claude Code · AI agents","Open to international roles"],
      tagsLabel: 'Profile at a glance',
    },
    peak: {
      label: 'System view',
      heading: 'How I think about a system.',
      intro: 'A generic, anonymised architecture: the shape of the platforms I build. No client data, only structure.',
      diagramLabel: 'Architecture diagram: clients, REST API, event bus, domain services and database, with events flowing between them.',
      nodes: { client: 'Web · Mobile', api: 'REST API · Spring Boot', bus: 'Event bus · RabbitMQ', services: 'Domain services', db: 'PostgreSQL', obs: 'Observability' },
      steps: [
        'People use web and mobile clients.',
        'A REST API validates input and owns the rules.',
        'State changes become events on a bus.',
        'Independent services react to those events.',
        'Data is persisted, observed and kept evolvable.',
      ],
    },
    caseLabels: { problem: 'Problem', built: 'What I built', stack: 'Stack', result: 'Result' },
    cases: [{"tag":"Industrial manufacturing client · Mar 2026 – present","title":"Industrial Operations Platform (MES / WMS)","problem":"A plastic-injection manufacturer tracked materials, moulds and production in spreadsheets, labels and memory. Finding stock, knowing what had happened to it and knowing what each machine was doing got slower as volume grew.","built":"A modular, on-premise MES/WMS platform, as sole engineer. Warehouse management (delivered): locations, 2D/3D views, drag-and-drop operations, audit history, role-based access and PDF reports. Machine monitoring (pilot in validation): a Node.js edge app reads machine digital inputs and outputs every 300 ms over HTTP and Modbus-TCP, detects cycles, buffers offline in SQLite and resends; the backend ingests events idempotently, validated by sequence. Production planning: work-order lifecycle, per-machine queue, downtime and scrap tracking. Client care: versioned proposals with acceptance criteria and change control, and a documentation site with a plain-language user manual built from real screens plus a full API reference (OpenAPI specification, interactive Swagger, PDF).","stack":"Java · Spring Boot · PostgreSQL · Docker · Node.js · Modbus-TCP · SQLite · React Native / Expo · JWT","result":"Warehouse management runs on the factory network. 2,400+ automated tests across the edge app, the backend (JUnit 5 / Mockito) and the UI (Jest), written in an AI-assisted workflow with Claude Code and Codex. Planned, not built yet: the full machine fleet, MQTT, and OEE / MTBF / MTTR indicators.","href":true},{"tag":"Senior Sistemas · GED / ECM · digital signature","title":"Document & Signature Platform","problem":"Document-management and digital-signature products used by thousands of corporate accounts, split across dozens of interdependent microservices that had to ship without breaking each other.","built":"Worked across 12 components of the suite (5 Angular front ends and 7 Spring Boot services): REST APIs on PostgreSQL with document storage on AWS S3, PDF stamping and audit reports, bulk import and batch operations, and asynchronous, event-driven integrations on RabbitMQ.","stack":"Java · Spring Boot · Angular · PostgreSQL · RabbitMQ · AWS S3","result":"Features delivered end to end, releases kept free of breaking changes across services, and log traceability driven with Kibana and Logstash.","href":false},{"tag":"Cast Group · Studio Z · e-commerce","title":"E-commerce Restocking Platform","problem":"An e-commerce restocking platform that depended on external systems, and where slow data retrieval was limiting the operation.","built":"Java / Spring Boot microservices with SAP and SOAP / WSDL integrations, deployed on Red Hat OpenShift, in a Scrum team. Later defined and led enhancement packages, turning client requirements into deliverable scope.","stack":"Java · Spring Boot · Microservices · SAP · SOAP / WSDL · SQL · OpenShift","result":"Complex SQL queries engineered and optimised, increasing query speed by 40% and reducing database response time.","href":false},{"tag":"Cast Group · enterprise and public sector","title":"Multi-client Engineering","problem":"Enterprise and public-sector teams that needed full-stack software: manual drafting of government procurement notices, a legacy JSF logistics system, statewide apps.","built":"Full-stack delivery for an international industrial group (a project run entirely in English), a state court, a steelmaker and a state IT company, with React, Angular and Vue.js front ends over Java, Spring Boot, Quarkus and Node.js services.","stack":"Java · Spring Boot · Quarkus · Node.js · React · Angular · Vue.js","result":"A browser extension that cut days of drafting to minutes (state court), a legacy JSF-to-Quarkus migration (steelmaker), and statewide school asset-tracking and hospital scheduling apps.","href":false}],
    portfolio: {
      heading: 'Real projects first, then product suites.',
      body: 'A local multi-agent system with its own MCP server, an industrial MES/WMS platform and an AI-assisted engineering method, followed by three product suites you can open in the browser with fictional data.',
      cta: 'Browse the portfolio',
    },
    map: { core: 'Core', working: 'Working', legend: 'Filled: core. Hollow: working knowledge.' },
    proof: {
      label: 'Proof',
      heading: 'Where to check my work.',
      quotes: [] as { text: string; name: string; role: string }[],
      links: 'Career history and code',
    },
    pf: { label: 'Catalogue', heading: 'Every system, at a glance.', intro: 'The same projects as the carousel above, grouped by category. Open any of them in your browser; the data is fictional.', open: 'Open live demo', sky: 'Constellation of projects: each dot is one system, grouped by category.', hint: 'Tap a dot to jump to that project' },
    contactReply: 'I reply within 48 business hours.',
    resumeLang: 'PDF · EN',
  },
  caseNotice: 'This case study is currently available in English only.',
  notFound: {
    title: 'Page not found',
    body: "That page doesn't exist or has moved.",
    home: 'Back to home',
  },
};

export type Dict = typeof en;

const pt: Dict = {
  nav: { work: 'Trabalhos', experience: 'Experiência', expertise: 'Especialidades', contact: 'Contato', portfolio: 'Portfólio' },
  a11y: {
    theme: 'Alternar tema de cores',
    themeLabel: 'Tema',
    home: 'início',
    skip: 'Pular para o conteúdo',
    primaryNav: 'Principal',
    footerNav: 'Rodapé',
    changeLanguage: 'Mudar idioma',
    newTab: '(abre em uma nova aba)',
  },
  header: { resume: 'Currículo' },
  meta: {
    titleSuffix: 'Java · Spring Boot · Sistemas Distribuídos',
    description:
      'Engenheiro de software sênior com foco em backend: Java, Spring Boot, microsserviços e integrações orientadas a eventos com RabbitMQ, PostgreSQL e AWS, com React, Angular e TypeScript no front-end. Mais de 5 anos em sistemas corporativos em produção e desenvolvimento assistido por IA no dia a dia, com Claude Code, Codex e agentes de IA. Em Blumenau, Brasil, trabalhando com times internacionais.',
  },
  role: 'Engenheiro de Software Sênior · Backend e Full Stack',
  hero: {
    title: 'Software confiável para operações do mundo real.',
    sub: 'Mais de 5 anos construindo sistemas corporativos em produção. Backend primeiro: microsserviços Java e Spring Boot, APIs REST e integrações orientadas a eventos com RabbitMQ, PostgreSQL e AWS. Entrega full-stack com React, Angular e TypeScript, e desenvolvimento assistido por IA com Claude Code, Codex e agentes de IA.',
    ctaWork: 'Ver trabalhos selecionados',
    ctaContact: 'Fale comigo',
    resume: 'Currículo (PDF)',
    availability:
      'Aberto a vagas full-time internacionais de engenharia de software sênior. Atualmente construindo uma plataforma de operações industriais de forma independente, diretamente com o cliente.',
    location:
      'Em Blumenau, Santa Catarina, Brasil · UTC−3 · Trabalhando remotamente com times internacionais',
  },
  work: {
    label: 'Trabalhos Selecionados',
    heading: 'Sistemas construídos e mantidos de ponta a ponta.',
    intro:
      'Alguns projetos que mostram como eu trabalho — do problema operacional ao sistema em produção. Uma seleção, não uma lista completa.',
    rolePrefix: 'Função',
    readCase: 'Ler o estudo de caso completo →',
    caseInEnglish: '(em inglês)',
    mini1Eyebrow: 'Senior Sistemas · GED / ECM · assinaturas digitais',
    mini1Title: 'Plataforma de Documentos e Assinaturas',
    mini1Body:
      'Entrega de funcionalidades de ponta a ponta em serviços Java / Spring Boot e Angular, com integrações orientadas a eventos via RabbitMQ entre dezenas de microsserviços.',
    mini2Eyebrow: 'Cast Group · entregas para setor privado e público',
    mini2Title: 'Engenharia Multicliente',
    mini2Body:
      'Entrega full-stack para Bosch (projeto internacional, em inglês), TJMG, Usiminas, Prodemge e Studio Z — front-ends React e Angular sobre serviços Java, Spring Boot, Quarkus e Node.js.',
    note: 'Detalhes operacionais, financeiros e de infraestrutura específicos do cliente são omitidos ou anonimizados.',
  },
  snapshot: {
    srHeading: 'Panorama de engenharia',
    items: [
      { label: '5+ anos', line: 'Engenharia de software profissional' },
      { label: 'Corporativo', line: 'Times de produto e domínios regulados' },
      { label: 'Internacional', line: 'Times distribuídos, em inglês' },
      { label: 'Ponta a ponta', line: 'Requisitos, arquitetura, entrega, evolução' },
    ],
  },
  experience: {
    label: 'Experiência',
    heading: 'Onde eu fiz isso.',
    currentLabel: 'Mar 2026 – Atual · Engenheiro de Software Independente (Contractor)',
    currentBody:
      'Projeto e construção, de ponta a ponta, de uma plataforma MES/WMS modular e on-premise para uma fabricante de injeção plástica: Java / Spring Boot, PostgreSQL, React Native / Expo (web e mobile) e Docker, rodando na rede da fábrica. A gestão de armazém está entregue; o monitoramento de máquinas em tempo real é um piloto em validação; o planejamento de produção cobre ordens de produção, fila por máquina, paradas e refugo. Construída com fluxo assistido por IA (Claude Code e Codex) e mais de 2.400 testes automatizados. Engenheiro sênior e único responsável, não uma empresa ou agência.',
    readCase: 'Ler o estudo de caso →',
    employmentHeading: 'Histórico profissional',
    linkedinFull: 'Histórico completo no LinkedIn',
    downloadResume: 'Baixar currículo',
    present: 'Presente',
    periodTodo: 'período do CV',
  },
  expertise: {
    label: 'Especialidades',
    heading: 'O que eu trago para um sistema.',
    intro: 'Agrupado por competência. Marcador cheio: domínio principal, uso diário. Vazio: conhecimento de trabalho.',
    groups: [{"name":"Backend e Sistemas Distribuídos","core":5,"items":["Java","Spring Boot","REST APIs","Microservices","RabbitMQ","Arquitetura orientada a eventos","Node.js","Quarkus","SOAP / WSDL","JWT / RBAC"]},{"name":"Dados","core":2,"items":["PostgreSQL","SQL","Spring Data JPA / Hibernate","Flyway","MongoDB","SQLite"]},{"name":"Full-Stack","core":3,"items":["React","Angular","TypeScript","Next.js","Vue.js","React Native / Expo","RxJS"]},{"name":"Nuvem e Entrega","core":4,"items":["AWS (S3, Lambda)","Docker","CI/CD","Git","Jenkins","GitLab","Azure DevOps","Red Hat OpenShift","Kibana / Logstash"]},{"name":"Prática de Engenharia","core":1,"items":["JUnit / Mockito","Code review","Design de sistemas","OpenAPI / Swagger","Agile / Scrum","Planejamento de releases","Jira"]},{"name":"Engenharia Assistida por IA","core":3,"items":["Claude Code","Codex","Agentes de IA","MCP (Model Context Protocol)","Skills do Claude","Engenharia de prompt","LLMs locais (llama.cpp)","Busca por embeddings"]}],
  },
  how: {
    label: 'Como Eu Trabalho',
    heading: 'Um mesmo ciclo, seja no código de um time ou no problema de um cliente.',
    steps: [
      {
        name: 'Entender',
        line: 'Partir do problema operacional e das pessoas que o vivem, não da lista de funcionalidades.',
      },
      {
        name: 'Projetar',
        line: 'Escolher a arquitetura mais simples que atende aos requisitos reais, deixando os trade-offs explícitos.',
      },
      {
        name: 'Construir',
        line: 'Implementar em incrementos pequenos e verificáveis, com testes que provam comportamento.',
      },
      {
        name: 'Validar',
        line: 'Verificar contra os requisitos e o uso real; corrigir o que o feedback revela.',
      },
      {
        name: 'Evoluir',
        line: 'Manter o sistema sustentável conforme ele cresce, e tratar o roadmap como hipóteses, não promessas.',
      },
    ],
  },
  about: {
    label: 'Sobre',
    p1: 'Sou Engenheiro de Software Sênior, com mais de 5 anos construindo software para times de produto corporativos e, mais recentemente, diretamente para um cliente industrial. Meu foco é engenharia de backend em Java e Spring Boot — APIs REST, microsserviços orientados a eventos, sistemas distribuídos — com o alcance full-stack em React e Angular para entregar um produto completo. Trabalho com ferramentas de IA todos os dias (Claude Code, Codex e agentes e skills que eu mesmo construo) e assumo o trabalho da primeira conversa até a produção.',
    p2: 'Neste momento estou construindo, de ponta a ponta, uma plataforma de operações industriais para um cliente da manufatura — presente nas decisões de requisitos, arquitetura, trade-offs e em toda a cauda longa de manutenção e evolução. Essa responsabilidade de ponta a ponta é a parte do trabalho com que mais me importo; é um trabalho de engenharia, não uma empresa nem uma agência.',
    factLocation: 'Localização',
    factWork: 'Trabalho',
    factLanguages: 'Idiomas',
    workValue: 'Remoto, com times internacionais',
    relocationConfirm: 'confirmar texto público',
    languagesValue: 'Português (nativo) · Inglês (avançado, C1)',
  },
  closing: {
    aria: 'Fale comigo',
    line: 'Se algo disso combina com o que você está contratando ou construindo, o próximo passo é uma conversa rápida.',
    cta: 'Fale comigo',
  },
  contact: {
    heading: 'Vamos conversar.',
    emailMe: 'Fale comigo',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    resume: 'Currículo (PDF)',
    copy: 'Copiar',
    copied: 'Copiado',
  },
  footer: {
    email: 'E-mail',
    legal: '· Em Blumenau, Brasil (UTC−3) · Feito com Astro',
    backToTop: 'Voltar ao topo',
  },
  sys: {
    signal: 'Sinal',
    hero: {
      tags: ["Java · Spring Boot","Orientado a eventos · RabbitMQ","React · TypeScript","Claude Code · agentes de IA","Aberto a vagas internacionais"],
      tagsLabel: 'Perfil resumido',
    },
    peak: {
      label: 'Visão de sistema',
      heading: 'Como eu penso um sistema.',
      intro: 'Uma arquitetura genérica e anonimizada: o formato das plataformas que construo. Nenhum dado de cliente, só estrutura.',
      diagramLabel: 'Diagrama de arquitetura: clientes, API REST, barramento de eventos, serviços de domínio e banco de dados, com eventos fluindo entre eles.',
      nodes: { client: 'Web · Mobile', api: 'API REST · Spring Boot', bus: 'Barramento · RabbitMQ', services: 'Serviços de domínio', db: 'PostgreSQL', obs: 'Observabilidade' },
      steps: [
        'Pessoas usam clientes web e mobile.',
        'Uma API REST valida a entrada e guarda as regras.',
        'Mudanças de estado viram eventos no barramento.',
        'Serviços independentes reagem a esses eventos.',
        'Os dados são persistidos, observados e mantidos evolutivos.',
      ],
    },
    caseLabels: { problem: 'Problema', built: 'O que construí', stack: 'Stack', result: 'Resultado' },
    cases: [{"tag":"Cliente de manufatura industrial · mar 2026 – atual","title":"Plataforma de Operações Industriais (MES / WMS)","problem":"Uma fabricante de injeção plástica controlava materiais, moldes e produção em planilhas, etiquetas e memória. Encontrar o estoque, saber o que tinha acontecido com ele e saber o que cada máquina estava fazendo ficava mais lento conforme o volume crescia.","built":"Uma plataforma MES/WMS modular e on-premise, como único engenheiro. Gestão de armazém (entregue): endereços, visões 2D/3D, operações de arrastar e soltar, histórico de auditoria, acesso por papéis e relatórios em PDF. Monitoramento de máquinas (piloto em validação): um aplicativo edge em Node.js lê as entradas e saídas digitais da máquina a cada 300 ms via HTTP e Modbus-TCP, detecta ciclos, guarda em SQLite quando está offline e reenvia; o backend ingere os eventos de forma idempotente, validados por sequência. Planejamento de produção: ciclo de vida das ordens, fila por máquina, paradas e refugo. Cuidado com o cliente: propostas versionadas com critérios de aceite e controle de mudanças, e um site de documentação com manual do usuário em linguagem simples, feito com as telas reais, mais a referência completa da API (especificação OpenAPI, Swagger interativo, PDF).","stack":"Java · Spring Boot · PostgreSQL · Docker · Node.js · Modbus-TCP · SQLite · React Native / Expo · JWT","result":"A gestão de armazém roda na rede da fábrica. Mais de 2.400 testes automatizados entre o edge, o backend (JUnit 5 / Mockito) e a interface (Jest), escritos em fluxo assistido por IA com Claude Code e Codex. Planejado, ainda não construído: a frota completa de máquinas, MQTT e indicadores OEE / MTBF / MTTR.","href":true},{"tag":"Senior Sistemas · GED / ECM · assinatura digital","title":"Plataforma de Documentos e Assinatura","problem":"Produtos de gestão de documentos e assinatura digital usados por milhares de contas corporativas, divididos em dezenas de microsserviços interdependentes que precisavam ser publicados sem quebrar uns aos outros.","built":"Atuei em 12 componentes da suíte (5 front-ends Angular e 7 serviços Spring Boot): APIs REST em PostgreSQL com armazenamento de documentos no AWS S3, carimbo em PDF e relatórios de auditoria, importação em massa e operações em lote, e integrações assíncronas orientadas a eventos no RabbitMQ.","stack":"Java · Spring Boot · Angular · PostgreSQL · RabbitMQ · AWS S3","result":"Funcionalidades entregues de ponta a ponta, releases sem quebras entre serviços e rastreabilidade de logs conduzida com Kibana e Logstash.","href":false},{"tag":"Cast Group · Studio Z · e-commerce","title":"Plataforma de Reposição de E-commerce","problem":"Uma plataforma de reposição de e-commerce que dependia de sistemas externos, e em que a lentidão na consulta de dados limitava a operação.","built":"Microsserviços Java / Spring Boot com integrações SAP e SOAP / WSDL, implantados em Red Hat OpenShift, em um time Scrum. Depois, defini e conduzi pacotes de melhoria, transformando requisitos do cliente em escopo entregável.","stack":"Java · Spring Boot · Microsserviços · SAP · SOAP / WSDL · SQL · OpenShift","result":"Consultas SQL complexas projetadas e otimizadas, com aumento de 40% na velocidade das consultas e redução do tempo de resposta do banco.","href":false},{"tag":"Cast Group · corporativo e setor público","title":"Engenharia para Vários Clientes","problem":"Times corporativos e do setor público que precisavam de software full-stack: redação manual de avisos de licitação, um sistema legado de logística em JSF, aplicações estaduais.","built":"Entrega full-stack para um grupo industrial internacional (projeto conduzido inteiramente em inglês), um tribunal estadual, uma siderúrgica e uma empresa estadual de TI, com front-ends React, Angular e Vue.js sobre serviços Java, Spring Boot, Quarkus e Node.js.","stack":"Java · Spring Boot · Quarkus · Node.js · React · Angular · Vue.js","result":"Uma extensão de navegador que reduziu dias de redação a minutos (tribunal estadual), a migração de um legado JSF para Quarkus (siderúrgica) e aplicações estaduais de controle de patrimônio escolar e agendamento hospitalar.","href":false}],
    portfolio: {
      heading: 'Projetos reais primeiro, depois as suítes de produto.',
      body: 'Um sistema multiagente local com servidor MCP próprio, uma plataforma industrial MES/WMS e um método de engenharia assistida por IA, seguidos de três suítes de produto que você abre no navegador com dados fictícios.',
      cta: 'Ver o portfólio',
    },
    map: { core: 'Principal', working: 'Trabalho', legend: 'Cheio: principal. Vazio: conhecimento de trabalho.' },
    proof: {
      label: 'Provas',
      heading: 'Onde conferir meu trabalho.',
      quotes: [] as { text: string; name: string; role: string }[],
      links: 'Histórico de carreira e código',
    },
    pf: { label: 'Catálogo', heading: 'Todos os sistemas, de relance.', intro: 'Os mesmos projetos do carrossel acima, agrupados por categoria. Abra qualquer um no navegador; os dados são fictícios.', open: 'Abrir demo ao vivo', sky: 'Constelação de projetos: cada ponto é um sistema, agrupado por categoria.', hint: 'Toque em um ponto para ir ao projeto' },
    contactReply: 'Respondo em até 48 horas úteis.',
    resumeLang: 'PDF · EN',
  },
  caseNotice: 'Este estudo de caso está disponível apenas em inglês no momento.',
  notFound: {
    title: 'Página não encontrada',
    body: 'Essa página não existe ou foi movida.',
    home: 'Voltar para o início',
  },
};

const es: Dict = {
  nav: { work: 'Trabajos', experience: 'Experiencia', expertise: 'Especialidades', contact: 'Contacto', portfolio: 'Portafolio' },
  a11y: {
    theme: 'Cambiar tema de color',
    themeLabel: 'Tema',
    home: 'inicio',
    skip: 'Saltar al contenido',
    primaryNav: 'Principal',
    footerNav: 'Pie de página',
    changeLanguage: 'Cambiar idioma',
    newTab: '(se abre en una pestaña nueva)',
  },
  header: { resume: 'CV' },
  meta: {
    titleSuffix: 'Java · Spring Boot · Sistemas Distribuidos',
    description:
      'Ingeniero de software senior con foco en backend: Java, Spring Boot, microservicios e integraciones orientadas a eventos con RabbitMQ, PostgreSQL y AWS, con React, Angular y TypeScript en el front-end. Más de 5 años en sistemas corporativos en producción y desarrollo asistido por IA en el día a día, con Claude Code, Codex y agentes de IA. En Blumenau, Brasil, trabajando con equipos internacionales.',
  },
  role: 'Ingeniero de Software Senior · Backend y Full Stack',
  hero: {
    title: 'Software confiable para operaciones del mundo real.',
    sub: 'Más de 5 años construyendo sistemas corporativos en producción. Backend primero: microservicios Java y Spring Boot, APIs REST e integraciones orientadas a eventos con RabbitMQ, PostgreSQL y AWS. Entrega full-stack con React, Angular y TypeScript, y desarrollo asistido por IA con Claude Code, Codex y agentes de IA.',
    ctaWork: 'Ver trabajos seleccionados',
    ctaContact: 'Hablemos',
    resume: 'CV (PDF)',
    availability:
      'Abierto a puestos full-time internacionales de ingeniería de software senior. Actualmente desarrollando una plataforma de operaciones industriales de forma independiente, directamente con el cliente.',
    location:
      'En Blumenau, Santa Catarina, Brasil · UTC−3 · Trabajando en remoto con equipos internacionales',
  },
  work: {
    label: 'Trabajos Seleccionados',
    heading: 'Sistemas construidos y mantenidos de extremo a extremo.',
    intro:
      'Algunos proyectos que muestran cómo trabajo — del problema operativo al sistema en producción. Una selección, no una lista exhaustiva.',
    rolePrefix: 'Rol',
    readCase: 'Leer el caso completo →',
    caseInEnglish: '(en inglés)',
    mini1Eyebrow: 'Senior Sistemas · GED / ECM · firmas digitales',
    mini1Title: 'Plataforma de Documentos y Firmas',
    mini1Body:
      'Entrega de funcionalidades de extremo a extremo en servicios Java / Spring Boot y Angular, con integraciones orientadas a eventos vía RabbitMQ entre decenas de microservicios.',
    mini2Eyebrow: 'Cast Group · entregas para sector privado y público',
    mini2Title: 'Ingeniería Multicliente',
    mini2Body:
      'Entrega full-stack para Bosch (proyecto internacional, en inglés), TJMG, Usiminas, Prodemge y Studio Z — front-ends React y Angular sobre servicios Java, Spring Boot, Quarkus y Node.js.',
    note: 'Los detalles operativos, financieros y de infraestructura específicos del cliente se omiten o se anonimizan.',
  },
  snapshot: {
    srHeading: 'Panorama de ingeniería',
    items: [
      { label: '5+ años', line: 'Ingeniería de software profesional' },
      { label: 'Corporativo', line: 'Equipos de producto y dominios regulados' },
      { label: 'Internacional', line: 'Equipos distribuidos, en inglés' },
      { label: 'Extremo a extremo', line: 'Requisitos, arquitectura, entrega, evolución' },
    ],
  },
  experience: {
    label: 'Experiencia',
    heading: 'Dónde lo he hecho.',
    currentLabel: 'Mar 2026 – Actualidad · Ingeniero de Software Independiente (Contractor)',
    currentBody:
      'Diseño y construcción, de extremo a extremo, de una plataforma MES/WMS modular y on-premise para un fabricante de inyección de plástico: Java / Spring Boot, PostgreSQL, React Native / Expo (web y móvil) y Docker, en la red de la fábrica. La gestión de almacén está entregada; el monitoreo de máquinas en tiempo real es un piloto en validación; la planificación de producción cubre órdenes de producción, cola por máquina, paradas y scrap. Construida con un flujo asistido por IA (Claude Code y Codex) y más de 2.400 pruebas automatizadas. Ingeniero senior y único responsable, no una empresa ni una agencia.',
    readCase: 'Leer el caso →',
    employmentHeading: 'Historial profesional',
    linkedinFull: 'Historial completo en LinkedIn',
    downloadResume: 'Descargar CV',
    present: 'Presente',
    periodTodo: 'período del CV',
  },
  expertise: {
    label: 'Especialidades',
    heading: 'Lo que aporto a un sistema.',
    intro: 'Agrupado por competencia. Marcador lleno: dominio principal, uso diario. Vacío: conocimiento de trabajo.',
    groups: [{"name":"Backend y Sistemas Distribuidos","core":5,"items":["Java","Spring Boot","REST APIs","Microservices","RabbitMQ","Arquitectura orientada a eventos","Node.js","Quarkus","SOAP / WSDL","JWT / RBAC"]},{"name":"Datos","core":2,"items":["PostgreSQL","SQL","Spring Data JPA / Hibernate","Flyway","MongoDB","SQLite"]},{"name":"Full-Stack","core":3,"items":["React","Angular","TypeScript","Next.js","Vue.js","React Native / Expo","RxJS"]},{"name":"Nube y Entrega","core":4,"items":["AWS (S3, Lambda)","Docker","CI/CD","Git","Jenkins","GitLab","Azure DevOps","Red Hat OpenShift","Kibana / Logstash"]},{"name":"Práctica de Ingeniería","core":1,"items":["JUnit / Mockito","Code review","Diseño de sistemas","OpenAPI / Swagger","Agile / Scrum","Planificación de releases","Jira"]},{"name":"Ingeniería Asistida por IA","core":3,"items":["Claude Code","Codex","Agentes de IA","MCP (Model Context Protocol)","Skills de Claude","Ingeniería de prompts","LLMs locales (llama.cpp)","Búsqueda por embeddings"]}],
  },
  how: {
    label: 'Cómo Trabajo',
    heading: 'Un mismo ciclo, ya sea en el código de un equipo o en el problema de un cliente.',
    steps: [
      {
        name: 'Entender',
        line: 'Partir del problema operativo y de las personas que lo viven, no de la lista de funcionalidades.',
      },
      {
        name: 'Diseñar',
        line: 'Elegir la arquitectura más simple que satisface los requisitos reales, dejando los trade-offs explícitos.',
      },
      {
        name: 'Construir',
        line: 'Implementar en incrementos pequeños y verificables, con pruebas que demuestran el comportamiento.',
      },
      {
        name: 'Validar',
        line: 'Contrastar con los requisitos y el uso real; corregir lo que el feedback revela.',
      },
      {
        name: 'Evolucionar',
        line: 'Mantener el sistema mantenible a medida que crece, y tratar el roadmap como hipótesis, no promesas.',
      },
    ],
  },
  about: {
    label: 'Sobre mí',
    p1: 'Soy Ingeniero de Software Senior, con más de 5 años construyendo software para equipos de producto corporativos y, más recientemente, directamente para un cliente industrial. Mi foco es la ingeniería de backend en Java y Spring Boot — APIs REST, microservicios orientados a eventos, sistemas distribuidos — con el alcance full-stack en React y Angular para entregar un producto completo. Trabajo con herramientas de IA todos los días (Claude Code, Codex y agentes y skills que construyo yo mismo) y asumo el trabajo desde la primera conversación hasta producción.',
    p2: 'En este momento estoy construyendo, de extremo a extremo, una plataforma de operaciones industriales para un cliente de manufactura — presente en las decisiones de requisitos, arquitectura, trade-offs y en toda la cola larga de mantenimiento y evolución. Esa responsabilidad de extremo a extremo es la parte del trabajo que más me importa; es un trabajo de ingeniería, no una empresa ni una agencia.',
    factLocation: 'Ubicación',
    factWork: 'Trabajo',
    factLanguages: 'Idiomas',
    workValue: 'Remoto, con equipos internacionales',
    relocationConfirm: 'confirmar texto público',
    languagesValue: 'Portugués (nativo) · Inglés (avanzado, C1)',
  },
  closing: {
    aria: 'Hablemos',
    line: 'Si algo de esto encaja con lo que estás contratando o construyendo, el siguiente paso es una conversación breve.',
    cta: 'Hablemos',
  },
  contact: {
    heading: 'Hablemos.',
    emailMe: 'Hablemos',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    resume: 'CV (PDF)',
    copy: 'Copiar',
    copied: 'Copiado',
  },
  footer: {
    email: 'Correo',
    legal: '· En Blumenau, Brasil (UTC−3) · Hecho con Astro',
    backToTop: 'Volver arriba',
  },
  sys: {
    signal: 'Señal',
    hero: {
      tags: ["Java · Spring Boot","Orientado a eventos · RabbitMQ","React · TypeScript","Claude Code · agentes de IA","Abierto a puestos internacionales"],
      tagsLabel: 'Perfil de un vistazo',
    },
    peak: {
      label: 'Vista de sistema',
      heading: 'Cómo pienso un sistema.',
      intro: 'Una arquitectura genérica y anonimizada: la forma de las plataformas que construyo. Sin datos de clientes, solo estructura.',
      diagramLabel: 'Diagrama de arquitectura: clientes, API REST, bus de eventos, servicios de dominio y base de datos, con eventos fluyendo entre ellos.',
      nodes: { client: 'Web · Mobile', api: 'API REST · Spring Boot', bus: 'Bus de eventos · RabbitMQ', services: 'Servicios de dominio', db: 'PostgreSQL', obs: 'Observabilidad' },
      steps: [
        'Las personas usan clientes web y mobile.',
        'Una API REST valida la entrada y custodia las reglas.',
        'Los cambios de estado se vuelven eventos en un bus.',
        'Servicios independientes reaccionan a esos eventos.',
        'Los datos se persisten, se observan y se mantienen evolutivos.',
      ],
    },
    caseLabels: { problem: 'Problema', built: 'Lo que construí', stack: 'Stack', result: 'Resultado' },
    cases: [{"tag":"Cliente de manufactura industrial · mar 2026 – actualidad","title":"Plataforma de Operaciones Industriales (MES / WMS)","problem":"Un fabricante de inyección de plástico controlaba materiales, moldes y producción con planillas, etiquetas y memoria. Encontrar el stock, saber qué había pasado con él y saber qué hacía cada máquina se volvía más lento a medida que crecía el volumen.","built":"Una plataforma MES/WMS modular y on-premise, como único ingeniero. Gestión de almacén (entregada): ubicaciones, vistas 2D/3D, operaciones de arrastrar y soltar, historial de auditoría, acceso por roles e informes en PDF. Monitoreo de máquinas (piloto en validación): una aplicación edge en Node.js lee las entradas y salidas digitales de la máquina cada 300 ms por HTTP y Modbus-TCP, detecta ciclos, guarda en SQLite cuando está sin conexión y reenvía; el backend ingiere los eventos de forma idempotente, validados por secuencia. Planificación de producción: ciclo de vida de las órdenes, cola por máquina, paradas y scrap. Cuidado del cliente: propuestas versionadas con criterios de aceptación y control de cambios, y un sitio de documentación con manual de usuario en lenguaje sencillo, hecho con las pantallas reales, más la referencia completa de la API (especificación OpenAPI, Swagger interactivo, PDF).","stack":"Java · Spring Boot · PostgreSQL · Docker · Node.js · Modbus-TCP · SQLite · React Native / Expo · JWT","result":"La gestión de almacén funciona en la red de la fábrica. Más de 2.400 pruebas automatizadas entre el edge, el backend (JUnit 5 / Mockito) y la interfaz (Jest), escritas en un flujo asistido por IA con Claude Code y Codex. Planificado, aún no construido: la flota completa de máquinas, MQTT e indicadores OEE / MTBF / MTTR.","href":true},{"tag":"Senior Sistemas · GED / ECM · firma digital","title":"Plataforma de Documentos y Firma","problem":"Productos de gestión documental y firma digital usados por miles de cuentas corporativas, repartidos en decenas de microservicios interdependientes que debían publicarse sin romperse entre sí.","built":"Trabajé en 12 componentes de la suite (5 front-ends Angular y 7 servicios Spring Boot): APIs REST sobre PostgreSQL con almacenamiento de documentos en AWS S3, sellado de PDF e informes de auditoría, importación masiva y operaciones por lotes, e integraciones asíncronas orientadas a eventos en RabbitMQ.","stack":"Java · Spring Boot · Angular · PostgreSQL · RabbitMQ · AWS S3","result":"Funcionalidades entregadas de extremo a extremo, releases sin rupturas entre servicios y trazabilidad de logs impulsada con Kibana y Logstash.","href":false},{"tag":"Cast Group · Studio Z · e-commerce","title":"Plataforma de Reposición de E-commerce","problem":"Una plataforma de reposición de e-commerce que dependía de sistemas externos, y en la que la lentitud de las consultas de datos limitaba la operación.","built":"Microservicios Java / Spring Boot con integraciones SAP y SOAP / WSDL, desplegados en Red Hat OpenShift, en un equipo Scrum. Después definí y lideré paquetes de mejora, convirtiendo requisitos del cliente en alcance entregable.","stack":"Java · Spring Boot · Microservicios · SAP · SOAP / WSDL · SQL · OpenShift","result":"Consultas SQL complejas diseñadas y optimizadas, con un aumento del 40% en la velocidad de las consultas y menor tiempo de respuesta de la base de datos.","href":false},{"tag":"Cast Group · corporativo y sector público","title":"Ingeniería para Varios Clientes","problem":"Equipos corporativos y del sector público que necesitaban software full-stack: redacción manual de avisos de licitación, un sistema heredado de logística en JSF, aplicaciones estatales.","built":"Entrega full-stack para un grupo industrial internacional (proyecto llevado íntegramente en inglés), un tribunal estatal, una siderúrgica y una empresa estatal de TI, con front-ends React, Angular y Vue.js sobre servicios Java, Spring Boot, Quarkus y Node.js.","stack":"Java · Spring Boot · Quarkus · Node.js · React · Angular · Vue.js","result":"Una extensión de navegador que redujo días de redacción a minutos (tribunal estatal), la migración de un sistema JSF heredado a Quarkus (siderúrgica) y aplicaciones estatales de control de activos escolares y agenda hospitalaria.","href":false}],
    portfolio: {
      heading: 'Primero proyectos reales, después las suites de producto.',
      body: 'Un sistema multiagente local con servidor MCP propio, una plataforma industrial MES/WMS y un método de ingeniería asistida por IA, seguidos de tres suites de producto que puedes abrir en el navegador con datos ficticios.',
      cta: 'Ver el portafolio',
    },
    map: { core: 'Principal', working: 'Trabajo', legend: 'Lleno: principal. Vacío: conocimiento de trabajo.' },
    proof: {
      label: 'Pruebas',
      heading: 'Dónde revisar mi trabajo.',
      quotes: [] as { text: string; name: string; role: string }[],
      links: 'Trayectoria y código',
    },
    pf: { label: 'Catálogo', heading: 'Todos los sistemas, de un vistazo.', intro: 'Los mismos proyectos del carrusel de arriba, agrupados por categoría. Abre cualquiera en el navegador; los datos son ficticios.', open: 'Abrir demo en vivo', sky: 'Constelación de proyectos: cada punto es un sistema, agrupado por categoría.', hint: 'Toca un punto para ir al proyecto' },
    contactReply: 'Respondo en un máximo de 48 horas hábiles.',
    resumeLang: 'PDF · EN',
  },
  caseNotice: 'Este caso de estudio está disponible solo en inglés por ahora.',
  notFound: {
    title: 'Página no encontrada',
    body: 'Esa página no existe o se ha movido.',
    home: 'Volver al inicio',
  },
};

export type Lang = 'en' | 'pt' | 'es';

export const ui: Record<Lang, Dict> = { en, pt, es };
