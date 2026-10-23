import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { NavList } from "@/components/nav/NavList";
import { PausePill } from "@/components/nav/PausePill";

/**
 * The notebook's top margin: a blank paper strip above the grid, name + language on the first row,
 * the handwritten section links on the second, each row closed by a hairline rule.
 */
export async function Header() {
  const t = await getTranslations();
  return (
    <>
      <a
        href="#content"
        className="fixed top-3 left-4 z-[60] -translate-y-[calc(100%+1rem)] rounded-full bg-ink px-5 py-3 text-sm text-paper focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-blue"
      >
        {t("skipToContent")}
      </a>
      {/* No backdrop-filter here: it would trap the fixed menu sheet inside the header. */}
      <header className="sticky top-0 z-40 border-b border-rule bg-paper">
        <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="font-hand text-lg text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-blue sm:text-xl"
          >
            {t("profile.name")}
          </Link>
          <div className="hidden md:block">
            <LanguageSwitch />
          </div>
          <MobileMenu name={t("profile.name")} />
        </div>
        <div className="hidden border-t border-rule md:block">
          <nav aria-label={t("nav.label")} className="mx-auto max-w-5xl px-3">
            <NavList variant="bar" />
          </nav>
        </div>
      </header>
      <PausePill floating />
    </>
  );
}
