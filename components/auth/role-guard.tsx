import type { ReactNode } from "react";
import { requireRole } from "@/lib/auth/session";
import { AuthProvider } from "@/components/auth/auth-provider";
import type { Role } from "@/types/auth";

export async function RoleGuard({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const user = await requireRole(roles);
  return <AuthProvider user={user}>{children}</AuthProvider>;
}
