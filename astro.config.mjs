// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// TODO[domain]: replace with the final domain once chosen and registered.
// Used for canonical URLs, sitemap, JSON-LD and absolute OG image URLs.
const SITE = 'https://viniciussilva.dev';

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
