"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import PhoneCountrySelect from "./PhoneCountrySelect";
import SubTitle from "./SubTitle";

export default function SecondStepForm() {
  const t = useTranslations("SecondForm");

  const [country, setCountry] = useState<"sk" | "cz">("sk");

  return (
    <div className="mb-32 flex w-full flex-col gap-4">
      <SubTitle>{t("aboutYou")}</SubTitle>

      <div className="grid-auto-rows grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="text-sm font-medium text-black">
            {t("firstNameLabel")}
          </label>
          <input
            type="name"
            id="firstName"
            placeholder={t("firstNamePlaceholder")}
            className="border-gray-light bg-gray-light w-full rounded-lg border p-4 placeholder:text-[#9CA3AF] disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="text-sm font-medium text-black">
            {t("lastNameLabel")}
          </label>
          <input
            type="surname"
            id="lastName"
            placeholder={t("lastNamePlaceholder")}
            className="border-gray-light bg-gray-light w-full rounded-lg border p-4 placeholder:text-[#9CA3AF] disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="col-start-1 col-end-3">
          <label htmlFor="email" className="text-sm font-medium text-black">
            {t("emailLabel")}
          </label>
          <input
            type="email"
            id="email"
            placeholder={t("emailPlaceholder")}
            className="border-gray-light bg-gray-light w-full rounded-lg border p-4 placeholder:text-[#9CA3AF] disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="col-start-1 col-end-3 flex flex-col">
          <label htmlFor="phone" className="text-sm font-medium text-black">
            {t("phoneLabel")}
          </label>

          <div className="flex items-center gap-4">
            <PhoneCountrySelect value={country} onChange={setCountry} />
            <div className="relative w-full">
              <span className="absolute top-1/2 left-3 -translate-y-1/2">
                {country === "sk" ? "+ 421" : "+ 420"}
              </span>
              <input
                type="tel"
                name="phone"
                placeholder=" 123 321 123"
                className="border-gray-light bg-gray-light w-full rounded-lg border p-4 pl-15 placeholder:text-[#9CA3AF] disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
