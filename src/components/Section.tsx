import type { ReactNode } from "react";
import { Highlighter } from "@/components/paper/Highlighter";

/** Page section with an anchor id and the shared heading: handwritten (Mali) on a highlighter strip. */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="mb-10 font-hand text-3xl leading-[1.5] font-bold text-ink sm:text-4xl">
        <Highlighter>{title}</Highlighter>
      </h2>
      {children}
    </section>
  );
}
