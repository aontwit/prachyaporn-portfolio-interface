"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { HERO_EASE } from "@/components/hero/HeroIntro";
import { useMotionPause } from "@/components/MotionPause";

/** The hero keyword's crayon underline (DESIGN.md "Teacher's pen"): a wavy crayon-pink stroke drawn on once. */
export function HandUnderline({ children }: { children: ReactNode }) {
  const { paused } = useMotionPause();
  return (
    <span className="relative inline-block whitespace-nowrap text-ink">
      {children}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute -bottom-2.5 left-[-4%] h-3.5 w-[108%] overflow-visible text-crayon-pink"
      >
        <motion.path
          d="M2 9C20 3 35 12 52 7s30-3 46 1"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          className="noscript:[stroke-dasharray:none]"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={paused ? { duration: 0 } : { duration: 0.8, delay: 0.9, ease: HERO_EASE }}
        />
      </svg>
    </span>
  );
}
