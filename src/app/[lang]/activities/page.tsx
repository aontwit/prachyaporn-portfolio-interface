import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { activities } from "@/content/activities";
import { ui } from "@/content/ui";
import { hasLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/activities">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: ui.activities.title[lang] } : {};
}

// Stub: gallery layout, lightbox and motion are their own task.
export default async function ActivitiesPage({ params }: PageProps<"/[lang]/activities">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl">{ui.activities.title[lang]}</h1>
      <p className="mt-3 text-muted">{ui.activities.intro[lang]}</p>
      {activities.map((a) => (
        <section key={a.slug} id={a.slug} className="mt-14">
          <h2 className="text-2xl font-medium">{a.title[lang]}</h2>
          <p className="mt-2 text-muted">{a.summary[lang]}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {a.photos.map((p) => (
              <Image
                key={p.src}
                src={p.src}
                alt={p.alt[lang]}
                width={p.width}
                height={p.height}
                className="rounded-xl"
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
