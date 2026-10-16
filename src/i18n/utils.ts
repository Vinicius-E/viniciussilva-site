/* =========================================================================
   i18n helpers. Locale is derived from the URL (/, /pt, /es) — no prop
   drilling: each component calls getLangFromUrl(Astro.url).
   ========================================================================= */

import { ui, type Dict, type Lang } from './ui';

export type { Lang } from './ui';

export const languages: Record<Lang, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
};

export const locales: Lang[] = ['en', 'pt', 'es'];
export const defaultLang: Lang = 'en';

/** value for the <html lang> attribute */
export const htmlLang: Record<Lang, string> = {
  en: 'en-US',
  pt: 'pt-BR',
  es: 'es-ES',
};

export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.replace(/\.html$/, '').split('/')[1];
  return seg === 'pt' || seg === 'es' ? seg : defaultLang;
}

/** remove a leading /pt or /es segment; always returns a path with a leading slash */
export function stripLangPrefix(pathname: string): string {
  const clean = pathname.replace(/\.html$/, '');
  const parts = clean.split('/');
  if (parts[1] === 'pt' || parts[1] === 'es') parts.splice(1, 1);
  const joined = parts.join('/');
  return joined === '' || joined === '/' ? '/' : joined.replace(/\/$/, '') || '/';
}

/** localize a root-relative path (supports "/", "/#anchor" and "/path") */
export function localizePath(path: string, lang: Lang): string {
  const clean = stripLangPrefix(path);
  if (lang === defaultLang) return clean;
  if (clean === '/') return `/${lang}`;
  if (clean.startsWith('/#')) return `/${lang}${clean.slice(1)}`;
  return `/${lang}${clean}`;
}

export function useTranslations(lang: Lang): Dict {
  return ui[lang] ?? ui[defaultLang];
}
