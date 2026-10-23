import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import { DEFAULT_LOCALE, isLocale, type Locale } from "./locales";
import en from "./messages/en/translation.json";
import th from "./messages/th/translation.json";

// Static imports so editing a translation.json hot-reloads (same as the mkp repo).
// `satisfies` makes a key missing from en a type error.
const MESSAGES: Record<Locale, typeof th> = { th, en: en satisfies typeof th };

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value;
  const locale: Locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
  return { locale, messages: MESSAGES[locale] };
});
