"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { HandDrawnEllipse } from "./HandDrawn";
import { navHref, SECTION_IDS } from "./items";
import { useActiveSection } from "./useActiveSection";

type Variant = "bar" | "sheet" | "footer";

const STYLE: Record<Variant, { list: string; link: string }> = {
  bar: {
    list: "flex flex-wrap items-center gap-x-2 py-1 text-sm",
    link: "inline-flex min-h-10 items-center px-3 text-muted transition-colors hover:text-ink",
  },
  sheet: {
    list: "flex flex-col",
    link: "flex min-h-14 items-center border-b border-line px-1 font-display text-2xl text-ink",
  },
  footer: {
    list: "flex flex-wrap gap-x-5 text-sm",
    link: "inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink",
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
          className: `${style.link} ${isActive ? "text-ink" : ""} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`,
          // On `/` the mark follows the section in view (a location); elsewhere it is the page itself.
          "aria-current": isActive ? (pathname === "/" ? "location" : "page") : undefined,
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
