"use client";

import { useTranslations } from "next-intl";
import SubTitle from "./SubTitle";
import { useFormContext } from "@/context/formContext";
import StepNavigation from "./StepNavigation";
import CustomCheckbox from "./CustomCheckbox";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiFetch from "@/lib/api";

function InfoRow({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex w-full justify-between">
      <span className="text-secondary">{label}</span>
      <span className="font-semibold text-black">
        {value !== undefined && value !== null && value !== "" ? value : "N/A"}
      </span>
    </div>
  );
}

export default function ReviewForm() {
  const t = useTranslations("Confirmation");

  const { state, reset } = useFormContext();

  const [checked, setChecked] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      apiFetch("/contribute", {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      console.log("Contribution submitted successfully");
      reset();
    },
    onError: () => {
      console.error("Error submitting contribution");
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <SubTitle> {t("summary")} </SubTitle>

      <div className="mb-47 flex w-full flex-col gap-8">
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
        checked={checked}
        onNextClick={mutation.mutate}
      />
    </div>
  );
}
