import { getTranslations } from "next-intl/server";
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";

export async function Skills() {
  const t = await getTranslations();
  return (
    <Section id="skills" title={t("nav.skills")}>
      <div className="grid gap-6 sm:grid-cols-2">
        {profile.skills.map((id) => (
          <div key={id}>
            <h3 className="font-medium">{t(`skills.${id}.title`)}</h3>
            <p className="mt-2 text-muted">{t(`skills.${id}.body`)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
