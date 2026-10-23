"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { HandDrawnEllipse } from "@/components/nav/HandDrawn";

/**
 * The teacher's pen circling one key word (DESIGN.md "Teacher's pen") — the nav's hand-drawn
 * ellipse, reused as is. The ellipse mounts (and so draws) the first time the word scrolls into
 * view; the server and the first client render both leave it out, so markup never mismatches.
 * Keeps the word on one line so the ellipse wraps it whole.
 */
export function PenCircle({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      {children}
      {inView && <HandDrawnEllipse />}
    </span>
  );
}
