import { createPubSub } from 'graphql-yoga';
import { Session } from 'next-auth';
import { rateLimiter } from './rateLimiter';

export const pubsub = createPubSub();
export type Context = {
  pubsub: typeof pubsub;
  // session: Awaited<ReturnType<typeof getServerSession>> | null;
  session: Session | null;
  rateLimiter: typeof rateLimiter;
};
