"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMotionPause } from "@/components/MotionPause";

// One hand-drawn mark style (DESIGN.md): accent stroke, 1.5px, a slightly irregular path drawn
// with pathLength 0 → 1. The ellipse overshoots its start like a pen circling an answer.
const ELLIPSE = "M60 5.5C88 3.8 115 10.5 115.5 23.5C116 37.5 88 45 57 44.2C27 43.5 4.5 36 5 22.8C5.6 10.4 31 4.2 66 7.6";
const UNDERLINE = "M2 6.4C18 4.2 36 7.4 55 5.6C72 4 86 5.2 98 6.8";
const EASE = [0.22, 1, 0.36, 1] as const;

function Stroke({ d, viewBox, className }: { d: string; viewBox: string; className: string }) {
  const reduce = useReducedMotion();
  const { paused } = useMotionPause();
  // `initial` is the same for everyone (it is rendered on the server); only the duration
  // depends on client-only settings, and a transition never reaches the markup.
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none absolute overflow-visible text-accent ${className}`}
    >
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        // No vector-effect="non-scaling-stroke": Chromium then measures pathLength dashes in screen
        // space, and an ellipse drawn wider than its viewBox never closes.
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce || paused ? 0 : 0.8, ease: EASE }}
      />
    </svg>
  );
}

/** Circles its (relative) parent — the active nav item. */
export function HandDrawnEllipse() {
  return <Stroke d={ELLIPSE} viewBox="0 0 120 48" className="-left-3 -top-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1.5rem)]" />;
}

/** Underlines its (relative) parent — the active language. */
export function HandDrawnUnderline() {
  return <Stroke d={UNDERLINE} viewBox="0 0 100 10" className="-bottom-2 left-0 h-2 w-full" />;
}
