"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useTheme } from "@/hooks/use-theme";
import { AppTour } from "@/components/onboarding/app-tour";

export function GlobalTools() {
  const path = usePathname(); const { theme, setTheme } = useTheme();
  const [tour, setTour] = useState(false);
  const [steps, setSteps] = useState<{ title: string; text: string; target: string }[]>([]);
  if (path === "/" || path.startsWith("/cliente")) return null;
  function start() {
    const items = Array.from(document.querySelectorAll<HTMLElement>("nav [data-tour]"));
    const descriptions: Record<string, string> = { restaurant: "Consulte e edite os dados, o endereço e os horários do restaurante.", menu: "Cadastre e gerencie os produtos do cardápio.", tables: "Consulte e gerencie as mesas do restaurante.", orders: "Acompanhe os pedidos do restaurante.", invitations: "Crie e copie links para convidar garçons para sua equipe.", profile: "Consulte seu perfil e personalize a aparência." };
    setSteps(items.length ? items.map(item => ({ title: item.textContent?.trim() || "Navegação", text: descriptions[item.dataset.tour!] || "Acesse esta seção pela navegação inferior.", target: item.dataset.tour! })) : [{ title: "Conheça esta página", text: "Use os campos e opções desta tela para continuar. O botão de tema no topo alterna entre as cores claras e escuras.", target: "page-tools" }]);
    setTour(true);
  }
  return <><div className="global-tools" data-tour="page-tools"><button type="button" className="icon-button" onClick={start} aria-label="Ver tutorial" title="Ver tutorial"><Sparkles size={18}/></button><ThemeToggle theme={theme} onChange={setTheme}/></div>{tour && <AppTour key={path} forceStart={tour} autoStart={false} steps={steps} onClose={() => setTour(false)}/>}</>;
}
