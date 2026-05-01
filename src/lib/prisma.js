import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

const globalForPrisma = globalThis;

// Only initialize prisma if we are NOT in the build phase
const prisma = globalForPrisma.prisma ?? (
  typeof window === 'undefined' && process.env.NEXT_PHASE === 'phase-production-build'
    ? null
    : prismaClientSingleton()
);

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
