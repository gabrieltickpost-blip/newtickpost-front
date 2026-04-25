import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { AuthFormCard } from "@/components/auth/auth-form-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { authCopy, getLocaleFromSearchParams, localizedPath } from "@/lib/i18n/auth";

export default async function PasswordUpdatedPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getLocaleFromSearchParams(searchParams);
  const copy = authCopy[locale];

  return (
    <AuthShell
      title={copy.passwordUpdated.title}
      description={copy.passwordUpdated.description}
      locale={locale}
      pathname="/senha-atualizada"
    >
      <AuthFormCard>
        <div className="flex items-start gap-4 rounded-md bg-muted p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-md bg-background text-foreground">
            <CheckCircle2 className="size-5" />
          </span>
          <div className="space-y-1">
            <p className="font-medium">{copy.passwordUpdated.cardTitle}</p>
            <p className="text-sm leading-6 text-muted-foreground">
              {copy.passwordUpdated.cardDescription}
            </p>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link href={localizedPath("/login", locale)}>
            {copy.passwordUpdated.submit}
          </Link>
        </Button>
      </AuthFormCard>
    </AuthShell>
  );
}
