"use client";

import { useReducedMotion } from "motion/react";
import { createContext, useContext, useState, type ReactNode } from "react";

type MotionPause = { paused: boolean; setPaused: (paused: boolean) => void };

const Ctx = createContext<MotionPause>({ paused: false, setPaused: () => {} });

/** Site-wide "Pause motion" state; starts paused when the OS asks for reduced motion. */
export function MotionPauseProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [choice, setPaused] = useState<boolean | null>(null);
  const paused = choice ?? Boolean(reduce);
  return <Ctx.Provider value={{ paused, setPaused }}>{children}</Ctx.Provider>;
}

export const useMotionPause = () => useContext(Ctx);
