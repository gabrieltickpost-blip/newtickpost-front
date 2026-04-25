import type {
  Invitation,
  InvitationRegisterPayload,
} from "@/modules/invitations/types/invitations.types";
import { endpoints } from "@/shared/api/endpoints";
import { apiFetch } from "@/shared/api/http";
import { env } from "@/shared/config/env";

export const invitationsApi = {
  async detail(token: string) {
    if (env.useMockApi) {
      return {
        token,
        email: "novo@tickpost.com",
        workspaceName: "Tickpost",
        invitedBy: "Gabriel Barbosa",
        role: "marketing",
        status: "valid",
        entryFlow: {
          nextAction: "ACCEPT_INVITATION",
          nextRoute: `/convite/${token}`,
          message: "Convite pronto para aceite.",
        },
      } satisfies Invitation;
    }

    return apiFetch<Invitation>(endpoints.invitations.detail(token));
  },

  async register(token: string, payload: InvitationRegisterPayload) {
    return apiFetch<Invitation>(endpoints.invitations.register(token), {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async accept(token: string) {
    return apiFetch<Invitation>(endpoints.invitations.accept(token), {
      method: "POST",
    });
  },

  async reject(token: string) {
    return apiFetch<Invitation>(endpoints.invitations.reject(token), {
      method: "POST",
    });
  },
};
