import { Role, StudentType } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    role?: Role;
    studentType?: StudentType | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: Role;
    studentType?: StudentType | null;
  }
}
