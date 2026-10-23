import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

// Stub: the 3D scene + intro motion are their own task.
export function Hero({ lang }: { lang: Locale }) {
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_1fr]">
      <div>
        <p className="text-muted">{ui.hero.greeting[lang]}</p>
        <h1 className="font-display mt-2 text-4xl sm:text-6xl">{profile.name[lang]}</h1>
        <p className="mt-3 text-xl text-accent">{profile.role[lang]}</p>
        <p className="mt-6 max-w-prose text-muted">{ui.hero.tagline[lang]}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/${lang}/activities/`} className="rounded-full bg-accent px-5 py-2.5 text-white">
            {ui.hero.cta[lang]}
          </Link>
          <a href="#contact" className="rounded-full border border-line px-5 py-2.5">
            {ui.hero.contactCta[lang]}
          </a>
        </div>
      </div>
      <Image
        src={profile.portrait}
        alt={profile.name[lang]}
        width={390}
        height={470}
        priority
        className="mx-auto rounded-[2rem] object-cover"
      />
    </section>
  );
}
