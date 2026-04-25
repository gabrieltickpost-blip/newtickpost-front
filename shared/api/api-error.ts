export type ApiErrorPayload = {
  message?: string;
  code?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
};

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: ApiErrorPayload;

  constructor(message: string, status: number, details?: ApiErrorPayload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = details?.code;
    this.details = details;
  }
}

export function normalizeApiError(error: unknown) {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiError(error.message, 500);
  }

  return new ApiError("Erro inesperado", 500);
}
