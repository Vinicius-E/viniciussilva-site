# viniciussilva-site

Personal site for **Vinicius Silva — Senior Software Engineer**. Static build,
approach **C (Hybrid)** per the approved pre-build specification.

- **Framework:** Astro 5 + TypeScript, content in MDX / Markdown collections
- **Styling:** hand-rolled design tokens (`src/styles/`), no CSS framework
- **JavaScript:** ~2 KB total, inlined — theme toggle, clipboard copy, one
  `IntersectionObserver` for reveal-on-scroll, an analytics click delegator.
  **Zero React / islands** in this version.
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
  pages/          index.astro · 404.astro · work/[slug].astro
  layouts/        BaseLayout.astro
  components/
    layout/       BaseHead · Header · Footer · SectionShell · ThemeToggle
    brand/        FalconMark.astro   <-- PLACEHOLDER mark, isolated
    ui/           Button · CopyText · Todo
    home/         Hero · SelectedWork · WorkCard · EngineeringSnapshot ·
                  Experience · ExperienceEntry · Expertise · HowIWork ·
                  About · ClosingCta · Contact
    case/         CaseHero · Banner · Decisions · ArchitectureDiagram · Gallery
  content/
    cases/        industrial-operations-platform.mdx
    experience/   senior-sistemas.md · cast-group.md · independent-engineering.md
  lib/            site.ts (identity/links/contact) · seo.ts (JSON-LD) · analytics.ts
  styles/         tokens.css · fonts.css · base.css
public/           favicon.svg · robots.txt · _headers · og/ · fonts/ · vinicius-silva-cv.pdf
```

## Open items before launch

Search the codebase for `TODO[` — every unverified value is marked and rendered
as a visible placeholder in the UI. Nothing is fabricated. See the handoff notes
for the full list (dates, LinkedIn/GitHub URLs, client-name permission, photo,
falcon SVG, domain, résumé PDF, CEFR level, relocation wording, analytics
provider, CI/CD detail).

The `FalconMark` component is a deliberate placeholder — replace the SVG with
the official mark when supplied; do not treat the current glyph as final.
