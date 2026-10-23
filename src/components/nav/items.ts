/** Home-page sections, in page order. Each id is a section anchor and a key under `nav.*`. */
export const SECTION_IDS = ["about", "education", "experience", "skills", "activities", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/** Pages of their own: the nav item links there instead of to the home-page section. */
const PAGES: Partial<Record<SectionId, string>> = { activities: "/activities" };

/** `#id` on the home page (a plain in-page jump), `/#id` from any other page. */
export function navHref(id: SectionId, pathname: string): string {
  return PAGES[id] ?? (pathname === "/" ? `#${id}` : `/#${id}`);
}

/** The nav item a page stands for, when the page itself is a nav item (`/activities`). */
export function pageItem(pathname: string): SectionId | null {
  const hit = Object.entries(PAGES).find(([, path]) => pathname === path || pathname.startsWith(`${path}/`));
  return hit ? (hit[0] as SectionId) : null;
}
