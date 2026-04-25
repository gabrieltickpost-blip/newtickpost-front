export type OnboardingPayload = {
  name: string;
  description?: string;
  website?: string;
  teamSize?: string;
  workNiche?: string;
  previousAutomationTools?: string;
  tickpostUsageGoals?: string;
  onboardingData?: {
    displayName?: string;
    mainHandle?: string;
    toneOfVoice?: string;
    visualStyle?: string;
    colorPalette?: string;
    mainCta?: string;
    brandWords?: string[];
    avoidWords?: string[];
    segment?: string;
    language?: string;
    operationModel?: string;
    teamSize?: string;
    [key: string]: unknown;
  };
};

export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
};
