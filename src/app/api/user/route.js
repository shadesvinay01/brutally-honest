import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // For now, history is based on roasts that exist in the system. 
  // In a real app, we would link Roasts to Users.
  // For the MVP, we'll just show the latest community roasts as a placeholder or empty.
  const history = await prisma.roast.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json({ user, history });
}
