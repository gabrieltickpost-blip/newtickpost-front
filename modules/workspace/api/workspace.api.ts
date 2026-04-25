import { mockMeResponse } from "@/modules/auth/api/auth.mock";
import type { Workspace } from "@/modules/auth/types/auth.types";
import type {
  CreateWorkspacePayload,
  UpdateWorkspacePayload,
  WorkspaceAccessOverview,
  WorkspaceSettings,
} from "@/modules/workspace/types/workspace.types";
import { endpoints } from "@/shared/api/endpoints";
import { apiFetch } from "@/shared/api/http";
import { env } from "@/shared/config/env";

export const workspaceApi = {
  async list() {
    if (env.useMockApi) {
      return mockMeResponse.brands;
    }

    return apiFetch<Workspace[]>(endpoints.brands.list);
  },

  async create(payload: CreateWorkspacePayload) {
    return apiFetch<Workspace>(endpoints.brands.create, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async accessOverview() {
    if (env.useMockApi) {
      return {
        workspace: mockMeResponse.brands[0],
        membersCount: 4,
        pendingInvites: 1,
        plan: "Early access",
      } satisfies WorkspaceAccessOverview;
    }

    return apiFetch<WorkspaceAccessOverview>(endpoints.brands.accessOverview);
  },

  async detail(brandId: string) {
    return apiFetch<Workspace>(endpoints.brands.detail(brandId));
  },

  async full(brandId: string) {
    return apiFetch<Workspace>(endpoints.brands.full(brandId));
  },

  async settings(brandId: string) {
    if (env.useMockApi) {
      return {
        name: "Tickpost",
        description: "Central de crescimento por conteudo.",
        website: "https://tickpost.com",
        language: "pt-BR",
        timezone: "America/Sao_Paulo",
      } satisfies WorkspaceSettings;
    }

    return apiFetch<WorkspaceSettings>(endpoints.brands.settings(brandId));
  },

  async updateSettings(brandId: string, payload: WorkspaceSettings) {
    return apiFetch<WorkspaceSettings>(endpoints.brands.settings(brandId), {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  async update(brandId: string, payload: UpdateWorkspacePayload) {
    return apiFetch<Workspace>(endpoints.brands.detail(brandId), {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async remove(brandId: string) {
    return apiFetch<{ ok: boolean }>(endpoints.brands.detail(brandId), {
      method: "DELETE",
    });
  },
};
