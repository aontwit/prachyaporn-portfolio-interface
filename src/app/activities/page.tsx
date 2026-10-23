import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getFormatter, getTranslations } from "next-intl/server";
import { ActivityGallery } from "@/components/activities/ActivityGallery";
import { ACTIVITY_DATE } from "@/components/activities/date";
import { DateTape } from "@/components/activities/DateTape";
import { Highlighter, Sheet } from "@/components/paper";
import { doodle } from "@/content/doodles";
import { activities } from "@/content/activities";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("activities");
  return { title: t("title") };
}

const star = doodle("star");
const heart = doodle("heart");

/** next/image size props for a doodle shown at most `width` CSS px wide, so it fetches a small file. */
const doodleSize = (d: { width: number; height: number }, width: number) => ({
  width,
  height: Math.round((width * d.height) / d.width),
});

/**
 * The teaching journal as a scrapbook on the grid paper: per activity the date on tape, the title
 * in Mali and the summary on a small lined sheet, then its photos as taped polaroids.
 */
export default async function ActivitiesPage() {
  const t = await getTranslations("activities");
  const format = await getFormatter();
  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 font-hand text-pencil transition-colors hover:text-ink-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-blue motion-reduce:transition-none"
      >
        <span aria-hidden="true">←</span>
        {t("back")}
      </Link>

      <header className="relative mt-8">
        <p className="font-hand text-pencil">{t("label")}</p>
        <div className="mt-4 flex items-center gap-3 sm:gap-5">
          <h1 className="font-hand text-5xl leading-[1.4] font-bold text-ink sm:text-7xl [:lang(th)_&]:leading-[1.6]">
            <Highlighter>{t("title")}</Highlighter>
          </h1>
          {/* Crayon doodles stuck beside the title: decorative. */}
          <Image src={star.src} alt="" {...doodleSize(star, 64)} className="h-auto w-12 shrink-0 -rotate-12 sm:w-16" />
        </div>
        <Image
          src={heart.src}
          alt=""
          {...doodleSize(heart, 56)}
          className="absolute top-0 right-2 h-auto w-10 rotate-12 sm:right-8 sm:w-14"
        />
        <p className="mt-5 max-w-xl text-lg leading-[1.8] text-pencil">{t("intro")}</p>
      </header>

      {activities.map((activity, i) => {
        const title = t(`items.${activity.slug}.title`);
        const photos = activity.photos.map((p) => ({ ...p, alt: t(`photos.${p.id}`) }));
        return (
          <section
            key={activity.slug}
            id={activity.slug}
            aria-labelledby={`${activity.slug}-title`}
            className="mt-20 scroll-mt-24 lg:grid lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                {activity.date && (
                  <DateTape iso={activity.date} label={format.dateTime(new Date(activity.date), ACTIVITY_DATE)} />
                )}
                <h2 id={`${activity.slug}-title`} className="mt-2 font-hand text-3xl leading-[1.6] font-bold text-ink">
                  {title}
                </h2>
                <Sheet tilt={i % 2 === 0 ? -0.6 : 0.6} className="mt-6">
                  <p className="text-pencil">{t(`items.${activity.slug}.summary`)}</p>
                  <p className="mt-8 font-hand text-sm text-pencil">{t("photoCount", { count: photos.length })}</p>
                </Sheet>
              </div>
            </div>
            <div className="mt-10 lg:col-span-8 lg:mt-0">
              <ActivityGallery title={title} photos={photos} preloadFirst={i === 0} tiltOffset={i * 2} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
