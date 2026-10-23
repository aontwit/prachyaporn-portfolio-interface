import { getTranslations } from "next-intl/server";
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";

export async function Education() {
  const t = await getTranslations();
  return (
    <Section id="education" title={t("nav.education")}>
      <ol className="space-y-6">
        {profile.education.map((e) => (
          <li key={e.id}>
            <p className="text-sm text-accent">{e.years}</p>
            <p className="font-medium">{t(`education.${e.id}.school`)}</p>
            <p className="text-muted">{t(`education.${e.id}.detail`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
