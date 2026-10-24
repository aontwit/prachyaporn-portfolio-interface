// Crayon cut-out illustrations (DESIGN.md "Illustrations"). Decorative: render with alt="".
// Generated locally with FLUX.2-klein-4B (ai-toolkit inference engine, quantized, 1024x1024, 25 steps),
// then cut out with a white paper border by scripts/doodles/cutout.py. Prompt = STYLE with "of <subject>".
// Regenerate: start the engine, then `ENGINE_TOKEN=<token> node scripts/doodles/batch.mjs <dir>` and
// `python scripts/doodles/cutout.py <dir> public/images/doodles`. STYLE, subjects and seeds live in batch.mjs too — change both together.
export const DOODLE_STYLE =
  "a child's wax crayon drawing of <subject>, drawn by a kindergarten kid, thick wobbly black crayon outlines, visible waxy crayon texture and paper grain, soft pastel colors, simple and naive, single object centered with empty space around it, isolated on plain white paper, no text, no letters";

export const doodles = [
  { name: "abacus", src: "/images/doodles/abacus.webp", width: 558, height: 486, subject: "a small wooden abacus with colorful beads", seed: 12 },
  { name: "abc-blocks", src: "/images/doodles/abc-blocks.webp", width: 402, height: 545, subject: "three stacked wooden toy blocks", seed: 14 },
  { name: "apple", src: "/images/doodles/apple.webp", width: 350, height: 421, subject: "a red apple with a leaf", seed: 20 },
  { name: "bear-pencil", src: "/images/doodles/bear-pencil.webp", width: 552, height: 640, subject: "a cute little teddy bear holding a big yellow pencil", seed: 7 },
  { name: "cloud", src: "/images/doodles/cloud.webp", width: 640, height: 414, subject: "a fluffy smiling cloud", seed: 16 },
  { name: "crayons", src: "/images/doodles/crayons.webp", width: 406, height: 640, subject: "a bundle of five colorful wax crayons", seed: 11 },
  { name: "flower", src: "/images/doodles/flower.webp", width: 311, height: 640, subject: "a pink flower with a green stem and two leaves", seed: 17 },
  { name: "heart", src: "/images/doodles/heart.webp", width: 588, height: 614, subject: "a pink heart", seed: 21 },
  { name: "open-book", src: "/images/doodles/open-book.webp", width: 523, height: 433, subject: "an open picture book", seed: 13 },
  { name: "paper-plane", src: "/images/doodles/paper-plane.webp", width: 640, height: 487, subject: "a blue paper airplane", seed: 19 },
  { name: "rainbow", src: "/images/doodles/rainbow.webp", width: 640, height: 355, subject: "a small rainbow", seed: 23 },
  { name: "school-bag", src: "/images/doodles/school-bag.webp", width: 498, height: 534, subject: "a small blue school backpack", seed: 22 },
  { name: "star", src: "/images/doodles/star.webp", width: 573, height: 560, subject: "a yellow star with a happy face", seed: 18 },
  { name: "sun", src: "/images/doodles/sun.webp", width: 626, height: 585, subject: "a smiling sun with short rays", seed: 15 },
] as const;

export type DoodleName = (typeof doodles)[number]["name"];

export const doodle = (name: DoodleName) => doodles.find((d) => d.name === name)!;
