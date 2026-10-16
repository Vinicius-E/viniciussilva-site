# PLAN — Redesign "Sistema vivo" (Plan C) for viniciussilva-site

Branch: `redesign/scroll-craft-c` (from `master` @ a177c0d). No commit/push/deploy without the owner asking.
Owner: Vinicius Silva (personal site; Wester is ONE case among many, anonymised).
Brief status: owner approved this concept in chat (self-authored creative direction under delegation: "perfeito, siga"). Authored decisions are labelled as such.

## 1. Goal and acceptance criteria

In 30 s an international recruiter/manager understands: senior full-stack engineer (Java/Spring Boot, React/Angular, event-driven systems), 5 yrs, ex-Squad Leader, builds industrial platforms, open to full-time international roles; and clicks "Fale comigo" (contact) or downloads the résumé.

Observable acceptance (all must hold on the final build):
- A1 `npm run build` (one command) succeeds: `astro check` 0 errors, output in `dist/`, CSP script runs.
- A2 EN `/`, PT `/pt`, ES `/es` render every section; zero hard-coded user-visible strings in components (all in `src/i18n/ui.ts`, plus content collections).
- A3 Theme light/dark/system + toggle keep working; both themes AA contrast (measured, not asserted).
- A4 Lighthouse (mobile emulation, local preview) on home in each language: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95, Best-practices ≥ 95; LCP < 2.5 s on throttled 4G profile. Report actual numbers.
- A5 `prefers-reduced-motion: reduce`: no animated motion; mesh/diagram/signal render complete and static; no content lost.
- A6 Keyboard-only: every interactive element reachable, visible focus, no trap; skip link works.
- A7 No scroll-jacking: no `wheel`/`touch` listeners that preventDefault, no scroll-snap mandatory, no pinned section longer than 1.5 viewport heights.
- A8 Résumé: three PDFs `vinicius-silva-cv-en-us.pdf`, `-pt-br.pdf`, `-es-es.pdf`; each language page links to its own; analytics event `resume_download` preserved; until owner supplies finals, the existing PDF is copied under the three names and a visible build-time warning lists it (no silent placeholder).
- A9 SEO: per-language title/meta, hreflang (en-US, pt-BR, es-ES, x-default), canonical, OG image (per language), JSON-LD Person (+WebSite), sitemap with alternates, `robots.txt`.
- A10 Privacy: no real client names, product names, numbers or screenshots. Folder `public/case/wester/` renamed to `public/case/industrial/`; all references updated; `grep -ri wester` over `src public dist README` returns nothing (README note allowed to describe the rename without the name). Existing 3 case screenshots are kept ONLY if owner confirms they contain fictitious data (open question Q1); otherwise replaced by the diagram.
- A11 Existing features preserved: `/portfolio` (28 demos in `public/demos`, carousel), case page `/work/[slug]`, analytics click delegator, security probe (`npm run security`), CSP-by-hash, `_headers`, 404.
- A12 Placeholders: every number/claim the owner must provide is a visible-in-source token `[CASO 1]`, `[MÉTRICA]`, `[DEPOIMENTO 1]`…; none invented. A `PLACEHOLDERS.md` lists each one with file and key.
- A13 Deploy config: `wrangler.jsonc` (Workers static assets, `directory: ./dist`) + `DEPLOY.md` step-by-step. Owner deploys; agent does not run `wrangler deploy`.

## 2. Existing system (facts from recon, not assumptions)

- Astro 5 static, TS, MDX/MD content collections, `@astrojs/sitemap`, native i18n (`prefixDefaultLocale:false`, en/pt/es), ~2 KB inline JS, self-hosted subset fonts (Archivo Variable, IBM Plex Sans/Mono).
- Tokens in `src/styles/tokens.css` (3-state theming: bare light, `prefers-color-scheme` guarded, `[data-theme]` overrides). Cream `#f1ede6`, terracotta `#b8431e` (dark `#e4562a`), ink `#17151a`.
- Copy: `src/i18n/ui.ts`; facts: `src/lib/site.ts`; SEO: `src/lib/seo.ts`; analytics: `src/lib/analytics.ts`.
- Home = `src/components/home/HomePage.astro` composing Hero, SelectedWork, EngineeringSnapshot, Experience, Expertise, HowIWork, About, ClosingCta, Contact.
- Baseline Lighthouse (existing local JSON): 100/100/100/100, LCP 1.7 s. Regression guard: new build must not fall below A4 thresholds.
- Live site is Cloudflare Workers; repo has NO wrangler config; README/`_headers` still mention Pages. `site` URL in astro config is placeholder `viniciussilva.dev`.
- Client name appears only in `Gallery.astro`, `industrial-operations-platform.mdx`, `README.md` and the `public/case/wester` path (grep verified).

