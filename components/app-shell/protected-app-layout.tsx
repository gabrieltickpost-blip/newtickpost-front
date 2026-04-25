import type { ReactNode } from "react";

import { AppShell } from "@/components/app-shell/app-shell";
import { AuthGuard } from "@/modules/auth/guards/AuthGuard";
import { EmailVerifiedGuard } from "@/modules/auth/guards/EmailVerifiedGuard";
import { OnboardingGuard } from "@/modules/auth/guards/OnboardingGuard";
import { WorkspaceGate } from "@/modules/workspace/components/WorkspaceGate";

export function ProtectedAppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <EmailVerifiedGuard>
        <OnboardingGuard>
          <WorkspaceGate>
            <AppShell>{children}</AppShell>
          </WorkspaceGate>
        </OnboardingGuard>
      </EmailVerifiedGuard>
    </AuthGuard>
  );
}
