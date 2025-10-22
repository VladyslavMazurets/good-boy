import { Inter } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";

import "../globals.css";
import { getMessages } from "next-intl/server";
import Footer from "@/components/Footer";
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
            <div className="flex h-full w-full items-start justify-center gap-20 py-5 pr-5 pl-20">
              <div className="w-[49.11%]">
                <Providers>{children}</Providers>
                <Footer />
              </div>

              <div>
                <Image
                  src="/images/puppy.webp"
                  alt="Puppy Image"
                  width={602}
                  height={984}
                  className="rounded-[20px]"
                />
              </div>
            </div>
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }
}
