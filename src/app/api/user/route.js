import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  headers();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const history = await prisma.roast.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json({ user, history });
}
