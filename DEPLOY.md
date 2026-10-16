# Deploy (Cloudflare Workers, static assets)

You deploy. Nothing here is run by the build.

1. **Install and build (one command):**
   ```bash
   npm install
   npm run build
   ```
   This checks the résumé PDFs, type-checks, builds `dist/` and writes the CSP.
   A `[resume] WARNING` line means the three PDFs are still identical copies (see `PLACEHOLDERS.md`).
2. **Preview locally:** `npm run preview` → http://127.0.0.1:4321 (check `/`, `/pt`, `/es`, `/portfolio`).
3. **Log in once:** `npx wrangler login` (opens the browser).
4. **Deploy:** `npx wrangler deploy`. `wrangler.jsonc` serves `./dist` as static assets under the Worker name `viniciussilva-site`.
5. **Verify the live URL:** open `/`, `/pt`, `/es`; download each résumé; toggle THEME; check the response headers (CSP, `X-Robots-Tag` on the PDFs).
6. **Custom domain later:** add it in the Cloudflare dashboard (Workers → viniciussilva-site → Domains), then change the origin in two places and rebuild:
   `astro.config.mjs` (`SITE`) and `src/lib/site.ts` (`site.url`).

Rollback: Cloudflare dashboard → Workers → viniciussilva-site → Deployments → roll back to the previous version.
