import { RoleGuard } from "@/components/auth/role-guard";
import { RestaurantOnboarding } from "@/components/onboarding/restaurant-onboarding";

export default function RestaurantOnboardingPage() { return <RoleGuard roles={["DONO"]}><RestaurantOnboarding /></RoleGuard>; }
