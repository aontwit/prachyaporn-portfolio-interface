import { Section } from "@/components/Section";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

export function Contact({ lang }: { lang: Locale }) {
  return (
    <Section id="contact" title={ui.contact.title[lang]}>
      <p className="text-muted">{ui.contact.intro[lang]}</p>
      <p className="mt-4">
        {ui.contact.email[lang]}: <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>
      <p>
        {ui.contact.phone[lang]}: <a href={profile.phoneHref}>{profile.phone}</a>
      </p>
    </Section>
  );
}
