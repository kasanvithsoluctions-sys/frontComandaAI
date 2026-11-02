"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Eye, EyeOff, Leaf, LockKeyhole, Mail, User } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [pending, setPending] = useState(false);
  const [register, setRegister] = useState(false);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  function switchMode(value: boolean) { if (pending) return; setAccepted(false); setRegister(value); setMessage(""); setPassword(""); setVisible(false); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (register && !accepted) { setMessage("Aceite os Termos de Uso para continuar."); return; }
    setPending(true); setMessage("");
    try {
      const response = await fetch("/api/auth/session", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "CLIENTE", mode: register ? "register" : "login", termsAccepted: accepted, termsVersion: "2026-11-02" }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message ?? "Não foi possível entrar. Tente novamente.");
      }
      if (register) {
        try { sessionStorage.setItem("oliva-cookie-prompt", "true"); } catch {}
        window.dispatchEvent(new Event("oliva:registered"));
      }
      setPassword(""); router.replace("/cliente/menu"); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Não foi possível conectar. Tente novamente."); }
    finally { setPending(false); }
  }
  return <main className="auth-page">
    <aside className="auth-story"><a href="/login" className="auth-brand"><Leaf size={27} /> oliva<span>COZINHA AUTORAL</span></a><div className="auth-story-copy"><span className="auth-eyebrow">BOAS EXPERIÊNCIAS COMEÇAM AQUI</span><h1 className="serif">Um lugar à mesa.<br />Um momento só seu.</h1><p>Descubra sabores, escolha seus favoritos e aproveite cada detalhe da sua experiência.</p><div className="auth-story-note"><Leaf size={20} /><span>Feito com cuidado.<br /><strong>Do primeiro acesso à última garfada.</strong></span></div></div><small>OLIVA · SABORES QUE APROXIMAM</small></aside>
    <section className="auth-main"><div className="auth-panel"><div className="auth-mobile-brand"><Leaf size={23} /> oliva</div><div className="auth-tabs" aria-label="Acesso à conta"><button type="button" aria-pressed={!register} onClick={() => switchMode(false)}>Entrar</button><button type="button" aria-pressed={register} onClick={() => switchMode(true)}>Criar conta</button></div><span className="auth-eyebrow">SEU MOMENTO OLIVA</span><h2 className="serif">{register ? "Prazer em receber você." : "Que bom ter você aqui."}</h2><p className="auth-description">{register ? "Crie sua conta para começar uma nova experiência." : "Entre na sua conta e sinta-se em casa."}</p>
      <form key={String(register)} onSubmit={submit} className="auth-form">
        {register && <label htmlFor="auth-name">Nome completo<div className="auth-input"><User size={19} /><input id="auth-name" name="name" autoComplete="name" placeholder="Como podemos chamar você?" required minLength={2} maxLength={100} pattern=".*\S.*" /></div></label>}
        <label htmlFor="auth-email">E-mail<div className="auth-input"><Mail size={19} /><input id="auth-email" name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" required maxLength={254} spellCheck={false} autoCapitalize="none" /></div></label>
        <label htmlFor="auth-password">Senha<div className="auth-input"><LockKeyhole size={19} /><input id="auth-password" name="password" type={visible ? "text" : "password"} autoComplete={register ? "new-password" : "current-password"} placeholder={register ? "Crie uma senha de pelo menos 12 caracteres" : "Digite sua senha"} required minLength={register ? 12 : 1} maxLength={128} value={password} onChange={event => setPassword(event.target.value)} aria-describedby={register ? "password-help" : undefined} /><button type="button" aria-label={visible ? "Ocultar senha" : "Mostrar senha"} aria-pressed={visible} onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></label>
        {register && <small id="password-help" className="auth-password-help"><Check size={14} /> Use de 12 a 128 caracteres. Você pode usar espaços e símbolos.</small>}
        {register && <label className="auth-terms"><input type="checkbox" name="termsAccepted" required checked={accepted} onChange={event => setAccepted(event.target.checked)} /><span>Li e aceito os <a href="/termos" target="_blank" rel="noopener noreferrer">Termos de Uso</a> e estou ciente da <a href="/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.</span></label>}
        {process.env.NODE_ENV !== "production" && <small className="auth-password-help">Ambiente de demonstração: o acesso abre um painel de exemplo. Nenhuma conta é criada e a senha não é enviada.</small>}
        {message && <div className="auth-message" role="status">{message}</div>}
        <button className="auth-submit" type="submit" disabled={pending || (register && !accepted)} aria-busy={pending}>{pending ? "Aguarde…" : register ? "Criar minha conta" : "Entrar na minha conta"}<ArrowRight size={19} /></button>
      </form><p className="auth-switch">{register ? "Já tem uma conta?" : "É sua primeira visita?"} <button type="button" onClick={() => switchMode(!register)}>{register ? "Entrar" : "Cadastre-se"}</button></p><div className="auth-footer"><LockKeyhole size={14} /> Nunca compartilhe sua senha.</div>
    </div></section>
  </main>;
}
