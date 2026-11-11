"use client";
import { useState } from "react";
import { Copy, Link2, Plus } from "lucide-react";
import { invitationService } from "@/lib/api/invitation-service";
import type { Restaurant } from "@/lib/api/restaurant-service";

export function OwnerInvitations({ restaurant }: { restaurant: Restaurant | null }) {
  const [url, setUrl] = useState(""); const [expires, setExpires] = useState(""); const [busy, setBusy] = useState(false); const [message, setMessage] = useState("");
  async function create() { if (!restaurant || busy) return; setBusy(true); setMessage(""); try { const invite = await invitationService.create(restaurant.id); if (!invite.token) throw new Error(); setUrl(`${window.location.origin}/convite/${encodeURIComponent(invite.token)}`); setExpires(invite.expiresAt); } catch { setMessage("Não foi possível criar o convite. Verifique a conexão com o servidor e tente novamente."); } finally { setBusy(false); } }
  return <section className="card" style={{ padding: 24, maxWidth: 620 }}><Link2 size={28} color="#315b45"/><h2 className="serif" style={{ marginBottom: 8 }}>Convide sua equipe</h2><p style={{ color: "#78847c", lineHeight: 1.5 }}>Crie um link para um garçom entrar na equipe de {restaurant?.name || "seu restaurante"}.</p><label className="owner-label">Função<select disabled value="GARCOM"><option value="GARCOM">Garçom</option></select></label><button type="button" className="primary" disabled={!restaurant || busy} onClick={create} style={{ marginTop: 18 }}><Plus size={16}/>{busy ? "Criando..." : "Criar link de convite"}</button>{url && <div style={{ marginTop: 22 }}><label className="owner-label">Link de convite<input readOnly value={url} onFocus={event => event.target.select()}/></label>{expires && <p style={{ fontSize: 13, color: "#78847c" }}>Válido até {new Date(expires).toLocaleString("pt-BR")}</p>}<button type="button" className="secondary" onClick={async () => { try { await navigator.clipboard.writeText(url); setMessage("Link copiado!"); } catch { setMessage("Selecione o link acima para copiar."); } }}><Copy size={16}/>Copiar link</button></div>}{message && <p role="status">{message}</p>}</section>;
}
