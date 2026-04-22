import Redis from 'ioredis';

const redisConfig = {
  host: process.env.NEXT_PUBLIC_REDIS_HOST || process.env.NEXTAUTH_REDIS_HOST || 'localhost',
  port: parseInt(process.env.NEXT_PUBLIC_REDIS_PORT || process.env.NEXTAUTH_REDIS_PORT || '6379', 10),
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
  enableReadyCheck: false,
  enableOfflineQueue: false,
  lazyConnect: true,
  maxRetriesPerRequest: null,
};

// Check if we're in a build context (codegen, etc.)
const isBuildContext = () => {
  return (
    process.env.CODEGEN === 'true' ||
    (typeof process.argv !== 'undefined' && 
     (process.argv.includes('graphql-codegen') || 
      process.argv.includes('codegen') ||
      process.argv.includes('prisma')))
  );
};

// Create a mock client for build time to avoid connection errors
const createMockRedisClient = () => {
  return new Proxy({}, {
    get: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return (..._args: unknown[]) => Promise.resolve(null);
    },
  }) as unknown as Redis;
};

export const redisClient = isBuildContext() ? createMockRedisClient() : new Redis(redisConfig);

// Only attach listeners in runtime, not in build context
if (!isBuildContext()) {
  redisClient.on('error', (err: Error) => {
    console.error('Redis Client Error', err);
  });

  redisClient.on('connect', () => {
    console.log(`=====================================================================`);
    console.log(`Redis Client Connected to ${redisConfig.host}:${redisConfig.port}.`);
    console.log(`=====================================================================`);
  });
}

export default redisClient;
