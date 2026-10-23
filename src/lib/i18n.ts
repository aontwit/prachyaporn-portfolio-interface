export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A value written once per language. */
export type Localized<T = string> = Record<Locale, T>;
