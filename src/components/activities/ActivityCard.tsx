import Image from "next/image";
import Link from "next/link";
import { Polaroid } from "@/components/paper";
import type { Photo } from "@/content/activities";
import { DateTape } from "./DateTape";

/**
 * Home preview card: a taped polaroid holding the 4:3 cover, the date on tape, the title in Mali
 * and a short summary, linking to the activity on `/activities`. Hover / focus straightens and
 * lifts it (CSS only, so reduced motion is a class, not a hook).
 */
export function ActivityCard({
  href,
  cover,
  title,
  summary,
  date,
  rotate,
}: {
  href: string;
  cover: Photo;
  title: string;
  summary: string;
  /** ISO date + its label in the reader's language; absent when the date is not confirmed. */
  date?: { iso: string; label: string };
  /** Resting tilt in degrees (±3). */
  rotate: number;
}) {
  return (
    <Link
      href={href}
      className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-ink-blue"
    >
      <Polaroid
        rotate={rotate}
        className="h-full transition-[rotate,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:rotate-0! group-focus-visible:-translate-y-1.5 group-focus-visible:rotate-0! motion-reduce:transition-none"
      >
        {/* Decorative here: the title below names the link; the photo's alt is read on /activities. */}
        <Image
          src={cover.src}
          alt=""
          width={cover.width}
          height={cover.height}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
          className="aspect-4/3 h-auto w-full object-cover"
        />
        <div className="px-1 pt-4 pb-1">
          {date && <DateTape iso={date.iso} label={date.label} />}
          <h3 className="mt-2 font-hand text-xl leading-[1.6] text-ink transition-colors group-hover:text-ink-blue motion-reduce:transition-none">
            {title}
          </h3>
          <p className="mt-1 line-clamp-3 text-sm leading-[1.8] text-pencil">{summary}</p>
        </div>
      </Polaroid>
    </Link>
  );
}
