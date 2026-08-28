"use client";

import { createContext, useContext } from "react";
import type { AuthUser } from "@/types/auth";

const AuthContext = createContext<AuthUser | null>(null);
export function AuthProvider({ user, children }: { user: AuthUser; children: React.ReactNode }) { return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>; }
export function useAuth() { const user = useContext(AuthContext); if (!user) throw new Error("useAuth deve ser usado dentro de AuthProvider"); return user; }
