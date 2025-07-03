// lib/session.ts
import type { SessionOptions } from "iron-session";

export type SessionUser = {
  id: number;
  username: string;
  accountId: number;
  level: number;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "dashboard_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
