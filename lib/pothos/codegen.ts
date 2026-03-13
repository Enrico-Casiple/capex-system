// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import schema from './schema';

const config: CodegenConfig = {
  schema: printSchema(schema),
  generates: {
    'schema.graphql': {
      plugins: ['schema-ast'],
    },
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
