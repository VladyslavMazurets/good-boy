import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";

import "../globals.css";
import { getMessages } from "next-intl/server";
import Providers from "@/providers";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export default async function LocaleLayout({ children, params }: Props) {
  {
    const { locale } = await params;
    const messages = await getMessages({ locale });
    if (!hasLocale(routing.locales, locale)) {
      notFound();
    }

    return (
      <html lang={locale}>
        <body className={inter.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Providers>{children}</Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }
}
