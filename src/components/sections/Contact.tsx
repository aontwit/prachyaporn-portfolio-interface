import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Section } from "@/components/Section";
import { Sheet, Tape } from "@/components/paper";
import { tiltStyle } from "@/components/paper/tilt";
import { profile } from "@/content/profile";

// Small line icons (inline SVG, no icon library), drawn on a 24px grid at a 1.5px pen stroke.
const ICONS = {
  email: <path d="M3.5 6.5h17v11h-17zM4 7l8 6.2L20 7" />,
  phone: (
    <path d="M7.2 3.8 9.6 4.4l1.1 3.9-1.9 1.4a11 11 0 0 0 5.5 5.5l1.4-1.9 3.9 1.1.6 2.4c.2.8-.4 1.6-1.2 1.7C11.2 19 5 12.8 5.5 5c.1-.8.9-1.4 1.7-1.2Z" />
  ),
  place: <path d="M12 20.5s6-5.6 6-10.5a6 6 0 1 0-12 0c0 4.9 6 10.5 6 10.5ZM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
} satisfies Record<string, ReactNode>;

function Icon({ name, className }: { name: keyof typeof ICONS; className: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {ICONS[name]}
    </svg>
  );
}

/**
 * A short letter on a lined sheet: a handwritten greeting, the intro and the town on the rules, then
 * email and phone as two taped paper cards (each one big tap target). Only these two are public.
 */
export async function Contact() {
  const t = await getTranslations();
  const [user, domain] = profile.email.split("@");
  const cards = [
    // <wbr>: on a narrow phone the address wraps before "@", never mid-word.
    // Tape on the right edge: the label sits top-left and must stay readable.
    { icon: "email", label: t("contact.email"), value: <>{user}<wbr />@{domain}</>, href: `mailto:${profile.email}`, tilt: -1, tape: "right-6 -rotate-3" },
    { icon: "phone", label: t("contact.phone"), value: profile.phone, href: profile.phoneHref, tilt: 1, tape: "right-6 rotate-4" },
  ] as const;

  return (
    <Section id="contact" title={t("contact.title")}>
      <Sheet tape="two" tilt={-0.4}>
        <p className="font-hand text-xl leading-8 text-ink">{t("contact.greeting")}</p>
        <p className="max-w-prose text-ink">{t("contact.intro")}</p>
        <p className="flex items-center gap-2 font-hand text-pencil">
          <Icon name="place" className="size-4 shrink-0 text-ink-blue" />
          {t("profile.location")}
        </p>
        <ul className="mt-8 mb-2 grid gap-8 sm:grid-cols-2 sm:gap-6">
          {cards.map((c) => (
            <li key={c.icon} className="tilt relative" style={tiltStyle(c.tilt, 2)}>
              <Tape className={c.tape} />
              <a
                href={c.href}
                className="block min-h-16 bg-sheet px-4 pt-5 pb-3 leading-normal shadow-note transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-blue motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5 motion-reduce:transition-none sm:px-5"
              >
                {/* icon beside the label, not the value: the address gets the card's full width on phones */}
                <span className="flex items-center gap-2 font-hand text-sm text-pencil">
                  <Icon name={c.icon} className="size-5 shrink-0 text-ink-blue" />
                  {c.label}
                </span>
                <span className="mt-1 block text-base font-medium [overflow-wrap:anywhere] text-ink-blue">{c.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </Sheet>
    </Section>
  );
}
