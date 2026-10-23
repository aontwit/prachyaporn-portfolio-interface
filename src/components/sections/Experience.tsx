import { Section } from "@/components/Section";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

export function Experience({ lang }: { lang: Locale }) {
  return (
    <Section id="experience" title={ui.nav.experience[lang]}>
      {profile.experience.map((x) => (
        <article key={x.title.en}>
          <p className="text-sm text-accent">{x.years[lang]}</p>
          <h3 className="font-medium">
            {x.title[lang]} · {x.org[lang]}
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
            {x.points.map((p) => (
              <li key={p.en}>{p[lang]}</li>
            ))}
          </ul>
        </article>
      ))}
    </Section>
  );
}
