import { useTranslations } from "next-intl";
import { createNavigation } from "next-intl/navigation";

import { routing } from "@/i18n/routing";

import Button from "./Button";

interface StepNavigationProps {
  className?: string;
  onNextClick: () => void;
  showArrow?: boolean;
  step: number;
  checked?: boolean | number;
}

export default function StepNavigation({
  className,
  step,
  showArrow = true,
  checked,
  onNextClick,
}: StepNavigationProps) {
  const t = useTranslations("NavigationButtons");

  const { useRouter } = createNavigation(routing);
  const router = useRouter();

  const handleBack = () => {
    if (step === 2) {
      router.push("/");
    } else {
      router.push("/personal-info");
    }
  };

  return (
    <div className={`flex w-full items-center justify-between ${className}`}>
      {step === 1 ? (
        <div />
      ) : (
        <Button type="button" style="secondary" onClick={handleBack}>
          {t("back")}
        </Button>
      )}
      <Button
        type="submit"
        style="primary"
        showArrow={showArrow}
        disabled={checked === false}
        onClick={onNextClick}
      >
        {step === 3 ? t("sendForm") : t("next")}
      </Button>
    </div>
  );
}
