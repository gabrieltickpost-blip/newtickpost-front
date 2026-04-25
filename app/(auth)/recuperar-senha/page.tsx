import Link from "next/link";
import { Mail } from "lucide-react";

import { AuthField, AuthFormCard } from "@/components/auth/auth-form-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authCopy, getLocaleFromSearchParams, localizedPath } from "@/lib/i18n/auth";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getLocaleFromSearchParams(searchParams);
  const copy = authCopy[locale];

  return (
    <AuthShell
      title={copy.forgotPassword.title}
      description={copy.forgotPassword.description}
      locale={locale}
      pathname="/recuperar-senha"
      backHref={localizedPath("/login", locale)}
      backLabel={copy.common.backToLogin}
    >
      <AuthFormCard>
        <form className="space-y-4">
          <AuthField label={copy.forgotPassword.emailLabel} htmlFor="recovery-email">
            <Input id="recovery-email" name="email" type="email" placeholder={copy.common.emailPlaceholder} autoComplete="email" />
          </AuthField>

          <Button asChild className="w-full">
            <Link href={localizedPath("/confirmacao-senha", locale)}>
              <Mail className="size-4" />
              {copy.forgotPassword.submit}
            </Link>
          </Button>
        </form>
      </AuthFormCard>
    </AuthShell>
  );
}
