/**
 * The site's public origin — the one place metadata, sitemap and robots read it from.
 * `NEXT_PUBLIC_SITE_URL` (e.g. a custom domain, no trailing slash) wins; on Vercel it falls back to
 * the project's production domain, which Vercel sets on every build, previews included.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "http://localhost:3000"
).replace(/\/+$/, "");

/** Paths a crawler should know about; language is a cookie, so one URL serves both. */
export const SITE_PATHS = ["/", "/activities"] as const;
