import { getTranslations } from "next-intl/server";
import { Section } from "@/components/Section";
import type { NoteColor } from "@/components/paper/StickyNote";
import { SkillNote } from "@/components/skills/SkillNote";
import { doodle, type DoodleName } from "@/content/doodles";
import { profile } from "@/content/profile";

type SkillId = (typeof profile.skills)[number];

/** Look per skill: its note colour, resting tilt (°) and crayon doodle. */
const skillLook: Record<SkillId, { color: NoteColor; rotate: number; doodle: DoodleName }> = {
  earlyYears: { color: "yellow", rotate: -2, doodle: "heart" },
  mentalMath: { color: "green", rotate: 1.5, doodle: "abacus" },
  tutoring: { color: "blue", rotate: -1, doodle: "open-book" },
  parents: { color: "pink", rotate: 2, doodle: "cloud" },
};

// Four sticky notes stuck on the grid page, each a different colour and tilt.
export async function Skills() {
  const t = await getTranslations();
  return (
    <Section id="skills" title={t("nav.skills")}>
      <ul role="list" className="grid gap-8 sm:grid-cols-2 sm:gap-10">
        {profile.skills.map((id, i) => {
          const look = skillLook[id];
          const { src, width, height } = doodle(look.doodle);
          return (
            <li key={id}>
              <SkillNote
                id={id}
                title={t(`skills.${id}.title`)}
                body={t(`skills.${id}.body`)}
                color={look.color}
                rotate={look.rotate}
                // Stagger within a row only, so a phone reader never waits on notes above.
                delay={(i % 2) * 0.08}
                doodle={{ src, width, height }}
              />
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
