export type ApiResponseEnvelope<T> = {
  data?: T;
  message?: string;
  meta?: Record<string, unknown>;
};

export function unwrapEnvelope<T>(json: ApiResponseEnvelope<T> | T): T {
  if (json && typeof json === "object" && "data" in json) {
    return (json as ApiResponseEnvelope<T>).data as T;
  }

  return json as T;
}
