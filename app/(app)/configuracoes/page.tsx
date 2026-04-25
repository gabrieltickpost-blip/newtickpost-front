import Link from "next/link";
import { CreditCard, Settings, UsersRound } from "lucide-react";

import { MarketingPageHeader } from "@/components/marketing/page-header";
import { Card, CardContent } from "@/components/ui/card";

const settingsItems = [
  {
    title: "Workspace",
    description: "Nome, site, idioma, fuso e preferencias da marca.",
    href: "/configuracoes/workspace",
    icon: Settings,
  },
  {
    title: "Membros",
    description: "Convites, permissoes e acesso do time.",
    href: "/configuracoes/membros",
    icon: UsersRound,
  },
  {
    title: "Cobranca",
    description: "Plano, uso e portal de assinatura.",
    href: "/configuracoes/cobranca",
    icon: CreditCard,
  },
];

export default function SettingsPage() {
  return (
    <div className="animate-soft-in space-y-6 p-4 sm:p-6">
      <MarketingPageHeader
        eyebrow="Configuracoes"
        title="Base pronta para workspace, membros e cobranca"
        description="Essas telas ja nascem separadas para integrar com endpoints reais sem misturar regras de produto."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {settingsItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="h-full rounded-xl py-0 shadow-sm transition-colors hover:bg-secondary/60">
              <CardContent className="space-y-4 p-5">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="size-5" />
                </span>
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
