"use client";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { useRef, useState } from "react";
import type { GalleryPhoto } from "@/components/activities/ActivityGallery";
import { DateTape } from "@/components/activities/DateTape";
import { Lightbox } from "@/components/activities/Lightbox";
import { polaroidTilt } from "@/components/activities/tilt";
import { DropIn, Polaroid } from "@/components/paper";
import { Section } from "@/components/Section";
import { certificates } from "@/content/certificates";

/** `null` until the first open, so the lightbox downloads no full-size certificate before it is asked for. */
type View = { index: number; open: boolean } | null;

// th → พ.ศ. 2569 (the Thai locale's default calendar is Buddhist era) · en → 2026. UTC: `issued` is a calendar day.
const YEAR = { year: "numeric", timeZone: "UTC" } as const;

/**
 * Training & certificates: each certificate a taped polaroid on the grid, captioned with its year
 * on tape, the course and the issuer. A click (or Enter) opens the activities lightbox to read it full size.
 */
export function Certificates() {
  const t = useTranslations("certificates");
  const format = useFormatter();
  const [view, setView] = useState<View>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const items = certificates.map((c) => {
    // No-break space: "พ.ศ. 2569" never splits across lines.
    const year = format.dateTime(new Date(c.issued), YEAR).replace(" ", "\u00a0");
    const photo: GalleryPhoto = { id: c.id, src: c.src, width: c.width, height: c.height, alt: t(`items.${c.id}.alt`, { year }) };
    return { ...c, year, photo };
  });

  return (
    <Section id="certificates" title={t("title")}>
      <p className="font-hand text-pencil">{t("label")}</p>
      <ul className="mt-8 grid gap-x-8 gap-y-12 pt-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => {
          const rotate = polaroidTilt(i + 1);
          return (
            <DropIn as="li" key={c.id} tilt={rotate} delay={(i % 3) * 0.08}>
              <Polaroid
                rotate={rotate}
                caption={
                  <span className="block text-left">
                    <DateTape iso={c.issued.slice(0, 4)} label={c.year} />
                    <span className="mt-2 block text-base leading-[1.6] text-ink">{t(`items.${c.id}.course`)}</span>
                    <span className="mt-1 block font-sans text-sm leading-[1.8] text-pencil">{t(`items.${c.id}.issuer`)}</span>
                  </span>
                }
              >
                <button
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => setView({ index: i, open: true })}
                  className="group block w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-blue"
                >
                  <Image
                    src={c.src}
                    alt={c.photo.alt}
                    width={c.width}
                    height={c.height}
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </button>
              </Polaroid>
            </DropIn>
          );
        })}
      </ul>
      <Lightbox
        title={t("title")}
        label={t("lightbox")}
        photos={items.map((c) => c.photo)}
        index={view?.index ?? null}
        open={view?.open ?? false}
        onIndexChange={(index) => setView({ index, open: true })}
        onClose={() => {
          if (!view) return;
          setView({ index: view.index, open: false });
          // Back to the certificate the reader ended on, which may differ from the one they opened.
          triggers.current[view.index]?.focus();
        }}
      />
    </Section>
  );
}
