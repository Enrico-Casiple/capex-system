import { createPubSub } from 'graphql-yoga';
import { Session } from 'next-auth';
import { rateLimiter } from './rateLimiter';

export const pubsub = createPubSub();
export type Context = {
  pubsub: typeof pubsub;
  session: Session | null;
  rateLimiter: typeof rateLimiter;
};
