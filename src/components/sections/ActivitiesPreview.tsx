import Link from "next/link";
import { getFormatter, getTranslations } from "next-intl/server";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { ACTIVITY_DATE } from "@/components/activities/date";
import { polaroidTilt } from "@/components/activities/tilt";
import { DropIn } from "@/components/paper";
import { Section } from "@/components/Section";
import { activities } from "@/content/activities";

/** Home preview: the three newest activities as taped polaroid cards, then a link to all of them. */
export async function ActivitiesPreview() {
  const t = await getTranslations("activities");
  const format = await getFormatter();
  return (
    <Section id="activities" title={t("title")}>
      <ul className="grid gap-x-8 gap-y-12 pt-4 sm:grid-cols-2 lg:grid-cols-3">
        {activities.slice(0, 3).map((activity, i) => {
          const cover = activity.photos.find((p) => p.id === activity.cover) ?? activity.photos[0];
          const rotate = polaroidTilt(i);
          return (
            <DropIn as="li" key={activity.slug} tilt={rotate} delay={i * 0.08} className="h-full">
              <ActivityCard
                href={`/activities#${activity.slug}`}
                cover={cover}
                rotate={rotate}
                title={t(`items.${activity.slug}.title`)}
                summary={t(`items.${activity.slug}.summary`)}
                date={
                  activity.date
                    ? { iso: activity.date, label: format.dateTime(new Date(activity.date), ACTIVITY_DATE) }
                    : undefined
                }
              />
            </DropIn>
          );
        })}
      </ul>
      <Link
        href="/activities"
        className="mt-12 inline-flex min-h-11 items-center gap-2 font-hand text-lg text-ink-blue underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-blue"
      >
        {t("seeAll")}
        <span aria-hidden="true">→</span>
      </Link>
    </Section>
  );
}
