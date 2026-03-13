// ============================================================================
// IMPORTS
// ============================================================================

import { renderApolloSandbox } from '@graphql-yoga/render-apollo-sandbox';
import type { ExecutionArgs } from 'graphql';
import { parse as parseGraphQL, validate } from 'graphql';
import type { Context, OperationResult, SubscribeMessage } from 'graphql-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createYoga } from 'graphql-yoga';
import type { IncomingMessage } from 'http';
import { createServer } from 'http';
import next from 'next';
import { getToken } from 'next-auth/jwt';
import { parse } from 'url';
import type { WebSocket } from 'ws';
import { WebSocketServer } from 'ws';
import { rateLimiter } from '../pothos/rateLimiter';
import schema from '../pothos/schema';
import { pubsub } from '../pothos/subscription';
import { ensureBearerFromSessionCookie } from '../util/ensureBearerFromSessionCookie';

// Inside your Yoga setup
export const config = {
  api: {
    bodyParser: false,
  },
};

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

/** Check if running in development mode: boolean */
const development: boolean = process.env.NODE_ENV === 'development';

/** Server hostname from env or default: string */
const hostname: string = process.env.HOST || 'localhost';

/** Server port from env or default: number */
const port: number = parseInt(process.env.PORT || '3000', 10);

/** Next.js app instance for handling routes: NextApiHandler */
const app = next({ dev: development, hostname, port });

/** GraphQL endpoint path: string */
const graphqlEndpoint: string = '/api/graphql';

// ============================================================================
// GRAPHQL YOGA SETUP
// ============================================================================

/**
 * Yoga instance configuration
 * Type: YogaServerInstance<any, any>
 *
 * Configures:
 * - schema: GraphQL schema from Pothos builder
 * - graphqlEndpoint: Route for GraphQL requests
 * - graphiql: GraphiQL IDE settings with WebSocket subscriptions
 * - renderGraphiQL: Apollo Sandbox UI renderer
 */
const yoga = createYoga({
  schema: schema,
  graphqlEndpoint,
  context: async ({ request }) => {
    // Normalize headers for getToken
    let session = null; // Placeholder for session data from getToken
    let cookie = null; // Placeholder for cookie parsing if needed in the future
    if (request) {
      // const user = await getToken({ req: request, secret: process.env.AUTH_SECRET });
      session = await getToken({ req: request, secret: process.env.AUTH_SECRET });
      cookie = ensureBearerFromSessionCookie(request); // Store cookie for potential use in getToken
    }
    console.log('🟢 Session from getToken in Yoga context:', session?.user);
    console.log('🍪 Cookies in Yoga context:', `Bearer ${cookie}`);

    return {
      pubsub,
      rateLimiter,
      session,
    };
  },
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
  renderGraphiQL: renderApolloSandbox({
    endpointIsEditable: development,
  }),
});

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Extra context data attached to WebSocket connections
 *
 * Properties:
 * - request: IncomingMessage - HTTP request object
 * - socket: WebSocket - WebSocket connection instance
 */
interface Extra {
  request: IncomingMessage;
  socket: WebSocket;
}
// ============================================================================
// MAIN SERVER INITIALIZATION
// ============================================================================

/**
 * Async IIFE (Immediately Invoked Function Expression)
 * Initializes and starts the HTTP server with GraphQL WebSocket support
 * Type: Promise<void>
 */
