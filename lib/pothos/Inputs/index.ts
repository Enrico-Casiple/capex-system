import { Prisma } from '@/lib/generated/prisma/client';
import { GenericInputFieldRef, InputRef } from '@pothos/core';
import { builder } from '../builder';
import PrismaTypes, { getDatamodel } from '../pothos-prisma-types';

const prismaDataModel = getDatamodel();

export const createInputSuffix = 'CreateInput';
export const connectInputSuffix = 'ConnectInput';
export const createOrConnectInputSuffix = 'CreateOrConnectInput';
export const updateInputSuffix = 'UpdateInput';
export const pageInputSuffix = 'PageInput';
export const cursorPaginationInputSuffix = 'CursorPaginationInput';
export const updateOrConnectInputSuffix = 'UpdateOrConnectInput';
const csvExportInputSuffix = 'CsvExportInput';
export const updateOrConnectInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};

export type CreateInputRefsMap = {
  [M in Prisma.ModelName]?: InputRef<Record<string, unknown>>;
};

export type UpdateInputRefsMap = {
  [M in Prisma.ModelName]?: InputRef<Record<string, unknown>>;
};

export const updateInputRefs = {} as UpdateInputRefsMap;
export const createInputRefs = {} as CreateInputRefsMap;
export const pageInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const cursorPaginationInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const connectInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const createOrConnectInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const csvExportInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const findByInputRefs = {} as Record<
  PrismaTypes[keyof PrismaTypes]['Name'],
  InputRef<{ key: string; value: string }>
>;
export const findFirstInputRefs = {} as Record<
  PrismaTypes[keyof PrismaTypes]['Name'],
  InputRef<{ where?: { [key: string]: unknown | null | undefined } | null }>
>;

export const countInputRefs = {} as Record<
  PrismaTypes[keyof PrismaTypes]['Name'],
  InputRef<{ where?: { [key: string]: unknown | null | undefined } | null }>
>;
const findByInputSuffix = 'FindByInput';
const findFirstInputSuffix = 'FindFirstInput';
const countInputSuffix = 'CountInput';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const buildScalarField = (
  t: Parameters<Parameters<ReturnType<typeof builder.inputRef>['implement']>[0]['fields']>[0],
  field: { name: string; type: string; isList: boolean },
  _required: boolean,
  description: string,
): GenericInputFieldRef => {
  const required = false;
  if (field.isList) {
    return t.field({ type: ['String'] as never, required, description });
  }
  switch (field.type) {
    case 'String':
      return t.string({ required, description });
    case 'Int':
      return t.int({ required, description });
    case 'Float':
      return t.float({ required, description });
    case 'Boolean':
      return t.boolean({ required, description });
    case 'DateTime':
      return t.field({ type: 'DateTime', required, description });
    case 'Json':
      return t.field({ type: 'Json', required, description });
    case 'Float':
    case 'Decimal':
      return t.float({ required, description });
    default:
      return t.string({ required, description });
  }
};

const getUniqueScalarFields = (modelName: string) => {
  const model = prismaDataModel.datamodel.models[modelName];
  if (!model) return [] as Array<{ name: string; type: string; isList: boolean }>;

  return model.fields.filter(
    (field) =>
      field.kind === 'scalar' && !field.name.startsWith('_') && (field.isId || field.isUnique),
  ) as Array<{ name: string; type: string; isList: boolean }>;
};

