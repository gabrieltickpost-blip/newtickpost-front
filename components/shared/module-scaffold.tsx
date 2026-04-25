import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, Clock3, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { WorkspaceModuleOverview } from "@/modules/shared/contracts";

const taskStatusMap = {
  ready: {
    label: "Pronto",
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  },
  planned: {
    label: "Planejado",
    icon: Clock3,
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  },
  blocked: {
    label: "Bloqueado",
    icon: AlertCircle,
    className:
      "border-destructive/20 bg-destructive/10 text-destructive",
  },
};

export function ModuleScaffold({
  overview,
  children,
}: {
  overview: WorkspaceModuleOverview;
  children?: ReactNode;
}) {
  return (
    <div className="w-full overflow-y-auto overflow-x-hidden p-4 h-full">
      <div className="mx-auto w-full space-y-4">
        <PageHeader
          title={overview.title}
          description={overview.description}
          actions={
            <Badge variant="outline" className="gap-1 rounded-full px-3 py-1">
              <Sparkles className="size-3.5" />
              Estrutura pronta para backend
            </Badge>
          }
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overview.metrics.map((metric) => (
            <Card key={metric.label} className="gap-4">
              <CardHeader className="gap-1">
                <CardDescription>{metric.label}</CardDescription>
                <CardTitle className="text-2xl">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                {metric.helper}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <Card className="gap-4 xl:col-span-1">
            <CardHeader>
              <CardTitle>Diretrizes do modulo</CardTitle>
              <CardDescription>
                O layout ja segue o mesmo AppShell e o mesmo design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {overview.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="gap-4 xl:col-span-1">
            <CardHeader>
              <CardTitle>Checklist de entrega</CardTitle>
              <CardDescription>
                Itens padronizados para dados, contratos, permissao e UX.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {overview.tasks.map((task) => {
                const status = taskStatusMap[task.status];
                const Icon = status.icon;

                return (
                  <div
                    key={task.title}
                    className="rounded-lg border p-3 transition-colors"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="font-medium">{task.title}</div>
                      <Badge
                        variant="outline"
                        className={`gap-1 ${status.className}`}
                      >
                        <Icon className="size-3.5" />
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {children ? <div className="xl:col-span-1">{children}</div> : null}
        </div>
      </div>
    </div>
  );
}
