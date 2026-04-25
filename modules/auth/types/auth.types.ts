export type EntryNextAction =
  | "VERIFY_EMAIL"
  | "COMPLETE_ONBOARDING"
  | "OPEN_DASHBOARD";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  is_email_verified: boolean;
  completed_onboarding: boolean;
};

export type Workspace = {
  id: string;
  name: string;
  logo: string | null;
  role: string;
  isActive: boolean;
};

export type CurrentBrand = {
  id: string;
  name: string | null;
  role: string;
  permissions: string[];
};

export type MeResponse = {
  user: AuthUser;
  brands: Workspace[];
  currentBrand: CurrentBrand | null;
  flags: {
    needsEmailVerification: boolean;
    needsOnboarding: boolean;
    trialExpired: boolean;
    hasActiveBrand: boolean;
  };
  entry: {
    nextAction: EntryNextAction;
    nextRoute: string;
    hasMultipleWorkspaces: boolean;
    message: string;
  };
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export type UpdateMePayload = Partial<Pick<AuthUser, "name" | "phone">>;

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
  passwordConfirmation: string;
};

export type ConfirmEmailPayload = {
  token: string;
};
