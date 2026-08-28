"use client";

import { Moon, Sun } from "lucide-react";
import type { Theme } from "@/hooks/use-theme";

export function ThemeToggle({ theme, onChange }: { theme: Theme; onChange: (theme: Theme) => void }) {
  const isDark = theme === "dark";
  return <button className="icon-button" onClick={() => onChange(isDark ? "light" : "dark")} aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"} title={isDark ? "Tema claro" : "Tema escuro"}>
    {isDark ? <Sun size={19} /> : <Moon size={19} />}
  </button>;
}
