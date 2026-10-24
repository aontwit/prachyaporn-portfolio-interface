"use client";

import { useTranslations } from "next-intl";
import { useMotionPause } from "@/components/MotionPause";
import { tiltStyle } from "@/components/paper/tilt";

// −2° like a sticky note (halved on phones by the `tilt` utility); static, so SSR markup matches.
const TILT = tiltStyle(-2, 2);

/**
 * "Pause motion" as a small yellow sticky note (DESIGN.md "Paper system"), tilted, lifting
 * straight on hover / focus. `floating` pins it bottom-right from `md` up (on phones it would sit
 * over the text, and the menu sheet carries it there); otherwise it sits inline (mobile menu).
 * Classes never depend on `paused`, so the server markup matches; only the label and icon follow it.
 */
export function PausePill({ floating = false }: { floating?: boolean }) {
  const t = useTranslations("motion");
  const { paused, setPaused } = useMotionPause();
  return (
    <button
      type="button"
      aria-pressed={paused}
      style={TILT}
      onClick={() => setPaused(!paused)}
      className={`${floating ? "fixed right-4 bottom-4 z-30 max-md:hidden" : "relative"} tilt inline-flex min-h-11 items-center gap-2 rounded-xs bg-note-yellow px-4 font-hand text-sm text-ink shadow-note transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-0 focus-visible:rotate-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-blue motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5 motion-reduce:transition-none`}
    >
      <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="size-3.5 text-ink-blue" fill="currentColor">
        {paused ? <path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5Z" /> : <path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" />}
      </svg>
      {paused ? t("play") : t("pause")}
    </button>
  );
}
