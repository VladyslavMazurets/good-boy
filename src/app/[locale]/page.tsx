"use client";

import { useTranslations } from "next-intl";
import React from "react";

import ContributionTypeSelector from "@/components/ContributionTypeSelector";
import FormSteps from "@/components/FormSteps";
import Title from "@/components/Title";
import FirstStepForm from "@/components/FirstStepForm";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="mt-10 flex h-full w-full flex-col gap-10">
      <FormSteps currentStep={1} />
      <Title title={t("FirstForm.title")} />
      <ContributionTypeSelector />
      <FirstStepForm />
    </div>
  );
}
