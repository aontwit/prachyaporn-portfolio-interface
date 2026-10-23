import type { Localized } from "@/lib/i18n";

// Interface copy. Section-specific copy lives with its content file.
export const ui = {
  nav: {
    about: { th: "เกี่ยวกับ", en: "About" },
    education: { th: "การศึกษา", en: "Education" },
    experience: { th: "ประสบการณ์", en: "Experience" },
    skills: { th: "ทักษะ", en: "Skills" },
    activities: { th: "กิจกรรม", en: "Activities" },
    contact: { th: "ติดต่อ", en: "Contact" },
  },
  switchLanguage: { th: "English", en: "ภาษาไทย" },
  skipToContent: { th: "ข้ามไปเนื้อหา", en: "Skip to content" },
  hero: {
    greeting: { th: "สวัสดีค่ะ", en: "Hello, I'm" },
    tagline: {
      th: "ครูที่เชื่อว่าเด็กทุกคนเรียนรู้ได้ดีที่สุด เมื่อได้ลงมือทำด้วยตัวเอง",
      en: "A teacher who believes every child learns best by doing.",
    },
    cta: { th: "ดูกิจกรรม", en: "See activities" },
    contactCta: { th: "ติดต่อครู", en: "Get in touch" },
  },
  activities: {
    title: { th: "กิจกรรม", en: "Activities" },
    intro: {
      th: "บันทึกกิจกรรมกับนักเรียนและโรงเรียน",
      en: "Moments with my pupils and school.",
    },
    seeAll: { th: "ดูกิจกรรมทั้งหมด", en: "See all activities" },
    photos: { th: "ภาพ", en: "photos" },
    back: { th: "กลับหน้าแรก", en: "Back to home" },
  },
  contact: {
    title: { th: "ติดต่อ", en: "Get in touch" },
    intro: {
      th: "ยินดีพูดคุยเรื่องการสอน การสอนเสริม และโอกาสร่วมงาน",
      en: "Happy to talk about teaching, tutoring and new opportunities.",
    },
    email: { th: "อีเมล", en: "Email" },
    phone: { th: "โทรศัพท์", en: "Phone" },
  },
} satisfies Record<string, Record<string, Localized> | Localized>;