(async () => {
  try {
    // Prepare Next.js app for request handling
    // Type: Promise<void>
    await app.prepare();

    // Get Next.js request handler for routing
    // Type: (req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) => Promise<void>
    const handle = app.getRequestHandler();

    // ========================================================================
    // HTTP SERVER CREATION
    // ========================================================================

    /**
     * Create HTTP server with custom request handler
     * Type: Server<typeof IncomingMessage, typeof ServerResponse>
     *
     * Handles:
     * - GraphQL requests → passes to Yoga instance
     * - Other requests → passes to Next.js handler
     */
    const server = createServer(async (request: IncomingMessage, response): Promise<void> => {
      try {
        // Parse request URL with query parameters
        // Type: UrlWithParsedQuery
        const url = parse(request.url || '', true);

        // Route GraphQL requests to Yoga, others to Next.js
        // Type: boolean check
        if (url.pathname?.startsWith(graphqlEndpoint)) {
          // Pass GraphQL request to Yoga instance
          // Type: Promise<void>
          await yoga(request, response);
        } else {
          // Pass non-GraphQL request to Next.js handler
          // Type: Promise<void>
          await handle(request, response, url);
        }
      } catch (error: unknown) {
        // Log errors with request details
        // Type: void
        console.error(`Error handling request from ${request?.socket?.remoteAddress}:`, {
          url: request?.url,
          method: request?.method,
          error,
        });
        response.writeHead(500).end('Server Error from custom server');
      }
    });

    // ========================================================================
    // WEBSOCKET SERVER SETUP FOR SUBSCRIPTIONS
    // ========================================================================

    /**
     * Create WebSocket server for GraphQL subscriptions
     * Type: WebSocketServer<typeof WebSocket>
     *
     * Configuration:
     * - server: Attaches to HTTP server
     * - path: Listens on GraphQL endpoint
     */
    const websocketServer: WebSocketServer = new WebSocketServer({
      server,
      path: graphqlEndpoint,
    });

    // ========================================================================
    // GRAPHQL-WS SERVER CONFIGURATION
    // ========================================================================

    /**
     * Configure graphql-ws server for handling subscriptions
     * Type: void
     *
     * Handlers:
     * - execute: Executes GraphQL queries/mutations
     * - subscribe: Sets up GraphQL subscriptions
     * - onSubscribe: Validates and prepares subscription execution
     */
    useServer(
      {
        /**
         * Execute handler for non-subscription operations
         *
         * Parameters:
         * - args: ExecutionArgs - GraphQL execution arguments
         */
        execute: (args: ExecutionArgs): OperationResult => {
          return (args.rootValue as { execute: (args: ExecutionArgs) => OperationResult }).execute(
            args,
          );
        },

        /**
         * Subscribe handler for subscription operations
         *
         * Parameters:
         * - args: ExecutionArgs - Same as execute
         */
        subscribe: (args: ExecutionArgs): OperationResult => {
          return (
            args.rootValue as { subscribe: (args: ExecutionArgs) => OperationResult }
          ).subscribe(args);
        },

        /**
         * OnSubscribe handler - validates and prepares subscriptions
         * Called when client initiates a subscription
         */
        onSubscribe: async (
          context: Context<Record<string, unknown> | undefined, Extra>,
          message: SubscribeMessage,
        ) => {
          // Extract WebSocket connection metadata from context
          const extra = context.extra as Extra;
          const req = {
            headers: Object.fromEntries(
              Object.entries(extra.request.headers).map(([k, v]) => [
                k,
                Array.isArray(v) ? v.join(', ') : (v ?? ''),
              ]),
            ),
          };
          const session = await getToken({
            req, // <-- always pass this object
            secret: process.env.AUTH_SECRET,
          });

          // const sessionUser = session?.user || null;
          console.log('🟢 Session from getToken in onSubscribe:', session?.user);
          /**
           * Get Yoga instance internals for subscription execution
           */
          const { schema, execute, subscribe, contextFactory } = yoga.getEnveloped({
            ...context,
            req: extra.request,
            socket: extra.socket,
          });

          /**
           * Prepare subscription execution arguments
           */
          const subscriptionArgs = {
            schema,
            operationName: message.payload?.operationName,
            document: parseGraphQL(message.payload?.query as string),
            variableValues: message.payload?.variables,
            contextValue: {
              ...(await contextFactory()),
              session,
            },
            rootValue: {
              execute,
              subscribe,
            },
          };

          /**
           * Validate subscription against schema
           */
          const errors = validate(subscriptionArgs.schema, subscriptionArgs.document);

          // Return errors if validation fails
          if (errors.length) return errors;

          // Return prepared execution args if validation passes
          return subscriptionArgs;
        },
      },
      websocketServer,
    );

    // ========================================================================
    // SERVER LISTENER
    // ========================================================================

    /**
     * Start HTTP server listening on configured port
     * Type: Promise<void>
     *
     * Waits for server to be ready before proceeding
     */
    await new Promise<void>((resolve, reject) =>
      server
        .listen(port, hostname, () => {
          console.log(`> GraphQL Server starting on http://${hostname}:${port}`);
          resolve();
        })
        .on('error', reject),
    );

    // ========================================================================
    // STARTUP MESSAGE
    // ========================================================================

    // Log server startup information
    console.log(`
    ✓ App started!
      HTTP server running on http://${hostname}:${port}
      GraphQL WebSocket server running on ws://${hostname}:${port}${graphqlEndpoint}
      Apollo Sandbox available at http://${hostname}:${port}${graphqlEndpoint}
      Running in ${development ? 'development' : 'production'} mode
      Running The Client and Server on the same port allows for seamless API integration without CORS issues.
    `);
  } catch (error: unknown) {
    console.error('Fatal error starting server:', {
      error: `${(error as Error)?.name}: ${(error as Error)?.message} from server initialization`,
      message: (error as Error)?.message,
      stack: (error as Error)?.stack,
    });
    process.exit(1);
  }
})();

