# Design direction — "The teacher's notebook" (phase 2)

The whole site is a teacher's notebook: a **grid-paper page** with **lined notebook sheets taped onto it**, crayon drawings cut out and stuck on, sticky notes, a cut-out sticker of the teacher, and a teacher's pen that circles, underlines and ticks. It must read instantly as *early childhood teaching* — warm, playful, a little messy by hand — while staying calm and easy to read in Thai.

Chosen by the owner on 2026-10-24 (prototype "A": grid page + lined sheets). Phase 1's "teacher's journal" (GoShuin) look is replaced; its **hand-drawn ellipse around the active nav item stays** — the owner loves it.

## References

| Site | Take | Don't take |
|---|---|---|
| [Mr. Panda's Paper Portfolio](https://www.mr-pandas-psychologically-safe-portfolio.com/) ([Awwwards SOTD](https://www.awwwards.com/sites/mr-pandas-paper-portfolio), code MIT on [GitHub](https://github.com/andrewwoan/mr-pandas-psychologically-safe-portfolio), [Codrops article](https://tympanus.net/codrops/2025/12/30/the-increasing-importance-of-psychological-safety-and-self-awareness-for-creative-work/)) — **primary** | Lined notebook paper with a red margin line · crayon / marker drawings as paper cut-outs **on wooden sticks** with a white paper border and a soft drop shadow · grid-paper ground · gentle sway · handwriting everywhere | Full-site 3D world and horizontal camera travel (our site is text-heavy Thai + SEO: 3D only in the hero) · its paid paper material and its drawings (we make our own) |
| Phase 1 nav (`src/components/nav/HandDrawn.tsx`) | The hand-drawn ellipse drawn with `pathLength` around the active item — becomes the "teacher's pen" mark system | — |

## Paper system

- **Page** (`body`): grid paper — `paper` background, 20px minor grid in `grid`, 100px major grid in `grid-strong`. Always visible behind everything.
- **Sheet**: a lined notebook page laid on the grid — white, blue rules every 32px (`rule`), a red margin line (`margin`) ~52px from the left, soft shadow, 1–2 strips of `tape` at the top, very slight rotation (≤ 1°). Body text sits **on** the rules (line-height 32px for sheet copy).
- **Sticky note**: square-ish note in one of the note colours (`note-yellow`, `note-green`, `note-blue`, `note-pink`), rotated −2…+2°, small shadow. For skills and short facts.
- **Polaroid**: white frame, photo, handwritten caption, a strip of tape. For activity photos.
- **Portrait sticker**: the teacher's photo with the studio background removed, cut out with a white paper border like the crayon doodles, taped, with a handwritten caption (owner decision 2026-10-24: no blue studio background).
- **Tape**: translucent yellow strip (`tape`), slightly rotated, sits over the edge it "holds".
- Mobile: same paper; rotations halved; sheets full width; margin line moves to ~36px.

## Teacher's pen (marks)

One family of hand-drawn SVG strokes, drawn on with Motion `pathLength` 0 → 1 (≈ 0.8s, ease `[0.22, 1, 0.36, 1]`):

- **Ellipse** around the active nav item and around one key word per section (existing `HandDrawn` component — reuse, don't fork).
- **Crayon underline** under the hero keyword ("ลงมือทำ" / "doing") in `crayon-pink`.
- **Highlighter** strip behind section headings (`crayon-green` at ~35% opacity, slightly rotated).
- **Tick ✓** before each completed education step, **stars ☆** for highlights.
- At most one *drawing* animation in view at a time; marks already drawn stay drawn.

## Type

- **Mali** (Google Fonts, Thai + Latin) for everything handwritten: name, headings, nav, labels, captions, notes, buttons.
- **IBM Plex Sans Thai** for running body text (readability). Thai body line-height ≥ 1.75; on sheets, exactly the 32px rule.
- No serif display font any more (Noto Serif Thai is removed).

## Colour tokens (`src/app/globals.css` is the only place hex lives)

`paper` #fbfaf5 · `grid` #cfe0ec · `grid-strong` #b7cfe0 · `rule` #c9dbe8 · `margin` #e8a0a0 · `ink` #2b3a42 · `pencil` #5d6b72 · `crayon-blue` #5b8fc9 (strokes, marks, decorative fills — never behind or as text) · `ink-blue` #2f5f93 (blue **text**, and the background of any button or label that carries text — 6.3:1 on paper; crayon-blue is only 3.2:1, owner decision 2026-10-24) · `crayon-green` #7fb08a · `crayon-yellow` #f2c94c · `crayon-pink` #ef9aa8 · `tape` rgba(242,201,76,.55) · `note-yellow` #fff6c9 · `note-green` #e3f1e6 · `note-blue` #e4eef8 · `note-pink` #fde4e8 · `sheet` #ffffff

## Illustrations

- Crayon / wax-crayon drawings "made by a kindergarten kid": thick wobbly outlines, waxy texture, soft pastel fills, white paper border when cut out.
- Generated **locally** on the owner's machine with FLUX.2-klein-4B (ai-toolkit venv, files in `C:\Tools\hf`), background removed, saved as WebP in `public/images/doodles/`, each with its prompt + seed recorded in `src/content/doodles.ts` so it can be regenerated.
- Set: teddy bear with a pencil (mascot), crayons, abacus, open book, ABC blocks, sun, cloud, flower, star, paper plane, apple, pencil, heart, school bag. No children's faces, no text in images (copy stays in translation.json).

## Motion

- Sheets and notes **drop in** (y 16px → 0, rotate ±3° → rest, opacity) as they scroll in; staggered 0.08s.
- Sticky notes lift and straighten slightly on hover / focus.
- Pen marks draw on once.
- 3D hero: cut-outs sway gently (≤ 3°) on their sticks; stops when off-screen or paused.
- Reduced motion or the "Pause motion" pill: final state, no animation (hydration-safe: never let reduced-motion state change SSR markup).

## 3D hero

React-three-fiber scene in the hero: a strip of grid-paper ground, 4–6 crayon cut-outs on sticks (mascot bear, sun, flower, books, paper plane…) as textured planes with a white border and soft shadow, warm light, slow sway, slight parallax with the pointer on desktop. The portrait sticker and the handwritten name stay in HTML beside it (SEO, readability). Lazy, client-only, DPR ≤ 1.5, static fallback (the same cut-outs as positioned `<img>`s) without WebGL.
