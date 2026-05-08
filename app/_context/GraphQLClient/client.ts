import { Query } from '@/lib/generated/api/customHookAPI/graphql';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition, Observable } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

// ============================================================================
// CLIENT CONFIGURATION
// ============================================================================

const isDevelopment = process.env.NODE_ENV === 'development';
const protocol = isDevelopment ? 'ws' : 'wss';
const httpProtocol = isDevelopment ? 'http' : 'https';
const graphqlEndpoint = '/api/graphql';

// ─── Separate host resolution for HTTP vs WS ──────────────────
const getHost = () => (typeof window !== 'undefined' ? window.location.host : `localhost:${process.env.NEXT_PUBLIC_PORT || process.env.NEXTAUTH_PORT || 4000}`);

// ============================================================================
// HTTP LINK (for queries & mutations)
// ============================================================================

const httpLink = new HttpLink({
  uri: () => `${httpProtocol}://${getHost()}${graphqlEndpoint}`,
  credentials: 'include',
});

// ============================================================================
// WEBSOCKET LINK (for subscriptions)
// ============================================================================

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
  : httpLink;

// ============================================================================
// CACHE POLICY
// ============================================================================

const paginatedField = {
  keyArgs: false as const,
  merge(existing: unknown[] = [], incoming: unknown[]) {
    return [...existing, ...incoming];
  },
};

const findAllKeys: Array<keyof Query> = (Object.keys({} as Query) as Array<keyof Query>).filter(
  (key) => String(key).endsWith('FindAllWithCursor'),
);

const paginatedFields = Object.fromEntries(findAllKeys.map((key) => [key, paginatedField]));

// ──────────────────────────────────────────────────────────────
//  AUTH LINK (for attaching session token to requests)
// ──────────────────────────────────────────────────────────────
const authLink = new ApolloLink((operation, forward) => {
  const getToken = async (): Promise<string | null> => {
    let token: string | null = null;

    // ─── Server-side only: Use cookies() ─────────────────────
    if (typeof window === 'undefined') {
      try {
        // Dynamically import only on server
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        token = cookieStore.get('authjs.session-token')?.value || 
                cookieStore.get('__Secure-authjs.session-token')?.value ||
                null;
        console.log('🔍 [Server] Token from cookies:', token )
        console.log('🔍 [Server] Token from cookies:', token ? 'Found' : 'Not found');
      } catch (cookieError) {
        console.warn('⚠️ Could not read cookies:', cookieError);
      }
    }

    return token;
  };

  return new Observable((observer) => {
    getToken().then((token) => {
      const operationContext = operation.operationName || 'Unnamed Operation';
      console.log('🔍 Operation Context:', operationContext);


      if (token) {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          },
        }));
        console.log('✅ Authorization header attached for operation:', operationContext);
      }

      forward(operation).subscribe(observer);
    }).catch((error: Error) => {
      console.error('❌ Error in authLink:', error);
      forward(operation).subscribe(observer);
    });
  });
});

// ============================================================================
// APOLLO CLIENT
// ============================================================================

const composeLink = wsLink ? ApolloLink.from([authLink, splitLink]) : ApolloLink.from([authLink, httpLink]);

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: composeLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: paginatedFields,
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});