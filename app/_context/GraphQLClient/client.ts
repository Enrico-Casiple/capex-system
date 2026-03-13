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
const host = typeof window !== 'undefined' ? window.location.host : 'localhost:3000';
const graphqlEndpoint = '/api/graphql';

// ============================================================================
// HTTP LINK (for queries & mutations)
// ============================================================================

const httpLink = new HttpLink({
  uri: `${httpProtocol}://${host}${graphqlEndpoint}`,
  credentials: 'include', // Include cookies for session
});

// ============================================================================
// WEBSOCKET LINK (for subscriptions)
// ============================================================================

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${protocol}://${host}${graphqlEndpoint}`,
    // connectionParams: async () => {
    //   const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    //   return {
    //     authorization: token ? `Bearer ${token}` : '',
    //   };
    // },
    shouldRetry: () => true,
    retryAttempts: 5,
    keepAlive: 30_000, // ping server every 30s
  }),
);

// ============================================================================
// SPLIT LINK (route based on operation type)
// ============================================================================

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

// // ============================================================================
// // AuthLink LINK (route based on operation type)
// // ============================================================================

// const authLink = new ApolloLink((operation, forward) => {
//   const token = typeof window !== 'undefined' ? getSessionTokenCookie() : null;
//   console.log('🔍 Retrieved session token for operation:', token ? 'Token found' : 'No token');

//   const operationContext = operation.operationName || 'Unnamed Operation';
//   console.log('🔍 Operation Context:', operationContext);

//   const PUBLIC_OPERATIONS = ['UserLogin'];
//   if (!PUBLIC_OPERATIONS.includes(operationContext) && !token) {
//     console.warn(`⚠️ Attempting to execute "${operationContext}" without a session token.`);
//     // throw new Error(`Unauthorized: No session token found for operation "${operationContext}".`);
//   }

//   // Only set the Authorization header if token exists
//   if (token) {
//     operation.setContext(({ headers = {} }) => ({
//       headers: {
//         ...headers,
//         authorization: `Bearer ${token}`,
//       },
//     }));
//   }

//   return forward(operation);
// });

// ============================================================================
// APOLLO CLIENT
// ============================================================================

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});
