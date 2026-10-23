import type { ReactNode } from "react";
import { HandDrawnEllipse } from "@/components/nav/HandDrawn";

/**
 * The teacher's pen circling one key word (DESIGN.md "Teacher's pen") — the nav's hand-drawn
 * ellipse, reused as is. Keeps the word on one line so the ellipse wraps it whole.
 */
export function PenCircle({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <HandDrawnEllipse />
    </span>
  );
}
