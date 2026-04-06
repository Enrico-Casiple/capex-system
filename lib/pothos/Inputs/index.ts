import { Prisma } from '@/lib/generated/prisma/browser';
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
export const updateOrConnectInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const updateInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const createInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const pageInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const cursorPaginationInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const connectInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
export const createOrConnectInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};
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
  required: boolean,
  description: string,
): GenericInputFieldRef => {
  if (field.isList) {
    return t.field({ type: ['String'] as never, required, description });
  }
  switch (field.type) {
    case 'String':
      return t.string({ required, description });
    case 'Int':
      return t.int({ required, description });
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

// ─── Step 1: ConnectInput ─────────────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef(`${modelName}${connectInputSuffix}`);
    connectInputRefs[modelName] = ref;
    ref.implement({
      description: `Input to connect an existing ${modelName} record by its unique ID.`,
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

// ─── Step 2: CreateOrConnectInput ────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef(`${modelName}${createOrConnectInputSuffix}`);
    createOrConnectInputRefs[modelName] = ref;
    ref.implement({
      description: `Either create a new ${modelName} or connect to an existing one.`,
      fields: (t) => ({
        create: t.field({
          type: `${modelName}${createInputSuffix}` as never,
          required: false,
          description: `Create a new ${modelName} record and link it to the parent.`,
        }),
        connect: t.field({
          type: `${modelName}${connectInputSuffix}` as never,
          required: false,
          description: `Connect an existing ${modelName} record by its unique ID.`,
        }),
      }),
    });
  } catch (error) {
    console.error(`CreateOrConnectInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 3: CreateInput ──────────────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef(`${modelName}${createInputSuffix}`);
    createInputRefs[modelName] = ref;
    ref.implement({
      description: `Input fields required to create a new ${modelName} record.`,
      fields: (t) => {
        const model = prismaDataModel.datamodel.models[modelName];
        const fields: Record<string, GenericInputFieldRef> = {};

        model.fields.forEach((field) => {
          if (field.name === 'id' || field.name.startsWith('_')) return;

          if (field.kind === 'scalar') {
            const required = field.isRequired;
            const note = required ? '(Required)' : '(Optional)';
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

        return fields;
      },
    });
  } catch (error) {
    console.error(`CreateInput error for ${modelName}: ${error}`);
  }
});

// ─── Step 4: UpdateOrConnectInput ────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef(`${modelName}${updateOrConnectInputSuffix}`);
    updateOrConnectInputRefs[modelName] = ref;
    ref.implement({
      description: `Either update an existing related ${modelName} inline or reconnect to a different one.`,
      fields: (t) => ({
        update: t.field({
          type: `${modelName}${updateInputSuffix}` as never,
          required: false,
          description: `Update the fields of the related ${modelName} record inline.`,
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

// ─── Step 5: UpdateInput ──────────────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef(`${modelName}${updateInputSuffix}`);
    updateInputRefs[modelName] = ref;
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

        return fields;
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
    // Step 9
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
    // Step 10
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
