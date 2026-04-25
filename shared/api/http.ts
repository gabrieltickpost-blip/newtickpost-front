import { ApiError, type ApiErrorPayload } from "@/shared/api/api-error";
import { unwrapEnvelope } from "@/shared/api/response-envelope";
import { getApiBaseUrl } from "@/shared/config/env";

type ApiFetchOptions = RequestInit & {
  skipJsonContentType?: boolean;
};

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    throw new ApiError(
      "NEXT_PUBLIC_API_URL nao configurada. Use os mocks ate conectar o backend.",
      503
    );
  }

  const headers = new Headers(options.headers);

  if (!options.skipJsonContentType && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const payload = json as ApiErrorPayload | null;

    throw new ApiError(
      payload?.message ?? "Erro inesperado",
      response.status,
      payload ?? undefined
    );
  }

  return unwrapEnvelope<T>(json);
}
