"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { HERO_EASE } from "@/components/hero/HeroIntro";
import { useMotionPause } from "@/components/MotionPause";

/** The one hand-drawn mark of the hero (DESIGN.md): an irregular accent stroke under a word. */
export function HandUnderline({ children }: { children: ReactNode }) {
  const { paused } = useMotionPause();
  return (
    <span className="relative inline-block whitespace-nowrap text-ink">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute -bottom-2 left-[-2%] h-3 w-[104%] overflow-visible text-accent"
      >
        <motion.path
          d="M2 7.6C16 5.2 31 4.1 47 4.9c14 .7 27 2.6 38 2.4 5-.1 9-.8 13-1.9"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          className="noscript:[stroke-dasharray:none]"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={paused ? { duration: 0 } : { duration: 0.9, delay: 0.9, ease: HERO_EASE }}
        />
      </svg>
    </span>
  );
}
