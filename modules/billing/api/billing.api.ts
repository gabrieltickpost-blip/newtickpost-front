import type { BillingOverview } from "@/modules/billing/types/billing.types";
import { endpoints } from "@/shared/api/endpoints";
import { apiFetch } from "@/shared/api/http";
import { env } from "@/shared/config/env";

export const billingApi = {
  async overview() {
    if (env.useMockApi) {
      return {
        plan: {
          id: "plan_early_access",
          name: "Early access",
          status: "trialing",
          seats: 5,
          renewsAt: "2026-05-25",
        },
        usage: {
          workspaces: 1,
          members: 4,
          campaigns: 3,
        },
      } satisfies BillingOverview;
    }

    return apiFetch<BillingOverview>(endpoints.billing.overview);
  },

  async portal() {
    return apiFetch<{ url: string }>(endpoints.billing.portal, {
      method: "POST",
    });
  },
};
