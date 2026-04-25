import type { Workspace } from "@/modules/auth/types/auth.types";

export type WorkspaceSettings = {
  name: string;
  description?: string;
  website?: string;
  logo?: string | null;
  language?: string;
  timezone?: string;
};

export type WorkspaceAccessOverview = {
  workspace: Workspace;
  membersCount: number;
  pendingInvites: number;
  plan: string;
};

export type CreateWorkspacePayload = {
  name: string;
  description?: string;
  website?: string;
};

export type UpdateWorkspacePayload = Partial<CreateWorkspacePayload>;
