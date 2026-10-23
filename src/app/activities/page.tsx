import type { Metadata } from "next";
import Link from "next/link";
import { getFormatter, getTranslations } from "next-intl/server";
import { ActivityGallery } from "@/components/activities/ActivityGallery";
import { ACTIVITY_DATE } from "@/components/activities/date";
import { Reveal } from "@/components/Reveal";
import { activities } from "@/content/activities";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("activities");
  return { title: t("title") };
}

/** The teaching journal: one section per activity (date, title, summary), then its photos. */
export default async function ActivitiesPage() {
  const t = await getTranslations("activities");
  const format = await getFormatter();
  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
      >
        <span aria-hidden="true">←</span>
        {t("back")}
      </Link>

      <header className="mt-8">
        <p className="border-t border-line pt-3 text-xs tracking-[0.12em] text-muted uppercase">{t("label")}</p>
        <h1 className="font-display mt-6 text-5xl leading-[1.2] text-ink sm:text-7xl [:lang(th)_&]:leading-[1.6]">{t("title")}</h1>
        <p className="mt-5 max-w-xl text-lg leading-[1.8] text-muted">{t("intro")}</p>
      </header>

      {activities.map((activity, i) => {
        const title = t(`items.${activity.slug}.title`);
        const photos = activity.photos.map((p) => ({ ...p, alt: t(`photos.${p.id}`) }));
        return (
          <section
            key={activity.slug}
            id={activity.slug}
            aria-labelledby={`${activity.slug}-title`}
            className="mt-16 scroll-mt-24 border-t border-line pt-10 lg:grid lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-4">
              <Reveal className="lg:sticky lg:top-28">
                {activity.date && (
                  <time dateTime={activity.date} className="block text-sm tracking-[0.06em] text-accent">
                    {format.dateTime(new Date(activity.date), ACTIVITY_DATE)}
                  </time>
                )}
                <h2 id={`${activity.slug}-title`} className="font-display mt-2 text-3xl leading-[1.6] text-ink">
                  {title}
                </h2>
                <p className="mt-3 leading-[1.8] text-muted">{t(`items.${activity.slug}.summary`)}</p>
                <p className="mt-5 text-xs tracking-[0.12em] text-muted uppercase">
                  {t("photoCount", { count: photos.length })}
                </p>
              </Reveal>
            </div>
            <div className="mt-8 lg:col-span-8 lg:mt-0">
              <ActivityGallery title={title} photos={photos} preloadFirst={i === 0} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
