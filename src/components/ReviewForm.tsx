"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useFormContext } from "@/context/formContext";
import apiFetch from "@/lib/api";

import CustomCheckbox from "./CustomCheckbox";
import StepNavigation from "./StepNavigation";
import SubTitle from "./SubTitle";
import Toast from "./Toast";
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

function InfoRow({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex w-full justify-between">
      <span className="text-secondary text-sm md:text-base">{label}</span>
      <span className="text-sm font-semibold text-black md:text-base">
        {value !== undefined && value !== null && value !== "" ? value : "N/A"}
      </span>
    </div>
  );
}

export default function ReviewForm() {
  const t = useTranslations("Confirmation");

  const { state, reset } = useFormContext();

  const { useRouter } = createNavigation(routing);
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const isFormValid =
    state.contributors.length > 0 &&
    state.value > 0 &&
    state.type &&
    state.shelterID;

  const mutation = useMutation({
    mutationFn: async () => {
      return await apiFetch("contribute", {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      setToast({
        message: t("submissionSuccess"),
        type: "success",
      });
      reset();

      setTimeout(() => {
        setToast(null);
        router.push("/");
      }, 3000);
    },
    onError: (error) => {
      if (error?.messages?.length) {
        const firstError = error.messages[0];

        if (firstError.path === "body.contributors.0.firstName") {
          setToast({
            message: t("firstNameRequired"),
            type: "error",
          });
        } else {
          setToast({
            message: t("submissionError"),
            type: "error",
          });
        }
      }

      setTimeout(() => {
        setToast(null);
      }, 3000);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <SubTitle> {t("summary")} </SubTitle>

      <div className="mb-20 flex w-full flex-col gap-8 md:mb-47">
        <div className="flex w-full flex-col gap-4">
          <InfoRow
            label={t("donationType")}
            value={
              state.type === "shelter"
                ? t("donationTypeShelter")
                : t("donationTypeFoundation")
            }
          />
          <InfoRow label={t("shelter")} value={state.shelterName} />
          <InfoRow label={t("contributionAmount")} value={`${state.value} €`} />
        </div>

        <div className="bg-gray h-px w-full" />

        <div className="flex w-full flex-col gap-4">
          <InfoRow
            label={t("fullName")}
            value={`${state.contributors[0]?.firstName} ${state.contributors[0]?.lastName}`}
          />
          <InfoRow label={"E-mail"} value={state.contributors[0]?.email} />
          <InfoRow label={t("phone")} value={state.contributors[0]?.phone} />
        </div>

        <div className="bg-gray h-px w-full" />

        <CustomCheckbox
          label={t("agreeToPrivacy")}
          onChange={(checked) => {
            setChecked(checked);
          }}
        />
      </div>

      <StepNavigation
        step={3}
        showArrow={false}
        checked={checked && isFormValid}
        onNextClick={mutation.mutate}
      />

      {toast?.message ? (
        <Toast message={toast?.message} type={toast?.type} />
      ) : null}
    </div>
  );
}
