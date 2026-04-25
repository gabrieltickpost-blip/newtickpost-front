import { CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Invitation } from "@/modules/invitations/types/invitations.types";

export function InvitationEntry({ invitation }: { invitation: Invitation }) {
  const isValid = invitation.status === "valid";

  return (
    <div className="mx-auto max-w-xl rounded-2xl border bg-card p-6 text-center shadow-sm">
      {isValid ? (
        <CheckCircle2 className="mx-auto size-10 text-[#3240AA]" />
      ) : (
        <XCircle className="mx-auto size-10 text-primary" />
      )}
      <h1 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
        Convite para {invitation.workspaceName}
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {invitation.invitedBy} convidou {invitation.email} para entrar como{" "}
        {invitation.role}.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button disabled={!isValid}>Aceitar convite</Button>
        <Button variant="outline" disabled={!isValid}>
          Recusar
        </Button>
      </div>
    </div>
  );
}
