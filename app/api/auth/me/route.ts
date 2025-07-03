// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/getSession";

export async function GET(req: Request) {
  const session = await getSessionFromRequest(req);

  if (!session?.id) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: session });
}
