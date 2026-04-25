export type InvitationStatus = "valid" | "expired" | "accepted" | "rejected";

export type Invitation = {
  token: string;
  email: string;
  workspaceName: string;
  invitedBy: string;
  role: string;
  status: InvitationStatus;
  entryFlow?: {
    nextAction: string;
    nextRoute: string;
    message: string;
  };
};

export type InvitationRegisterPayload = {
  name: string;
  password: string;
};
