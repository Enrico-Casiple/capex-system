// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import schema from './schema';

const config: CodegenConfig = {
  schema: printSchema(schema),
  generates: {
    //  ─── GraphQL schema as SDL (optional) ─────────────────────────────
    'schema.graphql': {
      plugins: ['schema-ast'],
    },
    //  ─── Custom API client (optional) ─────────────────────────────
    'lib/generated/api/customHookAPI/': {
      documents: ['lib/api/**/*.gql.ts', 'app/**/*.tsx'],
      preset: 'client',
      plugins: [],
    },

    // ─── TypeScript types ─────────────────────────────────────
    'lib/generated/types/generated/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        scalars: {
          DateTime: 'string | Date',
          Json: 'Record<string, unknown>',
          ID: 'string',
        },
      },
    },
  },
};

export default config;
