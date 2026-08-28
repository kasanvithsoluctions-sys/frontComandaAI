import { RoleGuard } from "@/components/auth/role-guard";
export default function DonoLayout({ children }: { children: React.ReactNode }) { return <RoleGuard roles={["DONO"]}>{children}</RoleGuard>; }
