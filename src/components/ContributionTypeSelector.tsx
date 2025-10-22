import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContributionTypeSelector() {
  const t = useTranslations("FirstForm");

  const buttonClasses =
    "w-1/2 border relative z-10 border-transparent bg-transparent rounded-lg px-2 py-4 transition-colors text-sm/[100%] font-medium text-black hover:cursor-pointer";

  const [type, setType] = useState<"foundation" | "shelter">("shelter");

  return (
    <div className="border-gray relative flex h-full max-h-15 w-full items-center justify-between gap-2 rounded-xl border p-1">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 180, damping: 30 }}
        className={`bg-primary absolute top-1 bottom-1 z-0 w-1/2 max-w-[321px] rounded-lg ${
          type === "foundation" ? "left-1" : "left-1/2"
        }`}
      />
      <button
        onClick={() => setType("foundation")}
        className={`${buttonClasses} ${
          type === "foundation" ? "text-white" : ""
        }`}
      >
        {t("contributionFirstType")}
      </button>

      <button
        onClick={() => setType("shelter")}
        className={`${buttonClasses} ${type === "shelter" ? "text-white" : ""}`}
      >
        {t("contributionSecondType")}
      </button>
    </div>
  );
}
