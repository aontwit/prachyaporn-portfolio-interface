import type { DateTimeFormatOptions } from "next-intl";

/**
 * Years in each language's own era, passed to next-intl's `format.dateTime` / `dateTimeRange`:
 * `th` → พ.ศ. 2568 (the Thai locale's default calendar is Buddhist era) · `en` → 2025.
 * Content stores Common Era years; UTC so 1 January never slips into the year before.
 */
export const YEAR: DateTimeFormatOptions = { year: "numeric", timeZone: "UTC" };

export const yearDate = (year: number) => new Date(Date.UTC(year, 0, 1));
