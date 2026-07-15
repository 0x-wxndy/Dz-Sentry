import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Syne, Noto_Sans_Arabic } from "next/font/google";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localeMeta } from "@/lib/i18n/config";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { brand } = getDictionary(locale);
  return {
    title: brand.siteTitle,
    description: brand.siteDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dir = localeMeta[locale].dir;

  return (
    <html lang={locale} dir={dir} className="dark">
      <body
        className={`${plex.variable} ${plexMono.variable} ${syne.variable} ${notoArabic.variable} font-sans antialiased ${locale === "ar" ? "font-ar" : ""}`}
      >
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
