import { RoleGuard } from "@/components/auth/role-guard";
export default function ClienteLayout({ children }: { children: React.ReactNode }) { return <RoleGuard roles={["CLIENTE"]}>{children}</RoleGuard>; }
