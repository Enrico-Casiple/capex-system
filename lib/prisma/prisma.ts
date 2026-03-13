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

  // Try to extract operation type (SELECT, INSERT, etc.) and table name
  let operation = '';
  let table = '';
  const match = e.query.match(/^(\w+)\s+[`\"]?(\w+)?/i);
  if (match) {
    operation = match[1].toUpperCase();
    table = match[2] ? match[2] : '';
  }

  const header = `\x1b[36m======================[ Prisma Query ]======================\x1b[0m`;
  const footer = `\x1b[36m===========================================================\x1b[0m`;
  const opLine = operation ? `\x1b[1mOperation:\x1b[0m ${operation}` : '';
  const tableLine = table ? `\x1b[1mTable:\x1b[0m ${table}` : '';
  const timeLine = `\x1b[90m${new Date(e.timestamp).toISOString()}\x1b[0m`;
  const durationLine = `⏱  ${duration}`;
  const queryLine = `\x1b[35m→\x1b[0m ${e.query}`;
  const paramsLine = e.params !== '[]' ? `\x1b[90mParams:\x1b[0m ${e.params}` : '';

  console.log(
    [header, opLine, tableLine, timeLine, durationLine, queryLine, paramsLine, footer]
      .filter(Boolean)
      .join('\n'),
  );
});

// ─── Info Log ────────────────────────────────────────────────────────────────
// ─── Info Log ────────────────────────────────────────────────────────────────
prismaInstance.$on('info', (e) => {
  const header = `\x1b[34m======================[ Prisma Info ]=======================\x1b[0m`;
  const footer = `\x1b[34m===========================================================\x1b[0m`;
  const timeLine = `\x1b[90m${new Date(e.timestamp).toISOString()}\x1b[0m`;
  const messageLine = `\x1b[1mMessage:\x1b[0m ${e.message}`;
  console.log([header, timeLine, messageLine, footer].join('\n'));
});

// ─── Warn Log ────────────────────────────────────────────────────────────────
prismaInstance.$on('warn', (e) => {
  const header = `\x1b[33m======================[ Prisma Warn ]=======================\x1b[0m`;
  const footer = `\x1b[33m===========================================================\x1b[0m`;
  const timeLine = `\x1b[90m${new Date(e.timestamp).toISOString()}\x1b[0m`;
  const messageLine = `\x1b[1mMessage:\x1b[0m ⚠️  ${e.message}`;
  console.warn([header, timeLine, messageLine, footer].join('\n'));
});

// ─── Error Log ───────────────────────────────────────────────────────────────
prismaInstance.$on('error', (e) => {
  const header = `\x1b[31m======================[ Prisma Error ]======================\x1b[0m`;
  const footer = `\x1b[31m===========================================================\x1b[0m`;
  const timeLine = `\x1b[90m${new Date(e.timestamp).toISOString()}\x1b[0m`;
  const messageLine = `\x1b[1mMessage:\x1b[0m ❌ ${e.message}`;
  console.error([header, timeLine, messageLine, footer].join('\n'));
});

export const prisma = globalForPrisma.prisma || prismaInstance;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
