import { CheckSquare2 } from "lucide-react";

import { MockRoutePage } from "@/components/app-shell/mock-route-page";

export default function ApprovalsPage() {
  return (
    <MockRoutePage
      title="Aprovações"
      description="Fluxo simples para revisar conteúdo, coletar feedback e liberar publicação."
      question="O que falta aprovar?"
      action="Enviar para aprovação"
      icon={CheckSquare2}
      items={[
        "Comentários por peça",
        "Status de revisão",
        "Aprovação por cliente",
        "Histórico de alterações",
      ]}
    />
  );
}
