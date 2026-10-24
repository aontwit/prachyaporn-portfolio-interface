"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Shared scroll-in motion so every section moves the same way. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  // useReducedMotion() is null on the server and true/false on the client, so it
  // must never change `initial` (that is SSR markup → hydration mismatch). Only the
  // transition depends on it: reduced motion snaps to the final state.
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
