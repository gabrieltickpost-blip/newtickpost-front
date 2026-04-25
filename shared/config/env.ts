export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION ?? "v1",
  useMockApi: process.env.NEXT_PUBLIC_USE_MOCK_API !== "false",
  enableRouteGuards: process.env.NEXT_PUBLIC_ENABLE_ROUTE_GUARDS === "true",
} as const;

export function getApiBaseUrl() {
  if (!env.apiUrl) {
    return "";
  }

  return `${env.apiUrl.replace(/\/$/, "")}/api/${env.apiVersion}`;
}
