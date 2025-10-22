import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import LogoIcon from "./icons/LogoIcon";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-gray mt-10 w-full border-t pt-6 pb-15">
      <div className="flex items-center justify-between">
        <Link href="/" className="hover:cursor-pointer">
          <LogoIcon className="h-8 w-31" />
        </Link>

        <div className="flex items-center gap-8 text-[#4B5563]">
          <div className="flex items-center gap-4 text-[#9CA3AF]">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>

          <Link href="/contacts">{t("contacts")}</Link>
          <Link href="/about">{t("about")}</Link>

          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
