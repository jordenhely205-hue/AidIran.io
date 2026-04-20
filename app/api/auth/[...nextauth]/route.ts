import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const adminUser = process.env.ADMIN_USER?.trim();
        const adminPass = process.env.ADMIN_PASSWORD?.trim();

        if (credentials?.email === adminUser && credentials?.password === adminPass) {
          return { id: "1", name: "Admin", email: adminUser };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_aid_iran_123_abc",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
