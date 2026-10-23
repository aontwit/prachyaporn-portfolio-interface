import { getTranslations } from "next-intl/server";
import { NavList } from "@/components/nav/NavList";

export async function Footer() {
  const t = await getTranslations();
  const name = t("profile.name");
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-24 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="font-display text-xl">{name}</p>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 13V3M4 7l4-4 4 4" />
            </svg>
            {t("footer.backToTop")}
          </a>
        </div>
        <nav aria-label={t("footer.nav")} className="mt-6 border-t border-line pt-2">
          <NavList variant="footer" />
        </nav>
        <p className="mt-6 text-sm text-muted">
          © {new Date().getFullYear()} {name}
        </p>
      </div>
    </footer>
  );
}
