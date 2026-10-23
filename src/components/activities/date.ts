import type { DateTimeFormatOptions } from "next-intl";

/**
 * One date style for every activity, passed to next-intl's `format.dateTime`.
 * `th` → 12 ก.พ. 2569 (the Thai locale's default calendar is Buddhist era) · `en` → Feb 12, 2026.
 * UTC because `date` is a calendar day ("2026-02-12" parses as UTC midnight), not an instant.
 */
export const ACTIVITY_DATE: DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
};
