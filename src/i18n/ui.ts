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
      'Senior full-stack software engineer — Java, Spring Boot, React, Angular, distributed systems. Five years delivering backend and full-stack features end to end for enterprise and industrial teams, including as Squad Leader. Based in Blumenau, Brazil, working with international teams.',
  },
  role: 'Senior Software Engineer · Full-Stack',
  hero: {
    title: 'Engineering reliable software for real-world operations.',
    sub: 'Five years in Java and Spring Boot backends, React and Angular front ends, and event-driven distributed systems — delivering features end to end for enterprise and industrial teams, including as Squad Leader.',
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
      'Feature delivery end to end across Java / Spring Boot services and Angular, with event-driven RabbitMQ integrations across dozens of microservices — as Squad Leader running release planning.',
    mini2Eyebrow: 'Cast Group · enterprise & public-sector delivery',
    mini2Title: 'Multi-client Engineering',
    mini2Body:
      'Full-stack delivery for Bosch (international, English-speaking), TJMG, Usiminas and Prodemge — React and Angular front ends over Java, Spring Boot, Quarkus and Node.js services.',
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
    currentLabel: 'Current work · Independent engineering project',
    currentBody:
      'Designing and building a warehouse and shop-floor operations platform end to end — requirements with stakeholders, architecture, implementation, validation and ongoing evolution. Web and mobile clients, in active use, with a planned path toward machine-signal acquisition and production monitoring. Senior engineer and sole owner, not a company or an agency.',
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
    groups: [
      {
        name: 'Backend & Distributed Systems',
        items: [
          'Java',
          'Spring Boot',
          'Quarkus',
          'REST APIs',
          'Microservices',
          'Event-driven architecture',
          'RabbitMQ',
          'Node.js',
        ],
      },
      {
        name: 'Data',
        items: ['PostgreSQL', 'SQL', 'Spring Data JPA', 'Hibernate', 'Flyway', 'MongoDB'],
      },
      {
        name: 'Full-Stack',
        items: ['Angular', 'React', 'Next.js', 'TypeScript', 'RxJS', 'React Native'],
      },
      {
        name: 'Cloud & Delivery',
        items: [
          'AWS (S3, Lambda)',
          'CI/CD',
          'Jenkins / GitLab',
          'OpenShift',
          'Kibana / Logstash',
          'Git',
        ],
      },
      {
        name: 'Engineering Practice',
        items: [
          'Software architecture',
          'System design',
          'JUnit / Mockito',
          'Code review',
          'Observability',
          'OpenAPI / Swagger',
          'Agile / Scrum',
          'Release planning',
        ],
      },
    ],
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
    p1: "I'm a Senior Software Engineer with five years building software for enterprise product teams and, more recently, directly for an industrial client. My focus is backend engineering in Java and Spring Boot — REST APIs, event-driven microservices, distributed systems — with the full-stack range in React and Angular to deliver a complete product, and the habit of owning it from the first conversation to production.",
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
      tags: ['Java · Spring Boot', 'React · Angular', 'Event-driven systems', 'Squad Leader', 'Open to international roles'],
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
    cases: [
      {
        tag: 'Industrial manufacturing client',
        title: 'Industrial Operations Platform',
        problem: 'Materials and moulds moved through storage and a finishing area in high volume, tracked in spreadsheets, labels and memory. As volume grew, finding them and knowing what had happened to them got slower and less reliable.',
        built: 'A warehouse and operations platform that began as storage and finishing-area management and grew into a web and mobile system. Sole engineer, from discovery to production.',
        stack: 'Java 21 · Spring Boot · PostgreSQL · Flyway · JWT · React · TypeScript · React Native',
        result: 'The operations team can locate materials and moulds, see how stock moved and who moved it, and reshape the storage structure themselves, without waiting for a release. In active use.',
        href: true,
      },
      {
        tag: 'Senior Sistemas · Squad Leader',
        title: 'Document & Signature Platform',
        problem: 'Document-management and digital-signature platforms used by thousands of corporate accounts, split across dozens of interdependent microservices that had to ship without breaking each other.',
        built: 'Feature delivery end to end across Java and Spring Boot services and Angular, with event-driven RabbitMQ integrations across dozens of microservices, running release planning as Squad Leader.',
        stack: 'Java · Spring Boot · Angular · RabbitMQ',
        result: 'Features delivered end to end, releases kept free of breaking changes across services, and log traceability driven with Kibana and Logstash.',
        href: false,
      },
      {
        tag: 'Cast Group · enterprise and public sector',
        title: 'Multi-client Engineering',
        problem: 'Enterprise and public-sector teams that needed full-stack software: manual drafting of government procurement notices, a legacy JSF logistics system, statewide apps.',
        built: 'Full-stack delivery for an international industrial group, a state court, a steelmaker and a state IT company, with React and Angular front ends over Java, Spring Boot, Quarkus and Node.js services.',
        stack: 'Java · Spring Boot · Quarkus · Node.js · React · Angular',
        result: 'A browser extension that cut days of drafting to minutes (state court), a legacy JSF-to-Quarkus migration (steelmaker), and statewide school asset-tracking and hospital scheduling apps.',
        href: false,
      },
    ],
    portfolio: {
      heading: 'Working systems, not mockups.',
      body: 'A catalogue of complete web systems with fictional data: two access profiles, a guided form, a KPI dashboard, in English, Portuguese and Spanish. Open any of them in your browser.',
      cta: 'Browse the portfolio',
    },
    map: { core: 'Core', working: 'Working', legend: 'Filled: core. Hollow: working knowledge.' },
    proof: {
      label: 'Proof',
      heading: 'What others say, and where to check my work.',
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
      'Engenheiro de software sênior full-stack — Java, Spring Boot, React, Angular, sistemas distribuídos. Cinco anos entregando funcionalidades de back-end e full-stack de ponta a ponta para times corporativos e industriais, inclusive como Squad Leader. Em Blumenau, Brasil, trabalhando com times internacionais.',
  },
  role: 'Engenheiro de Software Sênior · Full-Stack',
  hero: {
    title: 'Software confiável para operações do mundo real.',
    sub: 'Cinco anos em back-ends Java e Spring Boot, front-ends React e Angular e sistemas distribuídos orientados a eventos — entregando funcionalidades de ponta a ponta para times corporativos e industriais, inclusive como Squad Leader.',
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
      'Entrega de funcionalidades de ponta a ponta em serviços Java / Spring Boot e Angular, com integrações orientadas a eventos via RabbitMQ entre dezenas de microsserviços — como Squad Leader responsável pelo planejamento de releases.',
    mini2Eyebrow: 'Cast Group · entregas para setor privado e público',
    mini2Title: 'Engenharia Multicliente',
    mini2Body:
      'Entrega full-stack para Bosch (projeto internacional, em inglês), TJMG, Usiminas e Prodemge — front-ends React e Angular sobre serviços Java, Spring Boot, Quarkus e Node.js.',
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
    currentLabel: 'Trabalho atual · Projeto de engenharia independente',
    currentBody:
      'Concepção e construção, de ponta a ponta, de uma plataforma de operações de armazém e chão de fábrica — levantamento de requisitos com os stakeholders, arquitetura, implementação, validação e evolução contínua. Clientes web e mobile, em uso ativo, com um caminho planejado para aquisição de sinais das máquinas e monitoramento de produção. Engenheiro sênior e único responsável — não é uma empresa nem uma agência.',
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
    groups: [
      {
        name: 'Back-end e Sistemas Distribuídos',
        items: [
          'Java',
          'Spring Boot',
          'Quarkus',
          'APIs REST',
          'Microsserviços',
          'Arquitetura orientada a eventos',
          'RabbitMQ',
          'Node.js',
        ],
      },
      {
        name: 'Dados',
        items: ['PostgreSQL', 'SQL', 'Spring Data JPA', 'Hibernate', 'Flyway', 'MongoDB'],
      },
      {
        name: 'Full-Stack',
        items: ['Angular', 'React', 'Next.js', 'TypeScript', 'RxJS', 'React Native'],
      },
      {
        name: 'Cloud e Entrega',
        items: [
          'AWS (S3, Lambda)',
          'CI/CD',
          'Jenkins / GitLab',
          'OpenShift',
          'Kibana / Logstash',
          'Git',
        ],
      },
      {
        name: 'Prática de Engenharia',
        items: [
          'Arquitetura de software',
          'System design',
          'JUnit / Mockito',
          'Code review',
          'Observabilidade',
          'OpenAPI / Swagger',
          'Agile / Scrum',
          'Planejamento de releases',
        ],
      },
    ],
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
    p1: 'Sou Engenheiro de Software Sênior, com cinco anos construindo software para times de produto corporativos e, mais recentemente, diretamente para um cliente industrial. Meu foco é engenharia de back-end em Java e Spring Boot — APIs REST, microsserviços orientados a eventos, sistemas distribuídos — com a amplitude full-stack em React e Angular para entregar um produto completo, e o hábito de assumi-lo da primeira conversa até a produção.',
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
      tags: ['Java · Spring Boot', 'React · Angular', 'Sistemas orientados a eventos', 'Squad Leader', 'Aberto a vagas internacionais'],
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
    cases: [
      {
        tag: 'Cliente industrial (indústria de manufatura)',
        title: 'Plataforma de Operações Industriais',
        problem: 'Materiais e moldes circulavam em alto volume entre estoque e área de acabamento, controlados em planilhas, etiquetas e na memória das pessoas. Com o crescimento, localizá-los e saber o que aconteceu com eles ficou mais lento e menos confiável.',
        built: 'Uma plataforma de armazém e operações que começou como gestão de estoque e da área de acabamento e cresceu até virar um sistema web e mobile. Único engenheiro, da descoberta à produção.',
        stack: 'Java 21 · Spring Boot · PostgreSQL · Flyway · JWT · React · TypeScript · React Native',
        result: 'A operação localiza materiais e moldes, vê como o estoque se moveu e quem o moveu, e reconfigura a estrutura de armazenagem sozinha, sem esperar uma release. Em uso ativo.',
        href: true,
      },
      {
        tag: 'Senior Sistemas · Squad Leader',
        title: 'Plataforma de Documentos e Assinaturas',
        problem: 'Plataformas de gestão de documentos e assinatura digital usadas por milhares de contas corporativas, distribuídas em dezenas de microsserviços interdependentes que precisavam ser entregues sem quebrar uns aos outros.',
        built: 'Entrega de funcionalidades de ponta a ponta em serviços Java e Spring Boot e em Angular, com integrações orientadas a eventos via RabbitMQ entre dezenas de microsserviços, conduzindo o planejamento de releases como Squad Leader.',
        stack: 'Java · Spring Boot · Angular · RabbitMQ',
        result: 'Funcionalidades entregues de ponta a ponta, releases sem quebras de compatibilidade entre serviços e rastreabilidade de logs com Kibana e Logstash.',
        href: false,
      },
      {
        tag: 'Cast Group · corporativo e setor público',
        title: 'Engenharia para múltiplos clientes',
        problem: 'Times corporativos e do setor público que precisavam de software full-stack: redação manual de editais de compras governamentais, um sistema legado de logística em JSF, aplicações estaduais.',
        built: 'Entrega full-stack para um grupo industrial internacional, um tribunal estadual, uma siderúrgica e uma empresa estadual de TI, com front-ends React e Angular sobre serviços Java, Spring Boot, Quarkus e Node.js.',
        stack: 'Java · Spring Boot · Quarkus · Node.js · React · Angular',
        result: 'Uma extensão de navegador que reduziu dias de redação a minutos (tribunal estadual), a migração de um legado JSF para Quarkus (siderúrgica) e aplicações estaduais de controle de patrimônio escolar e agendamento hospitalar.',
        href: false,
      },
    ],
    portfolio: {
      heading: 'Sistemas funcionando, não maquetes.',
      body: 'Um catálogo de sistemas web completos com dados fictícios: dois perfis de acesso, formulário guiado e painel de indicadores, em português, inglês e espanhol. Abra qualquer um no navegador.',
      cta: 'Ver o portfólio',
    },
    map: { core: 'Principal', working: 'Trabalho', legend: 'Cheio: principal. Vazio: conhecimento de trabalho.' },
    proof: {
      label: 'Provas',
      heading: 'O que dizem de mim e onde conferir meu trabalho.',
      quotes: [] as { text: string; name: string; role: string }[],
      links: 'Histórico de carreira e código',
    },
    pf: { label: 'Catálogo', heading: 'Todos os sistemas, de relance.', intro: 'Os mesmos projetos do carrossel acima, agrupados por categoria. Abra qualquer um no navegador; os dados são fictícios.', open: 'Abrir demo ao vivo', sky: 'Constelação de projetos: cada ponto é um sistema, agrupado por categoria.', hint: 'Toque em um ponto para ir ao projeto' },
    contactReply: 'Respondo em até 48 horas úteis.',
    resumeLang: 'PDF · PT-BR',
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
      'Ingeniero de software senior full-stack — Java, Spring Boot, React, Angular, sistemas distribuidos. Cinco años entregando funcionalidades de back-end y full-stack de extremo a extremo para equipos corporativos e industriales, incluso como Squad Leader. En Blumenau, Brasil, trabajando con equipos internacionales.',
  },
  role: 'Ingeniero de Software Senior · Full-Stack',
  hero: {
    title: 'Software confiable para operaciones del mundo real.',
    sub: 'Cinco años en back-ends con Java y Spring Boot, front-ends con React y Angular y sistemas distribuidos orientados a eventos — entregando funcionalidades de extremo a extremo para equipos corporativos e industriales, incluso como Squad Leader.',
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
      'Entrega de funcionalidades de extremo a extremo en servicios Java / Spring Boot y Angular, con integraciones orientadas a eventos vía RabbitMQ entre decenas de microservicios — como Squad Leader a cargo de la planificación de releases.',
    mini2Eyebrow: 'Cast Group · entregas para sector privado y público',
    mini2Title: 'Ingeniería Multicliente',
    mini2Body:
      'Entrega full-stack para Bosch (proyecto internacional, en inglés), TJMG, Usiminas y Prodemge — front-ends React y Angular sobre servicios Java, Spring Boot, Quarkus y Node.js.',
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
    currentLabel: 'Trabajo actual · Proyecto de ingeniería independiente',
    currentBody:
      'Diseño y construcción, de extremo a extremo, de una plataforma de operaciones de almacén y planta — relevamiento de requisitos con los stakeholders, arquitectura, implementación, validación y evolución continua. Clientes web y móvil, en uso activo, con un camino planificado hacia la adquisición de señales de las máquinas y el monitoreo de producción. Ingeniero senior y único responsable — no es una empresa ni una agencia.',
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
    groups: [
      {
        name: 'Back-end y Sistemas Distribuidos',
        items: [
          'Java',
          'Spring Boot',
          'Quarkus',
          'APIs REST',
          'Microservicios',
          'Arquitectura orientada a eventos',
          'RabbitMQ',
          'Node.js',
        ],
      },
      {
        name: 'Datos',
        items: ['PostgreSQL', 'SQL', 'Spring Data JPA', 'Hibernate', 'Flyway', 'MongoDB'],
      },
      {
        name: 'Full-Stack',
        items: ['Angular', 'React', 'Next.js', 'TypeScript', 'RxJS', 'React Native'],
      },
      {
        name: 'Cloud y Entrega',
        items: [
          'AWS (S3, Lambda)',
          'CI/CD',
          'Jenkins / GitLab',
          'OpenShift',
          'Kibana / Logstash',
          'Git',
        ],
      },
      {
        name: 'Práctica de Ingeniería',
        items: [
          'Arquitectura de software',
          'System design',
          'JUnit / Mockito',
          'Code review',
          'Observabilidad',
          'OpenAPI / Swagger',
          'Agile / Scrum',
          'Planificación de releases',
        ],
      },
    ],
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
    p1: 'Soy Ingeniero de Software Senior, con cinco años construyendo software para equipos de producto corporativos y, más recientemente, directamente para un cliente industrial. Mi foco es la ingeniería de back-end en Java y Spring Boot — APIs REST, microservicios orientados a eventos, sistemas distribuidos — con el alcance full-stack en React y Angular para entregar un producto completo, y el hábito de hacerme cargo de él desde la primera conversación hasta producción.',
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
      tags: ['Java · Spring Boot', 'React · Angular', 'Sistemas orientados a eventos', 'Squad Leader', 'Abierto a puestos internacionales'],
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
    cases: [
      {
        tag: 'Cliente industrial (manufactura)',
        title: 'Plataforma de Operaciones Industriales',
        problem: 'Materiales y moldes circulaban en gran volumen entre almacén y área de acabado, controlados en planillas, etiquetas y la memoria de las personas. Al crecer el volumen, ubicarlos y saber qué les había pasado se volvió más lento y menos confiable.',
        built: 'Una plataforma de almacén y operaciones que empezó como gestión de stock y del área de acabado y creció hasta ser un sistema web y mobile. Único ingeniero, del descubrimiento a producción.',
        stack: 'Java 21 · Spring Boot · PostgreSQL · Flyway · JWT · React · TypeScript · React Native',
        result: 'La operación ubica materiales y moldes, ve cómo se movió el stock y quién lo movió, y reconfigura la estructura de almacenamiento por sí misma, sin esperar un release. En uso activo.',
        href: true,
      },
      {
        tag: 'Senior Sistemas · Squad Leader',
        title: 'Plataforma de Documentos y Firmas',
        problem: 'Plataformas de gestión documental y firma digital usadas por miles de cuentas corporativas, repartidas en decenas de microservicios interdependientes que debían entregarse sin romperse entre sí.',
        built: 'Entrega de funcionalidades de punta a punta en servicios Java y Spring Boot y en Angular, con integraciones orientadas a eventos vía RabbitMQ entre decenas de microservicios, liderando la planificación de releases como Squad Leader.',
        stack: 'Java · Spring Boot · Angular · RabbitMQ',
        result: 'Funcionalidades entregadas de punta a punta, releases sin quiebres de compatibilidad entre servicios y trazabilidad de logs con Kibana y Logstash.',
        href: false,
      },
      {
        tag: 'Cast Group · corporativo y sector público',
        title: 'Ingeniería para múltiples clientes',
        problem: 'Equipos corporativos y del sector público que necesitaban software full-stack: redacción manual de licitaciones públicas, un sistema logístico heredado en JSF, aplicaciones estatales.',
        built: 'Entrega full-stack para un grupo industrial internacional, un tribunal estatal, una siderúrgica y una empresa estatal de TI, con front-ends React y Angular sobre servicios Java, Spring Boot, Quarkus y Node.js.',
        stack: 'Java · Spring Boot · Quarkus · Node.js · React · Angular',
        result: 'Una extensión de navegador que redujo días de redacción a minutos (tribunal estatal), la migración de un sistema JSF heredado a Quarkus (siderúrgica) y aplicaciones estatales de control de activos escolares y agenda hospitalaria.',
        href: false,
      },
    ],
    portfolio: {
      heading: 'Sistemas funcionando, no maquetas.',
      body: 'Un catálogo de sistemas web completos con datos ficticios: dos perfiles de acceso, formulario guiado y panel de indicadores, en español, inglés y portugués. Abre cualquiera en el navegador.',
      cta: 'Ver el portafolio',
    },
    map: { core: 'Principal', working: 'Trabajo', legend: 'Lleno: principal. Vacío: conocimiento de trabajo.' },
    proof: {
      label: 'Pruebas',
      heading: 'Lo que dicen de mí y dónde revisar mi trabajo.',
      quotes: [] as { text: string; name: string; role: string }[],
      links: 'Trayectoria y código',
    },
    pf: { label: 'Catálogo', heading: 'Todos los sistemas, de un vistazo.', intro: 'Los mismos proyectos del carrusel de arriba, agrupados por categoría. Abre cualquiera en el navegador; los datos son ficticios.', open: 'Abrir demo en vivo', sky: 'Constelación de proyectos: cada punto es un sistema, agrupado por categoría.', hint: 'Toca un punto para ir al proyecto' },
    contactReply: 'Respondo en un máximo de 48 horas hábiles.',
    resumeLang: 'PDF · ES-ES',
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
