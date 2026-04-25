import type { MeResponse } from "@/modules/auth/types/auth.types";

export const mockMeResponse: MeResponse = {
  user: {
    id: "usr_01",
    email: "gabriel@tickpost.com",
    name: "Gabriel Barbosa",
    phone: null,
    is_email_verified: true,
    completed_onboarding: true,
  },
  brands: [
    {
      id: "brd_tickpost",
      name: "Tickpost",
      logo: null,
      role: "owner",
      isActive: true,
    },
  ],
  currentBrand: {
    id: "brd_tickpost",
    name: "Tickpost",
    role: "owner",
    permissions: ["marketing:read", "marketing:write", "workspace:admin"],
  },
  flags: {
    needsEmailVerification: false,
    needsOnboarding: false,
    trialExpired: false,
    hasActiveBrand: true,
  },
  entry: {
    nextAction: "OPEN_DASHBOARD",
    nextRoute: "/dashboard",
    hasMultipleWorkspaces: false,
    message: "Workspace pronto para uso.",
  },
};
