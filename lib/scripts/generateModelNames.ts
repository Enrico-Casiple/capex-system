import { mkdirSync, writeFileSync } from 'fs';
import { getDatamodel } from '../pothos/pothos-prisma-types';

const modelNames = Object.keys(getDatamodel().datamodel.models).sort();

const content = `/* auto-generated */
export const MODEL_NAMES = ${JSON.stringify(modelNames, null, 2)} as const;

export type ModelName = (typeof MODEL_NAMES)[number];

export const MODEL_NAME_ENUM: Record<ModelName, ModelName> = Object.freeze(
  Object.fromEntries(MODEL_NAMES.map((name) => [name, name])) as Record<ModelName, ModelName>
);
`;

mkdirSync('lib/generated', { recursive: true });
writeFileSync('lib/generated/model-names.ts', content);

console.log('Generated lib/generated/model-names.ts');
