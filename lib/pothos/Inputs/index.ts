import { Prisma } from '@/lib/generated/prisma/browser';
import { GenericInputFieldRef, InputRef } from '@pothos/core';
import { builder } from '../builder';
import PrismaTypes, { getDatamodel } from '../pothos-prisma-types';

const prismaDataModel = getDatamodel();

export const createInputSuffix = 'CreateInput';
export const connectInputSuffix = 'ConnectInput'; // ✅ new
export const createOrConnectInputSuffix = 'CreateOrConnectInput'; // ✅ new
export const updateInputSuffix = 'UpdateInput';
export const pageInputSuffix = 'PageInput';
export const cursorPaginationInputSuffix = 'CursorPaginationInput';
export const updateOrConnectInputSuffix = 'UpdateOrConnectInput'; // ✅ new
export const updateOrConnectInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {}; // ✅ new
export const updateInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const createInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const pageInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const cursorPaginationInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const connectInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {}; // ✅ new
export const createOrConnectInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {}; // ✅ new
export const findByInputRefs = {} as Record<
  PrismaTypes[keyof PrismaTypes]['Name'],
  InputRef<{ key: string; value: string }>
>;
const findByInputSuffix = 'FindByInput';

export const findFirstInputRefs = {} as Record<
  PrismaTypes[keyof PrismaTypes]['Name'],
  InputRef<{ where?: Record<string, unknown> | null }>
>;
const findFirstInputSuffix = 'FindFirstInput';

export const countInputRefs = {} as Record<
  PrismaTypes[keyof PrismaTypes]['Name'],
  InputRef<{ where?: Record<string, unknown> | null }>
>;
const countInputSuffix = 'CountInput';

