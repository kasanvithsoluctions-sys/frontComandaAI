import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Oliva — à mesa", description: "Sua experiência Oliva" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
