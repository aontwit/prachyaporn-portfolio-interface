"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pageItem, SECTION_IDS, type SectionId } from "./items";

// A thin band a third of the way down the viewport: the section crossing it is "the one in view".
// Sections sit edge to edge, so exactly one crosses it (none while the hero does).
const BAND = "-30% 0px -60% 0px";

/** The nav item to mark: the section in view on `/`, the page's own item elsewhere (`/activities`). */
export function useActiveSection(track = true): SectionId | null {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [inView, setInView] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!track || !onHome) return;
    const crossing = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id);
          else crossing.delete(entry.target.id);
        }
        setInView(SECTION_IDS.find((id) => crossing.has(id)) ?? null);
      },
      { rootMargin: BAND },
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [track, onHome]);

  if (!track) return null;
  return onHome ? inView : pageItem(pathname);
}
