"use client";

import { BookOpen, Home, LayoutGrid, ReceiptText, UserRound } from "lucide-react";
import type { AppTab } from "@/types/navigation";

const items = [
  { key: "menu", label: "Início", Icon: Home },
  { key: "catalog", label: "Cardápio", Icon: BookOpen },
  { key: "orders", label: "Pedidos", Icon: ReceiptText },
  { key: "table", label: "Mesa", Icon: LayoutGrid },
  { key: "profile", label: "Perfil", Icon: UserRound },
] as const;
const routes: Record<AppTab, string> = { menu: "/cliente/menu", catalog: "/cliente/cardapio", orders: "/cliente/pedidos", table: "/cliente/mesa", profile: "/cliente/perfil" };

export function BottomNavigation({ activeTab, onChange }: { activeTab: AppTab; onChange: (tab: AppTab) => void }) {
  return <nav className="nav" aria-label="Navegação principal" style={{ position: "fixed", inset: "auto 0 0", zIndex: 90 }}>
    {items.map(({ key, label, Icon }) => <a data-tour={key} key={key} href={routes[key]} className={activeTab === key ? "active" : ""} onClick={(event) => { event.preventDefault(); onChange(key); }}>
      <Icon size={20} /><span>{label}</span>
    </a>)}
  </nav>;
}
