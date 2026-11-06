import { NextResponse } from "next/server";
import { ROLES, type Role } from "@/types/auth";

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ message: "Origem não permitida." }, { status: 403 });
  const body = await request.json().catch(() => null) as { role?: Role; mode?: string; termsAccepted?: boolean; termsVersion?: string } | null;
  if (body?.mode === "register" && (body.termsAccepted !== true || body.termsVersion !== "2026-11-02")) return NextResponse.json({ message: "Aceite a versão atual dos Termos de Uso." }, { status: 400 });
  const role = body?.role;
  if (!role || !ROLES.includes(role)) return NextResponse.json({ message: "Role inválida" }, { status: 400 });
  const response = NextResponse.json({ role });
  response.cookies.set("oliva-role", role, { httpOnly: true, secure: new URL(request.url).protocol === "https:", sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("oliva-role", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
