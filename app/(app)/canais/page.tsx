import { Plus, RadioTower } from "lucide-react";

import { EmptyState } from "@/components/marketing/empty-state";
import { MarketingPageHeader } from "@/components/marketing/page-header";
import { SimpleDataTable } from "@/components/marketing/data-table";
import { StatusBadge } from "@/components/marketing/status-badge";
import { Button } from "@/components/ui/button";
import { channels } from "@/modules/marketing/mock-data";

export default function ChannelsPage() {
  return (
    <div className="animate-soft-in space-y-6 p-4 sm:p-6">
      <MarketingPageHeader
        eyebrow="Canais"
        title="Distribuicao precisa ter destino e sinal de conversa"
        description="Canais nao sao apenas contas conectadas. Eles mostram onde o conteudo cria resposta, lead e oportunidade."
        action={
          <Button>
            <Plus className="size-4" />
            Conectar canal
          </Button>
        }
      />

      {channels.length === 0 ? (
        <EmptyState
          icon={RadioTower}
          title="Nenhum canal conectado"
          description="Conecte um destino para publicar e medir conversas geradas por campanha."
          action="Conectar primeiro canal"
        />
      ) : (
        <SimpleDataTable
          columns={["Canal", "Tipo", "Status", "Audiencia", "Proximo post", "Conversao"]}
          rows={channels.map((channel) => [
            <span key={`${channel.id}-name`} className="font-medium">{channel.name}</span>,
            channel.type,
            <StatusBadge key={`${channel.id}-status`} status={channel.status} />,
            channel.audience,
            channel.nextPost,
            <span key={`${channel.id}-conversion`} className="font-medium text-emerald-300">
              {channel.conversionRate}
            </span>,
          ])}
        />
      )}
    </div>
  );
}
