"use client";

import { createContext, useContext, useEffect, useState } from "react";

const DEFAULT = "#d95d3d";
const valid = (value: unknown): value is string => typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);
const AccentContext = createContext<{ color: string | null; change: (color: string | null) => void; ready: boolean }>({ color: null, change: () => {}, ready: false });

function apply(color: string | null) {
  const root = document.documentElement;
  if (!color) {
    delete root.dataset.accent;
    root.style.removeProperty("--accent");
    root.style.removeProperty("--accent-on");
    return;
  }
  const channels = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16) / 255).map((c) => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
  const luminance = channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  root.dataset.accent = "custom";
  root.style.setProperty("--accent", color);
  root.style.setProperty("--accent-on", luminance > .179 ? "#000000" : "#ffffff");
}

export function AccentPreference({ userId, children }: { userId: string; children: React.ReactNode }) {
  const [color, setColor] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const key = `oliva-accent:${userId}`;
  useEffect(() => {
    const read = () => {
      let saved: string | null = null;
      try { const value = localStorage.getItem(key); if (valid(value)) saved = value; } catch {}
      setColor(saved); apply(saved); setReady(true);
    };
    read();
    const sync = (event: StorageEvent) => { if (event.key === key || event.key === null) read(); };
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("storage", sync); apply(null); };
  }, [key]);
  function change(value: string | null) {
    if (value !== null && !valid(value)) return;
    setColor(value); apply(value);
    try { if (value) localStorage.setItem(key, value); else localStorage.removeItem(key); } catch {}
  }
  return <AccentContext.Provider value={{ color, change, ready }}>{children}</AccentContext.Provider>;
}

const colors = [["Terracota", DEFAULT], ["Roxo", "#6366f1"], ["Azul", "#2563eb"], ["Verde", "#16a34a"], ["Rosa", "#db2777"], ["Laranja", "#ea580c"], ["Ciano", "#0891b2"]];
export function AppearanceSettings() {
  const { color, change, ready } = useContext(AccentContext);
  return <section className="card appearance" aria-labelledby="appearance-title"><h2 id="appearance-title">Aparência</h2><p>Escolha a cor de destaque. A prévia é aplicada imediatamente e salva neste navegador para sua conta.</p><div className="accent-swatches" role="group" aria-label="Cores de destaque">{colors.map(([name, value]) => <button type="button" key={value} disabled={!ready} aria-label={name} aria-pressed={color === value} onClick={() => change(value)} style={{ background: value }}><span>{color === value ? "✓" : ""}</span></button>)}</div><label className="accent-custom">Cor personalizada <input type="color" value={color ?? DEFAULT} disabled={!ready} onChange={(event) => change(event.target.value)} /></label><button type="button" className="secondary" disabled={!ready} onClick={() => change(null)}>Restaurar cores originais</button><small role="status">{color ? `Cor selecionada: ${color.toUpperCase()}` : "Cores originais da aplicação"}</small></section>;
}
