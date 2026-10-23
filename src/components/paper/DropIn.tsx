"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useMotionPause } from "@/components/MotionPause";

const TAGS = { div: motion.div, article: motion.article, figure: motion.figure, li: motion.li } as const;

export type DropInTag = keyof typeof TAGS;

/**
 * A piece of paper dropping onto the page as it scrolls in (DESIGN.md "Motion"): 16px down and
 * tipped 3° towards its resting tilt → rest. `initial` is the same on the server and the client;
 * reduced motion and the pause pill only change the transition (snap to the final state).
 */
export function DropIn({
  as = "div",
  tilt = 0,
  delay = 0,
  className,
  style,
  children,
}: {
  as?: DropInTag;
  tilt?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const { paused } = useMotionPause();
  const Tag = TAGS[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 16, rotate: tilt < 0 ? -3 : 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={reduce || paused ? { duration: 0 } : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
