import Memcached from 'memcached';
import { RateLimiterMemcache } from 'rate-limiter-flexible';

const memcachedClient = new Memcached(
  process.env.NODE_ENV === 'production'
    ? process.env.NEXTAUTH_MEMCACHED_CLIENT!
    : process.env.NEXT_PUBLIC_MEMCACHED_CLIENT!,
);

export const rateLimiter = new RateLimiterMemcache({
  storeClient: memcachedClient,
  points: 10, // Number of points
  duration: 60, // Per 60 seconds
  blockDuration: 10, // Block duration in seconds
});

interface RateLimiterRejRes {
  remainingPoints: number;
  msBeforeNext: number;
}

export const checkRateLimit = async (identifier: string) => {
  try {
    await rateLimiter.consume(identifier, 1);
    return { allowed: true, remainingPoints: 0 };
  } catch (rejRes: unknown) {
    const error = rejRes as RateLimiterRejRes;
    return {
      allowed: false,
      // How many points are left for the user before they are blocked
      remainingPoints: error.remainingPoints,
      retryAfter: Math.round(error.msBeforeNext / 1000),
    };
  }
};

// sudo visudo
// enrico ALL=(ALL) NOPASSWD: /usr/bin/dnf install memcached -y, /usr/bin/systemctl start memcached, /usr/bin/systemctl enable memcached
// enrico ALL=(ALL) NOPASSWD: /usr/bin/systemctl start memcached
// enrico ALL=(ALL) NOPASSWD: /usr/bin/systemctl start memcached

// # Deployment Guide: Next.js App with Memcached Rate Limiting on DigitalOcean Droplet

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

// ## 4. Install Memcached
// - In the same terminal, run:
//   ```
//   sudo apt install -y memcached
//   sudo systemctl enable memcached
//   sudo systemctl start memcached
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
//   NEXTAUTH_MEMCACHED_CLIENT=127.0.0.1:11211
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

// You’re done! Your app is now running with Memcached rate limiting on your DigitalOcean Droplet.
