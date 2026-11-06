"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";
const KEY = "oliva-theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = window.localStorage.getItem(KEY); } catch { /* Use the system theme when storage is unavailable. */ }
    const saved: Theme | null = stored === "light" || stored === "dark" ? stored : null;
    const nextTheme = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = theme;
    try { window.localStorage.setItem(KEY, theme); } catch { /* The theme still applies when storage is unavailable. */ }
  }, [ready, theme]);

  return { theme, setTheme };
}
