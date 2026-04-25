import { CreditCard } from "lucide-react";

import { EmptyState } from "@/components/marketing/empty-state";
import { MarketingPageHeader } from "@/components/marketing/page-header";

export default function BillingSettingsPage() {
  return (
    <div className="animate-soft-in space-y-6 p-4 sm:p-6">
      <MarketingPageHeader
        eyebrow="Cobranca"
        title="Plano e uso"
        description="Contrato de billing pronto para overview e portal quando o backend habilitar assinatura."
      />
      <EmptyState
        icon={CreditCard}
        title="Billing pronto para conectar"
        description="Quando o backend expor plano, uso e portal, esta tela recebe os dados sem mexer no shell."
        action="Abrir portal"
      />
    </div>
  );
}
