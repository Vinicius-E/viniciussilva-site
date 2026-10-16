// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Used for canonical URLs, sitemap, JSON-LD and absolute OG image URLs.
// Keep in sync with src/lib/site.ts (`site.url`). Swap both when a custom domain is set.
const SITE = 'https://viniciussilva-site.viniciussilva-site.workers.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: { format: 'file' },
  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', pt: 'pt-BR', es: 'es-ES' },
      },
    }),
  ],
  image: {
    // No remote images; all assets are local.
    remotePatterns: [],
  },
  devToolbar: { enabled: false },
});
