import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionPauseProvider } from "@/components/MotionPause";
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: { default: `${t("profile.name")} · ${t("profile.role")}`, template: `%s · ${t("profile.name")}` },
    description: t("meta.description"),
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
