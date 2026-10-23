# Plan

Tasks for the agent loop. One row = one task = one PR. Add rows by hand or with `/pitwall:queue <task in words>` (the row lands with the task's PR). Task PRs never tick their row: the loop ticks rows and writes the Progress log in one docs PR after the task PRs merge. Ticked rows stay as history.

Phase 0 (scaffold, content, tokens, CI, next-intl cookie i18n like the mkp repo — no locale in the URL) is done. Phase 1 rows touch disjoint files so they can run in parallel. Read `CLAUDE.md` and `DESIGN.md` first: content in `src/content/`, colours from tokens, `Reveal` for motion, reduced motion respected, 360px with no horizontal scroll.

Direction for every row: `DESIGN.md` — "a teacher's journal", references from Awwwards (GoShuin primary, Fitosauna, The Story Archive). Light 3D only in the hero.

## Tasks

| ID | Task | Files | Done when |
|---|---|---|---|
| P1-01 | [x] Hero: light 3D scene (react-three-fiber, soft floating shapes in token colours behind/beside the portrait) + staggered intro motion for name, role, tagline, CTAs | `src/components/sections/Hero.tsx`, `src/components/hero/**` | 3D canvas lazy-loaded client-side (`next/dynamic`, `ssr: false`), scene stops when `useMotionPause().paused` (starts paused under reduced motion), static fallback when no WebGL · no console errors · Lighthouse-style check: hero LCP image still `priority` · works at 360px and 1366px in Thai and English |
| P1-02 | [x] About + Education: About as a large calm pull-quote layout; Education as a vertical timeline with a line that draws on scroll and items that reveal in turn | `src/components/sections/About.tsx`, `src/components/sections/Education.tsx` | both languages render · timeline readable at 360px · reduced motion shows the final state with no animation |
| P1-03 | [x] Experience + Skills: Experience as a card with role, school, years and bullet points; Skills as 4 cards with a small line icon each (inline SVG) and a subtle hover lift | `src/components/sections/Experience.tsx`, `src/components/sections/Skills.tsx` | both languages render · 1 column at 360px, 2 at ≥640px · hover and focus-visible states · no new dependency |
| P1-04 | [x] Activities: `/[lang]/activities/` as an editorial gallery per activity (date, title, summary, masonry-style photos) with an accessible lightbox (Esc, arrows, focus trap, alt text); home `ActivitiesPreview` shows the 3 activities as image cards linking to `#<slug>` on the page | `src/app/activities/page.tsx`, `src/components/sections/ActivitiesPreview.tsx`, `src/components/activities/**` | all photos load on `/activities` in both languages · lightbox opens/closes with keyboard and click · date shows in Thai Buddhist-era format in Thai and Gregorian in English (`useFormatter` / `getFormatter` from next-intl) · no layout shift from images |
| P1-05 | [x] Navigation + Contact + Footer: header with section anchor links (desktop) and an accessible mobile menu, active-section highlight with the hand-drawn ellipse, polish the existing `LanguageSwitch` (hand-drawn underline on the active language), a "Pause motion" pill (`useMotionPause()` from `src/components/MotionPause.tsx`, labels `ui.motion`), switching language keeps the current page and scroll position; Contact as a calm card with email/phone actions; footer with nav and copyright | `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/sections/Contact.tsx`, `src/components/nav/**` | switching language on `/activities` stays on `/activities` · mobile menu works with keyboard and closes on navigation · skip link visible on focus · no horizontal scroll at 360px |
| P1-06 | [x] SEO + sharing: metadata in the reader's language (`openGraph.locale` th_TH / en_US), Open Graph image (`opengraph-image` from the portrait + name), `sitemap.ts`, `robots.ts`, favicon/icon in the accent colour | `src/app/layout.tsx` (metadata only), `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.*`, `src/app/icon.*` | `/sitemap.xml`, `/robots.txt`, `/opengraph-image` and the icon respond 200 · no favicon 404 in the console · site URL read from one constant in `src/lib/site.ts` (placeholder until hosting is decided) |

## Open questions

| # | Question | Blocks |
|---|---|---|
| 1 | Where is the site hosted and on what domain? Cookie-based i18n needs a Node host (Vercel recommended); GitHub Pages is out | deploy row (not written yet), final URL in P1-06 |
| 2 | Activity dates: the Lent candle offering and the temple visit have no date on the photos — client to confirm | P1-04 shows no date for those until answered |

## Progress log

| Date | Task | PR | Evidence |
|---|---|---|---|
| 2026-10-23 | P0 scaffold | first commit on `main` / `dev` | typecheck, lint, build pass locally; `/th`, `/en`, `/th/activities`, `/en/activities` prerendered |
| 2026-10-23 | P1-01 feat: hero with light 3D scene and staggered intro motion | #4 | see PR |
| 2026-10-23 | P1-02 feat: about pull-quote and scroll-drawn education timeline | #2 | see PR |
| 2026-10-23 | P1-03 feat: experience and skills as journal cards with line icons | #3 | see PR |
| 2026-10-23 | P1-04 feat: activities journal gallery with lightbox and home preview cards | #6 | see PR |
| 2026-10-23 | P1-05 feat: navigation, pause-motion pill, contact card and footer (P1-05) | #8 | see PR |
| 2026-10-23 | P1-06 feat: SEO and sharing metadata, Open Graph image, sitemap, robots and icon | #7 | see PR |
