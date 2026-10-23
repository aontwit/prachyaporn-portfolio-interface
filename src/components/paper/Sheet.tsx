import type { ReactNode } from "react";
import { DropIn } from "./DropIn";
import { Tape } from "./Tape";
import { tiltStyle } from "./tilt";

type SheetTape = "none" | "one" | "two";

const TAPE: Record<SheetTape, string[]> = {
  none: [],
  one: ["left-[calc(var(--margin-x)+0.5rem)] -rotate-6"],
  two: ["left-[calc(var(--margin-x)+0.5rem)] -rotate-6", "right-6 rotate-4"],
};

/**
 * A lined notebook page taped onto the grid (DESIGN.md "Paper system"): white, blue rules every
 * 32px, the red margin line, soft shadow, ≤ 1° tilt. Copy inside sits on the rules (32px
 * line-height) — children keep to whole 32px steps (`leading-8`, `mt-8`) to stay on them.
 */
export function Sheet({
  children,
  tilt = 0,
  tape = "one",
  drop = true,
  delay = 0,
  as = "div",
  className = "",
}: {
  children: ReactNode;
  /** Resting rotation in degrees, clamped to ±1. */
  tilt?: number;
  tape?: SheetTape;
  /** Drop in when scrolled into view. */
  drop?: boolean;
  /** Stagger in seconds (steps of 0.08). */
  delay?: number;
  as?: "div" | "article";
  className?: string;
}) {
  const classes = `lined-paper tilt relative rounded-[4px] py-8 pr-5 pl-[calc(var(--margin-x)+1.25rem)] leading-8 shadow-sheet sm:pr-8 sm:pl-[calc(var(--margin-x)+1.5rem)] ${className}`;
  const content = (
    <>
      {TAPE[tape].map((place) => (
        <Tape key={place} className={place} />
      ))}
      {children}
    </>
  );
  if (!drop) {
    const Tag = as;
    return (
      <Tag className={classes} style={tiltStyle(tilt, 1)}>
        {content}
      </Tag>
    );
  }
  return (
    <DropIn as={as} tilt={tilt} delay={delay} className={classes} style={tiltStyle(tilt, 1)}>
      {content}
    </DropIn>
  );
}
