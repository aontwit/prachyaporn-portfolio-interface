// Photos of the teacher making classroom teaching media, in the order the home section shows them.
// Text (caption, alt) lives in translation.json under `teachingMedia.photos.<id>`.
// Only the teacher is in these photos (no pupils), prepared by the lead (resized, EXIF stripped).
import type messages from "../../i18n/messages/th/translation.json";

export type TeachingMediaId = keyof typeof messages.teachingMedia.photos;

export type TeachingMediaPhoto = {
  id: TeachingMediaId;
  src: string;
  width: number;
  height: number;
  /** `object-position` for the 4:3 crop on the sheet; the lightbox always shows the whole photo. */
  focus?: string;
};

const img = (id: TeachingMediaId, n: number, width: number, height: number, focus?: string): TeachingMediaPhoto => ({
  id,
  src: `/images/teaching-media/teaching-media-${n}.jpg`,
  width,
  height,
  focus,
});

export const teachingMedia: TeachingMediaPhoto[] = [
  img("prep-pieces", 1, 1477, 1108),
  // Portrait: the crop keeps the board and the teacher's hands.
  img("five-senses-board", 2, 1108, 1477, "50% 62%"),
  img("soil-cards", 3, 1477, 1108),
  img("cutting-frames", 4, 1477, 1108),
  img("school-board", 5, 1477, 1108),
  img("water-board", 6, 1477, 1108),
];
