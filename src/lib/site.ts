/* =========================================================================
   Site-wide constants. Single source of truth for identity, links, contact.
   Every value that still needs Vinicius' confirmation is flagged TODO[verify].
   Components must never hard-code these strings.
   ========================================================================= */

export const site = {
  name: 'Vinicius Silva',
  legalName: 'Vinicius Eduardo da Silva',
  role: 'Senior Software Engineer',
  practice: 'Vinicius Silva Software Engineering',
  practiceTagline: 'Enterprise & Industrial Software Engineering',

  // TODO[domain]: confirm final domain, then update astro.config.mjs `site` too.
  url: 'https://viniciussilva.dev',

  positioning:
    'Senior Software Engineer building reliable backend and full-stack systems for enterprise and industrial operations — with end-to-end ownership from requirements to evolution.',

  metaDescription:
    'Senior Software Engineer building reliable backend and full-stack systems for enterprise and industrial operations, with end-to-end ownership from requirements to production. Based in Brazil, working with international teams.',

  availability:
    'Open to full-time international Senior Software Engineering opportunities and selected independent software projects.',

  location: {
    label: 'Based in Brazil · UTC−3 · Working remotely with international teams',
    country: 'Brazil',
    countryCode: 'BR',
    timezone: 'UTC−3',
    // TODO[verify]: confirm exact public wording before launch.
    relocation: 'Open to relocation where visa sponsorship is available',
  },

  contact: {
    // TODO[contact]: replace with a custom-domain address once the domain is set up.
    email: 'viniciuseduardo0702@hotmail.com',
    emailSubject: 'Contact via viniciussilva.dev',
  },

  socials: {
    // TODO[verify]: canonical LinkedIn URL.
    linkedin: 'https://www.linkedin.com/in/vinicius-silva',
    // TODO[verify]: canonical GitHub URL; decide whether to tidy/pin repos before launch.
    github: 'https://github.com/vinicius-silva',
  },

  // TODO[asset]: final résumé PDF (EN). Optional PT-BR version later.
  resumePath: '/vinicius-silva-cv.pdf',

  languages: [
    { name: 'Portuguese', level: 'Native' },
    // TODO[verify]: CEFR level for English.
    { name: 'English', level: 'Professional' },
  ],

  knowsAbout: [
    'Java',
    'Spring Boot',
    'Backend Engineering',
    'Full-Stack Development',
    'PostgreSQL',
    'Microservices',
    'REST APIs',
    'Software Architecture',
    'AWS',
    'TypeScript',
    'React',
    'Angular',
  ],
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Contact', href: '/#contact' },
];

/** mailto: with a prefilled subject. */
export const mailtoHref = `mailto:${site.contact.email}?subject=${encodeURIComponent(
  site.contact.emailSubject,
)}`;
