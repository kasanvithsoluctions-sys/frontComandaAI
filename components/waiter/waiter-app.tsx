import { ClipboardList, LayoutGrid, CircleUserRound } from "lucide-react";

import { AccountProfile } from "@/components/profile/account-profile";

const links = [
  { tab: "tables", label: "Mesas", href: "/garcom/mesas", Icon: LayoutGrid },
  { tab: "orders", label: "Pedidos", href: "/garcom/pedidos", Icon: ClipboardList },
  { tab: "profile", label: "Perfil", href: "/garcom/perfil", Icon: CircleUserRound },
] as const;

export function WaiterApp({ tab = "tables" }: { tab?: "tables" | "orders" | "profile" }) {
  const title = tab === "profile" ? "Seu perfil" : tab === "tables" ? "Mesas" : "Pedidos";
  return <main className="app page-enter">
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 26 }}>
      <div><p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#78847c", letterSpacing: ".08em" }}>PAINEL DO GARÇOM</p><h1 className="serif" style={{ margin: "5px 0 0", fontSize: 29 }}>{title}</h1></div>
      <span style={{ background: "#e8efe9", color: "#315b45", padding: "7px 10px", borderRadius: 99, fontSize: 12, fontWeight: 700 }}>GARÇOM</span>
    </header>
    {tab === "profile" ? <AccountProfile/> : <section className="card" aria-label={title} style={{ minHeight: 240, padding: 24, display: "grid", placeItems: "center", textAlign: "center" }}>
      <p style={{ color: "#78847c", fontSize: 14, margin: 0 }}>Nenhum conteúdo disponível.</p>
    </section>}
    <nav className="nav owner-nav" aria-label="Navegação do garçom">{links.map(({ tab: itemTab, label, href, Icon }) => <a data-tour={itemTab} key={itemTab} href={href} className={tab === itemTab ? "active" : ""} aria-current={tab === itemTab ? "page" : undefined}><Icon size={20}/><span>{label}</span></a>)}</nav>
  </main>;
}
