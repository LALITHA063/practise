import { type NextAuthOptions, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const ENV_ALLOWED_DOMAIN = process.env.ALLOWED_EMAIL_DOMAIN || "college.edu";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "College Email",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" },
      },
      async authorize(raw) {
        const parsed = z
          .object({ email: z.string().email(), name: z.string().optional() })
          .safeParse(raw);
        if (!parsed.success) return null;
        const { email, name } = parsed.data;
        const domain = email.split("@")[1]?.toLowerCase();
        if (domain !== ENV_ALLOWED_DOMAIN.toLowerCase()) return null;

        const user = await prisma.user.upsert({
          where: { email },
          update: { name: name ?? undefined },
          create: { email, name: name ?? null },
        });
        const u: Pick<User, "id" | "email" | "name"> & {
          role: typeof user.role;
          studentType: typeof user.studentType;
        } = {
          id: String(user.id),
          email: user.email,
          name: user.name ?? undefined,
          role: user.role,
          studentType: user.studentType,
        };
        return u as unknown as User;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const anyUser = user as unknown as { role?: unknown; studentType?: unknown };
        (token as Record<string, unknown>).role = anyUser.role;
        (token as Record<string, unknown>).studentType = anyUser.studentType;
      }
      return token;
    },
    async session({ session, token }) {
      // Augment session using declared module augmentation in src/types/next-auth.d.ts
      const s = session as typeof session & {
        role?: unknown;
        studentType?: unknown;
      };
      const t = token as typeof token & {
        role?: unknown;
        studentType?: unknown;
      };
      s.role = t.role;
      s.studentType = t.studentType;
      return s;
    },
  },
  pages: {
    signIn: "/login",
  },
};
