import { getTranslations } from "next-intl/server";
import { Timeline } from "@/components/education/Timeline";
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";

export async function Education() {
  const t = await getTranslations();
  const items = profile.education.map((e) => ({
    id: e.id,
    years: e.years,
    school: t(`education.${e.id}.school`),
    detail: t(`education.${e.id}.detail`),
  }));
  return (
    <Section id="education" title={t("nav.education")}>
      <p className="mb-12 border-t border-line pt-3 text-xs leading-[1.6] tracking-[0.12em] text-muted uppercase">
        {t("education.label")}
      </p>
      <Timeline items={items} />
    </Section>
  );
}
