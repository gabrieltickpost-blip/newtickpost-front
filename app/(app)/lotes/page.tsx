import { Layers3, Plus } from "lucide-react";

import { EmptyState } from "@/components/marketing/empty-state";
import { MarketingPageHeader } from "@/components/marketing/page-header";
import { SimpleDataTable } from "@/components/marketing/data-table";
import { StatusBadge } from "@/components/marketing/status-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { batches } from "@/modules/marketing/mock-data";

export default function BatchesPage() {
  return (
    <div className="animate-soft-in space-y-6 p-4 sm:p-6">
      <MarketingPageHeader
        eyebrow="Lotes"
        title="Producao em massa sem virar uma planilha"
        description="Agrupe conteudos por semana, campanha e etapa. O proximo passo fica evidente para quem escreve, revisa e publica."
        action={
          <Button>
            <Plus className="size-4" />
            Novo lote
          </Button>
        }
      />

      {batches.length === 0 ? (
        <EmptyState
          icon={Layers3}
          title="Nenhum lote em andamento"
          description="Crie um lote a partir de uma campanha para acelerar a producao em massa."
          action="Montar lote"
        />
      ) : (
        <SimpleDataTable
          columns={["Lote", "Campanha", "Responsavel", "Status", "Entrega"]}
          rows={batches.map((batch) => [
            <div key={`${batch.id}-name`}>
              <p className="font-medium">{batch.name}</p>
              <p className="text-xs text-muted-foreground">{batch.quantity} conteudos planejados</p>
            </div>,
            batch.campaign,
            batch.owner,
            <StatusBadge key={`${batch.id}-status`} status={batch.status} />,
            <div key={`${batch.id}-progress`} className="min-w-[150px] space-y-2">
              <Progress value={(batch.ready / batch.quantity) * 100} />
              <span className="text-xs text-muted-foreground">
                {batch.ready}/{batch.quantity} prontos
              </span>
            </div>,
          ])}
        />
      )}
    </div>
  );
}
