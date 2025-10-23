import { useTranslations } from "next-intl";

import FormContainer from "@/components/FormContainer";
import FormSteps from "@/components/FormSteps";
import SecondStepForm from "@/components/SecondStepForm";
import Title from "@/components/Title";

export default function PersonalInfoPage() {
  const t = useTranslations("SecondForm");

  return (
    <FormContainer>
      <FormSteps currentStep={2} />
      <Title title={t("title")} />
      <SecondStepForm />
    </FormContainer>
  );
}
