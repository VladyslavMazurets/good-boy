"use client";

import { useTranslations } from "next-intl";
import React from "react";

import ContributionTypeSelector from "@/components/ContributionTypeSelector";
import FirstStepForm from "@/components/FirstStepForm";
import FormContainer from "@/components/FormContainer";
import FormSteps from "@/components/FormSteps";
import Title from "@/components/Title";

export default function Home() {
  const t = useTranslations();

  return (
    <FormContainer>
      <FormSteps currentStep={1} />
      <Title title={t("FirstForm.title")} />
      <ContributionTypeSelector />
      <FirstStepForm />
    </FormContainer>
  );
}
