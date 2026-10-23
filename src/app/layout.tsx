import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionPauseProvider } from "@/components/MotionPause";
import { SITE_URL } from "@/lib/site";
import { LOCALES, type Locale } from "../../i18n/locales";
import "./globals.css";

const body = IBM_Plex_Sans_Thai({
  variable: "--font-body",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
});

const heading = Noto_Serif_Thai({
  variable: "--font-heading",
  subsets: ["thai", "latin"],
  weight: ["500", "600", "700"],
});

// Open Graph locale per reader language (cookie); the other one is the alternate.
const OG_LOCALE: Record<Locale, string> = { th: "th_TH", en: "en_US" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${t("profile.name")} · ${t("profile.role")}`, template: `%s · ${t("profile.name")}` },
    description: t("meta.description"),
    // og/twitter title + description fall back to the page's own; og:image comes from opengraph-image.tsx.
    // No hreflang alternates: one URL serves both languages (NEXT_LOCALE cookie).
    openGraph: {
      type: "website",
      siteName: t("profile.name"),
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${body.variable} ${heading.variable}`}>
      <body className="min-h-dvh">
        <NextIntlClientProvider>
          <MotionPauseProvider>
            <Header />
            <main id="content">{children}</main>
            <Footer />
          </MotionPauseProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
