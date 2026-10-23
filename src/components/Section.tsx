import type { ReactNode } from "react";

/** Page section with an anchor id and the shared heading style. */
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
    <section id={id} className="mx-auto max-w-5xl scroll-mt-24 px-4 py-20 sm:px-6">
      <h2 className="font-display mb-10 text-3xl text-ink sm:text-4xl">{title}</h2>
      {children}
    </section>
  );
}
