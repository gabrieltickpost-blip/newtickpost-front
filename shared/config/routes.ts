export const publicRoutes = {
  login: "/login",
  register: "/cadastro",
  forgotPassword: "/recuperar-senha",
  resetPassword: "/redefinir-senha",
  verifyEmail: "/verificar-email",
  invitation: (token: string) => `/convite/${token}`,
} as const;

export const workspaceRoutes = {
  onboarding: "/onboarding",
  selectWorkspace: "/selecionar-workspace",
  dashboard: "/dashboard",
  settings: "/configuracoes",
  workspaceSettings: "/configuracoes/workspace",
  membersSettings: "/configuracoes/membros",
  billingSettings: "/configuracoes/cobranca",
  marketing: "/campanhas",
} as const;
