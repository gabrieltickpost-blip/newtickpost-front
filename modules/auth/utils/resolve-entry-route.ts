import type { MeResponse } from "@/modules/auth/types/auth.types";
import { publicRoutes, workspaceRoutes } from "@/shared/config/routes";

export function resolveEntryRoute(me: MeResponse) {
  if (me.entry.nextRoute) {
    return me.entry.nextRoute;
  }

  if (me.entry.nextAction === "VERIFY_EMAIL") {
    return publicRoutes.verifyEmail;
  }

  if (me.entry.nextAction === "COMPLETE_ONBOARDING") {
    return workspaceRoutes.onboarding;
  }

  if (me.entry.hasMultipleWorkspaces) {
    return workspaceRoutes.selectWorkspace;
  }

  return workspaceRoutes.dashboard;
}
