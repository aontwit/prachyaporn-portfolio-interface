import type { ReactNode } from "react";
import { DropIn } from "./DropIn";
import { tiltStyle } from "./tilt";

export type NoteColor = "yellow" | "green" | "blue" | "pink";

const PAPER: Record<NoteColor, string> = {
  yellow: "bg-note-yellow",
  green: "bg-note-green",
  blue: "bg-note-blue",
  pink: "bg-note-pink",
};

/** A square-ish sticky note for skills and short facts (DESIGN.md "Paper system"), tilted ≤ 2°. */
export function StickyNote({
  children,
  color = "yellow",
  rotate = 0,
  drop = true,
  delay = 0,
  as = "div",
  className = "",
}: {
  children: ReactNode;
  color?: NoteColor;
  /** Resting rotation in degrees, clamped to ±2. */
  rotate?: number;
  /** Drop in when scrolled into view. */
  drop?: boolean;
  /** Stagger in seconds (steps of 0.08). */
  delay?: number;
  as?: "div" | "article" | "li";
  className?: string;
}) {
  const classes = `tilt relative px-5 py-5.5 shadow-note ${PAPER[color]} ${className}`;
  if (!drop) {
    const Tag = as;
    return (
      <Tag className={classes} style={tiltStyle(rotate, 2)}>
        {children}
      </Tag>
    );
  }
  return (
    <DropIn as={as} tilt={rotate} delay={delay} className={classes} style={tiltStyle(rotate, 2)}>
      {children}
    </DropIn>
  );
}
