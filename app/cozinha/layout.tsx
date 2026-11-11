import { KitchenNavigation } from "@/components/navigation/kitchen-navigation";
import { RoleGuard } from "@/components/auth/role-guard";
export default function CozinhaLayout({ children }: { children: React.ReactNode }) { return <RoleGuard roles={["COZINHA"]}>{children}<KitchenNavigation/></RoleGuard>; }
