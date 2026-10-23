import { getTranslations } from "next-intl/server";
import { Section } from "@/components/Section";

export async function About() {
  const t = await getTranslations();
  return (
    <Section id="about" title={t("nav.about")}>
      <p className="max-w-3xl text-lg leading-relaxed text-muted">{t("profile.summary")}</p>
    </Section>
  );
}
