import { FieldMap } from '@pothos/core';
import { builder } from '../builder';
import PrismaTypes, { getDatamodel } from '../pothos-prisma-types';

const prismaDataModel = getDatamodel();

// Prisma Models Object
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    builder.prismaObject(modelName as keyof PrismaTypes, {
      description: `Represents a ${modelName} record in the database.`,
      fields: (t) => {
        const model = prismaDataModel.datamodel.models[modelName];
        const fields: FieldMap = {};

        model.fields.forEach((field) => {
          const fieldName = field.name as string;
          const isNullable = !field.isRequired;
          // const isNullable = true; // For better compatibility with optional fields in the frontend, we treat all fields as nullable. This allows us to handle cases where data might be missing without causing errors. In practice, you can adjust this logic to reflect the actual nullability of fields based on your application's needs.
          const nullableNote = isNullable ? '(Optional)' : '(Required)';

          // Skip private fields starting with _ except id
          if (fieldName.startsWith('_') && fieldName !== 'id') return;

          if (fieldName === 'id') {
            fields[fieldName] = t.exposeID(fieldName, {
              nullable: isNullable,
              description: `Unique identifier of the ${modelName} record.`,
            });
            return;
          }

          if (field.kind === 'scalar') {
            switch (field.type) {
              case 'String':
                if (field.isList) {
                  fields[fieldName] = t.field({
                    type: ['String'],
                    nullable: isNullable,
                    resolve: (parent) =>
                      (parent as unknown as Record<string, string[]>)[fieldName] ?? [],
                    description: `${nullableNote} ${fieldName} field of ${modelName}. Type: String[].`,
                  });
                } else {
                  fields[fieldName] = t.exposeString(fieldName as never, {
                    nullable: isNullable,
                    description: `${nullableNote} ${fieldName} field of ${modelName}. Type: String.`,
                  });
                }
                break;

              case 'Int':
                fields[fieldName] = t.exposeInt(fieldName as never, {
                  nullable: isNullable,
                  description: `${nullableNote} ${fieldName} field of ${modelName}. Type: Integer.`,
                });
                break;
              case 'Float':
                fields[fieldName] = t.exposeFloat(fieldName as never, {
                  nullable: isNullable,
                  description: `${nullableNote} ${fieldName} field of ${modelName}. Type: Float.`,
                });
                break;
              case 'Boolean':
                fields[fieldName] = t.exposeBoolean(fieldName as never, {
                  nullable: isNullable,
                  description: `${nullableNote} ${fieldName} field of ${modelName}. Type: Boolean.`,
                });
                break;
              case 'DateTime':
                fields[fieldName] = t.expose(fieldName as never, {
                  type: 'DateTime',
                  nullable: isNullable,
                  description: `${nullableNote} ${fieldName} field of ${modelName}. Type: DateTime (ISO 8601).`,
                });
                break;
              case 'Json':
                fields[fieldName] = t.expose(fieldName as never, {
                  type: 'Json',
                  nullable: isNullable,
                  description: `${nullableNote} ${fieldName} field of ${modelName}. Type: JSON object.`,
                });
                break;
              default:
                fields[fieldName] = t.exposeString(fieldName as never, {
                  nullable: isNullable,
                  description: `${nullableNote} ${fieldName} field of ${modelName}. Type: ${field.type}.`,
                });
                break;
            }
          }

          if (field.kind === 'object') {
            if (field.isList) {
              fields[fieldName] = t.relation(fieldName as never, {
                nullable: isNullable,
                description: `(Optional) List of related ${field.type} records linked to this ${modelName}.`,
              });
            } else {
              fields[fieldName] = t.relation(fieldName as never, {
                nullable: isNullable,
                description: `${nullableNote} Related ${field.type} record linked to this ${modelName}.`,
              });
            }
          }
        });

        return fields;
      },
    });
  } catch (error) {
    return {
      code: 'MODEL_NOT_FOUND',
      message: `Model ${modelName} not found in Prisma schema. ${error}`,
      success: false,
    };
  }
});
