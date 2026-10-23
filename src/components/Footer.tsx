import { profile } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

export function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="border-t border-line py-10 text-center text-sm text-muted">
      © {new Date().getFullYear()} {profile.name[lang]}
    </footer>
  );
}
