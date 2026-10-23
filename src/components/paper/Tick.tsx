"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMotionPause } from "@/components/MotionPause";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A crayon tick ✓ (DESIGN.md "Teacher's pen"), 1em square in crayon-green, drawn on once when it
 * scrolls into view. Decorative: the list it marks carries the meaning. `initial` is the same on
 * the server and the client; reduced motion and the pause pill only snap the transition.
 */
export function Tick({
  delay = 0,
  className = "",
}: {
  /** Seconds before it draws — stagger a list so one tick draws at a time. */
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { paused } = useMotionPause();
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      className={`inline-block size-[1em] shrink-0 overflow-visible align-[-0.1em] text-crayon-green ${className}`}
    >
      <motion.path
        d="M3.6 13.2c1.9 1.1 3.6 3 5 5.6.5-1 1.2-2.4 2.3-4.2 2.4-3.9 5.6-7.6 9.5-10.4"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={reduce || paused ? { duration: 0 } : { duration: 0.8, delay, ease: EASE }}
      />
    </svg>
  );
}
