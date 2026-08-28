import { RoleGuard } from "@/components/auth/role-guard";
export default function CozinhaLayout({ children }: { children: React.ReactNode }) { return <RoleGuard roles={["COZINHA"]}>{children}</RoleGuard>; }
