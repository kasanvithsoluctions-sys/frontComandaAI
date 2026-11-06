"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Sparkles, X } from "lucide-react";

const steps = [
  { title: "Seu perfil", text: "Aqui ficam os seus dados, preferências, tema e o histórico das suas experiências.", target: "profile" },
  { title: "Sua mesa", text: "Veja quem está na mesa, compartilhe o acesso e solicite atendimento quando precisar.", target: "table" },
  { title: "Acompanhe seus pedidos", text: "Veja o andamento em tempo real: recebido, em preparo, pronto e entregue.", target: "orders" },
  { title: "Explore o cardápio", text: "Navegue pelas categorias, descubra os pratos e adicione seus favoritos ao pedido.", target: "catalog" },
  { title: "Volte ao início", text: "Tenha uma visão rápida da mesa, do pedido atual e dos destaques do restaurante.", target: "menu" },
];
const KEY = "oliva-tour-completed-v3";

export function AppTour({ forceStart, onClose }: { forceStart: boolean; onClose: () => void }) {
  const [open, setOpen] = useState(false); const [step, setStep] = useState(0);
  useEffect(() => { if (!window.localStorage.getItem(KEY)) setOpen(true); }, []);
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
  const finish = () => { window.localStorage.setItem(KEY, "true"); setOpen(false); onClose(); };
  return <div className="tour-backdrop" role="dialog" aria-modal="true" aria-label="Conheça o aplicativo">
    <div className="tour-ring" style={anchor ? { left: anchor.left - 4, top: anchor.top - 4, width: anchor.width + 8, height: anchor.height + 8, bottom: "auto", transform: "none" } : { display: "none" }} aria-hidden="true" />
    <section className="tour-card" style={anchor ? { bottom: window.innerHeight - anchor.top + 20, "--tip-x": `${Math.max(16, Math.min(Math.min(420, window.innerWidth - 32) - 16, anchor.left + anchor.width / 2 - (window.innerWidth - Math.min(420, window.innerWidth - 32)) / 2)))}px` } as React.CSSProperties : undefined}><button className="tour-close" onClick={finish} aria-label="Pular tutorial"><X size={18}/></button><Sparkles size={20} color="#d95d3d"/>
      <p className="tour-count">PASSO {step + 1} DE {steps.length}</p><h2 className="serif">{current.title}</h2><p>{current.text}</p>
      <div className="tour-footer"><div className="tour-dots">{steps.map((_, index) => <i key={index} className={index === step ? "active" : ""}/>)}</div><button className="primary" onClick={() => step === steps.length - 1 ? finish() : setStep(step + 1)}>{step === steps.length - 1 ? "Começar" : "Próximo"} <ChevronRight size={16}/></button></div>
    </section>
  </div>;
}
