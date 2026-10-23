import { notFound } from "next/navigation";
import { About } from "@/components/sections/About";
import { ActivitiesPreview } from "@/components/sections/ActivitiesPreview";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { hasLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <Hero lang={lang} />
      <About lang={lang} />
      <Education lang={lang} />
      <Experience lang={lang} />
      <Skills lang={lang} />
      <ActivitiesPreview lang={lang} />
      <Contact lang={lang} />
    </>
  );
}
