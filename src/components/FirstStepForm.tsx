import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import apiFetch from "@/lib/api";

import ChevronIcon from "./icons/ChevronIcon";
import SubTitle from "./SubTitle";

type Shelter = {
  id: number;
  name: string;
};

export default function FirstStepForm() {
  const t = useTranslations("FirstForm");

  const defaultSum = [5, 10, 20, 30, 50, 100];

  const [options, setOptions] = useState<Shelter[]>();
  const [amount, setAmount] = useState<string>("");

  const results = useQuery({
    queryKey: ["shelters"],
    queryFn: () => apiFetch(),
  });

  useEffect(() => {
    setOptions(results.data?.shelters as Shelter[]);
  }, [results.data]);

  return (
    <form className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-1">
        <SubTitle>{t("aboutProject")}</SubTitle>

        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="shelterSelect"
            className="text-sm font-medium text-black"
          >
            {t("selectLabel")}{" "}
            <span className="text-gray">{t("selectLabelPlaceholder")}</span>
          </label>

          <div className="relative w-full">
            <select
              id="shelterSelect"
              className="border-gray-light bg-gray-light w-full appearance-none rounded-lg border p-4 pr-16"
            >
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {options?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>

            <ChevronIcon className="absolute top-1/2 right-5 -translate-y-1/2" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <label
          htmlFor="sum"
          className="text-base/[150%] font-semibold text-black"
        >
          {t("sumLabel")}
        </label>

        <div className="border-primary mx-auto flex w-max min-w-36 items-center justify-center gap-2.5 border-b-2 py-5">
          <input
            id="sum"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className={`no-spinner text-6xl font-semibold -tracking-[0.3px] text-black focus:outline-none ${!amount ? "text-gray" : "text-black"}`}
            style={{ width: `${amount?.toString().length || 1}ch` }}
          />

          <div className="h-[52px] w-px bg-black" />
          <span className="mt-7 text-2xl/[100%] text-[#4B5563]">€</span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          {defaultSum.map((sum) => (
            <button
              key={sum}
              type="button"
              onClick={() => setAmount(sum)}
              className={`text-secondary bg-gray-light hover:bg-primary min-w-[96.33px] rounded-lg px-6.5 py-3 text-base/[150%] font-medium duration-200 ease-in-out hover:cursor-pointer hover:text-white ${
                amount === sum ? "bg-primary text-white" : ""
              }`}
            >
              {sum} €
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
