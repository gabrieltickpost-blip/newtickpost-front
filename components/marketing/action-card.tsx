import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ActionCardItem } from "@/modules/marketing/types";

export function ActionCard({ item }: { item: ActionCardItem }) {
  const Icon = item.icon;

  return (
    <Card className="rounded-xl border bg-card py-0 shadow-sm transition-colors hover:bg-secondary/50">
      <CardContent className="space-y-4 p-5">
        <span className="grid size-10 place-items-center rounded-md bg-primary/12 text-primary">
          <Icon className="size-5" />
        </span>
        <div className="space-y-1">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
        </div>
        <Button variant="outline" size="sm" className="w-full justify-between">
          {item.action}
          <ArrowUpRight className="size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
