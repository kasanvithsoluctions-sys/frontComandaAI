import { RoleGuard } from "@/components/auth/role-guard";
export default function GarcomLayout({ children }: { children: React.ReactNode }) { return <RoleGuard roles={["GARCOM"]}>{children}</RoleGuard>; }
