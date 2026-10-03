# viniciussilva-site

Personal site for **Vinicius Silva — Senior Software Engineer**. Static build,
approach **C (Hybrid)** per the approved pre-build specification.

- **Framework:** Astro 5 + TypeScript, content in MDX / Markdown collections
- **Styling:** hand-rolled design tokens (`src/styles/`), no CSS framework
- **JavaScript:** ~2 KB total, inlined — theme toggle, language switcher,
  clipboard copy, one `IntersectionObserver` for reveal-on-scroll, an analytics
  click delegator. **Zero React / islands** in this version.
- **i18n:** EN (`/`), PT-BR (`/pt`), ES (`/es`). Astro native i18n,
  `prefixDefaultLocale: false`. UI + editorial copy in `src/i18n/ui.ts`;
  locale derived from the URL per component (`getLangFromUrl`). hreflang +
  localized sitemap. The case study is English-only for V1.
- **Fonts:** self-hosted (Archivo Variable, IBM Plex Sans, IBM Plex Mono),
  latin + latin-ext subsets only
- **Deploy target:** Cloudflare Pages (static `dist/`), not yet configured

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # astro check + astro build  ->  dist/
npm run preview    # serve the production build at http://127.0.0.1:4321

npm run og                 # regenerate public/og/*.png
node scripts/copy-fonts.mjs # refresh public/fonts/ from node_modules
node scripts/gen-placeholder-cv.mjs  # regenerate the placeholder résumé PDF
node scripts/review.mjs    # axe + horizontal-overflow check + screenshots (needs Chrome)
node scripts/shots.mjs     # cropped section screenshots -> .review/shots/
```

## Structure

```
src/
  pages/          index.astro · [lang]/index.astro · 404.astro · work/[slug].astro
  layouts/        BaseLayout.astro
  components/
    layout/       BaseHead · Header · Footer · SectionShell · ThemeToggle · LangSwitcher
    brand/        FalconMark.astro   <-- PLACEHOLDER mark, isolated
    ui/           Button · CopyText · Todo
    home/         HomePage · Hero · SelectedWork · WorkCard · EngineeringSnapshot ·
                  Experience · ExperienceEntry · Expertise · HowIWork ·
                  About · ClosingCta · Contact
    case/         CaseHero · Banner · Decisions · ArchitectureDiagram · Gallery
  content/
    cases/        industrial-operations-platform.mdx
    experience/   senior-sistemas.md · cast-group.md   (each carries pt/es translations)
  i18n/           ui.ts (all copy, per locale) · utils.ts (getLangFromUrl, localizePath)
  lib/            site.ts (language-neutral facts) · seo.ts (JSON-LD) · analytics.ts
  styles/         tokens.css · fonts.css · base.css
public/           favicon.svg · robots.txt · _headers · og/ · fonts/ · vinicius-silva-cv.pdf
```

## Content status

Identity, experience dates, client names (Cast Group engagements), LinkedIn URL,
English CEFR level (C1) and location (Blumenau, SC) are confirmed against the
résumé and reflected in `src/lib/site.ts` and the content collections.

The current independent engagement is presented as a **"Current work"** block in
the Experience section and the featured case study — an engineering engagement,
**not** a company or agency. The industrial client stays anonymised
("Industrial Manufacturing Client · Santa Catarina, Brazil") until the "Wester"
name is explicitly authorised.

## Open items before launch

Search the codebase for `TODO[` — every unverified value is marked and rendered
as a visible placeholder in the UI. Nothing is fabricated. Remaining:

- **domain** — final domain (also update `astro.config.mjs`)
- **contact** — custom-domain email (currently the résumé's hotmail address)
- **GitHub URL** — canonical profile; decide whether to tidy/pin repos
- **résumé PDF** — final EN version at `public/vinicius-silva-cv.pdf`
- **relocation wording** — confirm exact public phrasing
- **falcon SVG** — `FalconMark` is a deliberate placeholder; replace with the
  official mark when supplied
- **analytics provider** — Cloudflare Web Analytics or Plausible (`src/lib/analytics.ts`)
- **case study** — cleared screenshots, timeline, CI/CD & hosting detail; optional
  read-only demo once the environment is presentation-ready
- **translations** — PT-BR and ES strings in `src/i18n/ui.ts` and the experience
  frontmatter are pending native review (ES especially). Case study not yet
  translated — PT/ES routes show an "available in English" note on its links.
- **`(opens in a new tab)`** — one sr-only string in `Button.astro` still EN
