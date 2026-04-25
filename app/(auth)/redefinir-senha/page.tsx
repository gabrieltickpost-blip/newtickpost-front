import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { AuthField, AuthFormCard } from "@/components/auth/auth-form-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authCopy, getLocaleFromSearchParams, localizedPath } from "@/lib/i18n/auth";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getLocaleFromSearchParams(searchParams);
  const copy = authCopy[locale];

  return (
    <AuthShell
      title={copy.resetPassword.title}
      description={copy.resetPassword.description}
      locale={locale}
      pathname="/redefinir-senha"
      backHref={localizedPath("/login", locale)}
      backLabel={copy.common.backToLogin}
    >
      <AuthFormCard>
        <form className="space-y-4">
          <AuthField label={copy.resetPassword.newPassword} htmlFor="new-password" hint={copy.common.minPassword}>
            <Input id="new-password" name="password" type="password" placeholder={copy.resetPassword.newPasswordPlaceholder} autoComplete="new-password" />
          </AuthField>

          <AuthField label={copy.resetPassword.confirmPassword} htmlFor="confirm-password">
            <Input id="confirm-password" name="confirmPassword" type="password" placeholder={copy.resetPassword.confirmPasswordPlaceholder} autoComplete="new-password" />
          </AuthField>

          <Button asChild className="w-full">
            <Link href={localizedPath("/senha-atualizada", locale)}>
              <CheckCircle2 className="size-4" />
              {copy.resetPassword.submit}
            </Link>
          </Button>
        </form>
      </AuthFormCard>
    </AuthShell>
  );
}
