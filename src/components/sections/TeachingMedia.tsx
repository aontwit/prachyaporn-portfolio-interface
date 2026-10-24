import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PenCircle, Sheet } from "@/components/paper";
import { Section } from "@/components/Section";
import { MediaWorksheet } from "@/components/teaching-media/MediaWorksheet";
import { doodle } from "@/content/doodles";
import { teachingMedia } from "@/content/teachingMedia";

const CRAYONS = doodle("crayons");

// A lined worksheet page: a short intro on the rules (one phrase circled by the pen), then the
// photos of the teacher making classroom media taped on, numbered, with handwritten captions.
export async function TeachingMedia() {
  const t = await getTranslations("teachingMedia");
  const photos = teachingMedia.map(({ id, src, width, height, focus }) => ({
    id,
    src,
    width,
    height,
    focus,
    alt: t(`photos.${id}.alt`),
    caption: t(`photos.${id}.caption`),
  }));
  return (
    <Section id="teaching-media" title={t("title")}>
      <Sheet tilt={0.4} tape="one">
        <Image
          src={CRAYONS.src}
          alt=""
          width={CRAYONS.width}
          height={CRAYONS.height}
          sizes="(min-width: 640px) 56px, 40px"
          className="pointer-events-none absolute -top-12 right-4 h-auto w-10 -rotate-12 drop-shadow-sm select-none sm:-top-16 sm:right-10 sm:w-14"
        />
        <p className="font-hand leading-8 text-pencil">{t("label")}</p>
        <p className="max-w-3xl text-base leading-8 text-pretty text-ink sm:text-lg">
          {t.rich("intro", { circle: (words) => <PenCircle>{words}</PenCircle> })}
        </p>
        <MediaWorksheet title={t("lightboxTitle")} photos={photos} />
      </Sheet>
    </Section>
  );
}
