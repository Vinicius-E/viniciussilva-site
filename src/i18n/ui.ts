/* =========================================================================
   UI + editorial copy, per locale. Language-neutral facts (name, email,
   URLs, dates, tech names) stay in src/lib/site.ts and the content
   collections. PT-BR and ES strings are pending native review — see README.
   The Industrial Operations Platform case study stays English-only for V1;
   `caseNotice` is shown on the PT/ES routes.
   ========================================================================= */

const en = {
  nav: { work: 'Work', experience: 'Experience', expertise: 'Expertise', contact: 'Contact' },
  a11y: {
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
    intro: 'Grouped by capability, ordered by depth.',
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
    cta: 'Start a conversation',
  },
  contact: {
    heading: "Let's talk.",
    emailMe: 'Email me',
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
  caseNotice: 'This case study is currently available in English only.',
  notFound: {
    title: 'Page not found',
    body: "That page doesn't exist or has moved.",
    home: 'Back to home',
  },
};

export type Dict = typeof en;

const pt: Dict = {
  nav: { work: 'Trabalhos', experience: 'Experiência', expertise: 'Especialidades', contact: 'Contato' },
  a11y: {
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
    intro: 'Agrupado por competência, ordenado por profundidade.',
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
    cta: 'Começar uma conversa',
  },
  contact: {
    heading: 'Vamos conversar.',
    emailMe: 'Enviar e-mail',
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
  caseNotice: 'Este estudo de caso está disponível apenas em inglês no momento.',
  notFound: {
    title: 'Página não encontrada',
    body: 'Essa página não existe ou foi movida.',
    home: 'Voltar para o início',
  },
};

const es: Dict = {
  nav: { work: 'Trabajos', experience: 'Experiencia', expertise: 'Especialidades', contact: 'Contacto' },
  a11y: {
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
    intro: 'Agrupado por competencia, ordenado por profundidad.',
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
    cta: 'Iniciar una conversación',
  },
  contact: {
    heading: 'Hablemos.',
    emailMe: 'Enviar correo',
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
  caseNotice: 'Este caso de estudio está disponible solo en inglés por ahora.',
  notFound: {
    title: 'Página no encontrada',
    body: 'Esa página no existe o se ha movido.',
    home: 'Volver al inicio',
  },
};

export type Lang = 'en' | 'pt' | 'es';

export const ui: Record<Lang, Dict> = { en, pt, es };
