"use client";

import { useTranslations } from "next-intl";
import { useMotionPause } from "@/components/MotionPause";

/** GoShuin-style "Pause motion" pill. `floating` pins it bottom-right; otherwise it sits inline (mobile menu). */
export function PausePill({ floating = false }: { floating?: boolean }) {
  const t = useTranslations("motion");
  const { paused, setPaused } = useMotionPause();
  return (
    <button
      type="button"
      aria-pressed={paused}
      onClick={() => setPaused(!paused)}
      className={`${floating ? "fixed right-4 bottom-4 z-30 bg-surface/90 shadow-sm backdrop-blur" : "bg-surface"} inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-ink transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
    >
      <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="size-3.5 text-accent" fill="currentColor">
        {paused ? <path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5Z" /> : <path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" />}
      </svg>
      {paused ? t("play") : t("pause")}
    </button>
  );
}
