// import { PrismaClient } from '../generated/prisma/client';

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query'],
//   });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

import { PrismaClient } from '../generated/prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prismaInstance = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
});

// ─── Query Log ───────────────────────────────────────────────────────────────
prismaInstance.$on('query', (e) => {
  const duration =
    e.duration < 100
      ? `\x1b[32m${e.duration}ms\x1b[0m` // green  — fast
      : e.duration < 500
        ? `\x1b[33m${e.duration}ms\x1b[0m` // yellow — medium
        : `\x1b[31m${e.duration}ms\x1b[0m`; // red    — slow

  console.log(
    [
      `\x1b[36m[Prisma Query]\x1b[0m`, // cyan label
      `\x1b[90m${new Date(e.timestamp).toISOString()}\x1b[0m`, // gray timestamp
      `⏱  ${duration}`,
      `\n  \x1b[35m→\x1b[0m ${e.query}`, // magenta arrow + query
      e.params !== '[]'
        ? `\n  \x1b[90mParams:\x1b[0m ${e.params}` // gray params
        : '',
    ].join('  '),
  );
});

// ─── Info Log ────────────────────────────────────────────────────────────────
prismaInstance.$on('info', (e) => {
  console.log(
    `\x1b[34m[Prisma Info]\x1b[0m  \x1b[90m${new Date(e.timestamp).toISOString()}\x1b[0m  ${e.message}`,
  );
});

// ─── Warn Log ────────────────────────────────────────────────────────────────
prismaInstance.$on('warn', (e) => {
  console.warn(
    `\x1b[33m[Prisma Warn]\x1b[0m  \x1b[90m${new Date(e.timestamp).toISOString()}\x1b[0m  ⚠️  ${e.message}`,
  );
});

// ─── Error Log ───────────────────────────────────────────────────────────────
prismaInstance.$on('error', (e) => {
  console.error(
    `\x1b[31m[Prisma Error]\x1b[0m \x1b[90m${new Date(e.timestamp).toISOString()}\x1b[0m  ❌ ${e.message}`,
  );
});

export const prisma = globalForPrisma.prisma || prismaInstance;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
