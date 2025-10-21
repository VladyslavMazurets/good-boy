"use client";

import FormSteps from "@/components/FormSteps";
import { useTranslations } from "next-intl";
import React from "react";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="h-full w-full">
      <FormSteps currentStep={3} />
    </div>
  );
}
