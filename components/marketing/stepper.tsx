import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { GrowthStep } from "@/modules/marketing/types";

export function Stepper({ steps }: { steps: GrowthStep[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {steps.map((step, index) => (
        <div
          key={step.title}
          className={cn(
            "rounded-lg border bg-card/62 p-4",
            step.status === "current" && "border-primary/50 bg-primary/10"
          )}
        >
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-7 place-items-center rounded-md border text-xs font-semibold",
                step.status === "done" && "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
                step.status === "current" && "border-primary/40 bg-primary text-primary-foreground",
                step.status === "next" && "border-border text-muted-foreground"
              )}
            >
              {step.status === "done" ? <Check className="size-4" /> : index + 1}
            </span>
            <h3 className="font-medium">{step.title}</h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
