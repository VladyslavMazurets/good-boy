import { useTranslations } from "next-intl";
import Button from "./Button";

export default function StepNavigation() {
  const t = useTranslations("NavigationButtons");

  return (
    <div className="mt-12 flex w-full items-center justify-between">
      <Button type="secondary">{t("back")}</Button>
      <Button type="primary">{t("next")}</Button>
    </div>
  );
}