## 3. Scroll-craft design (authored)

**Grammar:** "living technical document": editorial, instrumented, light-weight; one persistent vertical *signal* + a node-mesh hero that resolves into an architecture diagram at the peak. Not filmic one-shot, not video-driven. Why the other grammars lose: content is dense reading material (experience, case studies, 28 demos), message is "reliable" not "spectacular", and no video/AI imagery budget or need exists.

**Journey (beats → sections):** Recognition (Hero) → Proof (fact strip, breath) → **Peak: Substance (Selected work)** → Volume (Portfolio) → Trajectory (Experience timeline) → Range (Skills map) → Trust (Proof: testimonials/links) → Commitment (Contact).

**Feeling curve (intended):** Hero = curiosity+calm precision; Fact strip = quick confidence; Work = "wow, it's a real system" (PEAK); Portfolio = abundance; Experience = steady credibility; Skills = clarity; Proof = trust; Contact = ease and invitation. No two adjacent equal.

**Peak:** in Selected work the hero mesh re-forms into a genuine, anonymised architecture diagram (client → API → queue → services → DB) with event pulses; it gets the largest scroll span (≈ 1.5 viewport heights sticky, within A7). Tell-someone sentence: "It's the site where the page turns into the system."

**Signature move (bespoke, in-page JS, no engine/library):** the *signal*: a 1 px terracotta trace down the left rail; a pulse travels with scroll progress; each section is a node that "commits" when reached, with a mono label (section name, NO numeric counters). Plus theme-toggle circular reveal from the button.

**Hero (layered, 4 planes):** (1) technical grid, (2) node mesh (inline SVG, ~40 nodes, deterministic positions, CSS-driven pulses), (3) headline "Software confiável para operações do mundo real" (EN/PT/ES) between planes 2 and 4 in z-order, (4) foreground mono tags + CTAs ("Fale comigo", résumé, view work). Motion ≤ ±24 px via CSS custom properties updated by one rAF-throttled scroll/pointer handler. **Separate mobile composition**: vertical mesh below headline, tags stacked, pointer parallax off, gyro never used.

**Transitions:** cross-document View Transitions (`@view-transition { navigation: auto }`) for page and language navigation (progressive enhancement; no JS required); scroll-driven section reveals via CSS `animation-timeline: view()` guarded by `@supports`, IntersectionObserver fallback; clip-path scan-line wipes between dense/breath sections; all `transform`/`opacity`/`clip-path` only. Theme toggle uses `document.startViewTransition` when available.

**Fingerprint gate:** registry `FINGERPRINTS.md` in the scroll-craft workspace starts empty; this is the first build there, so the 4-of-6 gate is trivially satisfied and recorded as such. Row appended at the end.

