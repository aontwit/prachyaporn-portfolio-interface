"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useLayoutEffect, useRef, useTransition } from "react";
import { HandDrawnUnderline } from "@/components/nav/HandDrawn";
import { captureAnchor, restoreAnchor, type ScrollAnchor } from "@/components/nav/scrollAnchor";
import { setLocale } from "../../i18n/actions";
import { LOCALES } from "../../i18n/locales";

/**
 * `ไทย / EN` text switch (DESIGN.md): sets the NEXT_LOCALE cookie, then re-renders on the server.
 * `router.refresh()` keeps the page and the scroll offset; the anchor keeps the reader on the same
 * section when the other language wraps to a different height.
 */
export function LanguageSwitch() {
  const locale = useLocale();
  const t = useTranslations("language");
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const anchor = useRef<ScrollAnchor | null>(null);

  useLayoutEffect(() => {
    if (anchor.current) restoreAnchor(anchor.current);
    anchor.current = null;
  }, [locale]);

  const choose = (next: string) => {
    anchor.current = captureAnchor();
    startTransition(async () => {
      if ((await setLocale(next)).ok) router.refresh();
      else anchor.current = null;
    });
  };

  return (
    <div role="group" aria-label={t("label")} aria-busy={pending} className="flex items-center gap-1 text-sm">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden="true" className="text-line">
              /
            </span>
          )}
          <button
            type="button"
            lang={l}
            aria-pressed={l === locale}
            disabled={pending}
            onClick={() => l !== locale && choose(l)}
            className={`relative inline-flex min-h-11 items-center px-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${l === locale ? "text-ink" : "text-muted hover:text-ink"}`}
          >
            <span className="relative">
              {t(l)}
              {l === locale && <HandDrawnUnderline key={l} />}
            </span>
          </button>
        </span>
      ))}
    </div>
  );
}
