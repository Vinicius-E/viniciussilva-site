/* =========================================================================
   Site-wide constants. Single source of truth for identity, links, contact.
   Values still awaiting Vinicius' confirmation are flagged TODO[...].
   Components must never hard-code these strings.
   ========================================================================= */

export const site = {
  name: 'Vinicius Silva',
  legalName: 'Vinicius Eduardo da Silva',

  // TODO[domain]: confirm final domain, then update astro.config.mjs `site` too.
  url: 'https://viniciussilva.dev',

  // Prose copy (positioning, availability, meta description, location label) is
  // per-locale in src/i18n/ui.ts. Only language-neutral facts live here.

  location: {
    city: 'Blumenau',
    region: 'Santa Catarina',
    regionCode: 'SC',
    country: 'Brazil',
    countryCode: 'BR',
    timezone: 'UTC−3',
    // TODO[verify]: confirm exact public wording before launch.
    relocation: 'Open to relocation where visa sponsorship is available',
  },

  contact: {
    // Matches the résumé. TODO[contact]: move to a custom-domain address once the domain is set up.
    email: 'viniciuseduardo0702@hotmail.com',
    emailSubject: 'Contact via viniciussilva.dev',
  },

  socials: {
    linkedin: 'https://www.linkedin.com/in/vinicius-esilva',
    github: 'https://github.com/Vinicius-E',
  },

  // TODO[asset]: final résumé PDF (EN). Optional PT-BR version later.
  resumePath: '/vinicius-silva-cv.pdf',

  languages: [
    { name: 'Portuguese', level: 'Native' },
    { name: 'English', level: 'Advanced (C1)' },
  ],

  knowsAbout: [
    'Java',
    'Spring Boot',
    'Quarkus',
    'Backend Engineering',
    'Full-Stack Development',
    'Distributed Systems',
    'Event-Driven Architecture',
    'RabbitMQ',
    'REST APIs',
    'Microservices',
    'PostgreSQL',
    'JPA / Hibernate',
    'Software Architecture',
    'AWS',
    'TypeScript',
    'React',
    'Angular',
    'Observability',
  ],
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Contact', href: '/#contact' },
];

/** mailto: with a prefilled subject. */
export const mailtoHref = `mailto:${site.contact.email}?subject=${encodeURIComponent(
  site.contact.emailSubject,
)}`;
