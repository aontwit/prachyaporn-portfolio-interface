"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Lightbox } from "./Lightbox";

/** A photo as the gallery shows it: the facts from `src/content/` plus its alt text in the reader's language. */
export type GalleryPhoto = { id: string; src: string; width: number; height: number; alt: string };

/** `null` until the first open, so the lightbox renders (and downloads) no large photo before it is asked for. */
type View = { index: number; open: boolean } | null;

/** One activity's photos: masonry columns of framed photos, each opening the lightbox. */
export function ActivityGallery({
  title,
  photos,
  preloadFirst = false,
}: {
  title: string;
  photos: GalleryPhoto[];
  preloadFirst?: boolean;
}) {
  const [view, setView] = useState<View>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const single = photos.length === 1;
  // Columns: 1 below 640px · 2 from 640px · the gallery takes 8 of 12 columns from 1024px.
  const sizes = single
    ? "(min-width: 1024px) 640px, 100vw"
    : "(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw";

  return (
    <>
      <div className={single ? undefined : "gap-4 sm:columns-2"}>
        {photos.map((photo, i) => (
          <Reveal key={photo.id} delay={i * 0.08} className="mb-6 break-inside-avoid">
            <figure>
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                aria-haspopup="dialog"
                onClick={() => setView({ index: i, open: true })}
                className="group block w-full cursor-zoom-in rounded-[28px] bg-note-yellow p-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crayon-blue"
              >
                <span className="block overflow-hidden rounded-[20px]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes={sizes}
                    preload={preloadFirst && i === 0}
                    className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </span>
              </button>
              {/* Same text as the alt above, shown for sighted readers; hidden so it is not read twice. */}
              <figcaption aria-hidden="true" className="mt-2 px-3 text-sm leading-[1.7] text-pencil">
                {photo.alt}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <Lightbox
        title={title}
        photos={photos}
        index={view?.index ?? null}
        open={view?.open ?? false}
        onIndexChange={(index) => setView({ index, open: true })}
        onClose={() => {
          if (!view) return;
          setView({ index: view.index, open: false });
          // Back to the photo the reader ended on, which may differ from the one they opened.
          triggers.current[view.index]?.focus();
        }}
      />
    </>
  );
}
