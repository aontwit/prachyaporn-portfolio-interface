import { getTranslations } from "next-intl/server";
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";

export async function Experience() {
  const t = await getTranslations();
  return (
    <Section id="experience" title={t("nav.experience")}>
      <article>
        <p className="text-sm text-accent">{t("experience.current.years")}</p>
        <h3 className="font-medium">
          {t("experience.current.title")} · {t("experience.current.org")}
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          {profile.experiencePoints.map((id) => (
            <li key={id}>{t(`experience.current.points.${id}`)}</li>
          ))}
        </ul>
      </article>
    </Section>
  );
}
