"use client";

import { motion, type Transition } from "motion/react";
import type { ReactNode } from "react";
import { useMotionPause } from "@/components/MotionPause";

/** DESIGN.md motion: soft and slow, no bounce. */
export const HERO_EASE = [0.22, 1, 0.36, 1] as const;

const INSTANT: Transition = { duration: 0 };

/**
 * Staggered fade / rise for the hero copy. The server markup is always the hidden state, so
 * hydration matches; when motion is paused (or the OS asks for reduced motion) the items jump
 * straight to their final state instead of animating.
 */
export function HeroIntro({ children, className }: { children: ReactNode; className?: string }) {
  const { paused } = useMotionPause();
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="shown"
      variants={{
        hidden: {},
        shown: { transition: paused ? INSTANT : { staggerChildren: 0.08, delayChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroIntroItem({ children, className }: { children: ReactNode; className?: string }) {
  const { paused } = useMotionPause();
  return (
    <motion.div
      // Without JS the hidden inline state would never animate away: show the copy as is.
      className={`noscript:transform-none! noscript:opacity-100! ${className ?? ""}`}
      variants={{
        hidden: { opacity: 0, y: 18 },
        shown: { opacity: 1, y: 0, transition: paused ? INSTANT : { duration: 0.8, ease: HERO_EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