**Section designs:**
- Hero, Fact strip (real facts only: "5+ yrs", "Squad Leader", stacks; existing snapshot content).
- Selected work: per case: Problem / What I built / Stack / Result, fields from a typed `cases` data structure in i18n; cases `[CASO 1]…[CASO 3]` placeholders; the existing anonymised "Industrial Operations Platform" content retained as case 1 (text already in repo, anonymised). Result fields without owner data render `[RESULTADO]`.
- Portfolio: keep carousel + link; add a compact teaser.
- Experience: vertical timeline on the signal rail; data from existing `experience` collection (Senior Sistemas, Cast Group).
- Skills: competency map: layers (Backend/Distributed, Data, Full-stack, Cloud/Delivery, Practice) as an SVG/CSS graph linked to the mesh; plain-text list in DOM for a11y/SEO; depth shown as a labelled level (text, not only colour).
- Proof: `[DEPOIMENTO 1..2]`, GitHub and LinkedIn links from `site.ts`.
- Contact: one CTA label "Fale comigo"/"Get in touch"/"Hablemos" (EN/PT/ES, owner's "Fale comigo" confirmed for PT), reply time "48 h úteis / 48 business hours / 48 h hábiles"; mailto with subject (Hotmail address kept in `site.ts`, single point of change), copy-to-clipboard retained.

## 4. Implementation stages (each ends with screenshots + a check)

0. **Baseline & hygiene:** on branch; run `npm run build`, capture baseline screenshots (1440/820/390 × light/dark × en/pt/es = 18) and Lighthouse into scratchpad. Record results.
1. **Privacy rename:** `git mv public/case/wester public/case/industrial`, update `Gallery.astro`, MDX, README; grep A10. Q1 gate on screenshots.
2. **Tokens & dark theme:** refine `tokens.css` (keep palette; add grid/line/pulse tokens; verify AA with an axe + computed-contrast script).
3. **Hero + mesh + mobile composition** (+ reduced-motion static version).
4. **Signal rail + transitions** (View Transitions, scroll-driven reveals, theme reveal, scan-line wipes), single small script `src/scripts/signal.ts` bundled (target ≤ 8 KB min).
5. **Selected work + peak diagram**; Portfolio teaser.
6. **Experience timeline, Skills map, Proof, Contact.**
7. **i18n completion** for all new strings in en/pt/es (PT-BR and ES written natively; flagged for owner review).
8. **Résumé ×3, SEO** (titles, meta, hreflang incl. x-default, OG per language via `scripts/gen-og.mjs`, JSON-LD), `_headers` updated for 3 PDFs (noindex retained), site URL set from one constant (workers.dev for now).
9. **Verification:** 18 screenshots, Lighthouse ×3 languages, axe on both themes, keyboard-only run, reduced-motion run, `npm run security`, `npm run build`, grep A10/A2 (hard-coded strings scan).
10. **Deploy docs:** `wrangler.jsonc`, `DEPLOY.md`, `PLACEHOLDERS.md`.

## 5. Constraints and non-goals

- No new runtime dependencies (no GSAP, three.js, etc.); dev dependencies only if required for verification (Lighthouse CLI via `npx`).
- No video, no generated imagery, no stock photos. Existing photo `vinicius-photo.jpg` reused (AVIF/WebP variants via `sharp`/astro image).
- Do not remove or rewrite `/portfolio`, demos, case page, analytics, CSP, security probe.
- No commit, push, deploy or publish. No external network calls from the site (CSP stays strict; no third-party fonts/scripts).
- Non-goal: custom domain, email change, copywriting of real case results, testimonials, new PDFs content.

## 6. Open items needing the owner (do not block planning)

- Q1: confirm the 3 existing case screenshots contain only fictitious data (else they are dropped).
- Q2: final three résumé PDFs.
- Q3: real case data for `[CASO n]`, metrics, testimonials, extra links.
- Q4: native review of PT-BR/ES copy.

## 7. Verification contract (exact commands)

- `npm run build` → exit 0.
- `npm run preview` (127.0.0.1:4321) then Playwright (`playwright-core` already a devDependency) script `scripts/verify-matrix.mjs` (new) → 18 screenshots + overflow check + axe (both themes) + reduced-motion run + keyboard tab-order dump.
- `npx lighthouse http://127.0.0.1:4321/{,pt,es} --preset=desktop|mobile` → scores reported verbatim.
- `npm run security` → pass.
- `grep -rniE "wester" src public dist README.md` → no output.
- Scan for hard-coded text: script lists text nodes in built HTML for `/pt` containing common English function words from components not sourced from `ui.ts` (best-effort; reported as such).

## 8. Not verifiable here (will be listed in the final report)

Real phone/Safari/Firefox behaviour of View Transitions and scroll-driven animations (Chromium only locally); screen-reader behaviour (NVDA/VoiceOver); real 4G network LCP (Lighthouse throttling only); Cloudflare deploy; native-speaker correctness of PT/ES.
