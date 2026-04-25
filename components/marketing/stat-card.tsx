import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  helper,
  icon: Icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="surface-glow rounded-xl border bg-card py-0">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold tracking-[-0.03em]">{value}</p>
            <p className="text-xs font-medium text-[#3240AA]">{helper}</p>
          </div>
          <span className="grid size-9 place-items-center rounded-md bg-primary/12 text-primary">
            <Icon className="size-4" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
