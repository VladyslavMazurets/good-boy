import FormContainer from "@/components/FormContainer";
import FormSteps from "@/components/FormSteps";
import SecondStepForm from "@/components/SecondStepForm";
import StepNavigation from "@/components/StepNavigation";
import Title from "@/components/Title";
import { useTranslations } from "next-intl";

export default function PersonalInfoPage() {
  const t = useTranslations("SecondForm");

  return (
    <FormContainer>
      <FormSteps currentStep={2} />
      <Title title={t("title")} />
      <SecondStepForm />
      <StepNavigation />
    </FormContainer>
  );
}
