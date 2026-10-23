import type { ReactNode } from "react";

export type HighlighterColor = "green" | "yellow";

const STRIP: Record<HighlighterColor, string> = {
  green: "bg-crayon-green/35",
  yellow: "bg-tape",
};

/**
 * Inline highlighter strip behind the lower part of a word or heading (DESIGN.md "Teacher's
 * pen"): crayon-green at ~35% by default, slightly rotated. Sized in em, so it scales with the text.
 */
export function Highlighter({ children, color = "green" }: { children: ReactNode; color?: HighlighterColor }) {
  return (
    <span className="relative isolate inline-block">
      {children}
      <span
        aria-hidden="true"
        className={`absolute -right-[0.3em] bottom-[0.08em] -left-[0.2em] -z-10 h-[0.4em] -rotate-1 rounded-[0.2em] ${STRIP[color]}`}
      />
    </span>
  );
}
