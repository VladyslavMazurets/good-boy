"use client";

import FormSteps from "@/components/FormSteps";
import Title from "@/components/Title";
import { useTranslations } from "next-intl";
import React from "react";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="mt-10 flex h-full w-full flex-col gap-10">
      <FormSteps currentStep={3} />
      <Title title={t("FirstForm.title")} />
    </div>
  );
}
