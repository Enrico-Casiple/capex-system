import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import PrismaUtils from '@pothos/plugin-prisma-utils';
import { GraphQLDateTime, GraphQLJSON } from 'graphql-scalars';
import { Session } from 'next-auth';
import { prisma } from '../prisma/prisma';
import PrismaTypes, { getDatamodel } from './pothos-prisma-types';
import { rateLimiter } from './rateLimiter';
import { pubsub } from './subscription';

export const builder = new SchemaBuilder<{
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
    Json: {
      Input: Record<string, unknown>;
      Output: Record<string, unknown>;
    };
  };
  PrismaTypes: PrismaTypes;
  Context: {
    pubsub: typeof pubsub;
    session: Session | null;
    rateLimiter: typeof rateLimiter;
  };
}>({
  plugins: [PrismaPlugin, PrismaUtils],
  prisma: {
    client: prisma,
    dmmf: getDatamodel(),
    filterConnectionTotalCount: true,
    onUnusedQuery: process.env.NODE_ENV === 'production' ? null : 'warn',
  },
});

builder.addScalarType('DateTime', GraphQLDateTime);
builder.addScalarType('Json', GraphQLJSON);
