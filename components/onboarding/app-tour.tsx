"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { BookOpen, Home, LayoutGrid, ReceiptText, UserRound, ChevronRight, Sparkles, X } from "lucide-react";

const defaultSteps = [
  { title: "Volte ao início", text: "Tenha uma visão rápida da mesa, do pedido atual e dos destaques do restaurante.", target: "menu" as const },
  { title: "Explore o cardápio", text: "Navegue pelas categorias, descubra os pratos e adicione seus favoritos ao pedido.", target: "catalog" as const },
  { title: "Acompanhe seus pedidos", text: "Veja o andamento em tempo real: recebido, em preparo, pronto e entregue.", target: "orders" as const },
  { title: "Sua mesa", text: "Veja quem está na mesa, compartilhe o acesso e solicite atendimento quando precisar.", target: "table" as const },
  { title: "Seu perfil", text: "Aqui ficam os seus dados, preferências, tema e o histórico das suas experiências.", target: "profile" as const },
];
const KEY = "oliva-tour-completed-v3";

export function AppTour({ forceStart, onClose, steps = defaultSteps, autoStart = true }: { forceStart: boolean; onClose: () => void; steps?: { title: string; text: string; target: string }[]; autoStart?: boolean }) {
  const [open, setOpen] = useState(false); const [step, setStep] = useState(0);
  useEffect(() => { if (autoStart && !window.localStorage.getItem(KEY)) setOpen(true); }, []);
  useEffect(() => { if (forceStart) { setStep(0); setOpen(true); } }, [forceStart]);
  const [anchor, setAnchor] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  useEffect(() => {
    if (!open) return;
    const measure = () => {
      const element = document.querySelector(`[data-tour="${steps[step].target}"]`);
      if (!element) return;
      const rect = element.getBoundingClientRect();
      setAnchor({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); window.removeEventListener("scroll", measure, true); };
  }, [open, step]);
  if (!open) return null;
  const current = steps[step];
  const Icon = { menu: Home, catalog: BookOpen, orders: ReceiptText, table: LayoutGrid, profile: UserRound }[current.target as "menu"] ?? Sparkles;
  const cardWidth = typeof window === "undefined" ? 0 : Math.min(420, window.innerWidth - 32);
  const cardLeft = typeof window === "undefined" ? 0 : (window.innerWidth - cardWidth) / 2;
  const tipX = anchor ? Math.max(16, Math.min(cardWidth - 16, anchor.left + anchor.width / 2 - cardLeft)) : 16;
  const cardStyle: CSSProperties & { "--tip-x": string } = {
    bottom: anchor ? window.innerHeight - anchor.top + 20 : 104,
    "--tip-x": `${tipX}px`,
  };
  const finish = () => { window.localStorage.setItem(KEY, "true"); setOpen(false); onClose(); };
  return createPortal(<div className="tour-backdrop" role="dialog" aria-modal="true" aria-label="Conheça o aplicativo">
    <div className="tour-ring" style={anchor ? { left: anchor.left - 4, top: anchor.top - 4, width: anchor.width + 8, height: anchor.height + 8, bottom: "auto", transform: "none" } : { display: "none" }} aria-hidden="true"><Icon size={20}/></div>
    <section className="tour-card" style={cardStyle}><button className="tour-close" onClick={finish} aria-label="Pular tutorial"><X size={18}/></button><Sparkles size={20} color="#d95d3d"/>
      <p className="tour-count">PASSO {step + 1} DE {steps.length}</p><h2 className="serif">{current.title}</h2><p>{current.text}</p>
      <div className="tour-footer"><div className="tour-dots">{steps.map((_, index) => <i key={index} className={index === step ? "active" : ""}/>)}</div><button className="primary" onClick={() => step === steps.length - 1 ? finish() : setStep(step + 1)}>{step === steps.length - 1 ? "Começar" : "Próximo"} <ChevronRight size={16}/></button></div>
    </section>
  </div>, document.body);
}
