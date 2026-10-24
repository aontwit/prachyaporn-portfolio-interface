import { About } from "@/components/sections/About";
import { ActivitiesPreview } from "@/components/sections/ActivitiesPreview";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { TeachingMedia } from "@/components/sections/TeachingMedia";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Certificates />
      <Experience />
      <Skills />
      <TeachingMedia />
      <ActivitiesPreview />
      <Contact />
    </>
  );
}
