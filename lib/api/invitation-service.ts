import { apiRequest } from "@/lib/api/http-client";
export interface Invitation { token: string; expiresAt: string; restaurantName: string; }
export const invitationService = {
  create: (restaurantId: string) => apiRequest<Invitation>({ url: `/restaurants/${encodeURIComponent(restaurantId)}/invitations`, method: "POST", data: { role: "GARCOM" } }),
  inspect: (token: string) => apiRequest<Invitation>({ url: `/invitations/${encodeURIComponent(token)}`, method: "GET" }),
  accept: (token: string) => apiRequest<void>({ url: `/invitations/${encodeURIComponent(token)}/accept`, method: "POST" }),
};
