import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
                console.log('authorize credentials:', credentials);
        
        if (!credentials?.username || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        console.log('found user:', user);
        console.log("Manual compare:", credentials.password === "M0nde02376");

        

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        console.log('password valid:', isValid);

        // Return a user object compatible with NextAuth (id must be string)
        return {
          id: user.id.toString(),  // id as string
          username: user.username,
          fullName: user.fullName,
          level: user.level,
          accountId: user.accountId,
          name: user.fullName || null,
          email: null,
          image: null,
          password: user.password,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }): Promise<JWT> {
  if (user) {
    token.id = user.id; // number
    token.username = user.username;
    token.level = user.level;
    token.accountId = user.accountId;
  }
  return token;
},

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token) {
        session.user.id = token.id as number;
        session.user.username = token.username as string;
        session.user.level = token.level as number;
        session.user.accountId = token.accountId as number;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
