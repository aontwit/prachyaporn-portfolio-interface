"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from "react";
import type { GalleryPhoto } from "./ActivityGallery";

const FOCUSABLE = "button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])";

function lockScroll(locked: boolean) {
  const root = document.documentElement.style;
  root.overflow = locked ? "hidden" : "";
  // Keep the scrollbar's space so the page behind does not jump sideways.
  root.scrollbarGutter = locked ? "stable" : "";
}

/**
 * Large view of one activity's photos in a native modal <dialog>: Esc closes (native),
 * ←/→ move within the activity, Tab stays inside, a tap outside the photo closes.
 * The fade is CSS (`starting:` + `transition-discrete`), so reduced motion is a class, not a hook.
 */
export function Lightbox({
  title,
  photos,
  index,
  open,
  onIndexChange,
  onClose,
}: {
  title: string;
  photos: GalleryPhoto[];
  /** `null` until the first open. */
  index: number | null;
  open: boolean;
  onIndexChange: (index: number) => void;
  /** Runs after the dialog closed, whatever closed it. */
  onClose: () => void;
}) {
  const t = useTranslations("activities.lightbox");
  const ref = useRef<HTMLDialogElement>(null);
  const photo = index === null ? null : photos[index];
  const multiple = photos.length > 1;

  useEffect(() => {
    const dialog = ref.current;
    if (open && dialog && !dialog.open) {
      lockScroll(true);
      dialog.showModal();
    }
  }, [open]);

  // Leaving the page while the dialog is open must not leave the page locked.
  useEffect(() => () => lockScroll(false), []);

  const close = () => ref.current?.close();

  const step = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + photos.length) % photos.length);
  };

  function handleKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    // Leave Alt/Ctrl/Meta + arrow to the browser (Alt+← is "back").
    const plainArrow = multiple && !e.altKey && !e.ctrlKey && !e.metaKey;
    if (e.key === "ArrowRight" && plainArrow) {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft" && plainArrow) {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Tab") {
      // A modal dialog makes the page inert, but Tab can still leave to the browser UI: wrap instead.
      const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE));
      const at = items.indexOf(document.activeElement as HTMLElement);
      const atEdge = e.shiftKey ? at <= 0 : at === -1 || at === items.length - 1;
      if (atEdge && items.length > 0) {
        e.preventDefault();
        (e.shiftKey ? items[items.length - 1] : items[0]).focus();
      }
    }
  }

  function handleClick(e: MouseEvent<HTMLDialogElement>) {
    // Anywhere but the photo, its caption or a control counts as "outside".
    if (!(e.target as Element).closest("img, figcaption, button")) close();
  }

  const iconButton =
    "grid size-11 shrink-0 place-items-center rounded-full border border-surface/30 bg-ink/50 text-surface transition-colors hover:bg-surface/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface motion-reduce:transition-none";

  return (
    <dialog
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={t("label", { title })}
      onClose={() => {
        lockScroll(false);
        onClose();
      }}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-ink/95 p-0 text-surface opacity-0 transition-[opacity,overlay,display] transition-discrete duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] backdrop:bg-transparent open:opacity-100 starting:open:opacity-0 motion-reduce:transition-none"
    >
      <div className="flex h-full flex-col px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Announces the counter and the new photo's alt on every ←/→; the visible caption is hidden from AT. */}
          <p className="text-sm text-surface/80" aria-live="polite">
            {index !== null && t("counter", { current: index + 1, total: photos.length })}
            {photo && <span className="sr-only"> — {photo.alt}</span>}
          </p>
          <button type="button" onClick={close} aria-label={t("close")} className={iconButton}>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          {photo && (
            <figure className="flex flex-col items-center gap-3 py-3">
              <Image
                key={photo.id}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="100vw"
                className="h-auto rounded-[20px]"
                // Fit inside the space left by the bars and caption, keeping the photo's own ratio.
                style={{ width: `min(100%, calc((100dvh - 13rem) * ${photo.width / photo.height}))` }}
              />
              <figcaption aria-hidden="true" className="max-w-2xl text-center text-sm leading-[1.7] text-surface/90">
                {photo.alt}
              </figcaption>
            </figure>
          )}
          {multiple && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={t("previous")}
                className={`${iconButton} absolute top-1/2 left-0 -translate-y-1/2`}
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={t("next")}
                className={`${iconButton} absolute top-1/2 right-0 -translate-y-1/2`}
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
