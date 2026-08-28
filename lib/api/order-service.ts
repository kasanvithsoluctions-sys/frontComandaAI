import { apiFetch } from "@/lib/api/http-client";
import type { CartItem, Order } from "@/types";

export type CreateOrderPayload = { tableId: string; items: Pick<CartItem, "id" | "quantity">[] };
/** Adapter for Spring Boot: POST /api/orders, GET /api/orders/{id}, DELETE /api/orders/{id}. */
export const orderService = {
  create: (payload: CreateOrderPayload) => apiFetch<Order>("/orders", { method: "POST", body: JSON.stringify(payload) }),
  getById: (id: string) => apiFetch<Order>(`/orders/${id}`),
  cancel: (id: string) => apiFetch<void>(`/orders/${id}`, { method: "DELETE" }),
};