// # How to Deploy and Run Your GraphQL Server on a DigitalOcean Droplet (Non-Technical Guide)

// ---

// ## Extra: Use Your Domain and Secure WebSockets (wss://)

// To use your domain (e.g., yourdomain.com) and secure WebSockets (wss://), follow these extra steps after deploying your app:

// ### 1. Point Your Domain to Your Droplet

// - In your domain provider’s dashboard, set an **A record** to your Droplet’s IP address.

// ### 2. Install Nginx and Certbot

// ```
// sudo apt update
// sudo apt install -y nginx certbot python3-certbot-nginx
// ```

// ### 3. Configure Nginx as a Reverse Proxy (with SSL)

// - Create or edit a config file for your domain:
//   ```
//   sudo nano /etc/nginx/sites-available/yourdomain.com
//   ```
// - Paste this config (replace `yourdomain.com` with your real domain):

//   ```
//   server {
//     listen 80;
//     server_name yourdomain.com;
//     # Redirect all HTTP requests to HTTPS
//     return 301 https://$host$request_uri;
//   }

//   server {
//     listen 443 ssl;
//     server_name yourdomain.com;

//     ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
//     ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
//     include /etc/letsencrypt/options-ssl-nginx.conf;
//     ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

//     location / {
//       proxy_pass http://localhost:3000;
//       proxy_http_version 1.1;
//       proxy_set_header Upgrade $http_upgrade;
//       proxy_set_header Connection "upgrade";
//       proxy_set_header Host $host;
//       proxy_cache_bypass $http_upgrade;
//     }
//   }
//   ```

// - Enable the config and restart Nginx:
//   ```
//   sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
//   sudo nginx -t
//   sudo systemctl restart nginx
//   ```

// ### 4. Get a Free SSL Certificate (HTTPS)

// ```
// sudo certbot --nginx -d yourdomain.com
// ```

// - Follow the prompts. Certbot will update your Nginx config for HTTPS.

// ### 5. Update Your Client App

// - Use these URLs in production:
//   - GraphQL HTTP: `https://yourdomain.com/api/graphql`
//   - WebSocket: `wss://yourdomain.com/api/graphql`

// ---

// This guide will help you upload and run your custom server (with `/api/graphql` endpoint) on a DigitalOcean Droplet. Just follow each step and copy-paste the commands.

// ---

// ## 1. Create a DigitalOcean Droplet

// - Go to https://cloud.digitalocean.com/droplets
// - Click **Create Droplet**
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

// ## 3. Install Node.js, npm, and Git

// - In the Droplet terminal, run:
//   ```
//   sudo apt update
//   sudo apt install -y nodejs npm git
//   ```

// ## 4. Upload Your Project

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

// ## 5. Set Environment Variables

// - In the project folder, create a file named `.env`:
//   ```
//   nano .env
//   ```
// - Add these lines (update values as needed):
//   ```
//   NODE_ENV=production
//   HOST=0.0.0.0
//   PORT=3000
//   AUTH_SECRET=your_auth_secret
//   NEXTAUTH_MEMCACHED_CLIENT=127.0.0.1:11211
//   ```
// - Press `Ctrl+O` to save, then `Ctrl+X` to exit.

// ## 6. Install Project Dependencies

// - In the project folder, run:
//   ```
//   npm install
//   ```

// ## 7. Build and Start Your App

// - Build the app:
//   ```
//   npm run build
//   ```
// - Start the app:
//   ```
//   npm start
//   ```

// ## 8. (Optional) Keep the App Running

// - To keep your app running after you close the terminal, install pm2:
//   ```
//   npm install -g pm2
//   pm2 start npm -- start
//   pm2 save
//   pm2 startup
//   ```

// ## 9. Access Your GraphQL Endpoint

// - Open your browser and go to:
//   - `http://your_droplet_ip:3000/api/graphql` (for GraphQL Playground/Apollo Sandbox)
//   - `ws://your_droplet_ip:3000/api/graphql` (for WebSocket subscriptions)

// ---

// ### Useful pm2 Commands

// - Restart app: `pm2 restart all`
// - Stop app: `pm2 stop all`

// ---

// You’re done! Your custom server (with `/api/graphql`) is now running on your DigitalOcean Droplet, with your domain and secure WebSocket (wss) support.

// If you change your server code (like `server.ts`), just repeat steps 4, 7, and 8.
