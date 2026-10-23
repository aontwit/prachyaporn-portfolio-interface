import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageSwitch } from "@/components/LanguageSwitch";

// Placeholder shell: nav polish and the mobile menu live in their own task.
export async function Header() {
  const t = await getTranslations();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <a href="#content" className="sr-only focus:not-sr-only">
        {t("skipToContent")}
      </a>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-lg">
          {t("profile.name")}
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link href="/activities">{t("nav.activities")}</Link>
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  );
}
