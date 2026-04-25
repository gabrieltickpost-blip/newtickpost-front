"use client";

import { PageErrorState } from "@/components/shared/page-error-state";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageErrorState
      title="Nao foi possivel carregar este modulo"
      description={error.message}
      onRetry={reset}
    />
  );
}
