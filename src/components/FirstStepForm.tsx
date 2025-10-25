import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useFormContext } from "@/context/formContext";
import { routing } from "@/i18n/routing";
import apiFetch from "@/lib/api";

import ChevronIcon from "./icons/ChevronIcon";
import StepNavigation from "./StepNavigation";
import SubTitle from "./SubTitle";
import Loader from "./Loader";

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

  const { state, dispatch } = useFormContext();

  const { useRouter } = createNavigation(routing);
  const router = useRouter();

  const defaultSum = [5, 10, 20, 30, 50, 100];

  const [options, setOptions] = useState<Shelter[]>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FirstStepValues>({
    defaultValues: {
      type: state.type,
      shelterID: state.shelterID,
      amount: state.value,
    },
  });

  const watchedAmount = watch("amount");

  const onValid = (data: FirstStepValues) => {
    const selectedShelter = options?.find(
      (shelter) => shelter.id === Number(data.shelterID)
    );

    dispatch({ type: "SET_SHELTER_ID", payload: data.shelterID || 0 });
    dispatch({
      type: "SET_SHELTER_NAME",
      payload: selectedShelter?.name || "",
    });
    dispatch({ type: "SET_AMOUNT", payload: Number(data.amount) });

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
  }, [state.type, setValue]);

  useEffect(() => {
    if (options && state.shelterID) {
      setValue("shelterID", state.shelterID);
    }
  }, [options, state.shelterID, setValue]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [state]);

  if (!isLoaded) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-full flex-col gap-5 md:gap-10"
    >
      <div className="flex flex-col gap-1">
        <SubTitle>{t("aboutProject")}</SubTitle>

        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="shelterSelect"
            className="text-xs font-medium text-black md:text-sm"
          >
            {t("selectLabel")}
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
                    return value ? true : "Shelter is required";
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
          className="text-sm font-semibold text-black md:text-base/[150%]"
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
                max: {
                  value: 10000,
                  message: "Amount must be less than 10,000",
                },
                valueAsNumber: true,
              })}
              onInput={(e) => {
                const val = e.currentTarget.value;
                if (val.startsWith("0") && val.length > 1) {
                  e.currentTarget.value = String(Number(val));
                }
              }}
              id="sum"
              placeholder="0"
              type="number"
              className={`no-spinner text-4xl font-semibold -tracking-[0.3px] text-black focus:outline-none md:text-6xl ${!watchedAmount ? "text-gray" : "text-black"} `}
              style={{
                width: `${!isNaN(Number(watchedAmount)) ? watchedAmount?.toString().length : 1}ch`,
              }}
            />

            <div className="h-12 w-px bg-black md:h-[52px]" />
            <span className="mt-7 text-2xl/[100%] text-[#4B5563]">€</span>
          </div>
          <span className="text-error text-sm">{errors.amount?.message}</span>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 xl:flex-nowrap">
          {defaultSum.map((sum) => (
            <button
              key={sum}
              type="button"
              onClick={() => setValue("amount", sum, { shouldValidate: true })}
              className={`text-secondary bg-gray-light hover:bg-primary min-w-[96.33px] rounded-lg px-6.5 py-3 text-base/[150%] font-medium duration-200 ease-in-out hover:cursor-pointer hover:text-white ${
                Number(watchedAmount) === sum ? "bg-primary text-white" : ""
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
