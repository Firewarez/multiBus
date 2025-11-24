import { PrismaClient } from '@prisma/client';

// Cria uma instância única do Prisma para toda a aplicação
export const prisma = new PrismaClient();