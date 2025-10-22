"use client";

import Footer from "@/components/Footer";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("NavigationButtons");
  const router = useRouter();

  return (
    <section className="flex h-full w-full flex-col px-20 pt-16">
      <button
        onClick={() => router.back()}
        className="text-primary mb-10 flex w-max items-center gap-1 font-medium hover:cursor-pointer"
      >
        <ArrowIcon className="h-3 w-3 rotate-180" />
        {t("back")}
      </button>
      {children}
      <Footer />
    </section>
  );
}
