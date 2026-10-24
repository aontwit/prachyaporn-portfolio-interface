"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { GalleryPhoto } from "@/components/activities/ActivityGallery";
import { Lightbox } from "@/components/activities/Lightbox";
import { useMotionPause } from "@/components/MotionPause";
import { Tape } from "@/components/paper";
import { tiltStyle } from "@/components/paper/tilt";

/** A photo on the worksheet: the gallery photo plus its short handwritten caption and crop focus. */
export type WorksheetPhoto = GalleryPhoto & { caption: string; focus?: string };

/** `null` until the first open, so the lightbox renders (and downloads) no large photo before it is asked for. */
type View = { index: number; open: boolean } | null;

/** Resting tilts (°, within ±2) so neighbouring photos lean different ways; the `tilt` utility halves them on phones. */
const TILTS = [-1.5, 1, -0.5, 1.5, -1, 0.5] as const;

/**
 * Tape across a top corner, so it reads as "stuck on the sheet" rather than a polaroid. Three on the
 * left, then three on the right: in 2 and 3 columns a right-hand strip never meets the next photo's left-hand one.
 */
const LEFT = "-left-4 rotate-[-28deg] w-16! sm:w-20!";
const RIGHT = "-right-4 rotate-[28deg] w-16! sm:w-20!";
const TAPE = [LEFT, LEFT, LEFT, RIGHT, RIGHT, RIGHT] as const;

// Hover / keyboard focus: the photo straightens and lifts. Only when the OS allows motion
// (`motion-safe:`) and the pause pill is off; `paused` is false on the server and in the hydration
// render, so the SSR markup always carries these classes (same approach as SkillNote).
const LIFT =
  "transition-[translate,rotate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 motion-safe:focus-visible:-translate-y-1 motion-safe:focus-visible:rotate-0";

/**
 * The teaching-media photos taped onto a lined sheet like a worksheet: numbered, each with a
 * handwritten caption on the rules. Each photo's box is rounded up to whole 32px rule steps
 * (`round()` on the column width; plain 4:3 where `round()` is unsupported), so every caption
 * lands on a rule. A click / Enter opens the activities lightbox with the whole photo.
 */
export function MediaWorksheet({ title, photos }: { title: string; photos: WorksheetPhoto[] }) {
  const [view, setView] = useState<View>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const { paused } = useMotionPause();

  return (
    <>
      <ol role="list" className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <li key={photo.id} className="@container">
            <figure>
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                aria-haspopup="dialog"
                onClick={() => setView({ index: i, open: true })}
                style={tiltStyle(TILTS[i % TILTS.length], 2)}
                className={`tilt relative block aspect-4/3 h-[round(up,75cqi,2rem)] w-full cursor-zoom-in bg-sheet p-1.5 shadow-note hover:shadow-polaroid focus-visible:shadow-polaroid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-blue ${paused ? "" : LIFT}`}
              >
                <Tape className={TAPE[i % TAPE.length]} />
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  // 1 column below 640px, 2 from 640px, 3 from 1024px (the sheet is at most ~870px inside).
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 42vw, calc(100vw - 6rem)"
                  style={photo.focus ? { objectPosition: photo.focus } : undefined}
                  className="size-full object-cover"
                />
              </button>
              {/* A different, shorter text than the alt, so it is read too. */}
              <figcaption className="font-hand leading-8 text-pretty text-ink">
                <span aria-hidden="true" className="mr-1.5 text-ink-blue tabular-nums">{i + 1}.</span>
                {photo.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
      <Lightbox
        title={title}
        photos={photos}
        index={view?.index ?? null}
        open={view?.open ?? false}
        onIndexChange={(index) => setView({ index, open: true })}
        onClose={() => {
          if (!view) return;
          setView({ index: view.index, open: false });
          // Back to the photo the reader ended on, which may differ from the one they opened.
          triggers.current[view.index]?.focus();
        }}
      />
    </>
  );
}
