"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PageErrorState({
  title,
  description,
  onRetry,
}: {
  title: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-destructive/10 p-2 text-destructive">
              <AlertTriangle className="size-5" />
            </div>
            <div className="space-y-1">
              <CardTitle>{title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {description ?? "Tente novamente em instantes."}
              </p>
            </div>
          </div>
        </CardHeader>
        {onRetry ? (
          <CardContent>
            <Button onClick={onRetry} className="gap-2">
              <RotateCcw className="size-4" />
              Tentar novamente
            </Button>
          </CardContent>
        ) : null}
      </Card>
    </div>
  );
}
