"use client";
import { usePathname } from "next/navigation";
import { ClipboardList, CircleUserRound, Package } from "lucide-react";
const items = [{ href: "/cozinha/pedidos", label: "Pedidos", target: "orders", Icon: ClipboardList }, { href: "/cozinha/pedidos-em-preparo", label: "Em preparo", target: "preparing", Icon: Package }, { href: "/cozinha/perfil", label: "Perfil", target: "profile", Icon: CircleUserRound }];
export function KitchenNavigation() { const path = usePathname(); return <nav className="nav owner-nav" aria-label="Navegação da cozinha">{items.map(({ href, label, target, Icon }) => <a key={href} href={href} data-tour={target} className={path === href ? "active" : ""}><Icon size={20}/><span>{label}</span></a>)}</nav>; }
