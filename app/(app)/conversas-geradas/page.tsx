import { MessageCircle } from "lucide-react";

import { MockRoutePage } from "@/components/app-shell/mock-route-page";

export default function GeneratedConversationsPage() {
  return (
    <MockRoutePage
      title="Conversas geradas"
      description="Área preparada para mostrar conversas originadas por conteúdo, campanha e canal."
      question="Quais conteúdos estão puxando conversas?"
      action="Ver sinais"
      icon={MessageCircle}
      items={[
        "Conversas por campanha",
        "Origem por canal",
        "Intenção detectada",
        "Próximo passo comercial",
      ]}
    />
  );
}
