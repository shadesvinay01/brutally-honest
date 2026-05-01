import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const roastId = searchParams.get('roastId');
  if (!roastId) return NextResponse.json({ error: 'roastId required' }, { status: 400 });

  const comments = await prisma.comment.findMany({
    where: { roastId },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(comments);
}

export async function POST(request) {
  const { roastId, text, author } = await request.json();
  if (!roastId || !text) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

  const comment = await prisma.comment.create({
    data: {
      text,
      author: author || 'Anonymous Critic',
      roastId,
      badge: text.length > 200 ? '🔥 TOP CRITIC' : null
    }
  });
  return NextResponse.json(comment);
}

export async function PATCH(request) {
  const { id } = await request.json();
  const comment = await prisma.comment.update({
    where: { id },
    data: { upvotes: { increment: 1 } }
  });
  return NextResponse.json(comment);
}
