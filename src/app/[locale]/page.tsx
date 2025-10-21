"use client";

import { useTranslations } from "next-intl";
import React from "react";

export default function Home() {
  const t = useTranslations();

  return (
    <React.Fragment>
      <h1 className="text-3xl font-black text-red-500">{t("hello")}</h1>
    </React.Fragment>
  );
}
