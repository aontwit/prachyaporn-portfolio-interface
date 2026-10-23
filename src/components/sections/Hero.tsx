import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Fragment } from "react";
import { HandUnderline } from "@/components/hero/HandUnderline";
import { HeroIntro, HeroIntroItem } from "@/components/hero/HeroIntro";
import { HeroScene } from "@/components/hero/HeroScene";
import { profile } from "@/content/profile";

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 ${down ? "rotate-90" : ""}`}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

const CTA =
  "group inline-flex items-center gap-1.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crayon-blue";
// Pill and round companion share one 48px height; leading 1.6 keeps Thai within DESIGN.md.
const PILL =
  "flex h-12 items-center rounded-full px-6 leading-[1.6] transition-colors duration-300 motion-reduce:transition-none";
const ROUND =
  "grid size-12 place-items-center rounded-full transition-[translate,background-color,border-color] duration-300 motion-reduce:transition-none";

/** Editorial hero (DESIGN.md, GoShuin): huge serif name left, framed portrait right, 3D scene behind it. */
export async function Hero() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const thai = locale === "th";

  return (
    <section aria-labelledby="hero-name" className="relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col px-4 pt-12 pb-16 sm:px-6 lg:min-h-[calc(100svh-4rem)] lg:pt-14 lg:pb-8">
        <div className="grid flex-1 items-center gap-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
          <HeroIntro className="min-w-0">
            <HeroIntroItem>
              <p
                className={`max-w-sm border-t border-rule pt-3 text-pencil ${
                  thai ? "text-sm leading-[1.6]" : "text-xs tracking-[0.12em] uppercase"
                }`}
              >
                {t("hero.greeting")}
              </p>
            </HeroIntroItem>
            <HeroIntroItem>
              <h1
                id="hero-name"
                className={`font-hand mt-5 text-[clamp(3.1rem,1.5rem+5vw,5.9rem)] font-semibold text-ink ${
                  thai ? "leading-[1.3]" : "leading-[1.02] tracking-[-0.015em]"
                }`}
              >
                {/* Each word stays whole: Thai line breaking would otherwise split the name mid-word.
                    The space sits between the spans so it survives when both words share a line. */}
                {t("profile.name")
                  .split(" ")
                  .map((word, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <span className="inline-block whitespace-nowrap">{word}</span>
                    </Fragment>
                  ))}
              </h1>
            </HeroIntroItem>
            <HeroIntroItem>
              <p className="mt-5 text-xl leading-[1.6] text-crayon-blue sm:text-2xl">{t("profile.role")}</p>
            </HeroIntroItem>
            <HeroIntroItem>
              <p className="mt-6 max-w-136 text-lg leading-[1.7] text-pencil">
                {t.rich("hero.tagline", { drawn: (word) => <HandUnderline>{word}</HandUnderline> })}
              </p>
            </HeroIntroItem>
            <HeroIntroItem className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
              <Link href="/activities" className={CTA}>
                <span className={`${PILL} bg-crayon-blue text-sheet group-hover:bg-ink`}>{t("hero.cta")}</span>
                <span
                  aria-hidden="true"
                  className={`${ROUND} bg-crayon-blue text-sheet group-hover:translate-x-0.5 group-hover:bg-ink`}
                >
                  <Arrow />
                </span>
              </Link>
              <a href="#contact" className={CTA}>
                <span className={`${PILL} border border-ink/30 text-ink group-hover:border-ink`}>
                  {t("hero.contactCta")}
                </span>
                <span
                  aria-hidden="true"
                  className={`${ROUND} border border-ink/30 text-ink group-hover:translate-y-0.5 group-hover:border-ink`}
                >
                  <Arrow down />
                </span>
              </a>
            </HeroIntroItem>
          </HeroIntro>

          <div className="relative mx-auto w-full max-w-76 sm:max-w-96">
            {/* lg+: at most 40px to the left (the grid gap is 48px), so the scene never reaches the text. */}
            <div className="absolute -inset-x-7 -inset-y-12 lg:-inset-y-20 lg:-right-20 lg:-left-10">
              <HeroScene />
            </div>
            <Image
              src={profile.portrait}
              alt={t("profile.name")}
              width={390}
              height={470}
              priority
              sizes="(min-width: 640px) 384px, 304px"
              className="relative h-auto w-full rounded-[28px] object-cover ring-1 ring-rule"
            />
          </div>
        </div>

        <a
          href="#about"
          className="mt-14 hidden items-center gap-3 self-start text-xs leading-[1.6] text-pencil transition-colors hover:text-ink motion-reduce:transition-none lg:flex"
        >
          <span aria-hidden="true" className="h-px w-10 bg-rule" />
          <span className={thai ? "" : "tracking-[0.12em] uppercase"}>{t("hero.scroll")}</span>
        </a>
      </div>
    </section>
  );
}
