import { Section } from "@/components/Section";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

export function About({ lang }: { lang: Locale }) {
  return (
    <Section id="about" title={ui.nav.about[lang]}>
      <p className="max-w-3xl text-lg leading-relaxed text-muted">{profile.summary[lang]}</p>
    </Section>
  );
}
