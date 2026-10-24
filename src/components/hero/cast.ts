import { doodle, type DoodleName } from "@/content/doodles";

/**
 * The hero stage (DESIGN.md "3D hero"): crayon cut-outs on wooden sticks standing on a strip of
 * grid-paper ground. One description drives both the WebGL scene and its static `<img>` fallback,
 * so the two always show the same cast in the same places.
 *
 * World units: the ground is y = 0; the camera sits at CAMERA, tipped down by `pitch` degrees,
 * with a vertical field of view of `fov` degrees.
 */
export const CAMERA = { y: 2.6, z: 8, fov: 32, pitch: 12 } as const;

/** Below this stage width (px) the compact cast is used — Tailwind's `@xl` container size (36rem). */
export const COMPACT_MAX_PX = 576;

/** The strip of grid-paper ground: from its front edge back to its far edge (world z). */
export const GROUND = { near: 2, far: -4 } as const;

/**
 * Width the cast spreads over (px, max-w-6xl) — on purpose a little wider than the copy column
 * (max-w-5xl) so the cut-outs frame it; the ground itself runs the full width.
 */
export const CAST_MAX_PX = 1152;

export type CutOut = {
  name: DoodleName;
  /** Where the stick stands, as a fraction of the stage width (0 = left, 1 = right); `compact: null` = left out on narrow stages. */
  x: { wide: number; compact: number | null };
  /** Depth: 0 = front row, negative = further back. */
  z: number;
  /** Height of the drawing, world units. */
  size: number;
  /** Bare stick between the ground and the drawing, world units. */
  stick: number;
  /** Resting lean, degrees, positive = counter-clockwise (the sway adds at most ±3° around it). */
  lean: number;
  /** Offsets the sway so no two cut-outs move in step. */
  phase: number;
};

// Mascot bear in the middle and biggest; the sun and the paper plane fly high on long sticks.
export const CAST: readonly CutOut[] = [
  { name: "sun", x: { wide: 0.08, compact: 0.14 }, z: -1.2, size: 1.3, stick: 1.5, lean: -2, phase: 0 },
  { name: "crayons", x: { wide: 0.23, compact: null }, z: 0.2, size: 1.5, stick: 0.3, lean: 3, phase: 1.3 },
  { name: "bear-pencil", x: { wide: 0.41, compact: 0.43 }, z: 0.6, size: 2.3, stick: 0.3, lean: -1, phase: 2.6 },
  { name: "flower", x: { wide: 0.58, compact: 0.69 }, z: -0.2, size: 1.7, stick: 0.25, lean: 2, phase: 3.9 },
  { name: "paper-plane", x: { wide: 0.76, compact: 0.84 }, z: -1, size: 1.05, stick: 1.65, lean: -4, phase: 5.2 },
  { name: "star", x: { wide: 0.92, compact: null }, z: -0.3, size: 1.15, stick: 0.8, lean: 3, phase: 0.7 },
];

/** How far up the drawing the stick reaches behind it (fraction of the drawing's height). */
export const STICK_OVERLAP = 0.35;

const TAN = Math.tan((CAMERA.fov * Math.PI) / 360);
const SIN = Math.sin((CAMERA.pitch * Math.PI) / 180);
const COS = Math.cos((CAMERA.pitch * Math.PI) / 180);

/** Camera-space depth (along the view) and height (along the camera's up) of the point (0, y, z). */
function view(y: number, z: number) {
  const dy = y - CAMERA.y;
  const dz = CAMERA.z - z;
  return { depth: dz * COS - dy * SIN, up: dy * COS + dz * SIN };
}

/** Height of the point (y, z) above the stage's bottom edge, as a fraction of the stage height. */
export function lift(y: number, z: number) {
  const { depth, up } = view(y, z);
  return 0.5 + up / (2 * depth * TAN);
}

/**
 * World x of the ground point at depth z that shows `at` of the way across the cast's width
 * (at most CAST_MAX_PX, centred) on a stage of this size.
 */
export function groundX(at: number, z: number, width: number, height: number) {
  const across = (at - 0.5) * Math.min(1, CAST_MAX_PX / width);
  return across * 2 * view(0, z).depth * TAN * (width / height);
}

export const art = (c: CutOut) => doodle(c.name);
