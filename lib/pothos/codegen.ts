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
      documents: ['lib/api/**/*.gql.ts', 'lib/api/custom/**/*.ts', 'app/**/*.tsx'],
      preset: 'client',
      plugins: [],
    },
    // ─── Zod for the Client (optional) ─────────────────────────────
    'lib/generated/zod/client.ts': {
      plugins: ['typescript', 'typescript-validation-schema'],
      config: {
        schema: 'zodv4',
        strictScalars: false,
        scalars: {
          DateTime: 'string | Date',
          Json: 'Record<string, unknown>',
          ID: 'string',
        },
      }
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
     // ─── FORM TYPES (Pure TypeScript - Simple Scalars) ─────
    // 'lib/generated/types/form-input.ts': {
    //   plugins: ['typescript'],
    //   config: {
    //     scalars: {
    //       DateTime: 'string',
    //       Json: 'Record<string, unknown>',
    //       ID: 'string',
    //       String: 'string',
    //       Boolean: 'boolean',
    //       Int: 'number',
    //       Float: 'number',
    //     },
    //     useTypeImports: true,
    //     declarationKind: 'type',
    //     avoidOptionals: false,
    //     enumsAsConst: true,
    //     strictScalars: true,
    //     typesPrefix: '',
    //     typesSuffix: '',
    //   },
    // },
  },
};

export default config;
