"use client";

import Image from "next/image";
import { useMotionPause } from "@/components/MotionPause";
import { StickyNote } from "@/components/paper";
import type { NoteColor } from "@/components/paper/StickyNote";
import type { doodles } from "@/content/doodles";

type Doodle = (typeof doodles)[number];

// Hover / keyboard focus: the note lifts and straightens. Only when the OS allows motion
// (`motion-safe:`) and the pause pill is off. `paused` is false on the server and in the hydration
// render (MotionPauseProvider reads the OS through a server snapshot), so the SSR markup always
// carries these classes and the client drops them only in a later render — never a mismatch.
const LIFT =
  "motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:rotate-0 motion-safe:group-focus-visible:-translate-y-1.5 motion-safe:group-focus-visible:rotate-0";

/**
 * One skill as a sticky note with its crayon doodle (decorative). The article is focusable so a
 * keyboard reader gets the same lift as a mouse hover; the focus ring is drawn on the note itself.
 */
export function SkillNote({
  id,
  title,
  body,
  color,
  rotate,
  delay,
  doodle,
}: {
  id: string;
  title: string;
  body: string;
  color: NoteColor;
  rotate: number;
  delay: number;
  doodle: Doodle;
}) {
  const { paused } = useMotionPause();
  const labelId = `skill-${id}`;
  return (
    <article tabIndex={0} aria-labelledby={labelId} className="group h-full outline-none">
      <StickyNote
        color={color}
        rotate={rotate}
        delay={delay}
        className={`h-full transition-[translate,rotate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-polaroid group-focus-visible:shadow-polaroid group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ink-blue motion-reduce:transition-none sm:px-6 sm:py-6 ${paused ? "" : LIFT}`}
      >
        <Image
          src={doodle.src}
          alt=""
          width={doodle.width}
          height={doodle.height}
          sizes="(min-width: 640px) 80px, 64px"
          className="pointer-events-none size-16 object-contain select-none sm:size-20"
        />
        <h3 id={labelId} className="mt-3 font-hand text-lg leading-[1.6] font-semibold text-ink">
          {title}
        </h3>
        <p className="mt-1 text-[15px] leading-[1.75] text-pencil sm:text-base">{body}</p>
      </StickyNote>
    </article>
  );
}
