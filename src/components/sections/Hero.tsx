import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Fragment } from "react";
import { HandUnderline } from "@/components/hero/HandUnderline";
import { HeroIntro, HeroIntroItem } from "@/components/hero/HeroIntro";
import { HeroScene } from "@/components/hero/HeroScene";
import { Highlighter, Polaroid } from "@/components/paper";
import { profile } from "@/content/profile";

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
        down ? "rotate-90 group-hover:translate-x-0.5" : "group-hover:translate-x-0.5"
      }`}
    >
      <path d="M3 8.4c3.2-.5 6.6-.6 9.6-.3M9.2 4.6c1.3 1.2 2.6 2.3 3.6 3.5-1.1 1.1-2.3 2.3-3.4 3.6" />
    </svg>
  );
}

// Hand-drawn pill (DESIGN.md "Type": buttons in Mali): uneven corner radii read as a pen outline.
// Text-carrying buttons are ink-blue or ink outline, never crayon-blue (DESIGN.md colour tokens).
const PILL =
  "group inline-flex min-h-12 items-center gap-2 rounded-[255px_18px_225px_18px/18px_225px_18px_255px] border-2 px-6 py-2 font-hand text-base leading-[1.6] transition-[background-color,border-color,translate] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-blue motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none sm:text-lg";

/** Notebook hero (DESIGN.md): handwritten name and pen marks left, taped polaroid right, paper cut-out stage below. */
export async function Hero() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const thai = locale === "th";

  return (
    <section aria-labelledby="hero-name" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-10 lg:pt-14">
        <HeroIntro className="min-w-0">
          <HeroIntroItem>
            <p className="flex items-center gap-3 font-hand text-lg leading-[1.6] text-pencil">
              <span aria-hidden="true" className="h-px w-10 bg-pencil/50" />
              {t("hero.greeting")}
            </p>
          </HeroIntroItem>
          <HeroIntroItem>
            <h1
              id="hero-name"
              className={`mt-3 font-hand text-[clamp(2.75rem,1.2rem+5.4vw,4.6rem)] font-bold text-ink ${
                thai ? "leading-[1.3]" : "leading-[1.12]"
              }`}
            >
              {/* Each word stays whole: Thai wrapping would otherwise split the name mid-word.
                  The space sits between the spans so it survives when both words share a row. */}
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
            <p className="mt-4 font-hand text-xl leading-[1.6] text-ink sm:text-2xl">
              <Highlighter color="yellow">{t("profile.role")}</Highlighter>
            </p>
          </HeroIntroItem>
          <HeroIntroItem>
            <p className="mt-5 max-w-120 text-lg leading-[1.8] text-pencil">
              {t.rich("hero.tagline", { drawn: (word) => <HandUnderline>{word}</HandUnderline> })}
            </p>
          </HeroIntroItem>
          <HeroIntroItem className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-4">
            <Link href="/activities" className={`${PILL} -rotate-1 border-ink-blue bg-ink-blue text-sheet hover:border-ink hover:bg-ink`}>
              {t("hero.cta")}
              <Arrow />
            </Link>
            <a href="#contact" className={`${PILL} rotate-1 border-ink text-ink hover:bg-sheet`}>
              {t("hero.contactCta")}
              <Arrow down />
            </a>
          </HeroIntroItem>
          <HeroIntroItem className="mt-8 hidden lg:block">
            <a
              href="#about"
              className="inline-flex items-center gap-3 font-hand text-sm leading-[1.6] text-pencil transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-blue motion-reduce:transition-none"
            >
              <span aria-hidden="true" className="h-px w-10 bg-pencil/50" />
              {t("hero.scroll")}
            </a>
          </HeroIntroItem>
        </HeroIntro>

        <div className="mx-auto w-full max-w-64 sm:max-w-72">
          <Polaroid rotate={2.5} caption={t("hero.caption")}>
            <Image
              src={profile.portrait}
              alt={t("profile.name")}
              width={390}
              height={470}
              preload
              sizes="(min-width: 640px) 260px, 230px"
              className="block h-auto w-full"
            />
          </Polaroid>
        </div>
      </div>

      {/* The paper cut-out stage: below the copy and the polaroid, never over them. */}
      <div className="relative mt-4 h-52 sm:h-60 lg:h-72">
        <HeroScene />
      </div>
    </section>
  );
}
