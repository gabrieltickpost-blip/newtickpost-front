import { InvitationEntry } from "@/modules/invitations/components/InvitationEntry";
import { invitationsApi } from "@/modules/invitations/api/invitations.api";

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const invitation = await invitationsApi.detail(token);

  return (
    <main className="grid min-h-svh place-items-center bg-background px-4 py-10">
      <InvitationEntry invitation={invitation} />
    </main>
  );
}
