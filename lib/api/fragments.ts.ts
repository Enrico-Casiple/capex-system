// lib/pothos/GQL/fragments.ts
import { gql } from '@apollo/client';
import { getDatamodel } from '../pothos/pothos-prisma-types';

const prismaDataModel = getDatamodel();

export const generateFragment = (modelName: string) => {
  // ← add export
  const model = prismaDataModel.datamodel.models[modelName];
  if (!model) throw new Error(`Model ${modelName} not found`);

  const scalarFields: string[] = [];
  const relationFields: string[] = [];

  model.fields.forEach((field) => {
    if (field.name.startsWith('_')) return;

    if (field.kind === 'scalar') {
      scalarFields.push(field.name);
    }

    // if (field.kind === 'object') {
    //   // first layer of relation only — scalar fields of the related model
    //   const relatedModel = prismaDataModel.datamodel.models[field.type];
    //   if (!relatedModel) return;

    //   const relatedScalars = relatedModel.fields
    //     .filter((f) => f.kind === 'scalar' && !f.name.startsWith('_'))
    //     .map((f) => f.name)
    //     .join('\n          ');

    //   if (field.isList) {
    //     relationFields.push(`
    //     ${field.name} {
    //       ${relatedScalars}
    //     }`);
    //   } else {
    //     relationFields.push(`
    //     ${field.name} {
    //       ${relatedScalars}
    //     }`);
    //   }
    // }
  });

  const fragmentName = `${modelName}Fragment`;
  const fragmentBody = [...scalarFields, ...relationFields].join('\n        ');

  const fragment = gql`
    fragment ${fragmentName} on ${modelName} {
      ${fragmentBody}
    }
  `;

  return { fragment, fragmentName };
};

// auto-generate all fragments
export const fragments = Object.fromEntries(
  Object.keys(prismaDataModel.datamodel.models).map((modelName) => [
    modelName,
    generateFragment(modelName),
  ]),
);
