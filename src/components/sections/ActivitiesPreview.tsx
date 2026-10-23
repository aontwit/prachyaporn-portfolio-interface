import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/Section";
import { activities } from "@/content/activities";

export async function ActivitiesPreview() {
  const t = await getTranslations("activities");
  return (
    <Section id="activities" title={t("title")}>
      <ul className="space-y-2">
        {activities.map((a) => (
          <li key={a.slug}>{t(`items.${a.slug}.title`)}</li>
        ))}
      </ul>
      <Link href="/activities" className="mt-6 inline-block text-accent">
        {t("seeAll")} →
      </Link>
    </Section>
  );
}
