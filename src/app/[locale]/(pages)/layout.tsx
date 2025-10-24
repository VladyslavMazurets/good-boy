"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import Footer from "@/components/Footer";
import ArrowIcon from "@/components/icons/ArrowIcon";

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("NavigationButtons");
  const router = useRouter();

  return (
    <section className="flex h-full w-full flex-col px-5 pt-10 lg:px-10 xl:px-20 xl:pt-16">
      <button
        onClick={() => router.back()}
        className="text-primary mb-5 flex w-max items-center gap-1 font-medium hover:cursor-pointer md:mb-10"
      >
        <ArrowIcon className="h-3 w-3 rotate-180" />
        {t("back")}
      </button>
      {children}
      <Footer />
    </section>
  );
}
