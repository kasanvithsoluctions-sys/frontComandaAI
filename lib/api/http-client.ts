export class ApiError extends Error { constructor(message: string, public readonly status: number) { super(message); } }

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, { ...init, headers: { "Content-Type": "application/json", ...init.headers }, cache: "no-store" });
  if (!response.ok) throw new ApiError("Não foi possível concluir esta operação.", response.status);
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
