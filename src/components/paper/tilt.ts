import type { CSSProperties } from "react";

/**
 * Inline style for the `tilt` utility (globals.css): the paper's resting rotation in degrees,
 * clamped to ±max, halved below 640px by the utility itself.
 */
export function tiltStyle(deg: number, max: number): CSSProperties {
  const clamped = Math.max(-max, Math.min(max, deg));
  return { "--tilt": `${clamped}deg` } as CSSProperties;
}
