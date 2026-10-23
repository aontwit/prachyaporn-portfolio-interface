import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";

// Small line icons (inline SVG, no icon library), drawn on a 24px grid at the 1.5px journal stroke.
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

/** Calm contact card: email and phone as large tappable actions. Only these two are public. */
export async function Contact() {
  const t = await getTranslations();
  const [user, domain] = profile.email.split("@");
  const actions = [
    // <wbr>: on a narrow phone the address wraps before "@", never mid-word.
    { icon: "email", label: t("contact.email"), value: <>{user}<wbr />@{domain}</>, href: `mailto:${profile.email}` },
    { icon: "phone", label: t("contact.phone"), value: profile.phone, href: profile.phoneHref },
  ] as const;

  return (
    <Section id="contact" title={t("contact.title")}>
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-5 pl-7 sm:p-10 sm:pl-12">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-sky" />
        <p className="max-w-prose text-lg leading-relaxed text-ink">{t("contact.intro")}</p>
        <p className="mt-3 flex items-center gap-2 text-sm text-muted">
          <Icon name="place" className="size-4 shrink-0 text-accent" />
          {t("profile.location")}
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {actions.map((a) => (
            <li key={a.icon}>
              <a
                href={a.href}
                className="group flex min-h-16 items-center gap-3 rounded-[1.25rem] border border-line px-3 py-3 sm:gap-4 sm:px-4 transition-colors hover:border-accent hover:bg-accent-soft/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-accent transition-colors group-hover:border-accent">
                  <Icon name={a.icon} className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs tracking-[.12em] text-muted uppercase">{a.label}</span>
                  <span className="block text-base [overflow-wrap:anywhere] text-ink">{a.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
