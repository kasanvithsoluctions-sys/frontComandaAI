import { NextResponse } from "next/server";
import { ROLES, type Role } from "@/types/auth";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") return NextResponse.json({ message: "Use o login do backend em produção." }, { status: 403 });
  const { role } = await request.json() as { role?: Role };
  if (!role || !ROLES.includes(role)) return NextResponse.json({ message: "Role inválida" }, { status: 400 });
  const response = NextResponse.json({ role });
  response.cookies.set("oliva-role", role, { httpOnly: true, sameSite: "lax", path: "/" });
  return response;
}
