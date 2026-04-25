export function LoadingScreen({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="grid min-h-svh place-items-center bg-background text-foreground">
      <div className="space-y-3 text-center">
        <div className="mx-auto size-9 animate-spin rounded-full border-2 border-muted border-t-primary" />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
