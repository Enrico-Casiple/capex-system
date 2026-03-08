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
import { getSession } from 'next-auth/react';
import { parse } from 'url';
import type { WebSocket } from 'ws';
import { WebSocketServer } from 'ws';
import { rateLimiter } from '../pothos/rateLimiter';
import schema from '../pothos/schema';
import { pubsub } from '../pothos/subscription';

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
  context: async () => {
    // Get session from the request headers instead of calling auth()
    // auth() uses AsyncLocalStorage which isn't available in Yoga's context
    // const request = yogaContext.request as unknown as IncomingMessage;
    const session = await getSession();

    return { pubsub, rateLimiter, session };
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
            contextValue: await contextFactory(),
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

// function parseSessionFromRequest(request: IncomingMessage) {
//   try {
//     // Try to extract from authorization header first (preferred for JWT)
//     const authHeader = request.headers.authorization || '';
//     if (authHeader.startsWith('Bearer ')) {
//       const token = authHeader.slice(7);

//       // Verify and decode JWT
//       const secret = process.env.NEXTAUTH_SECRET || 'HelloWorld';
//       const decoded = jwt.verify(token, secret) as Record<string, unknown>;

//       return decoded;
//     }

//     // Fallback: try to extract session from cookies
//     const cookies = request.headers.cookie || '';
//     const sessionCookie = cookies.split(';').find((cookie) => cookie.trim().startsWith('session='));

//     if (sessionCookie) {
//       const sessionValue = sessionCookie.split('=')[1];
//       return JSON.parse(decodeURIComponent(sessionValue));
//     }

//     // Return null if no session found
//     return null;
//   } catch (error) {
//     console.warn('Failed to parse session from request:', error);
//     return null;
//   }
// }
