import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { AbacusIcon, BookIcon, BubblesIcon, ChildIcon } from "@/components/skills/SkillIcons";
import { profile } from "@/content/profile";

type SkillId = (typeof profile.skills)[number];

/** Look per skill: its doodle and the colour of the card's left edge. */
const skillLook: Record<SkillId, { Icon: ComponentType; edge: string }> = {
  earlyYears: { Icon: ChildIcon, edge: "border-l-crayon-blue" },
  mentalMath: { Icon: AbacusIcon, edge: "border-l-grid-strong" },
  tutoring: { Icon: BookIcon, edge: "border-l-grid-strong" },
  parents: { Icon: BubblesIcon, edge: "border-l-crayon-blue" },
};

export async function Skills() {
  const t = await getTranslations();
  return (
    <Section id="skills" title={t("nav.skills")}>
      <ul role="list" className="grid gap-5 sm:grid-cols-2">
        {profile.skills.map((id, i) => {
          const { Icon, edge } = skillLook[id];
          return (
            <li key={id}>
              {/* Stagger within a row only, so a phone reader never waits on cards above. */}
              <Reveal delay={(i % 2) * 0.08} className="h-full">
                {/* Focusable so keyboard readers get the same lift as a hover. */}
                <article
                  tabIndex={0}
                  aria-labelledby={`skill-${id}`}
                  className={`h-full rounded-3xl border border-l-4 border-rule ${edge} bg-sheet p-6 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-lg hover:shadow-ink/10 focus-visible:shadow-lg focus-visible:shadow-ink/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crayon-blue motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1 motion-reduce:transition-none sm:p-7`}
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-note-blue text-crayon-blue">
                    <Icon />
                  </span>
                  <h3 id={`skill-${id}`} className="font-hand mt-5 text-xl leading-[1.6] text-ink">
                    {t(`skills.${id}.title`)}
                  </h3>
                  <p className="mt-2 text-[17px] leading-[1.75] text-pencil">{t(`skills.${id}.body`)}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
