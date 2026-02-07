import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // Steam için şimdilik kapalı tutuyorum, önce site çalışsın.
    // Eğer env dosyana eklediysen burayı açabilirsin.
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        // Kullanıcının güncel bakiyesini ve rolünü çek
        const dbUser = await db.user.findUnique({ where: { email: session.user.email! } });
        if (dbUser) {
           // @ts-ignore
          session.user.role = dbUser.role;
           // @ts-ignore
          session.user.balance = dbUser.balance;
           // @ts-ignore
          session.user.id = dbUser.id;
        }
      }
      return session;
    }
  }
})