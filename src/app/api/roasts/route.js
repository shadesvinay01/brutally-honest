import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Basic connectivity check
    await prisma.$connect();
    
    const roasts = await prisma.roast.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    
    const parsedRoasts = roasts.map(r => {
      try {
        return {
          ...r,
          roastLines: typeof r.roastLines === 'string' ? JSON.parse(r.roastLines) : r.roastLines
        };
      } catch (e) {
        return { ...r, roastLines: [] };
      }
    });
    
    return NextResponse.json(parsedRoasts);
  } catch (error) {
    console.error('API_ERROR:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
