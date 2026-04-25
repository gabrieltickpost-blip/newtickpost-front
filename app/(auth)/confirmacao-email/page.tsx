import Link from "next/link";
import { MailCheck, RotateCcw } from "lucide-react";

import { AuthFormCard } from "@/components/auth/auth-form-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { authCopy, getLocaleFromSearchParams, localizedPath } from "@/lib/i18n/auth";

export default async function EmailConfirmationPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getLocaleFromSearchParams(searchParams);
  const copy = authCopy[locale];

  return (
    <AuthShell
      title={copy.emailConfirmation.title}
      description={copy.emailConfirmation.description}
      locale={locale}
      pathname="/confirmacao-email"
      backHref={localizedPath("/cadastro", locale)}
      backLabel={copy.emailConfirmation.back}
    >
      <AuthFormCard>
        <div className="flex items-start gap-4 rounded-md bg-muted p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-md bg-background text-foreground">
            <MailCheck className="size-5" />
          </span>
          <div className="space-y-1">
            <p className="font-medium">{copy.emailConfirmation.cardTitle}</p>
            <p className="text-sm leading-6 text-muted-foreground">
              {copy.emailConfirmation.cardDescription}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button variant="outline" asChild>
            <Link href={localizedPath("/confirmacao-email", locale)}>
              <RotateCcw className="size-4" />
              {copy.common.resend}
            </Link>
          </Button>
          <Button asChild>
            <Link href={localizedPath("/login", locale)}>
              {copy.common.goToLogin}
            </Link>
          </Button>
        </div>
      </AuthFormCard>
    </AuthShell>
  );
}
