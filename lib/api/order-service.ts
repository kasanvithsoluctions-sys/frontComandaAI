import { apiRequest } from "@/lib/api/http-client";
import type { CartItem, Order } from "@/types";

export type CreateOrderPayload = { tableId: string; items: Pick<CartItem, "id" | "quantity">[] };
/** Adapter for Spring Boot: POST /api/orders, GET /api/orders/{id}, DELETE /api/orders/{id}. */
export const orderService = {
  create: (payload: CreateOrderPayload) => apiRequest<Order>({ url: "/orders", method: "POST", data: payload }),
  getById: (id: string) => apiRequest<Order>({ url: `/orders/${encodeURIComponent(id)}`, method: "GET" }),
  cancel: (id: string) => apiRequest<void>({ url: `/orders/${encodeURIComponent(id)}`, method: "DELETE" }),
};
