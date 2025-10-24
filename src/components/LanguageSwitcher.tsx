"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      const newPath = `/${newLocale}${pathname.replace(`/${locale}`, "")}`;
      router.replace(newPath);
      router.refresh();
    }
  };

  return (
    <div>
      {locale === "sk" ? (
        <button
          onClick={() => switchLocale("en")}
          className="hover:cursor-pointer"
        >
          EN
        </button>
      ) : (
        <button
          onClick={() => switchLocale("sk")}
          className="hover:cursor-pointer"
        >
          SK
        </button>
      )}
    </div>
  );
}
