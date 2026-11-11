import { GlobalTools } from "@/components/navigation/global-tools";
import type { Metadata } from "next";
import { CookieConsent } from "@/components/privacy/cookie-consent";
import { ThemeInitializer } from "@/components/theme/theme-initializer";
import "./globals.css";

export const metadata: Metadata = { title: "Oliva — à mesa", description: "Sua experiência Oliva" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body><ThemeInitializer /><GlobalTools />{children}<CookieConsent /></body></html>; }
