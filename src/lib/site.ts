/**
 * The site's public origin — the one place metadata, sitemap and robots read it from.
 * Placeholder until hosting is decided (PLAN.md open question 1): set `NEXT_PUBLIC_SITE_URL`
 * on the host (e.g. `https://example.com`, no trailing slash) to override it.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://prachyaporn.vercel.app").replace(/\/+$/, "");

/** Paths a crawler should know about; language is a cookie, so one URL serves both. */
export const SITE_PATHS = ["/", "/activities"] as const;