// ─── Step 1: ConnectInput ─────────────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef(`${modelName}${connectInputSuffix}`);
    connectInputRefs[modelName] = ref;
    ref.implement({
      description: `Input to connect an existing ${modelName} record by a unique field.`,
      fields: (t) => {
        const uniqueFields = getUniqueScalarFields(modelName);
        const fields: Record<string, GenericInputFieldRef> = {};

        uniqueFields.forEach((field) => {
          fields[field.name] = buildScalarField(
            t,
            field,
            false,
            `Unique field '${field.name}' used to connect an existing ${modelName} record.`,
          );
        });

        // Fallback to id for safety if metadata doesn't report unique fields.
        if (Object.keys(fields).length === 0) {
          fields.id = t.string({
            required: false,
            description: `Unique identifier of the existing ${modelName} record to connect.`,
          });
        }

        return fields as never;
      },
    });
  } catch (error) {
    console.error(`ConnectInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 2: CreateOrConnectInput ────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef(`${modelName}${createOrConnectInputSuffix}`);
    createOrConnectInputRefs[modelName] = ref;
    ref.implement({
      description: `Prisma-style nested relation ops for ${modelName}: where/create/connect.`,
      fields: (t) => ({
        where: t.field({
          type: `${modelName}${connectInputSuffix}` as never,
          required: false,
          description: `Unique selector to locate an existing ${modelName}.`,
        }),
        create: t.field({
          type: `${modelName}${createInputSuffix}` as never,
          required: false,
          description: `Create a new ${modelName} and link it to the parent.`,
        }),
        connect: t.field({
          type: `${modelName}${connectInputSuffix}` as never,
          required: false,
          description: `Connect an existing ${modelName} by unique field(s).`,
        }),
      }),
    });
  } catch (error) {
    console.error(`CreateOrConnectInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 3: UpdateOrConnectInput ────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef(`${modelName}${updateOrConnectInputSuffix}`);
    updateOrConnectInputRefs[modelName] = ref;
    ref.implement({
      description: `Prisma-style nested update ops for ${modelName}.`,
      fields: (t) => ({
        update: t.field({
          type: `${modelName}${updateInputSuffix}` as never,
          required: false,
          description: `Update fields of the related ${modelName} record inline.`,
        }),
        create: t.field({
          type: `${modelName}${createInputSuffix}` as never,
          required: false,
          description: `Create a new related ${modelName} record inline.`,
        }),
        connect: t.field({
          type: `${modelName}${connectInputSuffix}` as never,
          required: false,
          description: `Reconnect to an existing ${modelName} by unique field(s).`,
        }),
        disconnect: t.boolean({
          required: false,
          description: `Disconnect the current related ${modelName} record.`,
        }),
      }),
    });
  } catch (error) {
    console.error(`UpdateOrConnectInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 4: CreateInput ──────────────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const typedModel = modelName as Prisma.ModelName;
    const ref = builder.inputRef<Record<string, unknown>>(`${modelName}${createInputSuffix}`);
    createInputRefs[typedModel] = ref;
    ref.implement({
      description: `Input fields required to create a new ${modelName} record.`,
      fields: (t) => {
        const model = prismaDataModel.datamodel.models[modelName];
        const fields: Record<string, GenericInputFieldRef> = {};

        model.fields.forEach((field) => {
          if (field.name === 'id' || field.name.startsWith('_')) return;

          if (field.kind === 'scalar') {
            const required = false;
            const note = '(Optional)';
            const description = `${note} The ${field.name} of the new ${modelName}. Type: ${field.type}${field.isList ? '[]' : ''}.`;
            fields[field.name] = buildScalarField(t, field, required, description);
          }

          if (field.kind === 'object') {
            const description = `(Optional) ${field.isList ? 'List of' : 'Single'} ${field.type} relation.`;
            fields[field.name] = t.field({
              type: field.isList
                ? ([`${field.type}${createOrConnectInputSuffix}`] as never)
                : (`${field.type}${createOrConnectInputSuffix}` as never),
              required: false,
              description,
            });
          }
        });

        return fields as never;
      },
    });
  } catch (error) {
    console.error(`CreateInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 5: UpdateInput ──────────────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const typedModel = modelName as Prisma.ModelName;
    const ref = builder.inputRef<Record<string, unknown>>(`${modelName}${updateInputSuffix}`);
    updateInputRefs[typedModel] = ref;
    ref.implement({
      description: `Input fields to update an existing ${modelName} record. All fields are optional.`,
      fields: (t) => {
        const model = prismaDataModel.datamodel.models[modelName];
        const fields: Record<string, GenericInputFieldRef> = {};

        model.fields.forEach((field) => {
          if (field.kind === 'scalar') {
            const description = `(Optional) Update the ${field.name} of the ${modelName}. Type: ${field.type}${field.isList ? '[]' : ''}.`;
            fields[field.name] = buildScalarField(t, field, false, description);
          }

          if (field.kind === 'object') {
            const description = `(Optional) ${field.isList ? 'List of' : 'Single'} ${field.type} relation.`;
            fields[field.name] = t.field({
              type: field.isList
                ? ([`${field.type}${updateOrConnectInputSuffix}`] as never)
                : (`${field.type}${updateOrConnectInputSuffix}` as never),
              required: false,
              description,
            });
          }
        });

        return fields as never;
      },
    });
  } catch (error) {
    console.error(`UpdateInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 6: PageInput ────────────────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef(`${modelName}${pageInputSuffix}`);
    pageInputRefs[modelName] = ref;
    ref.implement({
      description: `Pagination and filtering input for querying ${modelName} records.`,
      fields: (t) => ({
        isActive: t.boolean({ required: true, description: `Filter by active status.` }),
        currentPage: t.int({ required: true, description: `Page number. Starts at 1.` }),
        pageSize: t.int({ required: true, description: `Number of records per page.` }),
        search: t.string({ required: false, description: `Search keyword.` }),
        filter: t.field({ type: 'Json', required: false, description: `Advanced JSON filter.` }),
      }),
    });
  } catch (error) {
    console.error(`PageInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 7: CursorPaginationInput ───────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef(`${modelName}${cursorPaginationInputSuffix}`);
    cursorPaginationInputRefs[modelName] = ref;
    ref.implement({
      description: `Cursor-based pagination input for querying ${modelName} records.`,
      fields: (t) => ({
        isActive: t.boolean({ required: true, description: `Filter by active status.` }),
        cursor: t.string({ required: false, description: `Cursor from the last record.` }),
        direction: t.field({
          type: builder.enumType(`${modelName}PaginationDirection`, {
            values: ['forward', 'backward'],
          }),
          required: false,
          description: `Pagination direction.`,
        }),
        take: t.int({ required: true, description: `Number of records to return.` }),
        search: t.string({ required: false, description: `Search keyword.` }),
        searchFields: t.field({
          type: ['String'] as never,
          required: false,
          description: `Fields to search within.`,
        }),
        filter: t.field({ type: 'Json', required: false, description: `Advanced JSON filter.` }),
      }),
    });
  } catch (error) {
    console.error(`CursorPaginationInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 8: FindByInput ──────────────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef<{ key: string; value: string }>(
      `${modelName}${findByInputSuffix}`,
    );
    findByInputRefs[modelName as Prisma.ModelName] = ref;
    ref.implement({
      description: `Dynamic field lookup input for ${modelName}.`,
      fields: (t) => ({
        key: t.string({ required: true, description: `Field name to search by.` }),
        value: t.string({ required: true, description: `Value to match.` }),
      }),
    });
  } catch (error) {
    console.error(`FindByInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 9: FindFirstInput ───────────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef<{ where?: { [key: string]: unknown | null | undefined } | null }>(
      `${modelName}${findFirstInputSuffix}`,
    );
    findFirstInputRefs[modelName as PrismaTypes[keyof PrismaTypes]['Name']] = ref;
    ref.implement({
      description: `Where input for finding the first matching ${modelName} record.`,
      fields: (t) => ({
        where: t.field({ type: 'Json', required: true, description: `Prisma where clause.` }),
      }),
    });
  } catch (error) {
    console.error(`FindFirstInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 10: CountInput ──────────────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef<{ where?: { [key: string]: unknown | null | undefined } | null }>(
      `${modelName}${countInputSuffix}`,
    );
    countInputRefs[modelName as PrismaTypes[keyof PrismaTypes]['Name']] = ref;
    ref.implement({
      description: `Where input for counting ${modelName} records.`,
      fields: (t) => ({
        where: t.field({ type: 'Json', required: true, description: `Prisma where clause.` }),
      }),
    });
  } catch (error) {
    console.error(`CountInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 11: PageInput ────────────────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef(`${modelName}${csvExportInputSuffix}`);
    csvExportInputRefs[modelName] = ref;
    ref.implement({
      description: `Pagination and filtering input for querying ${modelName} records.`,
      fields: (t) => ({
        isActive: t.boolean({ required: false, description: `Filter by active status.` }),
        filter: t.field({ type: 'Json', required: false, description: `Advanced JSON filter.` }),
        searchFields: t.field({
          type: ['String'] as never,
          required: false,
          description: `Fields to search within.`,
        }),
        columns: t.field({
          type: ['String'] as never,
          required: false,
          description: `Fields to include in the CSV export.`,
        }),
        search: t.string({ required: false, description: `Search keyword.` }),
      }),
    });
  } catch (error) {
    console.error(`CsvExportInput error for ${modelName}: ${error}`);
  }
});

// ─── FormInput: Complete form-friendly inputs with all fields and relations ───────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    // const typedModel = modelName as Prisma.ModelName;
    const ref = builder.inputRef<Record<string, unknown>>(`${modelName}FormInput`);
    ref.implement({
      description: `Complete input fields for ${modelName} form. Includes all scalars and relations optimized for forms.`,
      fields: (t) => {
        const model = prismaDataModel.datamodel.models[modelName];
        const fields: Record<string, GenericInputFieldRef> = {};

        model.fields.forEach((field) => {
          // Skip only internal system fields
          if (field.name.startsWith('_')) return;

          // ✅ Include ALL scalar fields (id, timestamps, strings, numbers, booleans, dates, json)
          if (field.kind === 'scalar') {
            const description = `(Optional) The ${field.name} of the ${modelName}. Type: ${field.type}${field.isList ? '[]' : ''}.`;
            fields[field.name] = buildScalarField(t, field, false, description);
          }

          // ✅ Include BOTH foreign key ID field AND nested relation object
          if (field.kind === 'object') {
            // 1️⃣ Add the foreign key ID field (e.g., userId)
            const idField = model.fields.find(
              (f) => f.name === `${field.name}Id` && f.kind === 'scalar'
            );

            if (idField) {
              const description = `(Optional) Foreign key to connect a ${field.type} record.`;
              fields[idField.name] = buildScalarField(t, idField, false, description);
            }

            // 2️⃣ Add the direct relation input (no recursive CreateOrConnect)
            const relationDescription = `(Optional) ${field.isList ? 'List of' : 'Single'} ${field.type} relation for direct nested operations.`;
            fields[field.name] = t.field({
              type: field.isList
                ? ([`${field.type}FormInput`] as never)
                : (`${field.type}FormInput` as never),
              required: false,
              description: relationDescription,
            });
          }
        });

        return fields as never;
      },
    });
  } catch (error) {
    console.error(`FormInput error for ${modelName}: ${error}`);
  }
});
