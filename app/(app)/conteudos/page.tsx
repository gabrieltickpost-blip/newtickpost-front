import { Plus, Sparkles } from "lucide-react";

import { EmptyState } from "@/components/marketing/empty-state";
import { MarketingPageHeader } from "@/components/marketing/page-header";
import { SimpleDataTable } from "@/components/marketing/data-table";
import { StatusBadge } from "@/components/marketing/status-badge";
import { Button } from "@/components/ui/button";
import { contentItems } from "@/modules/marketing/mock-data";

export default function ContentsPage() {
  return (
    <div className="animate-soft-in space-y-6 p-4 sm:p-6">
      <MarketingPageHeader
        eyebrow="Conteudos"
        title="Cada post precisa de objetivo, publico, CTA e destino"
        description="Aqui a campanha vira ativo de conteudo. A tela evita lista infinita: mostra o que precisa ser escrito, revisado ou publicado agora."
        action={
          <Button>
            <Plus className="size-4" />
            Criar conteudo
          </Button>
        }
      />

      {contentItems.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="Nenhum conteudo criado ainda"
          description="Comece criando uma campanha e gere o primeiro lote de conteudos com um objetivo claro."
          action="Criar primeiro conteudo"
        />
      ) : (
        <SimpleDataTable
          columns={["Conteudo", "Campanha", "Canal", "Status", "CTA"]}
          rows={contentItems.map((item) => [
            <div key={`${item.id}-title`}>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.format} · {item.objective}</p>
            </div>,
            item.campaign,
            item.channel,
            <StatusBadge key={`${item.id}-status`} status={item.status} />,
            item.cta,
          ])}
        />
      )}
    </div>
  );
}
