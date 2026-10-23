"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { NavList } from "./NavList";
import { PausePill } from "./PausePill";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const WIDE = "(min-width: 768px)"; // Tailwind `md`: the header bar takes over from here

/** Below 768px: a menu button that opens a full-height sheet (links, language, pause pill). */
export function MobileMenu({ name }: { name: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  // The sheet belongs to the page it was opened on, so any navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const sheetId = useId();
  const button = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpenOn(null);
    if (returnFocus) button.current?.focus();
  }, []);

  useEffect(() => {
    const panel = sheet.current;
    if (!open || !panel) return;
    const focusables = () => [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      const outside = !panel.contains(current);
      if (e.shiftKey && (current === first || outside)) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && (current === last || outside)) {
        e.preventDefault();
        first?.focus();
      }
    };
    const wide = window.matchMedia(WIDE);
    const onWide = () => wide.matches && close(false);

    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={sheetId}
        onClick={() => setOpenOn(pathname)}
        className="-mr-2 inline-flex min-h-11 min-w-11 items-center gap-2 rounded-full px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M3 6.2c4.5-.6 9.3-.3 14 .1M3 10.1c4.8-.3 9.5.2 14-.1M3 14c4.6.4 9.4-.2 14 .1" />
        </svg>
        {t("menu")}
      </button>

      <div
        ref={sheet}
        id={sheetId}
        role="dialog"
        aria-modal="true"
        aria-label={t("label")}
        hidden={!open}
        className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-bg px-4 pb-8"
      >
        <div className="flex min-h-16 items-center justify-between gap-4 border-b border-line">
          <span className="font-display text-lg">{name}</span>
          <button
            type="button"
            onClick={() => close(true)}
            className="-mr-2 inline-flex min-h-11 min-w-11 items-center gap-2 rounded-full px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M5 5.2c3.4 3 6.6 6.4 10 9.6M15 5c-3.2 3.4-6.6 6.6-10 9.8" />
            </svg>
            {t("close")}
          </button>
        </div>
        <nav aria-label={t("label")} className="mt-4">
          {open && <NavList variant="sheet" onNavigate={() => close(false)} />}
        </nav>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
          <LanguageSwitch />
          <PausePill />
        </div>
      </div>
    </div>
  );
}
