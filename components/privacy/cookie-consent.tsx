"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const KEY = "oliva-cookie-consent";
const VERSION = "2026-11-02";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;

export function CookieConsent() {
  const pathname = usePathname();
  const [registered, setRegistered] = useState(false);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [message, setMessage] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    function afterRegistration() { setRegistered(true); setOpen(true); }
    function manage() { setDetails(true); setOpen(true); setTimeout(() => heading.current?.focus(), 0); }
    window.addEventListener("oliva:registered", afterRegistration);
    window.addEventListener("oliva:manage-cookies", manage);
    try { setRegistered(sessionStorage.getItem("oliva-cookie-prompt") === "true"); } catch { /* The event still supports browsers without storage. */ }
    return () => {
      window.removeEventListener("oliva:registered", afterRegistration);
      window.removeEventListener("oliva:manage-cookies", manage);
    };
  }, []);
  useEffect(() => {
    if (!registered) return;
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
      const age = Date.now() - Date.parse(saved?.updatedAt);
      if (saved?.version !== VERSION || typeof saved?.optional !== "boolean" || !Number.isFinite(age) || age < 0 || age > MAX_AGE) setOpen(true);
    } catch { setOpen(true); }
  }, [registered]);
  function save(optional: boolean) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ version: VERSION, necessary: true, optional, updatedAt: new Date().toISOString() }));
      setMessage(""); setOpen(false);
      try { sessionStorage.removeItem("oliva-cookie-prompt"); } catch {}
    } catch { setMessage("Não foi possível salvar a escolha neste navegador. Cookies opcionais continuam desativados."); }
  }
  return <>
    {open && (pathname === "/privacidade" || (registered && pathname.startsWith("/cliente"))) && <section className="cookie-banner" role="region" aria-labelledby="cookie-title">
      <h2 id="cookie-title" ref={heading} tabIndex={-1} className="serif">Sua privacidade, suas escolhas</h2>
      <p>Usamos armazenamento necessário ao funcionamento. Cookies opcionais são sua escolha. <a href="/privacidade">Leia a Política de Privacidade</a>.</p>
      {details && <div className="cookie-details"><p><strong>Necessários · sempre ativos</strong><br />Sessão de acesso (até 8 horas), tema, apresentação do tutorial e registro desta escolha (180 dias neste navegador).</p><p><strong>Opcionais · sem ferramentas ativas</strong><br />Não instalamos cookies de publicidade ou análise. A aceitação não ativa rastreadores. Novas finalidades exigirão uma nova escolha.</p><p>Você pode alterar ou revogar sua escolha a qualquer momento em “Gerenciar cookies” na Política de Privacidade.</p></div>}
      {message && <p role="alert">{message}</p>}
      <div className="cookie-actions">
        <button type="button" onClick={() => save(false)}>Recusar opcionais</button>
        <button type="button" onClick={() => save(true)}>Aceitar opcionais</button>
        <button type="button" aria-expanded={details} onClick={() => setDetails(!details)}>{details ? "Ocultar detalhes" : "Gerenciar cookies"}</button>
        {details && <button type="button" onClick={() => save(false)}>Salvar somente necessários</button>}
      </div>
    </section>}
  </>;
}

export function CookiePreferencesButton() {
  return <button type="button" className="cookie-preferences" onClick={() => window.dispatchEvent(new Event("oliva:manage-cookies"))}>Gerenciar cookies</button>;
}
