import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = prisma ? await prisma.user.findUnique({
    where: { email: session.user.email },
  }) : null;

  const history = prisma ? await prisma.roast.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  }) : [];

  return NextResponse.json({ user, history });
}
