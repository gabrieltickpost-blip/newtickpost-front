import { TickpostResetPasswordScreen } from "@/components/auth/tickpost-reset-password-screen";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const token = Array.isArray(params?.token) ? params.token[0] : params?.token;

  return <TickpostResetPasswordScreen isExpired={token === "expired"} />;
}
