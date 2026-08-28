"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { roleHome } from "@/lib/auth/role-routes";
import type { Role } from "@/types/auth";

const roles: Role[] = ["CLIENTE", "GARCOM", "COZINHA", "DONO"];
export function LoginForm() {
  const router = useRouter(); const [loading, setLoading] = useState<Role | null>(null);
  async function enter(role: Role) { setLoading(role); const response = await fetch("/api/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role }) }); if (response.ok) router.replace(roleHome[role]); else setLoading(null); }
  return <main className="app page-enter" style={{ maxWidth: 540 }}><section className="card" style={{ padding: 28 }}><p style={{ fontSize: 12, fontWeight: 700, color: "#78847c" }}>OLIVA</p><h1 className="serif" style={{ fontSize: 32, margin: "8px 0" }}>Acesse sua área</h1><p style={{ color: "#68736c" }}>Demonstração local de login por role. Em produção, o Spring Boot deve autenticar e emitir a sessão.</p><div style={{ display: "grid", gap: 10, marginTop: 24 }}>{roles.map(role => <button className="secondary" key={role} disabled={Boolean(loading)} onClick={() => enter(role)}>{loading === role ? "Entrando..." : `Entrar como ${role}`}</button>)}</div></section></main>;
}
