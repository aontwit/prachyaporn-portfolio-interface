// Text (title, summary, photo alt) lives in translation.json under
// `activities.items.<slug>` and `activities.photos.<photo id>`.
// Every photo here has pupils' faces blurred (see CLAUDE.md).
import type messages from "../../i18n/messages/th/translation.json";

type PhotoId = keyof typeof messages.activities.photos;

export type Photo = { id: PhotoId; src: string; width: number; height: number };

export type Activity = {
  slug: keyof typeof messages.activities.items;
  /** ISO date when known; titles and dates come from banners in the photos. */
  date?: string;
  photos: Photo[];
};

const img = (id: PhotoId, width: number, height: number): Photo => ({
  id,
  src: `/images/events/event-${id}.jpg`,
  width,
  height,
});

// Newest first.
export const activities: Activity[] = [
  {
    slug: "student-arts-crafts-fair-73",
    date: "2026-02-12",
    photos: [img("9420813", 900, 1600), img("9420814", 1477, 1108)],
  },
  {
    slug: "lent-candle-offering",
    photos: [
      img("9420810", 1280, 598),
      img("9420811", 1280, 598),
      img("9420812", 1280, 598),
      img("9420809", 1477, 1108),
    ],
  },
  {
    slug: "temple-visit",
    photos: [img("9420808", 1477, 1108)],
  },
];
