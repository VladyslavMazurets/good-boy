import { useTranslations } from "next-intl";
import CheckIcon from "./icons/CheckIcon";

type Props = {
  currentStep: 1 | 2 | 3;
};

export default function FormSteps({ currentStep }: Props) {
  const t = useTranslations("FormSteps");

  const steps = [t("step1"), t("step2"), t("step3")];

  return (
    <div className="flex w-full items-center gap-4">
      {steps.map((label, index) => (
        <div
          key={index}
          className={`step flex items-center gap-4 text-base/[100%] ${currentStep === index + 1 ? "active" : ""}`}
        >
          <p className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                currentStep === index + 1
                  ? "bg-primary border-primary text-white"
                  : "text-gray border-gray-light bg-transparent"
              } ${
                index + 1 < currentStep
                  ? "bg-primary border-primary text-white"
                  : ""
              }`}
            >
              {index + 1 < currentStep ? <CheckIcon /> : index + 1}
            </span>{" "}
            <span
              className={`${index + 1 <= currentStep ? "text-black" : "text-gray"}`}
            >
              {label}{" "}
            </span>
          </p>
          {index !== 2 ? <div className="bg-gray h-px w-22" /> : null}
        </div>
      ))}
    </div>
  );
}
