"use client";

import { useTranslations } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useFormContext } from "@/context/formContext";
import { routing } from "@/i18n/routing";

import PhoneCountrySelect from "./PhoneCountrySelect";
import StepNavigation from "./StepNavigation";
import SubTitle from "./SubTitle";

interface SecondStepValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function SecondStepForm() {
  const t = useTranslations("SecondForm");

  const { state, dispatch } = useFormContext();
  const { useRouter } = createNavigation(routing);
  const router = useRouter();

  const [country, setCountry] = useState<"sk" | "cz">("sk");

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SecondStepValues>({
    defaultValues: {
      firstName: state.contributors[0]?.firstName || "",
      lastName: state.contributors[0]?.lastName || "",
      email: state.contributors[0]?.email || "",
      phone: state.contributors[0]?.phone,
    },
  });

  function normalizePhone(phone: string, country: "sk" | "cz") {
    const cleaned = phone.replace(/^\+421|^\+420/, "");
    return country === "sk" ? `+421${cleaned}` : `+420${cleaned}`;
  }

  const onValid = (data: SecondStepValues) => {
    const contributor = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: normalizePhone(data.phone, country),
    };

    dispatch({
      type: "SET_CONTRIBUTORS",
      payload: [contributor],
    });

    router.push("/confirmation");
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-full flex-col gap-4"
    >
      <SubTitle>{t("aboutYou")}</SubTitle>

      <div className="grid-auto-rows grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="text-xs font-medium text-black md:text-sm"
          >
            {t("firstNameLabel")}
          </label>
          <input
            {...register("firstName", { required: false, min: 2, max: 20 })}
            type="text"
            id="firstName"
            placeholder={t("firstNamePlaceholder")}
            className="border-gray-light bg-gray-light w-full rounded-lg border p-4 text-xs placeholder:text-[#9CA3AF] disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="text-xs font-medium text-black md:text-sm"
          >
            {t("lastNameLabel")}
          </label>
          <input
            {...register("lastName", {
              required: {
                value: true,
                message: "Last name is required",
              },
              min: {
                value: 2,
                message: "Last name is too short",
              },
              max: {
                value: 30,
                message: "Last name is too long",
              },
            })}
            type="text"
            id="lastName"
            placeholder={t("lastNamePlaceholder")}
            className={`w-full rounded-lg border p-4 text-xs placeholder:text-[#9CA3AF] disabled:cursor-not-allowed disabled:opacity-50 md:text-base ${errors.lastName ? "border-error bg-error/20 focus:outline-error" : "border-gray-light bg-gray-light"}`}
          />
          <span className="text-error text-sm">{errors.lastName?.message}</span>
        </div>

        <div className="col-start-1 col-end-3">
          <label
            htmlFor="email"
            className="text-xs font-medium text-black md:text-sm"
          >
            {t("emailLabel")}
          </label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            id="email"
            placeholder={t("emailPlaceholder")}
            className={`w-full rounded-lg border p-4 text-xs placeholder:text-[#9CA3AF] disabled:cursor-not-allowed disabled:opacity-50 md:text-base ${errors.email ? "border-error bg-error/20 focus:outline-error" : "border-gray-light bg-gray-light"}`}
          />
          <span className="text-error text-sm">{errors.email?.message}</span>
        </div>

        <div className="col-start-1 col-end-3 flex flex-col">
          <label
            htmlFor="phone"
            className="text-xs font-medium text-black md:text-sm"
          >
            {t("phoneLabel")}
          </label>

          <div className="flex items-start gap-4">
            <PhoneCountrySelect
              value={country}
              onChange={(newCountry) => {
                setCountry(newCountry);
                const currentPhone = watch("phone") || "";
                const newPhone = normalizePhone(currentPhone, newCountry);
                setValue("phone", newPhone);
              }}
            />
            <div className="w-full">
              <input
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Phone number is required",
                  },
                  validate: (value) => {
                    const cleanValue = value.replace(/\s+/g, "");
                    return cleanValue.length < 13
                      ? "Phone number is too short"
                      : cleanValue.length > 13
                        ? "Phone number is too long"
                        : true;
                  },
                  pattern: {
                    value:
                      /^(?:\+421|\+420)(?!.*\+421)(?!.*\+420)[0-9\s]{6,12}$/,
                    message: "Invalid phone number",
                  },
                })}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^0-9\s+-]/g,
                    ""
                  );
                }}
                type="tel"
                placeholder=" 123 321 123"
                className={`w-full rounded-lg border p-4 text-xs placeholder:text-[#9CA3AF] disabled:cursor-not-allowed disabled:opacity-50 md:text-base ${errors.phone ? "border-error bg-error/20 focus:outline-error" : "border-gray-light bg-gray-light"}`}
              />
              <span className="text-error text-sm">
                {errors.phone?.message}
              </span>
            </div>
          </div>
        </div>
      </div>

      <StepNavigation
        className="mt-50"
        step={2}
        onNextClick={handleSubmit(onValid)}
      />
    </form>
  );
}
