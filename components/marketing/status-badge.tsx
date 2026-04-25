import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  draft: "border-slate-200 bg-slate-50 text-slate-700",
  planning: "border-[#3879FF]/20 bg-[#3879FF]/10 text-[#3240AA]",
  production: "border-[#FF6842]/25 bg-[#FF6842]/10 text-[#C94728]",
  review: "border-[#3240AA]/20 bg-[#3240AA]/10 text-[#3240AA]",
  ready: "border-[#38C3DB]/25 bg-[#38C3DB]/12 text-[#13798A]",
  scheduled: "border-[#38C3DB]/25 bg-[#38C3DB]/12 text-[#13798A]",
  live: "border-[#38C3DB]/25 bg-[#38C3DB]/12 text-[#13798A]",
  healthy: "border-[#38C3DB]/25 bg-[#38C3DB]/12 text-[#13798A]",
  attention: "border-[#FF6842]/25 bg-[#FF6842]/10 text-[#C94728]",
  paused: "border-[#FF6842]/25 bg-[#FF6842]/10 text-[#C94728]",
  writing: "border-[#3879FF]/20 bg-[#3879FF]/10 text-[#3240AA]",
  brief: "border-slate-200 bg-slate-50 text-slate-700",
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
