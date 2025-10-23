import { useTranslations } from "next-intl";

import Button from "./Button";
import { useRouter } from "next/navigation";

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
      <Button type="submit" style="primary" onClick={onNextClick}>
        {t("next")}
      </Button>
    </div>
  );
}
