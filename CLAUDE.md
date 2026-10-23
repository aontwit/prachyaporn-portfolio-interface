@AGENTS.md

# Prachyaporn portfolio

Bilingual (th / en) portfolio for an early childhood teacher. Next.js 16 App Router (server-rendered, needs a Node host such as Vercel), TypeScript, Tailwind v4, Motion (`motion/react`), react-three-fiber for the light 3D hero, next-intl for languages.

## Rules

- **Languages work like the mkp repo: no `/th` `/en` in the URL.** The locale is the `NEXT_LOCALE` cookie (default `th`), read in `i18n/request.ts`; `LanguageSwitch` calls the `setLocale` server action, then `router.refresh()`.
- **Every user-facing string lives in `i18n/messages/<lang>/translation.json`**, never in components. Add a key to `th` and `en` in the same change (`en satisfies typeof th` makes a missing key a type error). Read with `getTranslations()` in server components, `useTranslations()` in client ones. Language-free facts (years, photo files, email) live in `src/content/` and point at message keys by id.
- **One section per file** in `src/components/sections/`. A task touches its own section file and its own keys in translation.json; shared files (`globals.css`, `Reveal.tsx`, `Section.tsx`, `MotionPause.tsx`, `i18n/**` code) change only when the task says so.
- **Colours come from the tokens in `src/app/globals.css`** (`bg`, `surface`, `ink`, `muted`, `line`, `accent`, `accent-soft`, `sky`, `sand`). No raw hex in components. Tone: cool, calm, unhurried — the client is a teacher.
- **Motion:** use `Reveal` for scroll-in. Every animation respects `useReducedMotion`. No motion that loops forever in the reader's eyeline except the hero scene.
- **Privacy:** only email and phone are public. Never add address, birth date, age or salary from `resume.jpg`. **Children's faces in every photo are blurred before the photo enters `public/`** — never add an unblurred photo of a pupil (teachers/adults may stay sharp).
- **Design:** follow `DESIGN.md` (references, type, hand-drawn marks, motion, 3D limits).
- Mobile first: works at 360px wide with no horizontal scroll.

## Checks

`pnpm typecheck` · `pnpm lint` · `pnpm build` · dev server `pnpm dev` on port 3000 (`/`, `/activities`; switch language with the `ไทย / EN` buttons).
