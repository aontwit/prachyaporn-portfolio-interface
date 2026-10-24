import { getTranslations } from "next-intl/server";
import { Sheet } from "@/components/paper";
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";

// Two wobbles of a short crayon dash, and the crayons that draw them, taken in turn per point.
const DASHES = ["M1.5 5.2c3.1-1.1 6.4-1.6 9.7-1.2 2.4.3 4.4.6 7.3.1", "M1.4 4.1c2.8.8 5.9 1 9.1.5 2.6-.4 4.9-.9 7.8-.4"];
const CRAYONS = ["stroke-crayon-pink", "stroke-crayon-green", "stroke-crayon-blue"];

/** A short crayon dash as a list bullet, centred on the first 32px line of its point. */
function CrayonDash({ index }: { index: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 20 9"
      fill="none"
      className={`absolute top-3 left-0 h-[9px] w-5 ${CRAYONS[index % CRAYONS.length]}`}
    >
      <path d={DASHES[index % DASHES.length]} strokeWidth={2.6} strokeLinecap="round" />
    </svg>
  );
}

/**
 * A rubber stamp pressed on the page at an angle: ink-blue outline drawn a little uneven, Mali
 * caps. Decorative — the years line already says the job is current.
 */
function Stamp({ label }: { label: string }) {
  return (
    <span
      aria-hidden="true"
      className="relative mt-3 inline-flex shrink-0 -rotate-[8deg] items-center px-3.5 py-1.5 font-hand text-sm leading-6 font-bold tracking-[0.12em] text-ink-blue uppercase opacity-90 select-none sm:mr-2 sm:px-4 sm:text-base"
    >
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" fill="none" className="absolute inset-0 size-full overflow-visible">
        <path
          d="M4.5 3.8C30 2.6 68 2.4 95.6 3.4c1 10.6 1.1 21.8.4 32.9-29.8 1.2-62.3 1.1-91.8.3-.9-11.2-.8-21.6.3-32.8Z"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M8.6 8.2c27.4-.8 55.4-.9 83 .1.6 8 .6 15.8 0 23.6-27.6.8-55.4.8-83 .1-.6-7.9-.6-15.9 0-23.8Z"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {label}
    </span>
  );
}

// The current job on a taped lined page: years, role and school, then the points, every line on a 32px rule.
export async function Experience() {
  const t = await getTranslations();
  return (
    <Section id="experience" title={t("nav.experience")}>
      <Sheet tilt={-0.4} tape="one">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-hand text-sm leading-8 font-semibold text-ink-blue tabular-nums">
              {t("experience.current.years")}
            </p>
            <h3 className="font-hand text-base leading-8 font-semibold text-ink sm:text-lg">
              {t("experience.current.title")}
            </h3>
          </div>
          <Stamp label={t("experience.current.stamp")} />
        </div>
        <p className="leading-8 text-pencil">{t("experience.current.org")}</p>
        <ul role="list" className="mt-8 max-w-3xl">
          {profile.experiencePoints.map((id, i) => (
            <li key={id} className="relative pl-8 leading-8 text-ink">
              <CrayonDash index={i} />
              {t(`experience.current.points.${id}`)}
            </li>
          ))}
        </ul>
      </Sheet>
    </Section>
  );
}
