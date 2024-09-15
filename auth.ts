import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./drizzle/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  // @ts-ignore
  adapter: DrizzleAdapter(db),

  callbacks: {
    session: ({ session, user }) => {
      return { ...session, user };
    },
  },
});
