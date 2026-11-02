import type { Role } from "@/types/auth";

export const roleHome: Record<Role, string> = {
  CLIENTE: "/cliente/menu",
  GARCOM: "/garcom/mesas",
  COZINHA: "/cozinha/pedidos",
  DONO: "/onboarding/restaurante",
};

export const areaRole: Record<string, Role> = {
  cliente: "CLIENTE", garcom: "GARCOM", cozinha: "COZINHA", dono: "DONO",
};
