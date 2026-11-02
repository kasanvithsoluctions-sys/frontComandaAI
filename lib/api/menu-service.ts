import { apiRequest } from "@/lib/api/http-client";
import type { Product } from "@/types";

/** Adapter for Spring Boot: GET /api/products and GET /api/products/{id}. */
export const menuService = {
  list: () => apiRequest<Product[]>({ url: "/products", method: "GET" }),
  getById: (id: string) => apiRequest<Product>({ url: `/products/${encodeURIComponent(id)}`, method: "GET" }),
  delete: (id: string) => apiRequest<void>({ url: `/products/${encodeURIComponent(id)}`, method: "DELETE" }),
};
