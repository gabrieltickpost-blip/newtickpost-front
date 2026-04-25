import { BarChart3, MessageCircle, ShoppingBag, UsersRound } from "lucide-react";

import { GrowthChart } from "@/components/marketing/growth-chart";
import { MarketingPageHeader } from "@/components/marketing/page-header";
import { StatCard } from "@/components/marketing/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="animate-soft-in space-y-6 p-4 sm:p-6">
      <MarketingPageHeader
        eyebrow="Analytics"
        title="Conteudo precisa provar que aproxima venda"
        description="A leitura principal nao e curtida. E a passagem de conteudo para conversa, conversa para lead e lead para venda."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Posts publicados" value="193" helper="+22 no mes" icon={BarChart3} />
        <StatCard label="Conversas" value="1.040" helper="+31%" icon={MessageCircle} />
        <StatCard label="Leads" value="214" helper="20,5% das conversas" icon={UsersRound} />
        <StatCard label="Vendas atribuidas" value="49" helper="R$ 186k em pipeline" icon={ShoppingBag} />
      </div>

      <Card className="rounded-lg border-border/70 bg-card/72 py-0">
        <CardHeader className="px-5 pt-5">
          <CardTitle>Funil de crescimento por conteudo</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <GrowthChart />
        </CardContent>
      </Card>
    </div>
  );
}
