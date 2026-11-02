import type { Metadata } from "next";
import { CookieConsent } from "@/components/privacy/cookie-consent";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = { title: "Oliva — à mesa", description: "Sua experiência Oliva" };
const themeScript = `try{const saved=localStorage.getItem("oliva-theme");const theme=saved==="light"||saved==="dark"?saved:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=theme}catch{}`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR" suppressHydrationWarning><body>{children}<CookieConsent /><Script id="oliva-theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }}/></body></html>; }
