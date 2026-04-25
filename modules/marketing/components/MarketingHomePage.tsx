import { ArrowRight, MessageCircle, MousePointerClick, Plus, UsersRound } from "lucide-react";

import { ActionCard } from "@/components/marketing/action-card";
import { GrowthChart } from "@/components/marketing/growth-chart";
import { MarketingPageHeader } from "@/components/marketing/page-header";
import { SimpleDataTable } from "@/components/marketing/data-table";
import { StatCard } from "@/components/marketing/stat-card";
import { StatusBadge } from "@/components/marketing/status-badge";
import { Stepper } from "@/components/marketing/stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { actionCards, campaigns, growthSteps } from "@/modules/marketing/mock-data";

export function MarketingHomePage() {
  return (
    <div className="animate-soft-in space-y-6 p-4 sm:p-6">
      <MarketingPageHeader
        eyebrow="TickPost Marketing"
        title="Campanhas que começam pelo crescimento"
        description="Antes de criar calendario, defina a campanha: objetivo, publico, CTA e destino. O conteudo nasce daqui e segue ate conversa, lead e venda."
        action={
          <Button>
            <Plus className="size-4" />
            Criar campanha
          </Button>
        }
      />

      <Stepper steps={growthSteps} />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Conversas geradas"
          value="926"
          helper="+31% nas ultimas 4 semanas"
          icon={MessageCircle}
        />
        <StatCard
          label="Leads atribuidos"
          value="214"
          helper="74 vieram de campanhas ativas"
          icon={UsersRound}
        />
        <StatCard
          label="CTAs clicados"
          value="3.842"
          helper="12,6% de taxa media"
          icon={MousePointerClick}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-xl border bg-card py-0 shadow-sm">
          <CardHeader className="px-5 pt-5">
            <CardTitle>Conteudo gera conversa</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <GrowthChart />
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          {actionCards.slice(0, 2).map((item) => (
            <ActionCard key={item.title} item={item} />
          ))}
        </div>
      </div>

      <Card className="rounded-xl border bg-card py-0 shadow-sm">
        <CardHeader className="px-5 pt-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Campanhas em foco</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                A pergunta principal: qual campanha esta mais perto de virar receita?
              </p>
            </div>
            <Button variant="outline" size="sm">
              Ver todas
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <SimpleDataTable
            columns={["Campanha", "Objetivo", "Status", "Progresso", "Lead"]}
            rows={campaigns.map((campaign) => [
              <div key={`${campaign.id}-name`} className="min-w-[220px]">
                <p className="font-medium">{campaign.name}</p>
                <p className="text-xs text-muted-foreground">
                  CTA: {campaign.cta} {"->"} {campaign.destination}
                </p>
              </div>,
              <span key={`${campaign.id}-objective`} className="text-muted-foreground">
                {campaign.objective}
              </span>,
              <StatusBadge key={`${campaign.id}-status`} status={campaign.status} />,
              <div key={`${campaign.id}-progress`} className="min-w-[140px] space-y-2">
                <Progress value={campaign.progress} />
                <span className="text-xs text-muted-foreground">{campaign.progress}%</span>
              </div>,
              <span key={`${campaign.id}-lead`} className="font-medium">
                {campaign.leads} leads
              </span>,
            ])}
          />
        </CardContent>
      </Card>
    </div>
  );
}
