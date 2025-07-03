// lib/getSession.ts
import { getIronSession } from "iron-session";
import { sessionOptions, SessionUser } from "./session";

export async function getSessionFromRequest(req: Request) {
  // Extract cookies header from Next.js Request
  const cookie = req.headers.get("cookie") || "";

  // Pass an object matching iron-session's expectations
  const session = await getIronSession<SessionUser>(
    {
      headers: {
        cookie,
      },
      cookie,
      method: req.method,
    } as any, // 'as any' because iron-session expects a different type
    sessionOptions
  );

  return session;
}
