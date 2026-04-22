import { redisClient } from '../config/redis';

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  maxPoints: 10, // Number of requests
  durationSeconds: 60, // Time window in seconds
  blockDurationSeconds: 10, // Seconds to block after exceeding limit
};

interface RateLimitResult {
  allowed: boolean;
  remainingPoints?: number;
  retryAfter?: number;
}

/**
 * Check rate limit for an identifier using Redis sliding window
 * @param identifier - User email or unique identifier
 * @returns Rate limit result with allowed status and remaining points
 */
export const checkRateLimit = async (
  identifier: string
): Promise<RateLimitResult> => {
  const key = `rate-limit:${identifier}`;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_CONFIG.durationSeconds * 1000;

  try {
    // Remove old entries outside the window
    await redisClient.zremrangebyscore(key, '-inf', windowStart);

    // Count requests in current window
    const requestCount = await redisClient.zcard(key);

    if (requestCount >= RATE_LIMIT_CONFIG.maxPoints) {
      // Rate limit exceeded
      const oldestRequest = await redisClient.zrange(key, 0, 0, 'WITHSCORES');

      if (oldestRequest.length >= 2) {
        const oldestTimestamp = parseInt(oldestRequest[1], 10);
        const retryAfter = Math.ceil(
          (oldestTimestamp + RATE_LIMIT_CONFIG.durationSeconds * 1000 - now) /
            1000
        );

        console.log(`==================================================================================`);
        console.log(
          `🚦 Rate limit exceeded for identifier: ${identifier}. Retry after ${retryAfter} seconds.`
        );
        console.log(`==================================================================================`);

        return {
          allowed: false,
          remainingPoints: 0,
          retryAfter: Math.max(retryAfter, 0),
        };
      }
    }

    // Add current request to the set
    await redisClient.zadd(key, now, `${now}-${Math.random()}`);

    // Set expiration on the key
    await redisClient.expire(
      key,
      RATE_LIMIT_CONFIG.durationSeconds + RATE_LIMIT_CONFIG.blockDurationSeconds
    );

    const remainingPoints = Math.max(
      0,
      RATE_LIMIT_CONFIG.maxPoints - requestCount - 1
    );

    console.log(`==================================================================================`);
    console.log(
      `🚦 Rate limit check: Request allowed for identifier: ${identifier}. Remaining points: ${remainingPoints}`
    );
    console.log(`==================================================================================`);

    return {
      allowed: true,
      remainingPoints,
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // Fail open - allow requests if Redis is down
    return {
      allowed: true,
      remainingPoints: RATE_LIMIT_CONFIG.maxPoints,
    };
  }
};

/**
 * Get current rate limit TTL for an identifier
 * @param identifier - User email or unique identifier
 * @returns TTL in seconds, or -1 if no rate limit is active
 */
export const getRateLimitTtl = async (identifier: string): Promise<number> => {
  const key = `rate-limit:${identifier}`;
  console.log(`===================================================================================`);
  console.log(`Checking rate limit TTL for identifier: ${key}`);
  console.log(`===================================================================================`);
  return redisClient.ttl(key);
};

/**
 * Reset rate limit for an identifier
 * @param identifier - User email or unique identifier
 */
export const removeRateLimitKey = async (identifier: string): Promise<void> => {
  const key = `rate-limit:${identifier}`;
  console.log(`===================================================================================`);
  console.log(`Resetting rate limit for identifier: ${key}`);
  console.log(`===================================================================================`);
  await redisClient.del(key);
};

// Export rate limiter instance for backward compatibility
export const rateLimiter = {
  consume: checkRateLimit,
  getTtl: getRateLimitTtl,
  reset: removeRateLimitKey,
};

// # Deployment Guide: Next.js App with Redis Rate Limiting on DigitalOcean Droplet

// This guide will help you deploy your app step by step. You can copy and paste each command.

// ---

// ## 1. Create a DigitalOcean Droplet
// - Go to https://cloud.digitalocean.com/droplets
// - Click “Create Droplet”
// - Choose **Ubuntu** as the operating system
// - Select the size and region you want
// - Set up authentication (password or SSH key)
// - Click **Create Droplet**

// ## 2. Connect to Your Droplet
// - On your computer, open Terminal (Mac/Linux) or PowerShell (Windows)
// - Type:
//   ```
//   ssh root@your_droplet_ip
//   ```
//   (Replace `your_droplet_ip` with the IP address from DigitalOcean)

// ## 3. Install Node.js and Git
// - In the Droplet terminal, run:
//   ```
//   sudo apt update
//   sudo apt install -y nodejs npm git
//   ```

// ## 4. Install Redis
// - In the same terminal, run:
//   ```
//   sudo apt install -y redis-server
//   sudo systemctl enable redis-server
//   sudo systemctl start redis-server
//   ```

// ## 5. Upload Your Project
// - On your computer, zip your project folder.
// - In the terminal, use `scp` to upload it:
//   ```
//   scp your-project.zip root@your_droplet_ip:/root/
//   ```
// - On the Droplet, unzip it:
//   ```
//   unzip your-project.zip
//   cd your-project-folder
//   ```

// ## 6. Set Environment Variables
// - In the project folder, create a file named `.env`:
//   ```
//   nano .env
//   ```
// - Add these lines:
//   ```
//   NODE_ENV=production
//   REDIS_HOST=127.0.0.1
//   REDIS_PORT=6379
//   ```
// - Press `Ctrl+O` to save, then `Ctrl+X` to exit.

// ## 7. Install Project Dependencies
// - In the project folder, run:
//   ```
//   npm install
//   ```

// ## 8. Build and Start Your App
// - Build the app:
//   ```
//   npm run build
//   ```
// - Start the app:
//   ```
//   npm start
//   ```

// ## 9. Keep the App Running (Optional)
// - To keep your app running after you close the terminal, install pm2:
//   ```
//   npm install -g pm2
//   pm2 start npm -- start
//   pm2 save
//   pm2 startup
//   ```

// ---

// ### Useful pm2 Commands
// - Restart app: `pm2 restart all`
// - Stop app: `pm2 stop all`

// ---

// You're done! Your app is now running with Redis rate limiting on your DigitalOcean Droplet.
