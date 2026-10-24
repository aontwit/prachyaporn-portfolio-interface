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
  /** Photo for the home card (cropped to 4:3); defaults to the first photo. */
  cover?: PhotoId;
  photos: Photo[];
};

const img = (id: PhotoId, width: number, height: number): Photo => ({
  id,
  src: `/images/events/event-${id}.jpg`,
  width,
  height,
});

// Newest first: dated activities by date, then the undated ones.
export const activities: Activity[] = [
  {
    slug: "student-arts-crafts-fair-73",
    date: "2026-02-12",
    cover: "9420814",
    photos: [img("9420813", 900, 1600), img("9420814", 1477, 1108)],
  },
  {
    slug: "academic-camp-early-years",
    date: "2026-01-26",
    photos: [
      img("261024-24", 1600, 900),
      img("261024-23", 1600, 900),
      img("261024-25", 1600, 900),
      img("261024-26", 1600, 900),
      img("261024-27", 1280, 598),
    ],
  },
  {
    slug: "muay-thai-for-health",
    date: "2025-05-31",
    photos: [img("261024-39", 1280, 853), img("261024-41", 1280, 853)],
  },
  {
    slug: "lent-candle-offering",
    cover: "9420809",
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
  {
    slug: "childrens-day",
    photos: [img("261024-20", 1280, 721)],
  },
  {
    slug: "wai-kru",
    photos: [img("261024-37", 1477, 1108)],
  },
  {
    slug: "field-trip",
    photos: [img("261024-12", 1280, 853), img("261024-14", 1280, 853)],
  },
  {
    slug: "asean-day",
    photos: [
      img("261024-44", 1567, 1044),
      img("261024-43", 1567, 1044),
      img("261024-45", 1567, 1044),
      img("261024-46", 1567, 1044),
      img("261024-47", 1567, 1044),
      img("261024-8", 1567, 1044),
    ],
  },
  {
    slug: "krathong-making",
    cover: "261024-9",
    photos: [img("261024-10", 1477, 1108), img("261024-11", 1477, 1108), img("261024-9", 1477, 1108)],
  },
  {
    slug: "kindergarten-graduation",
    photos: [img("261024-7", 1477, 1108)],
  },
];
