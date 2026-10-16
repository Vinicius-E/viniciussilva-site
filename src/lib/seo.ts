/* =========================================================================
   JSON-LD builders. Approved spec §H.
   Kept minimal and factual — no fabricated dates, ratings or counts.
   ========================================================================= */

import { site } from './site';
import { ui, type Lang } from '../i18n/ui';

const abs = (path: string) => new URL(path, site.url).href;

export function personLd(lang: Lang = 'en') {
  const t = ui[lang] ?? ui.en;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.legalName,
    alternateName: site.name,
    jobTitle: t.role,
    description: t.meta.description,
    url: site.url,
    image: abs('/vinicius-photo.jpg'),
    knowsLanguage: ['pt-BR', 'en'],
    sameAs: [site.socials.linkedin, site.socials.github],
    knowsAbout: [...site.knowsAbout],
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressRegion: site.location.regionCode,
      addressCountry: site.location.countryCode,
    },
  };
}

export function webSiteLd(lang: Lang = 'en') {
  const t = ui[lang] ?? ui.en;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${site.name} — ${t.role}`,
    url: site.url,
    inLanguage: { en: 'en-US', pt: 'pt-BR', es: 'es-ES' }[lang],
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
