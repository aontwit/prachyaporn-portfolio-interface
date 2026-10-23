// Facts that are the same in every language. Text lives in i18n/messages/<lang>/translation.json.
// Source: resume.jpg (client-provided). Only email + phone are public, per the client.
export const profile = {
  portrait: "/images/portrait.jpg",
  email: "Prachyaporn2543@gmail.com",
  phone: "084-004-6732",
  phoneHref: "tel:+66840046732",
  /** Keys under `education.<id>` in translation.json. */
  education: [
    { id: "padaet", years: "2016 – 2018" },
    { id: "stou", years: "2020 – 2024" },
    { id: "crru", years: "2025 – 2026" },
  ] as const,
  /** Keys under `experience.current.points`. */
  experiencePoints: ["p1", "p2", "p3", "p4"] as const,
  /** Keys under `skills.<id>`. */
  skills: ["earlyYears", "mentalMath", "tutoring", "parents"] as const,
};
