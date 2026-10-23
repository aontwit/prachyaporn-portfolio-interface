import type { MetadataRoute } from "next";
import { SITE_PATHS, SITE_URL } from "@/lib/site";

// No hreflang alternates: both languages share one URL (the NEXT_LOCALE cookie picks the language).
export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
