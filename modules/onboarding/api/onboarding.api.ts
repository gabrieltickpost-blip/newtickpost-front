import { mockMeResponse } from "@/modules/auth/api/auth.mock";
import type { MeResponse } from "@/modules/auth/types/auth.types";
import type { OnboardingPayload } from "@/modules/onboarding/types/onboarding.types";
import { endpoints } from "@/shared/api/endpoints";
import { apiFetch } from "@/shared/api/http";
import { env } from "@/shared/config/env";

export const onboardingApi = {
  async submit(payload: OnboardingPayload) {
    if (env.useMockApi) {
      return {
        ...mockMeResponse,
        user: {
          ...mockMeResponse.user,
          name: payload.name,
          completed_onboarding: true,
        },
      } satisfies MeResponse;
    }

    return apiFetch<MeResponse>(endpoints.onboarding.submit, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
