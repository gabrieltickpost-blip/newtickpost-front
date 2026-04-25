import { ApiError } from "@/lib/api/types";

function buildUrl(pathname: string, baseUrl?: string) {
  if (/^https?:\/\//.test(pathname)) {
    return pathname;
  }

  if (!baseUrl) {
    return pathname;
  }

  return new URL(pathname.replace(/^\//, ""), `${baseUrl.replace(/\/$/, "")}/`)
    .toString();
}

export async function apiRequest<T>(
  pathname: string,
  init: RequestInit & { baseUrl?: string } = {}
) {
  const { baseUrl, headers, ...requestInit } = init;

  let response: Response;

  try {
    response = await fetch(buildUrl(pathname, baseUrl), {
      ...requestInit,
      cache: requestInit.cache ?? "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
    });
  } catch (error) {
    throw new ApiError("Nao foi possivel conectar ao backend.", {
      code: "network_error",
      cause: error,
    });
  }

  const contentType = response.headers.get("content-type") ?? "";
  let payload: unknown = null;

  try {
    payload = contentType.includes("application/json")
      ? await response.json()
      : await response.text();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const fallbackMessage = `Requisicao falhou com status ${response.status}.`;
    const message =
      typeof payload === "object" &&
      payload &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : fallbackMessage;

    throw new ApiError(message, {
      status: response.status,
      code: "http_error",
      details: payload,
    });
  }

  return payload as T;
}
