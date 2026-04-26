/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '../../../generated/prisma/client/client';
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

// ─── Step 11: CsvExportInput ────────────────────────────────────────────────────────
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
    const ref = builder.inputRef<Record<string, unknown>>(`${modelName}FormInput`);
    ref.implement({
      description: `Complete input fields for ${modelName} form. Includes all scalars and relations optimized for forms.`,
      fields: (t) => {
        const model = prismaDataModel.datamodel.models[modelName];
        const fields: Record<string, GenericInputFieldRef> = {};

        model.fields.forEach((field) => {
          if (field.name.startsWith('_')) return;

          if (field.kind === 'scalar') {
            const description = `(Optional) The ${field.name} of the ${modelName}. Type: ${field.type}${field.isList ? '[]' : ''}.`;
            fields[field.name] = buildScalarField(t, field, false, description);
          }

          if (field.kind === 'object') {
            const idField = model.fields.find(
              (f) => f.name === `${field.name}Id` && f.kind === 'scalar'
            );

            if (idField) {
              const description = `(Optional) Foreign key to connect a ${field.type} record.`;
              fields[idField.name] = buildScalarField(t, idField, false, description);
            }

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

// ─── Initialize all input refs (CREATE ONLY, DON'T IMPLEMENT) ─────────────────
const inputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};

Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  inputRefs[`${modelName}ConnectInput`] = builder.inputRef(`${modelName}ConnectInput`);
  inputRefs[`${modelName}ConnectOrCreateInput`] = builder.inputRef(`${modelName}ConnectOrCreateInput`);
  inputRefs[`${modelName}CreateOneNestedInput`] = builder.inputRef(`${modelName}CreateOneNestedInput`);
  inputRefs[`${modelName}UpdateOneNestedInput`] = builder.inputRef(`${modelName}UpdateOneNestedInput`);
  inputRefs[`${modelName}CreateManyNestedInput`] = builder.inputRef(`${modelName}CreateManyNestedInput`);
  inputRefs[`${modelName}UpdateManyNestedInput`] = builder.inputRef(`${modelName}UpdateManyNestedInput`);
  inputRefs[`${modelName}UpsertNestedInput`] = builder.inputRef(`${modelName}UpsertNestedInput`);
  inputRefs[`${modelName}DeleteOneInput`] = builder.inputRef(`${modelName}DeleteOneInput`);
  inputRefs[`${modelName}DeleteManyInput`] = builder.inputRef(`${modelName}DeleteManyInput`);
  inputRefs[`${modelName}WhereInput`] = builder.inputRef(`${modelName}WhereInput`);
});

// ─── SINGLE PASS: Implement all input types ──────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  const model = prismaDataModel.datamodel.models[modelName];

  try {
    // 1. ConnectInput
    inputRefs[`${modelName}ConnectInput`].implement({
      description: `Input to connect an existing ${modelName} record by a unique field.`,
      fields: (t) => {
        const uniqueFields = getUniqueScalarFields(modelName);
        const fields: Record<string, any> = {};

        uniqueFields.forEach((field) => {
          fields[field.name] = buildScalarField(
            t,
            field,
            false,
            `Unique field '${field.name}' for ${modelName}`
          );
        });

        if (Object.keys(fields).length === 0) {
          fields.id = t.string({ required: false, description: `Fallback ID` });
        }

        return fields;
      },
    });

    // 2. ConnectOrCreateInput
    inputRefs[`${modelName}ConnectOrCreateInput`].implement({
      description: `Connect or create ${modelName} record.`,
      fields: (t) => ({
        where: t.field({
          type: inputRefs[`${modelName}ConnectInput`],
          required: true,
        }),
        create: t.field({
          type: `${modelName}${createInputSuffix}` as never,
          required: true,
        }),
      }),
    });

    // 3. CreateInput via Prisma
    builder.prismaCreate(modelName as any, {
      name: `${modelName}${createInputSuffix}`,
      fields: (t) => {
        const fields: Record<string, any> = {};

        model.fields.forEach((field) => {
          if ((field.isId && field.hasDefaultValue) || field.name.startsWith('_')) return;

          if (field.kind === 'scalar' || field.kind === 'enum') {
            const fieldType =
              field.type === 'DateTime'
                ? 'DateTime'
                : field.type === 'Json'
                ? 'Json'
                : field.type;

            fields[field.name] = t.field({
              type: fieldType as any,
              required: field.isRequired && !field.hasDefaultValue,
            });
          }

          if (field.kind === 'object') {
            fields[field.name] = t.field({
              type: field.isList
                ? (inputRefs[`${field.type}CreateManyNestedInput`] as any)
                : (inputRefs[`${field.type}CreateOneNestedInput`] as any),
              required: false,
            });
          }
        });

        return fields;
      },
    });

    // 4. UpdateInput via Prisma
    builder.prismaUpdate(modelName as any, {
      name: `${modelName}${updateInputSuffix}`,
      fields: (t) => {
        const fields: Record<string, any> = {};

        model.fields.forEach((field) => {
          if (field.name.startsWith('_')) return;

          if (field.kind === 'scalar' || field.kind === 'enum') {
            const fieldType =
              field.type === 'DateTime'
                ? 'DateTime'
                : field.type === 'Json'
                ? 'Json'
                : field.type;

            fields[field.name] = t.field({
              type: fieldType as any,
              required: false,
            });
          }

          if (field.kind === 'object') {
            fields[field.name] = t.field({
              type: field.isList
                ? (inputRefs[`${field.type}UpdateManyNestedInput`] as any)
                : (inputRefs[`${field.type}UpdateOneNestedInput`] as any),
              required: false,
            });
          }
        });

        return fields;
      },
    });

    // 5. CreateOneNestedInput
    inputRefs[`${modelName}CreateOneNestedInput`].implement({
      description: `Nested create one for ${modelName}.`,
      fields: (t) => ({
        create: t.field({
          type: `${modelName}${createInputSuffix}` as never,
          required: false,
        }),
        connect: t.field({
          type: inputRefs[`${modelName}ConnectInput`],
          required: false,
        }),
        connectOrCreate: t.field({
          type: inputRefs[`${modelName}ConnectOrCreateInput`],
          required: false,
        }),
      }),
    });

    // 6. UpdateOneNestedInput
    inputRefs[`${modelName}UpdateOneNestedInput`].implement({
      description: `Nested update one for ${modelName}.`,
      fields: (t) => ({
        create: t.field({
          type: `${modelName}${createInputSuffix}` as never,
          required: false,
        }),
        connect: t.field({
          type: inputRefs[`${modelName}ConnectInput`],
          required: false,
        }),
        connectOrCreate: t.field({
          type: inputRefs[`${modelName}ConnectOrCreateInput`],
          required: false,
        }),
        update: t.field({
          type: inputRefs[`${modelName}UpsertNestedInput`],
          required: false,
        }),
        upsert: t.field({
          type: inputRefs[`${modelName}UpsertNestedInput`],
          required: false,
        }),
        disconnect: t.boolean({ required: false }),
        delete: t.boolean({ required: false }),
      }),
    });

    // 7. CreateManyNestedInput
    inputRefs[`${modelName}CreateManyNestedInput`].implement({
      description: `Nested create many for ${modelName}.`,
      fields: (t) => ({
        create: t.field({
          type: [`${modelName}CreateInput` as never],
          required: false,
        }),
        connect: t.field({
          type: [inputRefs[`${modelName}ConnectInput`]] as never,
          required: false,
        }),
        createMany: t.field({
          type: [`${modelName}CreateInput` as never],
          required: false,
        }),
        connectOrCreate: t.field({
          type: [inputRefs[`${modelName}ConnectOrCreateInput`]] as never,
          required: false,
        }),
      }),
    });

    // 8. UpdateManyNestedInput
    inputRefs[`${modelName}UpdateManyNestedInput`].implement({
      description: `Nested update many for ${modelName}.`,
      fields: (t) => ({
        deleteMany: t.field({
          type: inputRefs[`${modelName}WhereInput`] as never,
          required: false,
        }),
        connect: t.field({
          type: [inputRefs[`${modelName}ConnectInput`]] as never,
          required: false,
        }),
        connectOrCreate: t.field({
          type: [inputRefs[`${modelName}ConnectOrCreateInput`]] as never,
          required: false,
        }),
        create: t.field({
          type: [`${modelName}CreateInput` as never],
          required: false,
        }),
        upsert: t.field({
          type: [inputRefs[`${modelName}UpsertNestedInput`]] as never,
          required: false,
        }),
        createMany: t.field({
          type: [`${modelName}CreateInput` as never],
          required: false,
        }),
        set: t.field({
          type: [inputRefs[`${modelName}ConnectInput`]] as never,
          required: false,
        }),
        disconnect: t.field({
          type: [inputRefs[`${modelName}ConnectInput`]] as never,
          required: false,
        }),
        delete: t.field({
          type: [inputRefs[`${modelName}ConnectInput`]] as never,
          required: false,
        }),
        update: t.field({
          type: [inputRefs[`${modelName}UpsertNestedInput`]] as never,
          required: false,
        }),
        updateMany: t.field({
          type: [inputRefs[`${modelName}UpsertNestedInput`]] as never,
          required: false,
        }),

      }),
    });

    // 8.5 DeleteOneInput
    inputRefs[`${modelName}DeleteOneInput`].implement({
      description: `Nested delete one for ${modelName}.`,
      fields: (t) => ({
        where: t.field({
          type: inputRefs[`${modelName}ConnectInput`],
          required: true,
        }),
      }),
    });

    // 8.6 DeleteManyInput
    inputRefs[`${modelName}DeleteManyInput`].implement({
      description: `Nested delete many for ${modelName}.`,
      fields: (t) => ({
        where: t.field({
          type: inputRefs[`${modelName}WhereInput`],
          required: true,
        }),
      }),
    });

    // 9. UpsertNestedInput
    inputRefs[`${modelName}UpsertNestedInput`].implement({
      description: `Nested upsert for ${modelName}.`,
      fields: (t) => ({
        where: t.field({
          type: inputRefs[`${modelName}ConnectInput`],
          required: true,
        }),
        create: t.field({
          type: `${modelName}${createInputSuffix}` as never,
          required: true,
        }),
        update: t.field({
          type: `${modelName}${updateInputSuffix}` as never,
          required: true,
        }),
      }),
    });

    // 10. WhereInput with AND, OR, NOT logical operators
    inputRefs[`${modelName}WhereInput`].implement({
      description: `Filter ${modelName} records with AND, OR, NOT operators.`,
      fields: (t) => {
        const fields: Record<string, any> = {
          AND: t.field({
            type: [inputRefs[`${modelName}WhereInput`]] as never,
            required: false,
            description: `All conditions must match (AND).`,
          }),
          OR: t.field({
            type: [inputRefs[`${modelName}WhereInput`]] as never,
            required: false,
            description: `At least one condition must match (OR).`,
          }),
          NOT: t.field({
            type: [inputRefs[`${modelName}WhereInput`]] as never,
            required: false,
            description: `None of the conditions must match (NOT).`,
          }),
        };

        model.fields.forEach((field) => {
          if (field.name.startsWith('_')) return;

          if (field.kind === 'scalar' || field.kind === 'enum') {
            fields[field.name] = t.field({
              type: 'Json',
              required: false,
              description: `Filter by ${field.name} (${field.type}).`,
            });
          }

          if (field.kind === 'object') {
            fields[field.name] = t.field({
              type: inputRefs[`${field.type}WhereInput`],
              required: false,
              description: `Filter by related ${field.type} records.`,
            });
          }
        });

        return fields;
      },
    });

  } catch (error) {
    console.error(`❌ Input implementation error for ${modelName}:`, error);
  }
});

const groupByInputSuffix = 'GroupByInput';
export const groupByInputRefs: Record<string, ReturnType<typeof builder.inputRef>> = {};

// ─── Step 12: GroupByInput ────────────────────────────────────────────────────
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.inputRef(`${modelName}${groupByInputSuffix}`);
    groupByInputRefs[modelName] = ref;
    ref.implement({
      description: `GroupBy input for aggregating ${modelName} records with aggregation functions.`,
      fields: (t) => ({
        by: t.field({
          type: ['String'] as never,
          required: true,
          description: `Scalar fields to group by (e.g., ['status', 'category']).`,
        }),
        where: t.field({
          type: 'Json',
          required: false,
          description: `Optional Prisma where clause to filter records before grouping.`,
        }),
        orderBy: t.field({
          type: 'Json',
          required: false,
          description: `Optional order by clause (e.g., { _count: { id: 'desc' } }).`,
        }),
        _count: t.field({
          type: 'Json',
          required: false,
          description: `Count aggregations. Can use _all or specific fields.`,
        }),
        _sum: t.field({
          type: 'Json',
          required: false,
          description: `Sum aggregations for numeric fields.`,
        }),
        _avg: t.field({
          type: 'Json',
          required: false,
          description: `Average aggregations for numeric fields.`,
        }),
        _min: t.field({
          type: 'Json',
          required: false,
          description: `Minimum value aggregations.`,
        }),
        _max: t.field({
          type: 'Json',
          required: false,
          description: `Maximum value aggregations.`,
        }),
      }),
    });
  } catch (error) {
    console.error(`GroupByInput error for ${modelName}: ${error}`);
  }
});

console.log('✅ All inputs implemented successfully');
