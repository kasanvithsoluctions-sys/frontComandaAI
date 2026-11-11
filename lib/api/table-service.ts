import { apiRequest } from "@/lib/api/http-client";

export interface RestaurantTable {
  id: string;
  availableSeats?: number;
  identifier: string;
  label: string;
  status: "AVAILABLE" | "IN_SERVICE";
  publicToken: string;
  publicUrl: string;
  qrCodeImageUrl: string;
}

export interface CreateTablePayload { availableSeats: number; identifier: string; label: string; }
export interface UpdateTablePayload { availableSeats: number; identifier: string; label: string; status: RestaurantTable["status"]; }

/** Spring Boot creates the table, its public token and QR Code atomically. */
export const tableService = {
  list: (restaurantId: string) => apiRequest<RestaurantTable[]>({ url: `/restaurants/${encodeURIComponent(restaurantId)}/tables`, method: "GET" }),
  create: (restaurantId: string, payload: CreateTablePayload) => apiRequest<RestaurantTable>({ url: `/restaurants/${encodeURIComponent(restaurantId)}/tables`, method: "POST", data: payload }),
  update: (restaurantId: string, tableId: string, payload: UpdateTablePayload) => apiRequest<RestaurantTable>({ url: `/restaurants/${encodeURIComponent(restaurantId)}/tables/${encodeURIComponent(tableId)}`, method: "PATCH", data: payload }),
  delete: (restaurantId: string, tableId: string) => apiRequest<void>({ url: `/restaurants/${encodeURIComponent(restaurantId)}/tables/${encodeURIComponent(tableId)}`, method: "DELETE" }),
  regenerateQrCode: (restaurantId: string, tableId: string) => apiRequest<RestaurantTable>({ url: `/restaurants/${encodeURIComponent(restaurantId)}/tables/${encodeURIComponent(tableId)}/qr-code/regenerate`, method: "POST" }),
};
