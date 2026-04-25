import { Library } from "lucide-react";

import { MockRoutePage } from "@/components/app-shell/mock-route-page";

export default function LibraryPage() {
  return (
    <MockRoutePage
      title="Biblioteca"
      description="Repositório de ideias, assets, referências, CTAs e materiais reutilizáveis."
      question="O que pode acelerar a próxima campanha?"
      action="Adicionar ativo"
      icon={Library}
      items={[
        "Ideias aprovadas",
        "Assets por marca",
        "Referências de voz e visual",
        "CTAs e destinos reutilizáveis",
      ]}
    />
  );
}
