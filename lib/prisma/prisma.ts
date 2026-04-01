import { PrismaClient } from '../generated/prisma/client';
import { LogEvent, QueryEvent } from '../generated/prisma/internal/prismaNamespace';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prismaInstance = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  cyan:   '\x1b[36m',
  blue:   '\x1b[34m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  green:  '\x1b[32m',
  purple: '\x1b[35m',
  gray:   '\x1b[90m',
  white:  '\x1b[97m',
};

const W = 64;
const pad = (color: string) => `${color}│${c.reset}`;
const top = (color: string, label: string) => {
  const inner = `─[ ${label} ]`;
  return `${color}┌${inner}${'─'.repeat(W - inner.length)}┐${c.reset}`;
};
const bot = (color: string) => `${color}└${'─'.repeat(W)}┘${c.reset}`;
const row = (color: string, key: string, val: string) =>
  `${pad(color)} ${c.bold}${key}${c.reset}  ${val}`;

function colorDuration(ms: number): string {
  if (ms < 100) return `${c.green}${c.bold}${ms}ms ✓${c.reset}`;
  if (ms < 500) return `${c.yellow}${c.bold}${ms}ms ⚡${c.reset}`;
  return `${c.red}${c.bold}${ms}ms ✗${c.reset}`;
}

function formatTime(ts: Date): string {
  const hms = ts.toLocaleTimeString('en-US', { hour12: false });
  const ms  = String(ts.getMilliseconds()).padStart(3, '0');
  return `${hms}.${ms}`;
}

function tryParseJSON(str: string): unknown {
  try { return JSON.parse(str); } catch { return null; }
}

function prettyJSON(color: string, value: unknown): string {
  return JSON.stringify(value, null, 2)
    .split('\n')
    .map(l => `${pad(color)} ${color}${c.dim}${l}${c.reset}`)
    .join('\n');
}

function extractMongo(query: string): { collection: string; op: string } {
  const m = query.match(/db\.(\w+)\.(\w+)\(/);
  return { collection: m?.[1] ?? '—', op: m?.[2]?.toUpperCase() ?? '—' };
}

function extractPipeline(query: string): unknown {
  const m = query.match(/db\.\w+\.\w+\(([\s\S]*)\)\s*$/);
  if (!m) return null;
  return tryParseJSON(m[1]);
}

// ─── Query Log ───────────────────────────────────────────────────────────────
prismaInstance.$on('query', (e: QueryEvent) => {
  const { collection, op } = extractMongo(e.query);
  const pipeline  = extractPipeline(e.query);
  const params    = tryParseJSON(e.params);
  const hasParams = e.params !== '[]';
  const color     = c.cyan;

  const out: string[] = [
    '',
    top(color, 'Prisma Query'),
    pad(color),
    row(color, '⚙  Op:      ', `${c.white}${c.bold}${op}${c.reset}`),
    row(color, '📦 Model:   ', `${c.white}${c.bold}${collection}${c.reset}`),
    row(color, '🕐 Time:    ', `${c.gray}${formatTime(new Date(e.timestamp))}${c.reset}`),
    row(color, '⏱  Duration:', colorDuration(e.duration)),
    pad(color),
    `${pad(color)} ${color}${c.bold}Pipeline:${c.reset}`,
    pipeline ? prettyJSON(color, pipeline) : `${pad(color)} ${c.purple}${e.query}${c.reset}`,
  ];

  if (hasParams && params) {
    out.push(pad(color));
    out.push(`${pad(color)} ${color}${c.bold}Params:${c.reset}`);
    out.push(prettyJSON(color, params));
  }

  out.push(pad(color));
  out.push(bot(color));
  console.log(out.join('\n'));
});

// ─── Info Log ────────────────────────────────────────────────────────────────
prismaInstance.$on('info', (e: LogEvent) => {
  const color = c.blue;
  console.log([
    '',
    top(color, 'Prisma Info'),
    row(color, '🕐', `${c.gray}${formatTime(new Date(e.timestamp))}${c.reset}`),
    row(color, 'ℹ️ ', e.message),
    bot(color),
  ].join('\n'));
});

// ─── Warn Log ────────────────────────────────────────────────────────────────
prismaInstance.$on('warn', (e: LogEvent) => {
  const color = c.yellow;
  console.warn([
    '',
    top(color, 'Prisma Warn'),
    row(color, '🕐', `${c.gray}${formatTime(new Date(e.timestamp))}${c.reset}`),
    row(color, '⚠️ ', e.message),
    bot(color),
  ].join('\n'));
});

// ─── Error Log ───────────────────────────────────────────────────────────────
prismaInstance.$on('error', (e: LogEvent) => {
  const color = c.red;
  console.error([
    '',
    top(color, 'Prisma Error'),
    row(color, '🕐', `${c.gray}${formatTime(new Date(e.timestamp))}${c.reset}`),
    row(color, '❌ ', e.message),
    bot(color),
  ].join('\n'));
});

export const prisma = globalForPrisma.prisma || prismaInstance;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
