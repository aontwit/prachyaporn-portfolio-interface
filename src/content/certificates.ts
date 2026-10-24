// Text (course, issuer, alt) lives in translation.json under `certificates.items.<id>`,
// read from each certificate itself. Only the teacher's name is printed on them; nothing else personal.
import type messages from "../../i18n/messages/th/translation.json";

export type CertificateId = keyof typeof messages.certificates.items;

export type Certificate = {
  id: CertificateId;
  src: string;
  width: number;
  height: number;
  /** Issue date as printed (Buddhist era on the certificate, stored CE). The section shows its year. */
  issued: string;
};

const cert = (id: CertificateId, file: number, width: number, height: number, issued: string): Certificate => ({
  id,
  src: `/images/certificates/certificate-${file}.jpg`,
  width,
  height,
  issued,
});

// Newest first.
export const certificates: Certificate[] = [
  cert("cubScoutLeader", 19, 1517, 1079, "2026-03-15"),
  cert("storyScenes", 22, 1040, 720, "2026-03-07"),
  cert("scoutLeader", 20, 1516, 1080, "2026-03-06"),
  cert("earlyYearsCurriculum", 23, 1040, 720, "2026-02-21"),
  cert("aiWorkshop", 24, 1522, 1076, "2025-10-30"),
  cert("disabilityScreening", 21, 1107, 787, "2025-03-17"),
];
