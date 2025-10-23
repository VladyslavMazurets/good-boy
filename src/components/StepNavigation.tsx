import { useTranslations } from "next-intl";

import Button from "./Button";

interface StepNavigationProps {
  className?: string;
  onNextClick: () => void;
  step: number;
}

export default function StepNavigation({
  className,
  step,
  onNextClick,
}: StepNavigationProps) {
  const t = useTranslations("NavigationButtons");

  return (
    <div className={`flex w-full items-center justify-between ${className}`}>
      {step === 1 ? (
        <div />
      ) : (
        <Button type="button" style="secondary">
          {t("back")}
        </Button>
      )}
      <Button type="submit" style="primary" onClick={onNextClick}>
        {t("next")}
      </Button>
    </div>
  );
}
