import { apiFetch } from "@/lib/api/http-client";
import type { Product } from "@/types";

/** Adapter for Spring Boot: GET /api/products and GET /api/products/{id}. */
export const menuService = {
  list: () => apiFetch<Product[]>("/products"),
  getById: (id: string) => apiFetch<Product>(`/products/${id}`),
};
