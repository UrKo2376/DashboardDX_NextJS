// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/getSession";

export async function POST(req: Request) {
  const session = await getSessionFromRequest(req);
  await session.destroy();
  return NextResponse.json({ ok: true });
}
