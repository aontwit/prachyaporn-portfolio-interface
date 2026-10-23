import type { Localized } from "@/lib/i18n";

export type Photo = { src: string; width: number; height: number; alt: Localized };

export type Activity = {
  slug: string;
  /** ISO date when known; titles and dates come from banners in the photos. */
  date?: string;
  title: Localized;
  summary: Localized;
  photos: Photo[];
};

const img = (id: string, width: number, height: number, alt: Localized): Photo => ({
  src: `/images/events/event-${id}.jpg`,
  width,
  height,
  alt,
});

// Newest first.
export const activities: Activity[] = [
  {
    slug: "student-arts-crafts-fair-73",
    date: "2026-02-12",
    title: {
      th: "งานศิลปหัตถกรรมนักเรียน ครั้งที่ 73",
      en: "73rd Student Arts & Crafts Fair",
    },
    summary: {
      th: "กลุ่มโรงเรียนเวียงชัย–เวียงเหนือ ณ โรงเรียนบ้านเวียงเดิม พานักเรียนร่วมแข่งขันและแสดงผลงาน",
      en: "Wiang Chai–Wiang Nuea school cluster, hosted at Ban Wiang Doem School. I brought pupils to compete and perform.",
    },
    photos: [
      img("9420813", 900, 1600, {
        th: "ครูปรัชญาภรณ์กับนักเรียนสามคนหน้าเวทีงานศิลปหัตถกรรม",
        en: "Teacher Prachyaporn with three pupils in front of the fair stage",
      }),
      img("9420814", 1477, 1108, {
        th: "คณะครูและนักเรียนถ่ายภาพหมู่หน้าอาคารจัดงาน",
        en: "Teachers and pupils in a group photo outside the fair hall",
      }),
    ],
  },
  {
    slug: "lent-candle-offering",
    title: {
      th: "ถวายเทียนพรรษาและแสดงตนเป็นพุทธมามกะ",
      en: "Buddhist Lent Candle Offering",
    },
    summary: {
      th: "โรงเรียนบ้านเวียงเดิมร่วมถวายเทียนพรรษา นักเรียนแสดงตนเป็นพุทธมามกะ ปลูกฝังคุณธรรมตั้งแต่วัยเยาว์",
      en: "Ban Wiang Doem School offered Lent candles and pupils declared themselves Buddhists — values taught from an early age.",
    },
    photos: [
      img("9420810", 1280, 598, {
        th: "นักเรียนพนมมือฟังพระสงฆ์ในศาลาวัด",
        en: "Pupils with palms joined, listening to the monks in the temple hall",
      }),
      img("9420811", 1280, 598, {
        th: "คณะครูถ่ายภาพร่วมกับพระสงฆ์และเครื่องไทยธรรม",
        en: "Teachers with the monks and the offerings",
      }),
      img("9420812", 1280, 598, {
        th: "คณะครูพนมมือหน้าป้ายงานถวายเทียนพรรษา",
        en: "Teachers with palms joined in front of the ceremony banner",
      }),
      img("9420809", 1477, 1108, {
        th: "คณะครูถ่ายภาพร่วมกับพระสงฆ์ในพระอุโบสถ",
        en: "Teachers with a monk inside the ordination hall",
      }),
    ],
  },
  {
    slug: "temple-visit",
    title: {
      th: "พานักเรียนเรียนรู้วัฒนธรรมที่วัด",
      en: "Temple Culture Visit",
    },
    summary: {
      th: "นักเรียนปฐมวัยและประถมเรียนรู้ศิลปะ วัฒนธรรม และประเพณีไทยจากสถานที่จริง",
      en: "Preschool and primary pupils learning Thai art, culture and tradition on site.",
    },
    photos: [
      img("9420808", 1477, 1108, {
        th: "นักเรียนและคณะครูถ่ายภาพหมู่หน้าวิหาร",
        en: "Pupils and teachers in front of the temple's assembly hall",
      }),
    ],
  },
];
