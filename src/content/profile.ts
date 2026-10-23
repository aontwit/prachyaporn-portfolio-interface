import type { Localized } from "@/lib/i18n";

// Source: resume.jpg (client-provided). Only email + phone are public, per the client.
export const profile = {
  name: {
    th: "ปรัชญาภรณ์ แสนสล่า",
    en: "Prachyaporn Saensla",
  } satisfies Localized,
  role: {
    th: "ครูปฐมวัย",
    en: "Early Childhood Teacher",
  } satisfies Localized,
  location: { th: "เชียงราย", en: "Chiang Rai, Thailand" } satisfies Localized,
  portrait: "/images/portrait.jpg",
  email: "Prachyaporn2543@gmail.com",
  phone: "084-004-6732",
  phoneHref: "tel:+66840046732",
  summary: {
    th: "ครูผู้สอนระดับปฐมวัยสำเร็จการศึกษาตรงสาย มีความเชี่ยวชาญด้านจิตวิทยาพัฒนาการเด็ก และการจัดการเรียนรู้ผ่านการลงมือปฏิบัติจริง (Active Learning) มีทักษะการคุมชั้นเรียน สื่อสารกับเด็กเล็กอย่างอบอุ่น ใจเย็น และดึงดูดสมาธิเด็กได้ดี มีพื้นฐานการสอนจินตคณิตและการนับนิ้วมือ พร้อมที่จะเรียนรู้และได้รับการอบรมระบบการสอนลูกคิดตามมาตรฐานของสถาบัน นอกจากนี้ยังสามารถสอนเสริมวิชาการ (คณิตศาสตร์ ภาษาไทย ภาษาอังกฤษ) ระดับปฐมวัยและประถมศึกษาได้อย่างมีประสิทธิภาพ",
    en: "An early childhood teacher with a degree in the field, specialising in child developmental psychology and hands-on Active Learning. Skilled at classroom management and at communicating with young children warmly and patiently while holding their attention. Grounded in mental-arithmetic and finger-counting methods, and eager to train in an institute's abacus programme. Also tutors mathematics, Thai and English at preschool and primary level.",
  } satisfies Localized,
  education: [
    {
      years: "2016 – 2018",
      school: { th: "โรงเรียนป่าแดดวิทยาคม", en: "Padaet Wittayakhom School" },
      detail: {
        th: "มัธยมศึกษาตอนปลาย · แผนการเรียนวิทย์–คณิต",
        en: "Upper secondary · Science–Mathematics programme",
      },
    },
    {
      years: "2020 – 2024",
      school: {
        th: "มหาวิทยาลัยสุโขทัยธรรมาธิราช",
        en: "Sukhothai Thammathirat Open University",
      },
      detail: {
        th: "ปริญญาตรี · วิชาเอกการพัฒนาเด็กปฐมวัย",
        en: "Bachelor's degree · Early Childhood Development",
      },
    },
    {
      years: "2025 – 2026",
      school: {
        th: "มหาวิทยาลัยราชภัฏเชียงราย",
        en: "Chiang Rai Rajabhat University",
      },
      detail: {
        th: "ประกาศนียบัตรบัณฑิต (วิชาชีพครู)",
        en: "Graduate Diploma in Teaching Profession",
      },
    },
  ] satisfies { years: string; school: Localized; detail: Localized }[],
  experience: [
    {
      years: { th: "2025 – ปัจจุบัน", en: "2025 – Present" },
      title: { th: "ครูผู้สอนระดับปฐมวัย", en: "Early Childhood Teacher" },
      org: { th: "โรงเรียนบ้านเวียงเดิม", en: "Ban Wiang Doem School" },
      points: [
        {
          th: "ดูแลเอาใจใส่นักเรียนระดับอนุบาลและปฐมวัยอย่างใกล้ชิด ทั้งในด้านกิจวัตรประจำวัน สุขอนามัย และความปลอดภัย",
          en: "Care closely for kindergarten pupils — daily routines, hygiene and safety.",
        },
        {
          th: "ออกแบบแผนการจัดการเรียนรู้ จัดกิจกรรมการเรียนการสอน และเตรียมสื่อการสอนด้วยตนเอง",
          en: "Design lesson plans, run learning activities and make my own teaching materials.",
        },
        {
          th: "จัดทำแผนการประเมินพฤติกรรม สังเกตพัฒนาการเด็กรายบุคคล และประสานงานดูแลเด็ก ๆ ด้วยความเข้าใจในจิตวิทยาพัฒนาการ",
          en: "Build behaviour assessment plans and observe each child's development, grounded in developmental psychology.",
        },
        {
          th: 'ร่วมจัดโครงการและกิจกรรมเสริมทักษะ เช่น โครงการ STEM ศึกษา "สีธรรมชาติแสนหรรษา"',
          en: 'Co-organise enrichment projects such as the STEM project "Fun with Natural Colours".',
        },
      ] satisfies Localized[],
    },
  ],
  skills: [
    {
      title: { th: "ปฐมวัยและจิตวิทยาเด็ก", en: "Early Years & Child Psychology" },
      body: {
        th: "ดูแลพัฒนาการรอบด้าน สื่อสารด้วยความเข้าใจในธรรมชาติเด็กเล็ก และคุมชั้นเรียนให้เด็กจดจ่อกับการเรียนได้อย่างสนุกสนาน",
        en: "Whole-child development, communication that fits how young children think, and a classroom where focus feels like fun.",
      },
    },
    {
      title: { th: "จินตคณิตและคำนวณเบื้องต้น", en: "Mental Arithmetic" },
      body: {
        th: "สอนจินตคณิตและการนับนิ้วมือ ช่วยฝึกสมาธิ ความจำ และกระบวนการคิดวิเคราะห์อย่างเป็นระบบ",
        en: "Mental-arithmetic and finger-counting methods that train focus, memory and systematic thinking.",
      },
    },
    {
      title: { th: "สอนเสริมวิชาการ", en: "Academic Tutoring" },
      body: {
        th: "สอนเสริมระดับประถม (ป.1–ป.6) วิชาคณิตศาสตร์ ภาษาไทย และภาษาอังกฤษระดับสื่อสารได้",
        en: "Primary tutoring (grades 1–6) in mathematics and Thai, with conversational English.",
      },
    },
    {
      title: { th: "สื่อสารกับผู้ปกครอง", en: "Parent Communication" },
      body: {
        th: "มนุษยสัมพันธ์ดี อัปเดตพัฒนาการให้ผู้ปกครองอย่างสม่ำเสมอ และผลิตสื่อการสอนได้ด้วยตนเอง",
        en: "Warm, regular updates on each child's progress for parents, and teaching materials made by hand.",
      },
    },
  ] satisfies { title: Localized; body: Localized }[],
};
