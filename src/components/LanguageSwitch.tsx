"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "../../i18n/actions";
import { LOCALES } from "../../i18n/locales";

/** `ไทย / EN` text switch (DESIGN.md): sets the NEXT_LOCALE cookie, then re-renders on the server. */
export function LanguageSwitch() {
  const locale = useLocale();
  const t = useTranslations("language");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const choose = (next: string) =>
    startTransition(async () => {
      if ((await setLocale(next)).ok) router.refresh();
    });

  return (
    <div role="group" aria-label={t("label")} aria-busy={pending} className="flex items-center gap-1.5">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true">/</span>}
          <button
            type="button"
            lang={l}
            aria-pressed={l === locale}
            disabled={pending}
            onClick={() => l !== locale && choose(l)}
            className={l === locale ? "text-ink underline underline-offset-4" : "hover:text-ink"}
          >
            {t(l)}
          </button>
        </span>
      ))}
    </div>
  );
}
