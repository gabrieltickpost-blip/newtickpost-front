import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ErrorState({
  title = "Algo saiu do esperado",
  description,
  actionLabel,
}: {
  title?: string;
  description: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
      <AlertCircle className="mx-auto size-8 text-primary" />
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {actionLabel ? <Button className="mt-5">{actionLabel}</Button> : null}
    </div>
  );
}
