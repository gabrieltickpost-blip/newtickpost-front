import Link from "next/link";
import { LogIn } from "lucide-react";

import { AuthField, AuthFormCard, InlineAuthLink } from "@/components/auth/auth-form-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { authCopy, getLocaleFromSearchParams, localizedPath } from "@/lib/i18n/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getLocaleFromSearchParams(searchParams);
  const copy = authCopy[locale];

  return (
    <AuthShell
      title={copy.login.title}
      description={copy.login.description}
      locale={locale}
      pathname="/login"
    >
      <AuthFormCard
        footer={
          <>
            {copy.login.noAccess}{" "}
            <InlineAuthLink href={localizedPath("/cadastro", locale)}>
              {copy.login.createAccount}
            </InlineAuthLink>
          </>
        }
      >
        <form className="space-y-4">
          <AuthField label={copy.common.corporateEmail} htmlFor="email">
            <Input id="email" name="email" type="email" placeholder={copy.common.emailPlaceholder} autoComplete="email" />
          </AuthField>

          <AuthField label={copy.common.password} htmlFor="password">
            <Input id="password" name="password" type="password" placeholder={copy.common.passwordPlaceholder} autoComplete="current-password" />
          </AuthField>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <Checkbox id="remember" />
              {copy.login.remember}
            </label>
            <Link href={localizedPath("/recuperar-senha", locale)} className="font-medium underline-offset-4 hover:underline">
              {copy.login.forgotPassword}
            </Link>
          </div>

          <Button asChild className="w-full">
            <Link href={localizedPath("/campanhas", locale)}>
              <LogIn className="size-4" />
              {copy.common.login}
            </Link>
          </Button>
        </form>
      </AuthFormCard>
    </AuthShell>
  );
}
