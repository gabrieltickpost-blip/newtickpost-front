import { PenTool } from "lucide-react";

import { MockRoutePage } from "@/components/app-shell/mock-route-page";

export default function PublicationsPage() {
  return (
    <MockRoutePage
      title="Publicações"
      description="Fila operacional para posts prontos, agendados, publicados e pausados."
      question="O que está pronto para distribuir?"
      action="Nova publicação"
      icon={PenTool}
      items={[
        "Fila por status",
        "Prévia por canal",
        "Histórico de publicação",
        "Agrupamento por campanha",
      ]}
    />
  );
}
