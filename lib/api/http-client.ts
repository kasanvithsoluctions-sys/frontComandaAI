import axios, { AxiosError, type AxiosRequestConfig } from "axios";

type ApiErrorResponse = { message?: string };

export class ApiError extends Error {
  constructor(message: string, public readonly status: number, public readonly code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api",
  timeout: 15_000,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message = error.response?.data?.message ?? (error.response ? "Não foi possível concluir esta operação." : "Não foi possível conectar ao servidor.");
    return Promise.reject(new ApiError(message, error.response?.status ?? 0, error.code));
  },
);

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.request<T>(config);
  if (response.status === 204) return undefined as T;
  return response.data;
}
