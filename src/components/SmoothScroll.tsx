"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { useMotionPause } from "@/components/MotionPause";

// Ease in and out: a section link glides there instead of lurching off at full speed.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Eased wheel and in-page link scrolling. Native smooth scroll jumps to ~16,000px/s on a long
 * section jump, and a Windows wheel moves in 100px steps. Touch stays native. Off while motion is
 * paused; Lenis itself goes instant under `prefers-reduced-motion`. `autoToggle` stops it while
 * the page is locked (`overflow: hidden` on <html>, e.g. the lightbox).
 */
export function SmoothScroll() {
  const { paused } = useMotionPause();
  useEffect(() => {
    if (paused) return;
    const lenis = new Lenis({
      autoRaf: true,
      autoToggle: true,
      anchors: { duration: 1.1, easing: easeInOutCubic },
    });
    return () => lenis.destroy();
  }, [paused]);
  return null;
}
