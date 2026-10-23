import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { NavList } from "@/components/nav/NavList";
import { doodle } from "@/content/doodles";

const BEAR = doodle("bear-pencil");
const BEAR_WIDTH = 64;

/** The notebook's back cover: a sturdier blue card strip with the name, links, back to top and ©. */
export async function Footer() {
  const t = await getTranslations();
  const name = t("profile.name");
  return (
    <footer className="mt-10 border-t-4 border-grid-strong bg-note-blue shadow-sheet">
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-24 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <div className="flex items-center gap-3">
            <Image
              src={BEAR.src}
              alt=""
              width={BEAR_WIDTH}
              height={Math.round((BEAR_WIDTH * BEAR.height) / BEAR.width)}
              className="h-auto w-12 shrink-0 -rotate-6 sm:w-16"
            />
            <p className="font-hand text-xl text-ink sm:text-2xl">{name}</p>
          </div>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-1.5 font-hand text-sm text-ink transition-colors hover:text-ink-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-blue"
          >
            <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 13V3M4 7l4-4 4 4" />
            </svg>
            {t("footer.backToTop")}
          </a>
        </div>
        <nav aria-label={t("footer.nav")} className="mt-6 border-t border-grid-strong pt-2">
          <NavList variant="footer" />
        </nav>
        <p className="mt-6 text-sm text-pencil">
          © {new Date().getFullYear()} {name}
        </p>
      </div>
    </footer>
  );
}
