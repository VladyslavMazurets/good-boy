"use client";

import Title from "@/components/Title";
import apiFetch from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Data = {
  contribution: number;
  contributors: number;
};

export default function About() {
  const t = useTranslations("AboutPage");

  const [data, setData] = useState<Data>();

  const results = useQuery({
    queryKey: ["donationsStats"],
    queryFn: () => apiFetch("/results"),
  });

  useEffect(() => {
    setData(results.data);
  }, [results.data]);

  return (
    <div className="flex flex-col gap-10">
      <Title title={t("title")} />

      <p>{t("fistParagraph")}</p>

      <div className="border-gray flex w-full items-center gap-4 border-y py-16">
        <div className="flex w-1/2 flex-col items-center justify-center gap-3">
          <p className="text-primary text-6xl font-semibold -tracking-[0.3px]">
            {data?.contribution} €
          </p>
          <p className="text-lg font-medium text-black">{t("totalValue")}</p>
        </div>

        <div className="flex w-1/2 flex-col items-center justify-center gap-3">
          <p className="text-primary text-6xl font-semibold -tracking-[0.3px]">
            {data?.contributors}
          </p>
          <p className="text-lg font-medium text-black">{t("totalDonors")}</p>
        </div>
      </div>

      <p>{t("secondParagraph")}</p>
    </div>
  );
}
