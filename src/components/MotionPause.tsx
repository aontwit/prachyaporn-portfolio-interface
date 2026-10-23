"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";

type MotionPause = { paused: boolean; setPaused: (paused: boolean) => void };

const Ctx = createContext<MotionPause>({ paused: false, setPaused: () => {} });

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const prefersReduced = () => window.matchMedia(QUERY).matches;
// The server cannot know the OS setting: the server render and the hydration render both read
// "not reduced", then React re-renders with the real value, so markup never mismatches.
const serverSnapshot = () => false;

/** Site-wide "Pause motion" state; starts paused when the OS asks for reduced motion. */
export function MotionPauseProvider({ children }: { children: ReactNode }) {
  const reduce = useSyncExternalStore(subscribe, prefersReduced, serverSnapshot);
  const [choice, setPaused] = useState<boolean | null>(null);
  const paused = choice ?? reduce;
  return <Ctx.Provider value={{ paused, setPaused }}>{children}</Ctx.Provider>;
}

export const useMotionPause = () => useContext(Ctx);
