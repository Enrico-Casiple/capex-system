// import { Query } from '@/lib/generated/api/graphql';
// import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { getMainDefinition } from '@apollo/client/utilities';
// import { createClient } from 'graphql-ws';

// // ============================================================================
// // CLIENT CONFIGURATION
// // ============================================================================

// const isDevelopment = process.env.NODE_ENV === 'development';
// const protocol = isDevelopment ? 'ws' : 'wss';
// const httpProtocol = isDevelopment ? 'http' : 'https';
// const host = typeof window !== 'undefined' ? window.location.host : 'localhost:3000';
// const graphqlEndpoint = '/api/graphql';

// // ============================================================================
// // HTTP LINK (for queries & mutations)
// // ============================================================================

// const httpLink = new HttpLink({
//   uri: `${httpProtocol}://${host}${graphqlEndpoint}`,
//   credentials: 'include', // Include cookies for session
// });

// // ============================================================================
// // WEBSOCKET LINK (for subscriptions)
// // ============================================================================

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: `${protocol}://${host}${graphqlEndpoint}`,
//     // connectionParams: async () => {
//     //   const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
//     //   return {
//     //     authorization: token ? `Bearer ${token}` : '',
//     //   };
//     // },
//     shouldRetry: () => true,
//     retryAttempts: 5,
//     keepAlive: 30_000, // ping server every 30s
//   }),
// );

// // ============================================================================
// // SPLIT LINK (route based on operation type)
// // ============================================================================

// const splitLink = ApolloLink.split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
//   },
//   wsLink,
//   httpLink,
// );

// // // ============================================================================
// // // AuthLink LINK (route based on operation type)
// // // ============================================================================

// // const authLink = new ApolloLink((operation, forward) => {
// //   const token = typeof window !== 'undefined' ? getSessionTokenCookie() : null;
// //   console.log('🔍 Retrieved session token for operation:', token ? 'Token found' : 'No token');

// //   const operationContext = operation.operationName || 'Unnamed Operation';
// //   console.log('🔍 Operation Context:', operationContext);

// //   const PUBLIC_OPERATIONS = ['UserLogin'];
// //   if (!PUBLIC_OPERATIONS.includes(operationContext) && !token) {
// //     console.warn(`⚠️ Attempting to execute "${operationContext}" without a session token.`);
// //     // throw new Error(`Unauthorized: No session token found for operation "${operationContext}".`);
// //   }

// //   // Only set the Authorization header if token exists
// //   if (token) {
// //     operation.setContext(({ headers = {} }) => ({
// //       headers: {
// //         ...headers,
// //         authorization: `Bearer ${token}`,
// //       },
// //     }));
// //   }

// //   return forward(operation);
// // });

// // ============================================================================
// // APOLLO CLIENT
// // ============================================================================

// const paginatedField = {
//   keyArgs: false as const,
//   merge(existing: unknown[] = [], incoming: unknown[]) {
//     return [...existing, ...incoming];
//   },
// };

// const paginatedFields = Object.fromEntries(
//   (Object.keys({} as Query) as Array<keyof Query>)
//     .filter((key) => key.endsWith('FindAll'))
//     .map((key) => [key, paginatedField]),
// );

// export const client = new ApolloClient({
//   ssrMode: typeof window === 'undefined',
//   link: splitLink,
//   cache: new InMemoryCache({
//     typePolicies: {
//       Query: {
//         fields: paginatedFields,
//       },
//     },
//   }),
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: 'cache-first',
//     },
//     query: {
//       fetchPolicy: 'network-only',
//     },
//   },
// });

import { Query } from '@/lib/generated/api/customHookAPI/graphql';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

// ============================================================================
// CLIENT CONFIGURATION
// ============================================================================

const isDevelopment = process.env.NODE_ENV === 'development';
const protocol = isDevelopment ? 'ws' : 'wss';
const httpProtocol = isDevelopment ? 'http' : 'https';
const graphqlEndpoint = '/api/graphql';

// ─── Separate host resolution for HTTP vs WS ──────────────────
// Avoids conflict with Next.js HMR WebSocket on the same host
const getHost = () => (typeof window !== 'undefined' ? window.location.host : 'localhost:3000');

// ============================================================================
// HTTP LINK (for queries & mutations)
// ============================================================================

const httpLink = new HttpLink({
  uri: () => `${httpProtocol}://${getHost()}${graphqlEndpoint}`, // ← lazy eval
  credentials: 'include',
});

// ============================================================================
// WEBSOCKET LINK (for subscriptions)
// ============================================================================

// ─── Only initialize wsLink on the client side ────────────────
const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: `${protocol}://${getHost()}${graphqlEndpoint}`,
          shouldRetry: () => true,
          retryAttempts: 5,
          keepAlive: 30_000,
          on: {
            connected: () => console.log('🔌 GraphQL WS connected'),
            closed: () => console.log('🔌 GraphQL WS closed'),
            error: (err) => console.error('🔌 GraphQL WS error:', err),
          },
        }),
      )
    : null;

// ============================================================================
// SPLIT LINK (route based on operation type)
// ============================================================================

const splitLink = wsLink
  ? ApolloLink.split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink,
    )
  : httpLink; // ← SSR fallback — no WS on server

// ============================================================================
// CACHE POLICY
// ============================================================================

const paginatedField = {
  keyArgs: false as const,
  merge(existing: unknown[] = [], incoming: unknown[]) {
    return [...existing, ...incoming];
  },
};

// ─── Only map FindAll queries — runtime safe ──────────────────
const findAllKeys: Array<keyof Query> = (Object.keys({} as Query) as Array<keyof Query>).filter(
  (key) => String(key).endsWith('FindAllWithCursor'),
);

const paginatedFields = Object.fromEntries(findAllKeys.map((key) => [key, paginatedField]));

// ============================================================================
// APOLLO CLIENT
// ============================================================================

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: paginatedFields,
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first', // ← use cache, no unnecessary refetch
    },
    query: {
      fetchPolicy: 'cache-first', // ← consistent with watchQuery
      errorPolicy: 'all', // ← return partial data on error
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
