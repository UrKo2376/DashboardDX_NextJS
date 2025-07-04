import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      level: number;
      accountId: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; // Note: must be string because NextAuth requires it
    username: string;
    level: number;
    accountId: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    username: string;
    level: number;
    accountId: number;
  }
}
