import { getTranslations } from "next-intl/server";
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";

export async function Contact() {
  const t = await getTranslations("contact");
  return (
    <Section id="contact" title={t("title")}>
      <p className="text-muted">{t("intro")}</p>
      <p className="mt-4">
        {t("email")}: <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>
      <p>
        {t("phone")}: <a href={profile.phoneHref}>{profile.phone}</a>
      </p>
    </Section>
  );
}
