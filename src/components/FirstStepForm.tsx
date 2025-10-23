import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useFormContext } from "@/context/formContext";
import apiFetch from "@/lib/api";

import ChevronIcon from "./icons/ChevronIcon";
import StepNavigation from "./StepNavigation";
import SubTitle from "./SubTitle";

type Shelters = {
  shelters: Shelter[];
};

type Shelter = {
  id: number;
  name: string;
};

interface FirstStepValues {
  type: "shelter" | "foundation";
  shelterID?: number;
  amount: number;
}

export default function FirstStepForm() {
  const t = useTranslations("FirstForm");

  const router = useRouter();
  const { state, dispatch } = useFormContext();

  const defaultSum = [5, 10, 20, 30, 50, 100];

  const [options, setOptions] = useState<Shelter[]>();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FirstStepValues>({
    defaultValues: {
      type: state.type,
      amount: state.value,
    },
  });

  const currentAmount = getValues("amount");

  const onValid = (data: FirstStepValues) => {
    console.log("data", data);
    dispatch({ type: "SET_TYPE", payload: data.type });
    dispatch({ type: "SET_SHELTER", payload: data.shelterID || 0 });
    dispatch({ type: "SET_AMOUNT", payload: data.amount });

    router.push("/personal-info");
  };

  const results = useQuery<Shelters>({
    queryKey: ["shelters"],
    queryFn: () => apiFetch(),
  });

  useEffect(() => {
    setOptions(results.data?.shelters);
  }, [results.data]);

  useEffect(() => {
    if (state.type === "foundation") {
      setValue("shelterID", 0);
    }
  }, [state.type]);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-full flex-col gap-10"
    >
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

          <div className="flex flex-col gap-1">
            <div className="relative w-full">
              <select
                {...register("shelterID", {
                  required: {
                    value: state.type === "shelter",
                    message: "Shelter is required",
                  },
                  validate: (value) => {
                    if (state.type !== "shelter") return true;
                    return Number(value) > 0 || "Shelter is required";
                  },
                })}
                id="shelterSelect"
                disabled={state.type === "foundation"}
                className={`border-gray-light w-full appearance-none rounded-lg border p-4 pr-16 disabled:cursor-not-allowed disabled:opacity-50 ${errors.shelterID ? "border-error bg-error/20 focus:outline-error" : "border-gray-light bg-gray-light"}`}
              >
                <option value="0" disabled>
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
            <span className="text-error text-sm">
              {errors.shelterID?.message}
            </span>
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

        <div className="flex flex-col items-center gap-1">
          <div className="border-primary mx-auto flex w-max min-w-36 items-center justify-center gap-2.5 border-b-2 py-5">
            <input
              {...register("amount", {
                required: { value: true, message: "Amount is required" },
                min: {
                  value: 1,
                  message: "Amount must be at least 1",
                },
                valueAsNumber: true,
              })}
              id="sum"
              placeholder="0"
              type="number"
              className={`no-spinner text-6xl font-semibold -tracking-[0.3px] text-black focus:outline-none ${!currentAmount ? "text-gray" : "text-black"} `}
              style={{
                width: `${!isNaN(currentAmount) ? currentAmount?.toString().length : 1}ch`,
              }}
            />

            <div className="h-[52px] w-px bg-black" />
            <span className="mt-7 text-2xl/[100%] text-[#4B5563]">€</span>
          </div>
          <span className="text-error text-sm">{errors.amount?.message}</span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          {defaultSum.map((sum) => (
            <button
              key={sum}
              type="button"
              onClick={() => setValue("amount", sum, { shouldValidate: true })}
              className={`text-secondary bg-gray-light hover:bg-primary min-w-[96.33px] rounded-lg px-6.5 py-3 text-base/[150%] font-medium duration-200 ease-in-out hover:cursor-pointer hover:text-white ${
                currentAmount === sum ? "bg-primary text-white" : ""
              }`}
            >
              {sum} €
            </button>
          ))}
        </div>
      </div>

      <StepNavigation
        step={1}
        className="mt-2"
        onNextClick={handleSubmit(onValid)}
      />
    </form>
  );
}
