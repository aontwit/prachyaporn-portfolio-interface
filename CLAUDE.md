@AGENTS.md

# Prachyaporn portfolio

Bilingual (th / en) portfolio for an early childhood teacher. Next.js 16 App Router, static export (`output: "export"`), TypeScript, Tailwind v4, Motion (`motion/react`), react-three-fiber for the light 3D hero.

## Rules

- **Content lives in `src/content/`, never in components.** Every user-facing string is a `Localized` (`{ th, en }`) value. Add both languages in the same change.
- **One section per file** in `src/components/sections/`. A task touches its own section file; shared files (`globals.css`, `Reveal.tsx`, `Section.tsx`, `ui.ts`) change only when the task says so.
- **Colours come from the tokens in `src/app/globals.css`** (`bg`, `surface`, `ink`, `muted`, `line`, `accent`, `accent-soft`, `sky`, `sand`). No raw hex in components. Tone: cool, calm, unhurried — the client is a teacher.
- **Motion:** use `Reveal` for scroll-in. Every animation respects `useReducedMotion`. No motion that loops forever in the reader's eyeline except the hero scene.
- **Static export limits:** no proxy, cookies, server actions, route handlers on Request, or default image loader. Dynamic routes need `generateStaticParams` and `dynamicParams = false`.
- **Privacy:** only email and phone are public. Never add address, birth date, age or salary from `resume.jpg`. **Children's faces in every photo are blurred before the photo enters `public/`** — never add an unblurred photo of a pupil (teachers/adults may stay sharp).
- **Design:** follow `DESIGN.md` (references, type, hand-drawn marks, motion, 3D limits).
- Mobile first: works at 360px wide with no horizontal scroll.

## Checks

`pnpm typecheck` · `pnpm lint` · `pnpm build` · dev server `pnpm dev` on port 3000 (`/th/`, `/en/`, `/th/activities/`).
