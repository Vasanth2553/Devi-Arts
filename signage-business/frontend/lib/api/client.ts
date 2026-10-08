// frontend/lib/api/client.ts

/**
 * Central API client utilities.
 * Reads the base URL from NEXT_PUBLIC_API_URL (defined in .env) and provides a
 * lightweight wrapper around fetch with JSON handling and error propagation.
 */

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/*$/, "") || "";

export interface ApiError extends Error {
  status?: number;
  data?: any;
}

/**
 * Custom error class for API failures.
 */
export class ApiClientError extends Error {
  statusCode?: number;
  data?: any;
  constructor(message: string, statusCode?: number, data?: any) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.data = data;
  }
}



/**
 * Generic request helper.
 * @param endpoint – API path, e.g. "/api/enquiries/"
 * @param options – fetch options (method, headers, body, etc.)
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    credentials: "include",
    ...options,
  });

  const contentType = response.headers.get("content-type");
  let data: any = null;
  if (contentType?.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new ApiClientError(
      `API request failed: ${response.status} ${response.statusText}`,
      response.status,
      data
    );
  }
  return data as T;
}
export const apiClient = {
  get: <T>(path: string, signal?: AbortSignal) =>
    apiRequest<T>(path, { method: "GET", signal }),

  post: <T>(path: string, body: unknown, signal?: AbortSignal) =>
    apiRequest<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
      signal,
      headers: { "Content-Type": "application/json" },
    }),

  patch: <T>(path: string, body: unknown, signal?: AbortSignal) =>
    apiRequest<T>(path, {
      method: "PATCH",
      body: JSON.stringify(body),
      signal,
      headers: { "Content-Type": "application/json" },
    }),

  postForm: <T>(path: string, formData: FormData, signal?: AbortSignal) =>
    apiRequest<T>(path, { method: "POST", body: formData, signal }),
};

