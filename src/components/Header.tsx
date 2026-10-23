import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { NavList } from "@/components/nav/NavList";
import { PausePill } from "@/components/nav/PausePill";

/** Journal-style header: name + language on the first row, section links on a hairline-ruled second row. */
export async function Header() {
  const t = await getTranslations();
  return (
    <>
      <a
        href="#content"
        className="fixed top-3 left-4 z-[60] -translate-y-[calc(100%+1rem)] rounded-full bg-ink px-5 py-3 text-sm text-bg focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {t("skipToContent")}
      </a>
      <header className="sticky top-0 z-40">
        {/* The blur lives on a sibling layer: a backdrop-filter on <header> itself would trap the fixed menu sheet inside it. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 border-b border-line bg-bg/85 backdrop-blur" />
        <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="font-display text-lg sm:text-xl">
            {t("profile.name")}
          </Link>
          <div className="hidden md:block">
            <LanguageSwitch />
          </div>
          <MobileMenu name={t("profile.name")} />
        </div>
        <div className="hidden border-t border-line md:block">
          <nav aria-label={t("nav.label")} className="mx-auto max-w-5xl px-3">
            <NavList variant="bar" />
          </nav>
        </div>
      </header>
      <PausePill floating />
    </>
  );
}
