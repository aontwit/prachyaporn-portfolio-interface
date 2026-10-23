import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { activities } from "@/content/activities";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("activities");
  return { title: t("title") };
}

// Stub: gallery layout, lightbox and motion are their own task.
export default async function ActivitiesPage() {
  const t = await getTranslations("activities");
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl">{t("title")}</h1>
      <p className="mt-3 text-muted">{t("intro")}</p>
      {activities.map((a) => (
        <section key={a.slug} id={a.slug} className="mt-14">
          <h2 className="text-2xl font-medium">{t(`items.${a.slug}.title`)}</h2>
          <p className="mt-2 text-muted">{t(`items.${a.slug}.summary`)}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {a.photos.map((p) => (
              <Image
                key={p.id}
                src={p.src}
                alt={t(`photos.${p.id}`)}
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
