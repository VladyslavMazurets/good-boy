"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useFormContext } from "@/context/formContext";

import PhoneCountrySelect from "./PhoneCountrySelect";
import StepNavigation from "./StepNavigation";
import SubTitle from "./SubTitle";
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

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
    handleSubmit,
    formState: { errors },
  } = useForm<SecondStepValues>({
    defaultValues: {
      firstName: state.contributors[0]?.firstName || "",
      lastName: state.contributors[0]?.lastName || "",
      email: state.contributors[0]?.email || "",
      phone: state.contributors[0]?.phone.slice(4),
    },
  });

  const onValid = (data: SecondStepValues) => {
    const contributor = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: country === "sk" ? "+421" + data.phone : "+420" + data.phone,
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
            <PhoneCountrySelect value={country} onChange={setCountry} />
            <div className="w-full">
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2">
                  {country === "sk" ? "+ 421" : "+ 420"}
                </span>
                <input
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    validate: (value) => {
                      const cleanValue = value.replace(/\s+/g, "");
                      return cleanValue.length < 9
                        ? "Phone number is too short"
                        : cleanValue.length > 9
                          ? "Phone number is too long"
                          : true;
                    },
                    pattern: {
                      value: /^[0-9\s+-]+$/,
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
                  className={`w-full rounded-lg border p-4 pl-15 text-xs placeholder:text-[#9CA3AF] disabled:cursor-not-allowed disabled:opacity-50 md:text-base ${errors.phone ? "border-error bg-error/20 focus:outline-error" : "border-gray-light bg-gray-light"}`}
                />
              </div>
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
