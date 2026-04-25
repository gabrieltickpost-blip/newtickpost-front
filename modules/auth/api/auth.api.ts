import { endpoints } from "@/shared/api/endpoints";
import { apiFetch } from "@/shared/api/http";
import { env } from "@/shared/config/env";
import { mockMeResponse } from "@/modules/auth/api/auth.mock";
import type {
  ConfirmEmailPayload,
  ForgotPasswordPayload,
  LoginPayload,
  MeResponse,
  RegisterPayload,
  ResetPasswordPayload,
  UpdateMePayload,
} from "@/modules/auth/types/auth.types";

export const authApi = {
  async register(payload: RegisterPayload) {
    if (env.useMockApi) {
      return mockMeResponse;
    }

    return apiFetch<MeResponse>(endpoints.auth.register, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async login(payload: LoginPayload) {
    if (env.useMockApi) {
      return mockMeResponse;
    }

    return apiFetch<MeResponse>(endpoints.auth.login, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async refresh() {
    if (env.useMockApi) {
      return mockMeResponse;
    }

    return apiFetch<MeResponse>(endpoints.auth.refresh, { method: "POST" });
  },

  async logout() {
    if (env.useMockApi) {
      return { ok: true };
    }

    return apiFetch<{ ok: boolean }>(endpoints.auth.logout, { method: "POST" });
  },

  async me() {
    if (env.useMockApi) {
      return mockMeResponse;
    }

    return apiFetch<MeResponse>(endpoints.auth.me);
  },

  async updateMe(payload: UpdateMePayload) {
    return apiFetch<MeResponse>(endpoints.auth.updateMe, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async forgotPassword(payload: ForgotPasswordPayload) {
    return apiFetch<{ message: string }>(endpoints.auth.forgotPassword, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async resetPassword(payload: ResetPasswordPayload) {
    return apiFetch<{ message: string }>(endpoints.auth.resetPassword, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async resetPasswordPreview(token: string) {
    return apiFetch<{ email: string; expiresAt: string }>(
      `${endpoints.auth.resetPasswordPreview}?token=${encodeURIComponent(token)}`
    );
  },

  async confirmEmail(payload: ConfirmEmailPayload) {
    return apiFetch<MeResponse>(endpoints.auth.confirmEmail, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async resendVerificationEmail() {
    return apiFetch<{ message: string }>(endpoints.auth.resendVerificationEmail, {
      method: "POST",
    });
  },

  async selectBrand(brandId: string) {
    if (env.useMockApi) {
      return {
        ...mockMeResponse,
        brands: mockMeResponse.brands.map((brand) => ({
          ...brand,
          isActive: brand.id === brandId,
        })),
        currentBrand: {
          id: brandId,
          name:
            mockMeResponse.brands.find((brand) => brand.id === brandId)?.name ??
            "Workspace",
          role: "owner",
          permissions: ["marketing:read", "marketing:write", "workspace:admin"],
        },
      } satisfies MeResponse;
    }

    return apiFetch<MeResponse>(endpoints.auth.selectBrand(brandId), {
      method: "POST",
    });
  },
};
