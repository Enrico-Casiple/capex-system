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

    if (field.kind === 'object') {
      // first layer of relation only — scalar fields of the related model
      const relatedModel = prismaDataModel.datamodel.models[field.type];
      if (!relatedModel) return;

      const relatedScalars = relatedModel.fields
        .filter((f) => f.kind === 'scalar' && !f.name.startsWith('_'))
        .map((f) => f.name)
        .join('\n          ');

      if (field.isList) {
        relationFields.push(`
        ${field.name} {
          ${relatedScalars}
        }`);
      } else {
        relationFields.push(`
        ${field.name} {
          ${relatedScalars}
        }`);
      }
    }
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


// export const generateFragment = (modelName: string, depth: number = 3) => {
//   const model = prismaDataModel.datamodel.models[modelName];
//   if (!model) throw new Error(`Model ${modelName} not found`);

//   const scalarFields: string[] = [];
//   const relationFields: string[] = [];

//   const processFields = (fields: any[], currentDepth: number) => {
//     if (currentDepth === 0) return;

//     fields.forEach((field) => {
//       if (field.name.startsWith('_')) return;

//       if (field.kind === 'scalar') {
//         scalarFields.push(field.name);
//       }

//       if (field.kind === 'object' && currentDepth > 1) {
//         const relatedModel = prismaDataModel.datamodel.models[field.type];
//         if (!relatedModel) return;

//         const relatedScalars = relatedModel.fields
//           .filter((f) => f.kind === 'scalar' && !f.name.startsWith('_'))
//           .map((f) => f.name)
//           .join('\n          ');

//         const nestedRelations = relatedModel.fields
//           .filter((f) => f.kind === 'object' && currentDepth > 2)
//           .map((f) => {
//             const nestedModel = prismaDataModel.datamodel.models[f.type];
//             if (!nestedModel) return '';
//             const nestedScalars = nestedModel.fields
//               .filter((nf) => nf.kind === 'scalar' && !nf.name.startsWith('_'))
//               .map((nf) => nf.name)
//               .join('\n            ');
//             return `${f.name} {\n            ${nestedScalars}\n          }`;
//           })
//           .filter(Boolean)
//           .join('\n          ');

//         relationFields.push(`
//         ${field.name} {
//           ${relatedScalars}
//           ${nestedRelations}
//         }`);
//       }
//     });
//   };

//   processFields([...model.fields], depth);

//   const fragmentName = `${modelName}Fragment`;
//   const fragmentBody = [...scalarFields, ...relationFields].join('\n        ');

//   const fragment = gql`
//     fragment ${fragmentName} on ${modelName} {
//       ${fragmentBody}
//     }
//   `;

//   return { fragment, fragmentName };
// };