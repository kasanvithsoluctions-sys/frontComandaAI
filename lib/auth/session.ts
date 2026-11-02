import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { roleHome } from "@/lib/auth/role-routes";
import type { AuthUser, Role } from "@/types/auth";

const ROLE_COOKIE = "oliva-role";

/** Central session boundary. Replace the cookie reader with validated Spring Boot/JWT session data in production. */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const storedRole = (await cookies()).get(ROLE_COOKIE)?.value as Role | undefined;
  const role = process.env.NODE_ENV !== "production" ? storedRole : undefined;
  if (!role || !(role in roleHome)) return null;
  return { id: "current-user", name: "Usuário Oliva", email: "usuario@oliva.app", role };
}

export async function requireRole(allowed: Role[]) {
  if (process.env.BYPASS_ROLE_GUARD === "true") {
    const role = allowed[0];
    return { id: "preview-user", name: "Modo de visualização", email: "preview@oliva.app", role };
  }
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!allowed.includes(user.role)) redirect(roleHome[user.role]);
  return user;
}
