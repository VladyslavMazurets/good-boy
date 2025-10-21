import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";

import "../globals.css";
import { getMessages } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  {
    const { locale } = await params;
    const messages = await getMessages({ locale });
    if (!hasLocale(routing.locales, locale)) {
      notFound();
    }

    return (
      <html lang="en">
        <body>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }
}
