"use client";

import { useTheme } from "@/hooks/use-theme";

// Browser preferences are applied after hydration; the initial render stays deterministic.
export function ThemeInitializer() {
  useTheme();
  return null;
}
