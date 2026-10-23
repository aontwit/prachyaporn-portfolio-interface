import Link from "next/link";
import { Section } from "@/components/Section";
import { activities } from "@/content/activities";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

export function ActivitiesPreview({ lang }: { lang: Locale }) {
  return (
    <Section id="activities" title={ui.activities.title[lang]}>
      <ul className="space-y-2">
        {activities.map((a) => (
          <li key={a.slug}>{a.title[lang]}</li>
        ))}
      </ul>
      <Link href={`/${lang}/activities/`} className="mt-6 inline-block text-accent">
        {ui.activities.seeAll[lang]} →
      </Link>
    </Section>
  );
}
