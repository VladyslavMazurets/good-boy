import Image from "next/image";
import { useTranslations } from "next-intl";

import MailIcon from "@/components/icons/MailIcon";
import MapPinIcon from "@/components/icons/MapPinIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import Title from "@/components/Title";

export default function ContactsPage() {
  const t = useTranslations("ContactsPage");

  const contacts = [
    {
      icon: MailIcon,
      label: t("emailLabel"),
      description: t("emailDescription"),
      cta: "hello@goodrequest.com",
    },
    {
      icon: MapPinIcon,
      label: t("addressLabel"),
      description: t("addressDescription"),
      cta: "Obchodná 3D, 010 08 Žilina, Slovakia",
    },
    {
      icon: PhoneIcon,
      label: t("phoneLabel"),
      description: t("phoneDescription"),
      cta: "+421 911 750 750",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <Title title={t("title")} />

      <div className="flex flex-col gap-10 xl:mx-20">
        <div className="flex flex-col items-center gap-y-10 pt-5 pb-6 md:flex-row md:items-stretch md:gap-4">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;

            return (
              <div
                key={index}
                className="flex flex-1 flex-col items-center gap-5 text-center"
              >
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-[10px]">
                  <Icon className="text-primary h-6 w-6" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <span className="text-xl font-semibold text-black md:text-lg lg:text-xl">
                    {contact.label}
                  </span>
                  <p className="text-base text-[#4B5563] md:text-sm lg:text-base">
                    {contact.description}
                  </p>
                </div>
                <a
                  href={
                    contact.cta.includes("@")
                      ? `mailto:${contact.cta}`
                      : contact.cta.includes("+")
                        ? `tel:${contact.cta}`
                        : undefined
                  }
                  className="text-primary text-base font-medium md:text-sm lg:text-base"
                >
                  {contact.cta}
                </a>
              </div>
            );
          })}
        </div>

        <Image
          src="/images/dog.webp"
          alt="Dog"
          width={1120}
          height={376}
          className="mx-auto rounded-lg"
        />
      </div>
    </div>
  );
}
