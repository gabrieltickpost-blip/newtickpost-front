import { UsersRound } from "lucide-react";

import { EmptyState } from "@/components/marketing/empty-state";
import { MarketingPageHeader } from "@/components/marketing/page-header";

export default function MembersSettingsPage() {
  return (
    <div className="animate-soft-in space-y-6 p-4 sm:p-6">
      <MarketingPageHeader
        eyebrow="Membros"
        title="Time e convites"
        description="Preparado para listar membros, convites pendentes e permissoes por workspace."
      />
      <EmptyState
        icon={UsersRound}
        title="Convites entram aqui"
        description="A estrutura de convite ja suporta token, aceitar, rejeitar e criar conta via convite."
        action="Convidar membro"
      />
    </div>
  );
}
