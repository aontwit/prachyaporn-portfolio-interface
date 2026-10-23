import { Section } from "@/components/Section";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

export function Skills({ lang }: { lang: Locale }) {
  return (
    <Section id="skills" title={ui.nav.skills[lang]}>
      <div className="grid gap-6 sm:grid-cols-2">
        {profile.skills.map((s) => (
          <div key={s.title.en}>
            <h3 className="font-medium">{s.title[lang]}</h3>
            <p className="mt-2 text-muted">{s.body[lang]}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