// ─── Step 1: Generate ConnectInput (just { id: string }) for each model ──────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const connectRef = builder.inputRef(`${modelName}${connectInputSuffix}`);
    connectInputRefs[modelName] = connectRef;
    connectRef.implement({
      description: `Input to connect an existing ${modelName} record by its unique ID. Use this when you want to link to an already existing ${modelName} without creating a new one.`,
      fields: (t) => ({
        id: t.string({
          required: true,
          description: `The unique identifier of the existing ${modelName} record to connect.`,
        }),
      }),
    });
  } catch (error) {
    console.error(`ConnectInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 2: Generate CreateOrConnectInput { create?: ..., connect?: { id } } ─
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const createOrConnectRef = builder.inputRef(`${modelName}${createOrConnectInputSuffix}`);
    createOrConnectInputRefs[modelName] = createOrConnectRef;
    createOrConnectRef.implement({
      description: `Either create a new ${modelName} record or connect to an existing one. Provide 'create' to insert a new ${modelName}, or 'connect' to link to an existing ${modelName} by ID. Do not provide both.`,
      fields: (t) => ({
        create: t.field({
          type: `${modelName}${createInputSuffix}` as never,
          required: false,
          description: `Create a new ${modelName} record and link it to the parent. Provide all required fields for ${modelName}.`,
        }),
        connect: t.field({
          type: `${modelName}${connectInputSuffix}` as never,
          required: false,
          description: `Connect an existing ${modelName} record by its unique ID instead of creating a new one.`,
        }),
      }),
    });
  } catch (error) {
    console.error(`CreateOrConnectInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 3: Generate CreateInput using CreateOrConnectInput for relations ────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const createRef = builder.inputRef(`${modelName}${createInputSuffix}`);
    createInputRefs[modelName] = createRef;
    createRef.implement({
      description: `Input fields required to create a new ${modelName} record. Required fields must be provided. Relation fields support nested create or connect.`,
      fields: (t) => {
        const model = prismaDataModel.datamodel.models[modelName];
        const fields: Record<string, GenericInputFieldRef> = {};

        model.fields.forEach((field) => {
          if (field.name === 'id' || field.name.startsWith('_')) return;

          if (field.kind === 'scalar') {
            const isRequired = field.isRequired;
            const requiredNote = isRequired ? '(Required)' : '(Optional)';
            const description = `${requiredNote} The ${field.name} of the new ${modelName}. Type: ${field.type}.`;
            switch (field.type) {
              case 'String':
                fields[field.name] = t.string({ required: isRequired, description });
                break;
              case 'Int':
                fields[field.name] = t.int({ required: isRequired, description });
                break;
              case 'Boolean':
                fields[field.name] = t.boolean({ required: isRequired, description });
                break;
              case 'DateTime':
                fields[field.name] = t.field({
                  type: 'DateTime',
                  required: isRequired,
                  description,
                });
                break;
              case 'Json':
                fields[field.name] = t.field({ type: 'Json', required: isRequired, description });
                break;
              case 'Float':
              case 'Decimal':
                fields[field.name] = t.float({ required: isRequired, description });
                break;
              default:
                fields[field.name] = t.string({ required: isRequired, description });
                break;
            }
          }

          if (field.kind === 'object') {
            const description = `(Optional) ${field.isList ? 'List of' : 'Single'} ${field.type} relation — create a new ${field.type} inline or connect to an existing one by ID.`;
            if (field.isList) {
              fields[field.name] = t.field({
                type: [`${field.type}${createOrConnectInputSuffix}`] as never,
                required: false,
                description,
              });
            } else {
              fields[field.name] = t.field({
                type: `${field.type}${createOrConnectInputSuffix}` as never,
                required: false,
                description,
              });
            }
          }
        });

        return fields;
      },
    });
  } catch (error) {
    console.error(`CreateInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 4: Generate UpdateOrConnectInput { update?: ..., connect?: { id } } ─
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const updateOrConnectRef = builder.inputRef(`${modelName}${updateOrConnectInputSuffix}`);
    updateOrConnectInputRefs[modelName] = updateOrConnectRef;
    updateOrConnectRef.implement({
      description: `Either update an existing related ${modelName} record inline or reconnect to a different ${modelName} by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing ${modelName}. Do not provide both.`,
      fields: (t) => ({
        update: t.field({
          type: `${modelName}${updateInputSuffix}` as never,
          required: false,
          description: `Update the fields of the related ${modelName} record inline. Only provided fields will be changed.`,
        }),
        connect: t.field({
          type: `${modelName}${connectInputSuffix}` as never,
          required: false,
          description: `Reconnect to a different existing ${modelName} record by its unique ID.`,
        }),
      }),
    });
  } catch (error) {
    console.error(`UpdateOrConnectInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 5: Generate UpdateInput using UpdateOrConnectInput for relations ────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const updateRef = builder.inputRef(`${modelName}${updateInputSuffix}`);
    updateInputRefs[modelName] = updateRef;
    updateRef.implement({
      description: `Input fields to update an existing ${modelName} record. All fields are optional — only provided fields will be updated.`,
      fields: (t) => {
        const model = prismaDataModel.datamodel.models[modelName];
        const fields: Record<string, GenericInputFieldRef> = {};

        model.fields.forEach((field) => {
          // if (field.name === 'id' || field.name.startsWith('_')) return;
          if (field.kind === 'scalar') {
            const description = `(Optional) Update the ${field.name} of the ${modelName}. Type: ${field.type}. Leave empty to keep existing value.`;
            switch (field.type) {
              case 'String':
                fields[field.name] = t.string({ required: false, description });
                break;
              case 'Int':
                fields[field.name] = t.int({ required: false, description });
                break;
              case 'Boolean':
                fields[field.name] = t.boolean({ required: false, description });
                break;
              case 'DateTime':
                fields[field.name] = t.field({ type: 'DateTime', required: false, description });
                break;
              case 'Json':
                fields[field.name] = t.field({ type: 'Json', required: false, description });
                break;
              case 'Float':
              case 'Decimal':
                fields[field.name] = t.float({ required: false, description });
                break;
              default:
                fields[field.name] = t.string({ required: false, description });
                break;
            }
          }

          if (field.kind === 'object') {
            const description = `(Optional) ${field.isList ? 'List of' : 'Single'} ${field.type} relation — update the related record inline or reconnect to a different ${field.type} by ID.`;
            if (field.isList) {
              fields[field.name] = t.field({
                type: [`${field.type}${updateOrConnectInputSuffix}`] as never,
                required: false,
                description,
              });
            } else {
              fields[field.name] = t.field({
                type: `${field.type}${updateOrConnectInputSuffix}` as never,
                required: false,
                description,
              });
            }
          }
        });

        return fields;
      },
    });
  } catch (error) {
    console.error(`UpdateInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 6: Generate PageInput for each Prisma model ────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const pageRef = builder.inputRef(`${modelName}${pageInputSuffix}`);
    pageInputRefs[modelName] = pageRef;
    pageInputRefs[modelName].implement({
      description: `Pagination and filtering input for querying ${modelName} records. Use this to control which page of results to return and how to filter the dataset.`,
      fields: (t) => ({
        isActive: t.boolean({
          required: true,
          description: `(Required) Filter ${modelName} records by their active status. Set to true to return only active records, false for inactive.`,
        }),
        currentPage: t.int({
          required: true,
          description: `(Required) The page number to retrieve. Starts at 1.`,
        }),
        pageSize: t.int({
          required: true,
          description: `(Required) Number of ${modelName} records to return per page.`,
        }),
        search: t.string({
          required: false,
          description: `(Optional) Search keyword to filter ${modelName} records by text fields.`,
        }),
        filter: t.field({
          type: 'Json',
          required: false,
          description: `(Optional) Advanced JSON filter to narrow down ${modelName} results. Follows Prisma where clause structure.`,
        }),
      }),
    });
  } catch (error) {
    console.error(`Model ${modelName} not found in Prisma schema. ${error}`);
  }
});

// ─── Step 7: Generate CursorPaginationInput for each Prisma model ────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const cursorPaginationRef = builder.inputRef(`${modelName}${cursorPaginationInputSuffix}`);
    cursorPaginationInputRefs[modelName] = cursorPaginationRef;
    cursorPaginationInputRefs[modelName].implement({
      description: `Pagination and filtering input for querying ${modelName} records. Use this to control which page of results to return and how to filter the dataset.`,
      fields: (t) => ({
        isActive: t.boolean({
          required: true,
          description: `(Required) Filter ${modelName} records by their active status. Set to true to return only active records, false for inactive.`,
        }),
        cursor: t.string({
          required: false,
          description: `(Optional) The cursor for pagination. Use the ID of the last record from the previous page to fetch the next set of results.`,
        }),
        direction: t.field({
          type: builder.enumType(`${modelName}PaginationDirection`, {
            values: ['forward', 'backward'],
          }),
          required: false,
          description: `(Optional) The direction for pagination. Set to 'forward' to fetch the next page of results after the cursor, or 'backward' to fetch the previous page before the cursor. Defaults to 'forward'.`,
        }),
        take: t.int({
          required: true,
          description: `(Required) Number of ${modelName} records to return. Use a positive number for 'forward' pagination and a negative number for 'backward' pagination.`,
        }),
        search: t.string({
          required: false,
          description: `(Optional) Search keyword to filter ${modelName} records by text fields.`,
        }),
        // searchFields: keyof PrismaTypes[modelName]['Shape'][] is not working, need to figure out how to get the keys of the model shape
        searchFields: t.field({
          type: [`String`] as never,
          required: false,
          description: `(Optional) Specify which text fields to apply the search keyword to. Provide an array of field names (e.g. ["name", "email"]) to search within those fields for the provided search keyword.`,
        }),
        filter: t.field({
          type: 'Json',
          required: false,
          description: `(Optional) Advanced JSON filter to narrow down ${modelName} results. Follows Prisma where clause structure.`,
        }),
      }),
    });
  } catch (error) {
    console.error(`Model ${modelName} not found in Prisma schema. ${error}`);
  }
});
// ─── Step 8: Generate FindByInput for each Prisma model────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const findByRef = builder.inputRef<{ key: string; value: string }>(
      `${modelName}${findByInputSuffix}`,
    );
    findByInputRefs[modelName as Prisma.ModelName] = findByRef;
    findByRef.implement({
      description: `Dynamic field lookup input for ${modelName}. Provide a unique field key and its value to find a single record.`,
      fields: (t) => ({
        key: t.string({
          required: true,
          description: `The unique field name to search by (e.g. "id", "email", "username").`,
        }),
        value: t.string({
          required: true,
          description: `The value to match against the provided key field.`,
        }),
      }),
    });
  } catch (error) {
    console.error(`Model ${modelName} FindByInput failed: ${error}`);
  }
});

// ─── Step 9: Generate FindFirstInput for each Prisma model────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const findFirstRef = builder.inputRef<{
      where?: { [key: string]: object | null | undefined | unknown } | null;
    }>(`${modelName}${findFirstInputSuffix}`);

    findFirstInputRefs[modelName as PrismaTypes[keyof PrismaTypes]['Name']] = findFirstRef;
    findFirstRef.implement({
      description: `Dynamic where input for finding the first matching ${modelName} record.`,
      fields: (t) => ({
        where: t.field({
          type: 'Json',
          required: true,
          description: `Prisma where clause to match against ${modelName} fields. Follows Prisma filter structure (e.g. { "email": "test@example.com" }).`,
        }),
      }),
    });
  } catch (error) {
    console.error(`Model ${modelName} FindFirstInput failed: ${error}`);
  }
});

// ─── Step 10: Generate CountInput for each Prisma model────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const countRef = builder.inputRef<{
      where?: { [key: string]: object | null | undefined | unknown } | null;
    }>(`${modelName}${countInputSuffix}`);

    countInputRefs[modelName as PrismaTypes[keyof PrismaTypes]['Name']] = countRef;
    countRef.implement({
      description: `Dynamic where input for counting ${modelName} records.`,
      fields: (t) => ({
        where: t.field({
          type: 'Json',
          required: true,
          description: `Prisma where clause to match against ${modelName} fields. Follows Prisma filter structure (e.g. { "email": "test@example.com" }).`,
        }),
      }),
    });
  } catch (error) {
    console.error(`Model ${modelName} FindFirstInput failed: ${error}`);
  }
});