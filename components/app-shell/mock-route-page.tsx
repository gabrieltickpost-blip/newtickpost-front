import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function MockRoutePage({
  eyebrow = "TickPost Marketing",
  title,
  description,
  question,
  action,
  icon: Icon,
  items,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  question: string;
  action: string;
  icon: LucideIcon;
  items: string[];
}) {
  return (
    <div className="animate-soft-in space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-3 rounded-full px-3 py-1 text-muted-foreground">
            {eyebrow}
          </Badge>
          <h1 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <Button className="w-full bg-[#FF6842] text-white hover:bg-[#ff7857] sm:w-auto">
          {action}
          <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.78fr_1.22fr]">
        <Card className="rounded-xl border bg-card py-0 shadow-sm">
          <CardHeader className="px-5 pt-5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-[#FF6842]/12 text-[#FF6842]">
                <Icon className="size-5" />
              </span>
              <CardTitle>{question}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 text-sm leading-6 text-muted-foreground">
            Esta tela está pronta como rota mockada para receber backend, filtros e estados reais
            sem mudar o AppShell.
          </CardContent>
        </Card>

        <Card className="rounded-xl border bg-card py-0 shadow-sm">
          <CardHeader className="px-5 pt-5">
            <CardTitle>Próximos blocos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 px-5 pb-5 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border bg-background/50 p-3">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#38C3DB]" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
