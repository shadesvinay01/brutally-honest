import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  headers();
  const { searchParams } = new URL(request.url);
  const roastId = searchParams.get('roastId');
  if (!roastId) return NextResponse.json({ error: 'roastId required' }, { status: 400 });

  const reactions = await prisma.reaction.findMany({
    where: { roastId }
  });
  
  // Aggregate counts
  const counts = reactions.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {});
  
  return NextResponse.json(counts);
}

export async function POST(request) {
  const { roastId, type } = await request.json();
  if (!roastId || !type) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

  const reaction = await prisma.reaction.create({
    data: { roastId, type }
  });
  return NextResponse.json(reaction);
}
