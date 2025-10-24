import { useTranslations } from "next-intl";

import FormContainer from "@/components/FormContainer";
import FormSteps from "@/components/FormSteps";
import ReviewForm from "@/components/ReviewForm";
import Title from "@/components/Title";

export default function ConfirmationPage() {
  const t = useTranslations("Confirmation");

  return (
    <FormContainer>
      <FormSteps currentStep={3} />
      <Title title={t("title")} />
      <ReviewForm />
    </FormContainer>
  );
}
