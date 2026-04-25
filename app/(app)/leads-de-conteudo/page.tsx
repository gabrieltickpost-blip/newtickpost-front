import { CircleDollarSign } from "lucide-react";

import { MockRoutePage } from "@/components/app-shell/mock-route-page";

export default function ContentLeadsPage() {
  return (
    <MockRoutePage
      title="Leads de conteúdo"
      description="Área preparada para atribuição de leads por campanha, conteúdo, CTA e destino."
      question="Quais leads vieram do conteúdo?"
      action="Mapear leads"
      icon={CircleDollarSign}
      items={[
        "Leads por CTA",
        "Qualificação por origem",
        "Atribuição por campanha",
        "Integração futura com CRM",
      ]}
    />
  );
}
