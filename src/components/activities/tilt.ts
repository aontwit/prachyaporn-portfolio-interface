/**
 * Resting tilts (degrees, all within the polaroid's ±3) for taped photos, cycled so that
 * neighbours lean different ways. The `tilt` utility halves them below 640px.
 */
const TILTS = [-2, 1.5, -1, 2.5, -2.5, 1] as const;

/** The tilt of the n-th polaroid; pass an offset per group so groups do not repeat the same pattern. */
export const polaroidTilt = (n: number) => TILTS[n % TILTS.length];
