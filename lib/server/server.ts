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

export const config = { api: { bodyParser: false } };

// ============================================================================
// CONFIGURATION
// ============================================================================
const development: boolean = process.env.NODE_ENV === 'development';
const hostname: string = process.env.HOST || 'localhost';
const port: number = parseInt(process.env.PORT || '3000', 10);
const app = next({ dev: development, hostname, port });
const graphqlEndpoint: string = '/api/graphql';


// ============================================================================
// GRAPHQL YOGA
// ============================================================================

const yoga = createYoga({
  schema,
  graphqlEndpoint,
  context: async ({ request }) => {
    let session = null;
    let cookie = null;
    if (request) {
      session = await getToken({ req: request, secret: process.env.AUTH_SECRET });
      cookie = ensureBearerFromSessionCookie(request);
    }
    console.log('🟢 Session from getToken in Yoga context:', session?.user);
    console.log('🍪 Cookies in Yoga context:', `Bearer ${cookie}`);
    return { pubsub, rateLimiter, session };
  },
  graphiql: { subscriptionsProtocol: 'WS' },
  renderGraphiQL: renderApolloSandbox({ endpointIsEditable: development }),
});

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Extra {
  request: IncomingMessage;
  socket: WebSocket;
}

// ============================================================================
// MAIN SERVER INITIALIZATION
// ============================================================================

(async () => {
  try {
    await app.prepare();
    const handle = app.getRequestHandler();
    const upgradeHandler = app.getUpgradeHandler();

    // ─── HTTP Server ───────────────────────────────────────────
    const server = createServer(async (request: IncomingMessage, response): Promise<void> => {
      try {
        const url = parse(request.url || '', true);
        if (url.pathname?.startsWith(graphqlEndpoint)) {
          await yoga(request, response);
        } else {
          await handle(request, response, url);
        }
      } catch (error: unknown) {
        console.error(`Error handling request from ${request?.socket?.remoteAddress}:`, {
          url: request?.url,
          method: request?.method,
          error,
        });
        response.writeHead(500).end('Server Error from custom server');
      }
    });

    // ─── WebSocket Server (noServer — manual upgrade routing) ──
    const websocketServer = new WebSocketServer({ noServer: true });

    // ─── WebSocket Upgrade Router ──────────────────────────────
    // Separates Next.js HMR WebSocket from GraphQL WebSocket
    // to prevent HMR connection failures in development
    server.on('upgrade', (request, socket, head) => {
      const { pathname } = parse(request.url || '');

      // Next.js HMR — let Next.js handle it
      if (pathname?.startsWith('/_next/webpack-hmr')) {
        upgradeHandler(request, socket, head);
        return;
      }

      // GraphQL subscriptions — let graphql-ws handle it
      if (pathname?.startsWith(graphqlEndpoint)) {
        websocketServer.handleUpgrade(request, socket, head, (ws) => {
          websocketServer.emit('connection', ws, request);
        });
        return;
      }

      // Unknown upgrade request — reject
      socket.destroy();
    });

    // ─── graphql-ws Server ─────────────────────────────────────
    useServer(
      {
        execute: (args: ExecutionArgs): OperationResult => {
          return (args.rootValue as { execute: (args: ExecutionArgs) => OperationResult }).execute(
            args,
          );
        },
        subscribe: (args: ExecutionArgs): OperationResult => {
          return (
            args.rootValue as { subscribe: (args: ExecutionArgs) => OperationResult }
          ).subscribe(args);
        },
        onSubscribe: async (
          context: Context<Record<string, unknown> | undefined, Extra>,
          message: SubscribeMessage,
        ) => {
          const extra = context.extra as Extra;
          const req = {
            headers: Object.fromEntries(
              Object.entries(extra.request.headers).map(([k, v]) => [
                k,
                Array.isArray(v) ? v.join(', ') : (v ?? ''),
              ]),
            ),
          };

          const session = await getToken({ req, secret: process.env.AUTH_SECRET });
          console.log('🟢 Session from getToken in onSubscribe:', session?.user);

          const { schema, execute, subscribe, contextFactory } = yoga.getEnveloped({
            ...context,
            req: extra.request,
            socket: extra.socket,
          });

          const subscriptionArgs = {
            schema,
            operationName: message.payload?.operationName,
            document: parseGraphQL(message.payload?.query as string),
            variableValues: message.payload?.variables,
            contextValue: {
              ...(await contextFactory()),
              session,
            },
            rootValue: { execute, subscribe },
          };

          const errors = validate(subscriptionArgs.schema, subscriptionArgs.document);
          if (errors.length) return errors;
          return subscriptionArgs;
        },
      },
      websocketServer,
    );

    // ─── Start Server ──────────────────────────────────────────
    await new Promise<void>((resolve, reject) =>
      server
        .listen(port, hostname, () => {
          console.log(`> GraphQL Server starting on http://${hostname}:${port}`);
          resolve();
        })
        .on('error', reject),
    );

    console.log(`
    ✓ App started!
      HTTP:        http://${hostname}:${port}
      GraphQL WS:  ws://${hostname}:${port}${graphqlEndpoint}
      Sandbox:     http://${hostname}:${port}${graphqlEndpoint}
      Mode:        ${development ? 'development' : 'production'}
    `);
  } catch (error: unknown) {
    console.error('Fatal error starting server:', {
      error: `${(error as Error)?.name}: ${(error as Error)?.message}`,
      stack: (error as Error)?.stack,
    });
    process.exit(1);
  }
})();

// ============================================================================
// DEPLOYMENT GUIDE (DigitalOcean)
// ============================================================================

// 1. Create Droplet → Ubuntu → set SSH key
// 2. ssh root@your_droplet_ip
// 3. sudo apt update && sudo apt install -y nodej     root@your_droplet_ip:/root/ && unzip it
// 5. Create .env: NODE_ENV=production HOST=0.0.0.0 PORT=3000 AUTH_SECRET=xxx
// 6. npm install && npm run build && npm start
// 7. (Optional) pm2: npm i -g pm2 && pm2 start npm -- start && pm2 save && pm2 startup

// ── SSL + Domain (Nginx) ──────────────────────────────────────────────────────
// sudo apt install -y nginx certbot python3-certbot-nginx
// sudo nano /etc/nginx/sites-available/yourdomain.com
//
// server {
//   listen 80;
//   server_name yourdomain.com;
//   return 301 https://$host$request_uri;
// }
// server {
//   listen 443 ssl;
//   server_name yourdomain.com;
//   ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
//   ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
//   location / {
//     proxy_pass http://localhost:3000;
//     proxy_http_version 1.1;
//     proxy_set_header Upgrade $http_upgrade;
//     proxy_set_header Connection "upgrade";
//     proxy_set_header Host $host;
//     proxy_cache_bypass $http_upgrade;
//   }
// }
//
// sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
// sudo nginx -t && sudo systemctl restart nginx
// sudo certbot --nginx -d yourdomain.com
