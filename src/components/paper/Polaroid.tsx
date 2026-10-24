import type { ReactNode } from "react";
import { Tape } from "./Tape";
import { tiltStyle } from "./tilt";

/**
 * A polaroid: white frame, the photo (`children`, e.g. a `next/image`), a handwritten caption and
 * a strip of tape (DESIGN.md "Paper system"). Static — it may hold the LCP image.
 */
export function Polaroid({
  children,
  caption,
  rotate = 0,
  tape = true,
  className = "",
}: {
  /** The photo slot. */
  children: ReactNode;
  caption?: ReactNode;
  /** Resting rotation in degrees, clamped to ±3. */
  rotate?: number;
  tape?: boolean;
  className?: string;
}) {
  return (
    <figure className={`tilt relative bg-sheet p-3 shadow-polaroid sm:p-3.5 ${className}`} style={tiltStyle(rotate, 3)}>
      {tape && <Tape className="left-1/2 -translate-x-1/2 -rotate-4" />}
      {children}
      {caption && (
        <figcaption className="px-1 pt-3 pb-1 text-center font-hand leading-[1.6] text-pencil sm:pt-3.5 sm:pb-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
