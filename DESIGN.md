# Design direction — "A teacher's journal"

The site reads like a calm, well-kept teaching journal: editorial layout, hairline rules, a serif voice, real photos, and small hand-drawn marks a teacher would make in a notebook. Cool and unhurried — the client is an early childhood teacher.

## References (Awwwards, Oct 2026)

| Site | Take | Don't take |
|---|---|---|
| [GoShuin — Every stamp, a memory](https://aestudio.studio/goshuin/en) ([Awwwards](https://www.awwwards.com/sites/goshuin-every-stamp-a-memory)) — **primary** | Editorial two-column hero: huge serif name left, framed visual right · hairline rules above/below small uppercase labels · bilingual switch as plain `ไทย / EN` text with an underline on the active one · a visible "Pause motion" pill · paper-toned background, generous margins | Warm cream/gold palette (ours is cool) · book page-flip navigation |
| [Fitosauna](https://fitosauna.com/) ([Awwwards](https://www.awwwards.com/sites/fitosauna)) | Soft dappled-light shadows across the hero (leaf shadows drifting slowly) — use as the mood of the 3D hero · thin outlined buttons with a round arrow companion · "Scroll to explore" footer label in the hero | Dark photographic full-bleed hero, sans display type |
| [The Story Archive](https://www.thestoryarchive.net/) ([Awwwards](https://www.awwwards.com/sites/the-story-archive)) | Hand-drawn ellipse around the active nav item (like a teacher circling an answer) · cards with a coloured left edge and rounded outline chips for tags · rules between header rows | Monospace type, dense catalogue layout |

## System

- **Palette:** tokens in `src/app/globals.css` only. Background `bg` (mist) with a faint paper grain; `ink` text; `accent` (sage-teal) for links, active marks, the drawn ellipse; `sky` and `accent-soft` for the hero shapes and card edges; `sand` sparingly for photo mats.
- **Type:** display = Noto Serif Thai (`font-display`), very large for the name (clamp ~3.5–7rem), tight leading; body = IBM Plex Sans Thai, 17–18px, line-height 1.7 for Thai. Small labels: uppercase (EN) / normal (TH), letter-spacing .12em, 12px, `muted`, with a hairline rule above.
- **Lines:** 1px `line` hairlines separate header rows, section labels and footer — the journal grid. Corners: 20–28px on photos and cards, full pill on buttons/chips.
- **Hand-drawn marks:** one SVG ellipse/underline style (stroke `accent`, 1.5px, slightly irregular path) drawn with Motion `pathLength` 0→1. Used for: active nav item, the active language, one highlighted word in the hero tagline. Never more than one per viewport.
- **Motion:** soft and slow — ease `[0.22, 1, 0.36, 1]`, 0.6–0.9s, stagger 0.08s; no bounce, no spin, no parallax faster than 0.2×. `Reveal` for scroll-in. A "Pause motion" pill (bottom-right, like GoShuin) stops the hero scene and drifting; `prefers-reduced-motion` starts paused.
- **3D (hero only):** react-three-fiber, a few soft rounded shapes (pebbles / paper leaves) in `sky` / `accent-soft`, floating very slowly with gentle light, plus a dappled-leaf shadow feel. Behind or beside the portrait; never over the text. DPR capped at 1.5, paused when off-screen.
- **Photos:** rounded, on a `sand` mat or with a thin `line` frame; captions in small `muted` text. Children's faces are always blurred (see `CLAUDE.md`).
- **Bilingual:** every label exists in th and en; Thai lines need more line-height than English — never set Thai below 1.6.
