import Link from "next/link";
import { ui } from "@/content/ui";
import { profile } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

// Placeholder shell: nav polish, mobile menu and the language switch live in their own task.
export function Header({ lang }: { lang: Locale }) {
  const other: Locale = lang === "th" ? "en" : "th";
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <a href="#content" className="sr-only focus:not-sr-only">
        {ui.skipToContent[lang]}
      </a>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href={`/${lang}/`} className="font-display text-lg">
          {profile.name[lang]}
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link href={`/${lang}/activities/`}>{ui.nav.activities[lang]}</Link>
          <Link href={`/${other}/`} hrefLang={other} lang={other}>
            {ui.switchLanguage[lang]}
          </Link>
        </nav>
      </div>
    </header>
  );
}
