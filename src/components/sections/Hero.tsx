import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { profile } from "@/content/profile";

// Stub: the 3D scene + intro motion are their own task.
export async function Hero() {
  const t = await getTranslations();
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_1fr]">
      <div>
        <p className="text-muted">{t("hero.greeting")}</p>
        <h1 className="font-display mt-2 text-4xl sm:text-6xl">{t("profile.name")}</h1>
        <p className="mt-3 text-xl text-accent">{t("profile.role")}</p>
        <p className="mt-6 max-w-prose text-muted">{t("hero.tagline")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/activities" className="rounded-full bg-accent px-5 py-2.5 text-white">
            {t("hero.cta")}
          </Link>
          <a href="#contact" className="rounded-full border border-line px-5 py-2.5">
            {t("hero.contactCta")}
          </a>
        </div>
      </div>
      <Image
        src={profile.portrait}
        alt={t("profile.name")}
        width={390}
        height={470}
        priority
        className="mx-auto rounded-4xl object-cover"
      />
    </section>
  );
}
