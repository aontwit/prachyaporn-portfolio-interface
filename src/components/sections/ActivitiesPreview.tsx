import Link from "next/link";
import { getFormatter, getTranslations } from "next-intl/server";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { ACTIVITY_DATE } from "@/components/activities/date";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { activities } from "@/content/activities";

export async function ActivitiesPreview() {
  const t = await getTranslations("activities");
  const format = await getFormatter();
  return (
    <Section id="activities" title={t("title")}>
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity, i) => {
          const cover = activity.photos.find((p) => p.id === activity.cover) ?? activity.photos[0];
          return (
            <li key={activity.slug}>
              <Reveal delay={i * 0.08} className="h-full">
                <ActivityCard
                  href={`/activities#${activity.slug}`}
                  cover={cover}
                  title={t(`items.${activity.slug}.title`)}
                  summary={t(`items.${activity.slug}.summary`)}
                  date={
                    activity.date
                      ? { iso: activity.date, label: format.dateTime(new Date(activity.date), ACTIVITY_DATE) }
                      : undefined
                  }
                />
              </Reveal>
            </li>
          );
        })}
      </ul>
      <Link
        href="/activities"
        className="mt-10 inline-flex min-h-11 items-center text-crayon-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crayon-blue"
      >
        {t("seeAll")} →
      </Link>
    </Section>
  );
}
