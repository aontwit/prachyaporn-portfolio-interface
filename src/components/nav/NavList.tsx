"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { HandDrawnEllipse } from "./HandDrawn";
import { navHref, SECTION_IDS } from "./items";
import { useActiveSection } from "./useActiveSection";

type Variant = "bar" | "sheet" | "footer";

// Handwritten links in ink (DESIGN.md "Type"); the active item is marked by the ellipse alone.
const STYLE: Record<Variant, { list: string; link: string }> = {
  bar: {
    list: "flex flex-wrap items-center gap-x-2 py-1",
    link: "inline-flex min-h-11 items-center px-3 font-hand text-ink transition-colors hover:text-ink-blue",
  },
  // One link per two rules of the lined sheet (MobileMenu): 64px rows, the word sitting on the lower rule.
  sheet: {
    list: "flex flex-col",
    link: "flex h-16 items-end px-1 pb-1.5 font-hand text-2xl leading-8 text-ink",
  },
  footer: {
    list: "flex flex-wrap gap-x-5",
    link: "inline-flex min-h-11 items-center font-hand text-ink transition-colors hover:text-ink-blue",
  },
};

/** Section links. `bar` and `sheet` circle the active item; `footer` is a plain list. */
export function NavList({ variant, onNavigate }: { variant: Variant; onNavigate?: () => void }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const active = useActiveSection(variant !== "footer");
  const style = STYLE[variant];

  return (
    <ul className={style.list}>
      {SECTION_IDS.map((id) => {
        const href = navHref(id, pathname);
        const isActive = id === active;
        const label = (
          <span className="relative">
            {t(id)}
            {isActive && <HandDrawnEllipse key={id} />}
          </span>
        );
        const props = {
          className: `${style.link} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-blue`,
          // On `/` the mark follows the section in view (a location, only for in-page links);
          // elsewhere it is the page itself.
          "aria-current": !isActive ? undefined : pathname !== "/" ? "page" : href.startsWith("#") ? "location" : undefined,
          onClick: onNavigate,
        } as const;
        return (
          <li key={id}>
            {href.startsWith("#") ? (
              <a href={href} {...props}>
                {label}
              </a>
            ) : (
              <Link href={href} {...props}>
                {label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
