import { Link } from "@/i18n/navigation";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import LogoIcon from "./icons/LogoIcon";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-gray mt-10 w-full border-t pt-6 pb-15">
      <div className="flex items-center justify-between">
        <LogoIcon className="h-8 w-31" />

        <div className="flex items-center gap-8 text-[#4B5563]">
          <div className="flex items-center gap-4 text-[#9CA3AF]">
            <FacebookIcon className="h-4 w-4" />
            <InstagramIcon className="h-4 w-4" />
          </div>

          <Link href="/contacts">{t("contacts")}</Link>
          <Link href="/about">{t("about")}</Link>

          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
