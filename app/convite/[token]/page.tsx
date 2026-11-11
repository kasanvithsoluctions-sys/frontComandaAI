"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Link2 } from "lucide-react";
import { invitationService, type Invitation } from "@/lib/api/invitation-service";
export default function InvitationPage() {
  const { token } = useParams<{ token: string }>(); const router = useRouter();
  const [invite, setInvite] = useState<Invitation | null>(null); const [message, setMessage] = useState("Carregando convite..."); const [busy, setBusy] = useState(false);
  useEffect(() => { let active = true; invitationService.inspect(token).then(result => { if (active) { setInvite(result); setMessage(""); } }).catch(() => { if (active) setMessage("Convite inválido, expirado ou indisponível."); }); return () => { active = false; }; }, [token]);
  return <main className="app" style={{ maxWidth: 620 }}><section className="card" style={{ padding: 28 }}><Link2 size={28} color="#315b45"/><h1 className="serif">Convite para a equipe</h1>{invite && <><p>Você foi convidado para trabalhar como garçom em <strong>{invite.restaurantName}</strong>.</p><button className="primary" disabled={busy} onClick={async () => { setBusy(true); try { await invitationService.accept(token); router.replace("/garcom/mesas"); router.refresh(); } catch { setMessage("Não foi possível aceitar. Entre na sua conta e tente novamente; o convite precisa estar válido."); setBusy(false); } }}>{busy ? "Entrando..." : "Aceitar convite"}</button></>}{message && <p role="status">{message}</p>}<p><a href="/login">Entrar na minha conta</a></p></section></main>;
}
