import { getFormatter, getTranslations } from "next-intl/server";
import { Sheet, Tick } from "@/components/paper";
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";
import { YEAR, yearDate } from "@/lib/year";

// Ticks draw one at a time (DESIGN.md "Teacher's pen": one drawing in view at once), after the sheet lands.
const TICK_START = 0.5;
const TICK_STEP = 0.8;

// A lined notebook page with the learning path: a crayon tick per finished step, every line on a 32px rule.
export async function Education() {
  const t = await getTranslations();
  const format = await getFormatter();
  return (
    <Section id="education" title={t("nav.education")}>
      <Sheet tilt={0.5} tape="two">
        <p className="font-hand leading-8 text-pencil">{t("education.label")}</p>
        <ol className="mt-8 space-y-8">
          {profile.education.map((e, i) => (
            <li key={e.id} className="relative md:grid md:grid-cols-[9rem_1fr] md:gap-6">
              {/* ticked in the margin, on the first line, like a teacher checking a list */}
              <Tick delay={TICK_START + i * TICK_STEP} className="absolute top-1.5 -left-11 text-xl sm:-left-13" />
              <p className="font-hand text-sm leading-8 font-semibold text-ink-blue tabular-nums">
                {format.dateTimeRange(yearDate(e.from), yearDate(e.to), YEAR)}
              </p>
              <div>
                <h3 className="font-hand text-base leading-8 font-semibold text-ink sm:text-lg">
                  {t(`education.${e.id}.school`)}
                </h3>
                <p className="leading-8 text-pencil">{t(`education.${e.id}.detail`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Sheet>
    </Section>
  );
}
