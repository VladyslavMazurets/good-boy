import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { useFormContext } from "@/context/formContext";

export default function ContributionTypeSelector() {
  const t = useTranslations("FirstForm");

  const { state, dispatch } = useFormContext();

  const buttonClasses =
    "w-1/2 border relative z-10 border-transparent bg-transparent rounded-lg px-2 py-4 transition-colors text-sm/[100%] font-medium text-black hover:cursor-pointer";

  return (
    <div className="border-gray relative flex h-full max-h-15 w-full items-center justify-between gap-2 rounded-xl border p-1">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 180, damping: 30 }}
        className={`bg-primary absolute top-1 bottom-1 z-0 w-1/2 max-w-[321px] rounded-lg ${
          state.type === "shelter" ? "left-1" : "left-1/2"
        }`}
      />
      <button
        onClick={() => {
          dispatch({ type: "SET_TYPE", payload: "shelter" });
          dispatch({ type: "SET_SHELTER_ID", payload: 0 });
        }}
        className={`${buttonClasses} ${
          state.type === "shelter" ? "text-white" : ""
        }`}
      >
        {t("contributionFirstType")}
      </button>

      <button
        onClick={() => {
          dispatch({ type: "SET_TYPE", payload: "foundation" });
          dispatch({ type: "SET_SHELTER_ID", payload: 0 });
        }}
        className={`${buttonClasses} ${state.type === "foundation" ? "text-white" : ""}`}
      >
        {t("contributionSecondType")}
      </button>
    </div>
  );
}
