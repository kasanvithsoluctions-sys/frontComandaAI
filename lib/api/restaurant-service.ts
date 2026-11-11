import { apiRequest } from "@/lib/api/http-client";

export const RESTAURANT_STORAGE_KEY = "oliva-current-restaurant";
export const OWNER_NOTICE_STORAGE_KEY = "oliva-owner-notice";

export interface RestaurantSetup {
  addressCompleted: boolean;
  openingHoursCompleted: boolean;
  hasProducts: boolean;
  hasTables: boolean;
  menuPublished: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  address: RestaurantAddress;
  openingHours: OpeningHours;
  status: "DRAFT" | "ACTIVE";
  setup: RestaurantSetup;
}

export interface RestaurantAddress {
  country: string;
  state: string;
  city: string;
  postalCode: string;
  neighborhood: string;
  street: string;
  number: number;
  complement?: string;
}

export interface OpeningHours {
  days: string[];
  opensAt: string;
  closesAt: string;
}

export interface CreateRestaurantPayload { name: string; slug: string; address: RestaurantAddress; openingHours: OpeningHours; }
export interface UpdateRestaurantPayload { name: string; address: RestaurantAddress; openingHours: OpeningHours; }

export const restaurantService = {
  getCurrent: () => apiRequest<Restaurant>({ url: "/restaurants/current", method: "GET" }),
  create: (payload: CreateRestaurantPayload) => apiRequest<Restaurant>({ url: "/restaurants", method: "POST", data: payload }),
  update: (restaurantId: string, payload: UpdateRestaurantPayload) => apiRequest<Restaurant>({ url: `/restaurants/${encodeURIComponent(restaurantId)}`, method: "PATCH", data: payload }),
};
