import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="rounded-lg border border-dashed bg-card/55 p-8 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-md bg-primary/12 text-primary">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <Button className="mt-5">{action}</Button>
    </div>
  );
}
