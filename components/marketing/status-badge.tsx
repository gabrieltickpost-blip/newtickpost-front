import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  draft: "border-slate-400/20 bg-slate-400/10 text-slate-300",
  planning: "border-sky-400/20 bg-sky-400/10 text-sky-300",
  production: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  review: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  ready: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  scheduled: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  live: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  healthy: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  attention: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  paused: "border-rose-400/20 bg-rose-400/10 text-rose-300",
  writing: "border-sky-400/20 bg-sky-400/10 text-sky-300",
  brief: "border-slate-400/20 bg-slate-400/10 text-slate-300",
};

const labels: Record<string, string> = {
  draft: "Rascunho",
  planning: "Planejamento",
  production: "Producao",
  review: "Revisao",
  ready: "Pronto",
  scheduled: "Agendado",
  live: "Ao vivo",
  healthy: "Saudavel",
  attention: "Atencao",
  paused: "Pausado",
  writing: "Escrita",
  brief: "Brief",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-md border px-2.5 py-1", statusStyles[status])}
    >
      {labels[status] ?? status}
    </Badge>
  );
}
