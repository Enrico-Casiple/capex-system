import { RateLimiterMemory } from 'rate-limiter-flexible';

// Create rate limiter instance
export const rateLimiter = new RateLimiterMemory({
  points: 100, // 100 requests allowed
  duration: 60, // per 60 seconds (1 minute)
  blockDuration: 0, // block duration in seconds
});

// Helper function to check rate limit
export const checkRateLimit = async (identifier: string) => {
  try {
    await rateLimiter.consume(identifier, 1); // Consume 1 point
    return {
      allowed: true,
      remainingPoints: 0,
    };
  } catch (rejRes: unknown) {
    const error = rejRes as { remainingPoints: number; msBeforeNext: number };
    return {
      allowed: false,
      remainingPoints: error.remainingPoints,
      retryAfter: Math.round(error.msBeforeNext / 1000), // seconds
    };
  }
};
