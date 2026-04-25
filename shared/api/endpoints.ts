export const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    me: "/auth/me",
    updateMe: "/auth/me",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    resetPasswordPreview: "/auth/reset-password/preview",
    confirmEmail: "/auth/confirm-email",
    resendVerificationEmail: "/auth/resend-verification-email",
    brands: "/auth/brands",
    selectBrand: (brandId: string) => `/auth/brand/${brandId}/select`,
    validateBrandToken: "/auth/validate/brand-token",
  },
  brands: {
    list: "/brands",
    create: "/brands",
    accessOverview: "/brands/access-overview",
    detail: (brandId: string) => `/brands/${brandId}`,
    full: (brandId: string) => `/brands/${brandId}/full`,
    settings: (brandId: string) => `/brands/${brandId}/settings`,
  },
  onboarding: {
    submit: "/user/onboarding",
  },
  invitations: {
    detail: (token: string) => `/invitations/${token}`,
    register: (token: string) => `/invitations/${token}/register`,
    accept: (token: string) => `/invitations/${token}/accept`,
    reject: (token: string) => `/invitations/${token}/reject`,
  },
  billing: {
    overview: "/billing/overview",
    portal: "/billing/portal",
  },
} as const;
