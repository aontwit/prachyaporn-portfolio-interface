import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { profile } from "@/content/profile";
import { hasLocale, locales } from "@/lib/i18n";
import "../globals.css";

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

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: `${profile.name[lang]} · ${profile.role[lang]}`,
    description: profile.summary[lang].slice(0, 160),
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${body.variable} ${heading.variable}`}>
      <body className="min-h-dvh">
        <Header lang={lang} />
        <main id="content">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
