import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

async function auth(req, res) {
  return await NextAuth(req, res, authOptions);
}

export { auth as GET, auth as POST };
