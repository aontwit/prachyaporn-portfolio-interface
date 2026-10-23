import { Section } from "@/components/Section";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

export function Education({ lang }: { lang: Locale }) {
  return (
    <Section id="education" title={ui.nav.education[lang]}>
      <ol className="space-y-6">
        {profile.education.map((e) => (
          <li key={e.years}>
            <p className="text-sm text-accent">{e.years}</p>
            <p className="font-medium">{e.school[lang]}</p>
            <p className="text-muted">{e.detail[lang]}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
