import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/content/activities";

/** Home preview card: 4:3 cover on a sand mat, date, title and a short summary, linking to the activity on `/activities`. */
export function ActivityCard({
  href,
  cover,
  title,
  summary,
  date,
}: {
  href: string;
  cover: Photo;
  title: string;
  summary: string;
  /** ISO date + its label in the reader's language; absent when the date is not confirmed. */
  date?: { iso: string; label: string };
}) {
  return (
    <Link
      href={href}
      className="group block h-full rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crayon-blue"
    >
      <span className="block rounded-[28px] bg-note-yellow p-2">
        <span className="block overflow-hidden rounded-[20px]">
          {/* Decorative here: the title below names the link; the photo's alt is read on /activities. */}
          <Image
            src={cover.src}
            alt=""
            width={cover.width}
            height={cover.height}
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </span>
      </span>
      <div className="px-2 pt-4">
        {date && (
          <time dateTime={date.iso} className="block text-sm tracking-[0.06em] text-crayon-blue">
            {date.label}
          </time>
        )}
        <h3 className="font-hand mt-1 text-xl leading-[1.6] text-ink transition-colors group-hover:text-crayon-blue motion-reduce:transition-none">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-[1.8] text-pencil">{summary}</p>
      </div>
    </Link>
  );
}
