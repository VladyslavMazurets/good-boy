import { useTranslations } from "next-intl";

import Button from "./Button";
import { useRouter } from "next/navigation";

interface StepNavigationProps {
  className?: string;
  onNextClick: () => void;
  showArrow?: boolean;
  step: number;
  checked?: boolean;
}

export default function StepNavigation({
  className,
  step,
  showArrow = true,
  checked,
  onNextClick,
}: StepNavigationProps) {
  const t = useTranslations("NavigationButtons");
  const router = useRouter();

  const handleBack = () => {
    step === 2 ? router.push("/") : router.push("/personal-info");
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
