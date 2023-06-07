import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@/src/lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     if (url.startsWith("/")) return `${baseUrl}${url}`;
  //     else if (new URL(url).origin === baseUrl) return url;
  //     return baseUrl;
  //   },
  // },
});
