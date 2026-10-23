export const LOCALES = ["th", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "th";

export const isLocale = (value: string | undefined): value is Locale =>
  !!value && (LOCALES as readonly string[]).includes(value);
