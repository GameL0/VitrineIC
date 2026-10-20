import { StepIndicator as Steps } from "@/components/app/StepIndicator";

const STEPS = ["Perfil e interesses", "Técnicas", "Idiomas", "Portfólio"];

/** Quatro passos do onboarding do estudante. */
export function StepIndicator({ current }: { current: number }) {
  return <Steps steps={STEPS} current={current} />;
}
