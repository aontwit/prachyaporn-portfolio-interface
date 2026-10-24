// Facts that are the same in every language. Text lives in i18n/messages/<lang>/translation.json.
// Source: resume.jpg (client-provided). Only email + phone are public, per the client.
export const profile = {
  /** The teacher's photo, blue studio background removed, white paper border (hero sticker). */
  portraitCutout: "/images/portrait-cutout.webp",
  email: "Prachyaporn2543@gmail.com",
  phone: "084-004-6732",
  phoneHref: "tel:+66840046732",
  /** Keys under `education.<id>` in translation.json. Years are Common Era; shown in each language's era. */
  education: [
    { id: "padaet", from: 2016, to: 2018 },
    { id: "stou", from: 2020, to: 2024 },
    { id: "crru", from: 2025, to: 2026 },
  ] as const,
  /** Start of the current job (Common Era). */
  experienceFrom: 2025,
  /** Keys under `experience.current.points`. */
  experiencePoints: ["p1", "p2", "p3", "p4"] as const,
  /** Keys under `skills.<id>`. */
  skills: ["earlyYears", "mentalMath", "tutoring", "parents"] as const,
};
