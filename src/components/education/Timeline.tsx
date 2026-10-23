"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import { useMotionPause } from "@/components/MotionPause";

export type TimelineItem = { id: string; years: string; school: string; detail: string };

const EASE = [0.22, 1, 0.36, 1] as const;
const hidden = { opacity: 0, y: 16 };
const shown = { opacity: 1, y: 0 };

const noopSubscribe = () => () => {};

/** False on the server and during hydration, true after — keeps the first client render equal to the HTML. */
const useHydrated = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

/**
 * Vertical timeline: a hairline that draws top→bottom with the scroll, items that reveal in turn.
 * Items use their own `motion.li` rather than `Reveal` because they must also stop for "Pause motion"
 * and keep the server HTML equal to the first client render.
 */
export function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { paused } = useMotionPause();
  // Reduced motion or "Pause motion": the final state, nothing moves.
  const still = useHydrated() && (Boolean(reduce) || paused);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });

  return (
    <div ref={ref} className="relative pl-10 sm:pl-14">
      <span aria-hidden className="absolute top-2 bottom-2 left-1.75 w-px bg-rule" />
      <motion.span
        aria-hidden
        className="absolute top-2 bottom-2 left-1.75 w-px origin-top bg-crayon-blue motion-reduce:transform-none!"
        style={{ scaleY: still ? 1 : scrollYProgress }}
      />
      <ol className="space-y-12">
        {items.map((item, i) => (
        <motion.li
          key={item.id}
          className="relative md:grid md:grid-cols-[10rem_1fr] md:gap-8 motion-reduce:transform-none! motion-reduce:opacity-100!"
          initial={hidden}
          {...(still
            ? { animate: shown, transition: { duration: 0 } }
            : {
                whileInView: shown,
                viewport: { once: true, margin: "-10% 0px" },
                transition: { duration: 0.7, delay: i * 0.08, ease: EASE },
              })}
        >
          <span
            aria-hidden
            className="absolute top-0.75 -left-10 grid size-3.75 place-items-center rounded-full border border-crayon-blue bg-paper sm:-left-14"
          >
            <span className="size-1.25 rounded-full bg-crayon-blue" />
          </span>
          <p className="text-sm tracking-[0.12em] text-crayon-blue tabular-nums">{item.years}</p>
          <div className="mt-2 md:mt-0">
            <h3 className="font-hand text-xl leading-[1.6] text-ink sm:text-2xl">{item.school}</h3>
            <p className="mt-1 leading-[1.7] text-pencil">{item.detail}</p>
          </div>
        </motion.li>
        ))}
      </ol>
    </div>
  );
}
