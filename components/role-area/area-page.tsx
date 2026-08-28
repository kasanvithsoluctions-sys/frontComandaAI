import { LayoutDashboard, ListChecks, Package, Table2, UsersRound } from "lucide-react";

const iconByArea = { "Mesas": Table2, "Pedidos": ListChecks, "Pedidos em preparo": Package, "Dashboard": LayoutDashboard, "Produtos": Package, "Funcionários": UsersRound, "Relatórios": LayoutDashboard };

export function AreaPage({ eyebrow, title, description }: { eyebrow: string; title: keyof typeof iconByArea; description: string }) {
  const Icon = iconByArea[title];
  return <main className="app page-enter"><p style={{ fontSize: 12, fontWeight: 700, color: "#78847c", letterSpacing: ".08em" }}>{eyebrow}</p><section className="card" style={{ padding: 28, maxWidth: 760 }}><Icon size={30} color="#315b45"/><h1 className="serif" style={{ fontSize: 32, margin: "16px 0 8px" }}>{title}</h1><p style={{ color: "#68736c", margin: 0, lineHeight: 1.5 }}>{description}</p></section></main>;
}
