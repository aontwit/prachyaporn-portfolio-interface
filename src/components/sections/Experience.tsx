import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";

export async function Experience() {
  const t = await getTranslations();
  return (
    <Section id="experience" title={t("nav.experience")}>
      <Reveal>
        <article className="rounded-3xl border border-l-4 border-rule border-l-crayon-blue bg-sheet p-6 sm:p-10">
          <p className="text-xs leading-[1.6] tracking-[0.12em] text-crayon-blue uppercase">{t("experience.current.years")}</p>
          <h3 className="font-hand mt-3 text-2xl leading-[1.6] text-ink sm:text-3xl">
            {t("experience.current.title")}
          </h3>
          <p className="mt-1 leading-[1.7] text-pencil">{t("experience.current.org")}</p>
          <ul role="list" className="mt-6 max-w-3xl space-y-4 border-t border-rule pt-6">
            {profile.experiencePoints.map((id) => (
              <li key={id} className="flex gap-4 text-[17px] leading-[1.75] text-ink">
                {/* A short pen dash instead of a disc bullet. */}
                <span aria-hidden="true" className="mt-[0.85em] h-0.5 w-3 shrink-0 rounded-full bg-grid-strong" />
                <span>{t(`experience.current.points.${id}`)}</span>
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </Section>
  );
}
