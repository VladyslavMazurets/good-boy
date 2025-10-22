"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(`/${newLocale}`);
      router.refresh();
    }
  };

  return (
    <div>
      {locale === "sk" ? (
        <button onClick={() => switchLocale("en")}>EN</button>
      ) : (
        <button onClick={() => switchLocale("sk")}>SK</button>
      )}
    </div>
  );
}
