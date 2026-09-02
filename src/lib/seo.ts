/* =========================================================================
   JSON-LD builders. Approved spec §H.
   Kept minimal and factual — no fabricated dates, ratings or counts.
   ========================================================================= */

import { site } from './site';

const abs = (path: string) => new URL(path, site.url).href;

export function personLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.legalName,
    alternateName: site.name,
    jobTitle: site.role,
    description: site.positioning,
    url: site.url,
    image: abs('/og/home.png'),
    sameAs: [site.socials.linkedin, site.socials.github],
    knowsAbout: [...site.knowsAbout],
    address: {
      '@type': 'PostalAddress',
      addressCountry: site.location.countryCode,
    },
    worksFor: {
      '@type': 'Organization',
      name: site.practice,
      description: site.practiceTagline,
    },
  };
}

export function webSiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${site.name} — ${site.role}`,
    url: site.url,
    inLanguage: 'en',
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function caseArticleLd(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    about: 'Industrial operations software',
    url: abs(opts.path),
    image: abs(opts.image ?? '/og/case-industrial.png'),
    author: { '@type': 'Person', name: site.legalName, url: site.url },
    publisher: { '@type': 'Person', name: site.legalName },
    // datePublished intentionally omitted — TODO[verify] with Vinicius before adding.
  };
}
