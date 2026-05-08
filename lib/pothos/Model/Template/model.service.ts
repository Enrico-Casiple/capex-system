/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * FILE STRUCTURE GUIDE
 * ─────────────────────────────────────────────────────────────
 * lib/pothos/Model/Template/
 * ├── model.service.ts        ← THIS FILE (base generic service)
 * ├── model.strategy.ts       ← Strategy interface + types
 * └── audit.builder.ts        ← Audit log builder utility
 *
 * lib/pothos/Model/Services/
 * ├── index.ts                ← Auto-generated services registry
 * └── [ModelName].service.ts  ← Per-model custom strategy (optional)
 *
 * USAGE:
 *   Default:  new ModelService('User', 'user', prisma)
 *   Custom:   new ModelService('User', 'user', prisma, { searchableFields: ['name'] })
 * ─────────────────────────────────────────────────────────────
 */

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import Papa from 'papaparse';
import { Prisma, PrismaClient } from '../../../../generated/prisma/client/client';
import { fail, ok } from '../../../../lib/util/reponseUtil';
import { getPrismaErrorMessage } from '../../../util/getPrismaErrorMessage';
import PrismaTypes from '../../pothos-prisma-types';
import { pubsub } from '../../subscription';
import buildAuditLog from './Builder/audit.builder';
import { ModelStrategy } from './Strategy/model.strategy';
import {
  ArchiveInput,
  ArchiveManyInput,
  CreateInput,
  CreateManyInput,
  CursorPaginationInput,
  ExportCsvInput,
  GroupByInput,
  PaginationInput,
  RemoveInput,
  RemoveManyInput,
  UpdateInput,
} from './Types/input.type';
import {
  CreateArgs,
  CreateManyArgs,
  FindManyArgs,
  FindUniqueArgs,
  PrismaModelShape,
  UpdateArgs,
} from './Types/prismaArgs.type';
import { PrismaModelMethods } from './Types/prismaModelMethods.type';

const DO_REGION = process.env.NEXTAUTH_DO_REGION || 'sgp1';
const DO_BUCKET = process.env.NEXTAUTH_DO_BUCKET || 'purchase-system-files';
const DO_ENDPOINT = process.env.NEXTAUTH_DO_ENDPOINT || `https://${DO_REGION}.digitaloceanspaces.com`;

const spacesClient = new S3Client({
  region: DO_REGION,
  endpoint: DO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.NEXTAUTH_DO_ACCESSKEY!,
    secretAccessKey: process.env.NEXTAUTH_DO_SECRETKEY!,
  },
  forcePathStyle: false,
});

// ─────────────────────────────────────────────────────────────
// MODEL SERVICE
// ─────────────────────────────────────────────────────────────

export class ModelService<PrismaModel extends Prisma.ModelName> {
  private readonly modelName: PrismaModel;
  private readonly prismaModel: Uncapitalize<PrismaModel>;
  private readonly strategy: ModelStrategy<PrismaModel>;

  constructor(
    modelName: PrismaModel,
    prismaModel: Uncapitalize<PrismaModel>,
    protected readonly prisma: PrismaClient,
    strategy: ModelStrategy<PrismaModel> = {},
  ) {
    this.modelName = modelName;
    this.prismaModel = prismaModel;
    this.strategy = strategy;
    console.log(`Initializing ${this.constructor.name} for model: ${this.modelName}`);
  }

  // ─── Private Helpers ───────────────────────────────────────
  // ⚡ PERF: Cache regex patterns to avoid recompilation on every sanitize call
  private static readonly FILE_SANITIZE_REGEXES = {
    spaces: /\s+/g,
    invalid: /[^a-z0-9-]/g,
    duplicateDash: /-+/g,
    edgeDash: /^-+|-+$/g,
  };

  private get time() {
    // ⚡ PERF: Use cheaper toISOString() instead of timezone formatting on every operation
    return new Date().toISOString();
  }

  private get delegate() {
    const d = this.prisma[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>;
    if (!d) throw new Error(`No Prisma delegate found for ${this.modelName}`);
    return d;
  }

  private get orderBy() {
    return (
      this.strategy.orderBy ?? ([{ createdAt: 'desc' }] as FindManyArgs<PrismaModel>['orderBy'])
    );
  }

  private get include() {
    return this.strategy.include;
  }

  private get searchableFields() {
    return this.strategy.searchableFields ?? [];
  }

  /** Build include options, respecting omitRelations flag (skip for list ops) */
  private buildInclude(omitRelations?: boolean): unknown {
    return omitRelations ? undefined : this.include;
  }

  private sanitizeFileName(name: string): string {
    const parts = name.split('.');
    const extension = parts.pop()?.toLowerCase() || 'csv';
    const baseName = parts.join('.');

    // ⚡ PERF: Use cached regex patterns instead of recompiling on every call
    const slug = baseName
      .toLowerCase()
      .replace(ModelService.FILE_SANITIZE_REGEXES.spaces, '-')
      .replace(ModelService.FILE_SANITIZE_REGEXES.invalid, '')
      .replace(ModelService.FILE_SANITIZE_REGEXES.duplicateDash, '-')
      .replace(ModelService.FILE_SANITIZE_REGEXES.edgeDash, '');

    return `${slug || 'export'}.${extension}`;
  }

  private buildSpacesUrl(fileName: string): string {
    return `https://${DO_BUCKET}.${DO_REGION}.digitaloceanspaces.com/${fileName}`;
  }

  private mapCreate(data: CreateInput<PrismaModel>['data']): CreateArgs<PrismaModel>['data'] {
    return (this.strategy.mapCreate ?? ((d) => d))(data);
  }

  private mapCreateMany(
    data: CreateManyInput<PrismaModel>['data'],
  ): CreateManyArgs<PrismaModel>['data'] {
    const mapper = this.strategy.mapCreateMany as
      | ((input: CreateManyInput<PrismaModel>['data']) => CreateManyArgs<PrismaModel>['data'])
      | undefined;

    return mapper ? mapper(data) : (data as CreateManyArgs<PrismaModel>['data']);
  }

  private mapUpdate(data: UpdateInput<PrismaModel>['data']): UpdateArgs<PrismaModel>['data'] {
    const mapped = (this.strategy.mapUpdate ?? ((d) => d))(data);
    return this.normalizeNestedOperations(mapped as Record<string, unknown>) as UpdateArgs<PrismaModel>['data'];
  }

  private normalizeNestedOperations(data: Record<string, unknown>): Record<string, unknown> {
    if (!data || typeof data !== 'object') return data;

    const result: Record<string, unknown> = {};
    const keys = Object.keys(data);

    for (const key of keys) {
      const value = data[key];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const nestedValue = value as Record<string, unknown>;
        const nestedKeys = Object.keys(nestedValue);

        // Handle one-to-many: deleteMany + create
        const hasDeleteMany = nestedKeys.includes('deleteMany');
        // Handle one-to-one: delete + create
        const hasDelete = nestedKeys.includes('delete');
        const hasCreate = nestedKeys.includes('create');

        if ((hasDeleteMany || hasDelete) && hasCreate) {
          // Order matters: delete/deleteMany MUST come before create
          result[key] = {
            ...(hasDeleteMany ? { deleteMany: nestedValue.deleteMany } : {}),
            ...(hasDelete ? { delete: nestedValue.delete } : {}),
            create: nestedValue.create,
            // Include any other properties (except delete/deleteMany/create)
            ...Object.fromEntries(
              nestedKeys
                .filter(k => !['deleteMany', 'delete', 'create'].includes(k))
                .map(k => [k, nestedValue[k]])
            )
          };
        } else {
          result[key] = value;
        }
      } else {
        result[key] = value;
      }
    }

    return result;
  }

  private code(suffix: string) {
    return `${this.modelName.toUpperCase()}_${suffix}`;
  }

  private audit(
    action: string,
    actorId: string | null | undefined,
    newDetails: unknown,
    oldDetails?: unknown,
  ) {
    return buildAuditLog({
      modelName: this.modelName,
      action,
      actorId,
      newDetails,
      oldDetails,
      timestamp: this.time,
    });
  }

  private reverseOrderBy(): FindManyArgs<PrismaModel>['orderBy'] {
    const order = this.orderBy as Record<string, string>[];
    return order?.map((o) =>
      Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v === 'asc' ? 'desc' : 'asc'])),
    ) as FindManyArgs<PrismaModel>['orderBy'];
  }

  // ─── Batch Helpers ─────────────────────────────────────────
  private getOptimalBatchSize(dataArray: CreateManyInput<PrismaModel>['data']): number {
    const avgSize = JSON.stringify(dataArray[0] || {}).length;
    const totalSize = avgSize * dataArray.length;
    const safeSize = Math.floor((16 * 1024 * 1024 * 0.8) / avgSize);
    if (totalSize < 1_000_000) return Math.min(500, safeSize);
    if (totalSize < 5_000_000) return Math.min(200, safeSize);
    if (totalSize < 10_000_000) return Math.min(100, safeSize);
    return Math.min(50, safeSize);
  }

  private splitIntoBatches<T>(array: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < array.length; i += batchSize) batches.push(array.slice(i, i + batchSize));
    return batches;
  }

  
private getPrismaErrorCode(error: unknown): string | null {
  const e = error as { code?: unknown };
  return typeof e?.code === 'string' ? e.code : null;
}

private cleanPrismaMessage(message: string): string {
  return String(message ?? '')
    .replace(/PrismaClient\w+Error:\s*/g, '')
    .replace(/Invalid `[^`]+` invocation:\s*/g, '')
    .replace(/\s*\n\s*/g, ' ')
    .trim();
}

private humanizeConstraintField(constraint: string): string {
  const parts = constraint.split('_');
  const rawField = parts.length >= 3 ? parts.slice(1, -1).join('_') : constraint;

  return rawField
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .toLowerCase()
    .trim();
}

private toReadableCreateError(error: unknown): string {
  const code = this.getPrismaErrorCode(error);
  const { message } = getPrismaErrorMessage(error);
  const readable = this.cleanPrismaMessage(String(message ?? 'Failed to import records'));

  switch (code) {
    case 'P2002': {
      const target = (error as { meta?: { target?: unknown } }).meta?.target;
      const targetField = Array.isArray(target) ? target.join(', ') : String(target ?? '');
      return targetField
        ? `Duplicate value detected for "${targetField}". Please use a unique value.`
        : 'Duplicate value detected. Please use a unique value.';
    }

    case 'P2003':
      return 'This value is linked to another record and cannot be saved or deleted.';

    case 'P2000':
      return 'The value is too long for one of the fields. Please shorten it and try again.';

    case 'P2011':
      return 'A required field is missing. Please fill in all required values.';

    case 'P2025':
      return 'The requested record was not found. It may have already been deleted.';

    case 'P2014':
      return 'This operation violates a required relation between records.';

    case 'P2021':
      return 'The database table was not found. Please check the schema and migration.';

    default:
      break;
  }

  if (/Unique constraint failed/i.test(readable)) {
    const constraintMatch = readable.match(/constraint:\s*`([^`]+)`/i);
    if (constraintMatch?.[1]) {
      const field = this.humanizeConstraintField(constraintMatch[1]);
      return `Duplicate value detected for "${field}". Please use a unique value.`;
    }

    const keyMatch = readable.match(/`([^`]+)`/);
    if (keyMatch?.[1]) {
      return `Duplicate value detected for "${this.humanizeConstraintField(keyMatch[1])}". Please use a unique value.`;
    }

    return 'Duplicate value detected. Please use a unique value.';
  }

  if (/Malformed ObjectID/i.test(readable)) {
    const fieldMatch = readable.match(/field '([^']+)'/i);
    return fieldMatch
      ? `Invalid ID format for "${fieldMatch[1]}". Please provide a valid ObjectID.`
      : 'Invalid ID format in one of the fields.';
  }

  return readable || 'Failed to import records.';
}

private async processBatch(
  dataArray: CreateManyInput<PrismaModel>['data'],
  currentUserId: string,
): Promise<{
  isSuccess: boolean;
  message: string;
  code: string;
  data: PrismaTypes[PrismaModel]['Shape'][] | null;
}> {
  try {
    const createdRecords = await this.prisma.$transaction(
      async (tx) => {
        const inserted = await Promise.all(
          dataArray.map((recordData) =>
            (tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>).create({
              data: {
                ...recordData,
                auditLogs: this.audit('CREATE', currentUserId, recordData),
              } as CreateArgs<PrismaModel>['data'],
              include: this.include,
            }),
          ),
        );
        return inserted.flat() as PrismaTypes[PrismaModel]['Shape'][];
      },
      { timeout: Math.max(20000, dataArray.length * 500) },
    );

    return ok(
      this.code('CREATE_MANY_SUCCESS'),
      `Created ${createdRecords.length} ${this.modelName} records`,
      createdRecords,
    );
  } catch (error) {
    const readable = this.toReadableCreateError(error);
    return fail(this.code('CREATE_MANY_FAILED'), readable);
  }
}

  // ─── Server side subscription ──────────────────────────────
  subscribeToModel(callback: (data: PrismaTypes[PrismaModel]['Shape']) => void) {
    const topic = `${this.modelName.toUpperCase()}_SUBSCRIPTION`;

    const subscription = pubsub.subscribe(topic);

    // listen to events
    (async () => {
      for await (const event of subscription) {
        const data = (event as Record<string, unknown>)[`${this.modelName}Subscription`];
        callback(data as PrismaTypes[PrismaModel]['Shape']);
      }
    })();

    return subscription; // return so caller can cancel
  }

  // ─── Publish helper ────────────────────────────────────────
  private publish(record: unknown) {
    pubsub.publish(`${this.modelName.toUpperCase()}_SUBSCRIPTION`, {
      [`${this.modelName}Subscription`]: record,
    });
  }



  private toTabularValue(value: unknown): string | number | boolean {
    if (value === null || value === undefined) return '';
    if (value instanceof Date) return value.toISOString();
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value;
    }
    return JSON.stringify(value);
  }

  private escapeHtml(value: unknown): string {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private buildExcelBase64(
    columns: string[],
    records: Array<Record<string, string | number | boolean>>,
  ): string {
    const headerCells = columns.map((column) => `<th>${this.escapeHtml(column)}</th>`).join('');
    const bodyRows = records
      .map((record) => {
        const cells = columns
          .map((column) => `<td>${this.escapeHtml(record[column] ?? '')}</td>`)
          .join('');
        return `<tr>${cells}</tr>`;
      })
      .join('');

    const html = [
      '<html>',
      '<head><meta charset="UTF-8" /></head>',
      '<body>',
      `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`,
      '</body>',
      '</html>',
    ].join('');

    return Buffer.from(html, 'utf8').toString('base64');
  }




  // ─── Public Methods ────────────────────────────────────────
  async findAll(input: PaginationInput<PrismaModel>) {
    console.log(`📝 FindAll ${this.modelName}`, input);
    const where = {
      isActive: input.isActive,
      ...(input.filter || {}),
    } as FindManyArgs<PrismaModel>['where'];

    if (input.search?.trim() && input.searchFields?.length) {
      where!.OR = input.searchFields.map((field) => ({
        [field]: { contains: input.search, mode: 'insensitive' },
      }));
    }

    const fetchAll = input.pageSize === 0 || (input.currentPage === 1 && input.pageSize === 1);
    const skip = !fetchAll ? (input.currentPage - 1) * input.pageSize : undefined;
    const take = !fetchAll ? input.pageSize : undefined;
    // ⚡ PERF: Skip includes for list views (pageSize > 20) to reduce query size and memory
    const omitRelations = input.pageSize > 20;

    try {
      // ⚡ PERF: Parallel queries - count + find simultaneously (no dependency)
      const [filtered, records] = await Promise.all([
        this.delegate.count({ where }),
        this.delegate.findMany({
          where,
          orderBy: this.orderBy,
          ...(skip !== undefined && take !== undefined ? { skip, take } : {}),
          include: this.buildInclude(omitRelations),
        }),
      ]);

      const effectivePageSize = fetchAll ? filtered : input.pageSize;
      const totalPages = effectivePageSize > 0 ? Math.ceil(filtered / effectivePageSize) : 1;

      return {
        ...ok(
          this.code('RETRIEVE_ALL_SUCCESS'),
          `Retrieved ${this.modelName} records`,
          records ?? [],
        ),
        allCount: filtered,
        active: undefined, // Skip active/inactive counts for performance
        inActive: undefined,
        pageinfo: {
          hasNextPage: fetchAll ? false : input.currentPage < totalPages,
          hasPreviousPage: fetchAll ? false : input.currentPage > 1,
          pageSize: input.pageSize,
          currentPage: input.currentPage,
          totalPages,
          totalCount: filtered,
        },
      };
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ FindAll ${this.modelName}:`, error);
      return {
        ...fail(
          this.code('RETRIEVE_ALL_FAILED'),
          `Failed to retrieve ${this.modelName}: ${message}`,
        ),
        allCount: 0,
        active: undefined,
        inActive: undefined,
        pageinfo: null,
      };
    }
  }

  async findAllWithCursor(input: CursorPaginationInput<PrismaModel>) {
    const take = input.take ?? 20;
    const direction = input.direction ?? 'forward';

    const where = {
      isActive: input.isActive,
      ...(input.filter || {}),
    } as FindManyArgs<PrismaModel>['where'];

    // ⚡ PERF: Only build OR clause if search actually provided (skip if empty)
    if (input.search?.trim() && input.searchFields?.length) {
      where!.OR = input.searchFields.map((field) => ({
        [field]: { contains: input.search, mode: 'insensitive' },
      }));
    }

    try {
      // ⚡ PERF: Build query options object once, conditionally add properties
      // ⚡ PERF: Build query object incrementally, avoiding spread operator overhead
      const findManyBase = {
        where,
        orderBy: input.orderBy ?? this.orderBy,
        take: take + 1,
        include: undefined,
      };

      // ⚡ Conditionally build optional properties (type-safe object accumulation)
      type FindManyRecord = Record<string, unknown>;
      const findManyArgs = findManyBase as FindManyRecord;

      if (input.distinct) findManyArgs.distinct = input.distinct;
      if (input.select && !this.include) findManyArgs.select = input.select;
      if (input.cursor) {
        findManyArgs.cursor = { id: input.cursor };
        findManyArgs.skip = 1;
      }

      const records = (await this.delegate.findMany(findManyArgs)) ?? [];
      const hasMore = records.length > take;
      const resultLength = Math.min(take, records.length);

      // ⚡ PERF: Pre-calculate cursors from original array to avoid multiple slices
      let data: typeof records;
      let nextCursor: string | null = null;
      let prevCursor: string | null = null;

      if (direction === 'backward') {
        // ⚡ Get cursors from unsliced array, then slice+reverse only once
        if (hasMore) {
          prevCursor = (records[0] as { id: string }).id;
          nextCursor = (records[resultLength] as { id: string }).id;
        } else if (resultLength > 0) {
          prevCursor = (records[0] as { id: string }).id;
        }
        // Single reverse operation on sliced data
        data = hasMore ? records.slice(0, take).reverse() : records.slice().reverse();
      } else {
        // Forward direction - avoid reverse entirely
        data = hasMore ? records.slice(0, take) : records;
        if (hasMore && resultLength > 0) {
          nextCursor = (records[resultLength - 1] as { id: string }).id;
        }
      }

      return {
        isSuccess: true,
        code: this.code('RETRIEVE_CURSOR_SUCCESS'),
        message: `Retrieved ${data.length} ${this.modelName} records`,
        data: data as PrismaTypes[PrismaModel]['Shape'][],
        nextCursor,
        prevCursor,
        hasNextPage: direction === 'forward' && hasMore,
        hasPrevPage: direction === 'backward' && hasMore,
      };
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ FindAllWithCursor ${this.modelName}:`, error);
      return {
        isSuccess: false,
        code: this.code('RETRIEVE_CURSOR_FAILED'),
        message: `Failed: ${message}`,
        data: null,
        nextCursor: null,
        prevCursor: null,
        hasNextPage: false,
        hasPrevPage: false,
      };
    }
  }

  async findUnique(id: string) {
    console.log(`📝 FindUnique ${this.modelName} id:${id}`);
    try {
      const record = await this.delegate.findUnique({
        where: { id } as FindUniqueArgs<PrismaModel>['where'],
        include: this.include,
      });
      if (!record)
        return fail(
          this.code('RETRIEVE_UNIQUE_NOT_FOUND'),
          `No ${this.modelName} found with id ${id}`,
        );
      return ok(
        this.code('RETRIEVE_UNIQUE_SUCCESS'),
        `Retrieved ${this.modelName} id:${id}`,
        record as unknown as PrismaModelShape<PrismaModel>,
      );
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ FindUnique ${this.modelName}:`, error);
      return fail(
        this.code('RETRIEVE_UNIQUE_FAILED'),
        `Failed to retrieve ${this.modelName} id:${id}: ${message}`,
      );
    }
  }

  async findBy<K extends keyof FindUniqueArgs<PrismaModel>['where']>(
    key: K,
    value: FindUniqueArgs<PrismaModel>['where'][K],
  ) {
    console.log(`📝 FindBy ${this.modelName} ${String(key)}:${value}`);
    try {
      const record = await this.delegate.findUnique({
        where: { [key]: value } as unknown as FindUniqueArgs<PrismaModel>['where'],
        include: this.include,
      });
      if (!record)
        return fail(
          this.code('RETRIEVE_BY_NOT_FOUND'),
          `No ${this.modelName} found with ${String(key)}:${value}`,
        );
      return ok(
        this.code('RETRIEVE_BY_SUCCESS'),
        `Retrieved ${this.modelName} ${String(key)}:${value}`,
        record as unknown as PrismaModelShape<PrismaModel>,
      );
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ FindBy ${this.modelName}:`, error);
      return fail(
        this.code('RETRIEVE_BY_FAILED'),
        `Failed to retrieve ${this.modelName} ${String(key)}:${value}: ${message}`,
      );
    }
  }

  async findFirst(where: FindManyArgs<PrismaModel>['where']) {
    console.log(`📝 FindFirst ${this.modelName}`, where);
    try {
      const record = await this.delegate.findFirst({
        where,
        orderBy: this.orderBy,
        include: this.include,
      });

      if (!record)
        return fail(
          this.code('RETRIEVE_FIRST_NOT_FOUND'),
          `No ${this.modelName} found with ${JSON.stringify(where)}`,
        );

      return ok(
        this.code('RETRIEVE_FIRST_SUCCESS'),
        `Retrieved first ${this.modelName}`,
        record as unknown as PrismaModelShape<PrismaModel>,
      );
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ FindFirst ${this.modelName}:`, error);
      return fail(
        this.code('RETRIEVE_FIRST_FAILED'),
        `Failed to retrieve first ${this.modelName}: ${message}`,
      );
    }
  }

  async count(where: FindManyArgs<PrismaModel>['where']) {
    console.log(`📝 Count ${this.modelName}`, where);
    try {
      const totalCount = await this.delegate.count({ where });

      if (!totalCount)
        return fail(
          this.code('RETRIEVE_COUNT_NOT_FOUND'),
          `No ${this.modelName} records found matching the given filters`,
        );

      return ok(
        this.code('RETRIEVE_COUNT_SUCCESS'),
        `Successfully retrieved ${totalCount} ${this.modelName} record(s)`,
        totalCount,
      );
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ Count ${this.modelName}:`, error);
      return fail(
        this.code('RETRIEVE_COUNT_FAILED'),
        `Something went wrong while counting ${this.modelName} records: ${message}`,
      );
    }
  }

  async create(input: CreateInput<PrismaModel>) {
    console.log(`📝 Create ${this.modelName}`, input);
    try {
      const mappedData = this.mapCreate(input.data);
      const record = await this.delegate.create({
        data: {
          ...mappedData,
          auditLogs: this.audit('CREATE', input.currentUserId, mappedData),
        },
        include: this.include,
      });
      this.publish(record);
      return ok(this.code('CREATE_ONE_SUCCESS'), `Created ${this.modelName} record`, record);
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ Create ${this.modelName}:`, error);
      return fail(this.code('CREATE_ONE_FAILED'), `Failed to create ${this.modelName}: ${message}`);
    }
  }

async createMany(input: CreateManyInput<PrismaModel>) {
  console.log(`📝 CreateMany ${this.modelName}`, input);
  try {
    const mapped = this.mapCreateMany(input.data);
    const dataArray = Array.isArray(mapped) ? mapped : [mapped];
    const batchSize = this.getOptimalBatchSize(dataArray);

    if (dataArray.length <= batchSize) {
      return this.processBatch(dataArray, input.currentUserId);
    }

    const results: PrismaTypes[PrismaModel]['Shape'][] = [];
    const batchErrors: string[] = [];

    for (const batch of this.splitIntoBatches(dataArray, batchSize)) {
      const result = await this.processBatch(batch, input.currentUserId);

      if (result.isSuccess && result.data) {
        results.push(...result.data);
      } else {
        const readable = this.toReadableCreateError(result.message);
        batchErrors.push(readable);
        console.error('Batch failed:', readable);
      }
    }

    if (!results.length && batchErrors.length) {
      return fail(this.code('CREATE_MANY_FAILED'), batchErrors[0]);
    }

    results.forEach((record) => this.publish(record));

    const failedCount = dataArray.length - results.length;
    return ok(
      this.code('CREATE_MANY_SUCCESS'),
      failedCount > 0
        ? `Imported ${results.length}/${dataArray.length}. Some rows failed: ${batchErrors[0]}`
        : `Created ${results.length} of ${dataArray.length} ${this.modelName} records`,
      results,
    );
  } catch (error) {
    const readable = this.toReadableCreateError(error);
    console.error(`❌ CreateMany ${this.modelName}:`, error);
    return fail(this.code('CREATE_MANY_FAILED'), readable);
  }
}

  async update(input: UpdateInput<PrismaModel>) {
    console.log(`📝 Update ${this.modelName}`, input);
    try {
      const { id, data, currentUserId } = input;
      if (!id) return fail(this.code('UPDATE_ONE_FAILED'), `id is required`);

      const existing = await this.findUnique(id);
      if (!existing.isSuccess) return fail(this.code('UPDATE_ONE_FAILED'), existing.message);

      const mappedData = this.mapUpdate(data);

      const record = await this.delegate.update({
        where: { id } as FindManyArgs<PrismaModel>['where'],
        data: {
          ...mappedData,
          auditLogs: this.audit('UPDATE', currentUserId, mappedData, existing.data),
        },
        include: this.include,
      });
      this.publish(record);
      return ok(this.code('UPDATE_ONE_SUCCESS'), `Updated ${this.modelName} id:${id}`, record);
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ Update ${this.modelName}:`, error);
      return fail(
        this.code('UPDATE_ONE_FAILED'),
        `Failed to update ${this.modelName} id:${input.id}: ${message}`,
      );
    }
  }

  async updateMany(inputs: UpdateInput<PrismaModel>[] | UpdateInput<PrismaModel>) {
    console.log(`📝 UpdateMany ${this.modelName}`, inputs);
    try {
      const inputArray = Array.isArray(inputs) ? inputs : [inputs];
      const validInputs = inputArray.filter((i) => i.id);

      if (!validInputs.length)
        return fail(this.code('UPDATE_MANY_FAILED'), `No valid records — all missing id`);

      // ⚡ PERF: Use single transaction with batch updates instead of per-record
      const results = await this.prisma.$transaction(async (tx) => {
        const delegate = tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>;

        return Promise.all(
          validInputs.map(async ({ id, data, currentUserId }) => {
            try {
              const mappedData = this.mapUpdate(data);
              const record = await delegate.update({
                where: { id } as FindManyArgs<PrismaModel>['where'],
                data: {
                  ...mappedData,
                  auditLogs: this.audit('UPDATE', currentUserId, mappedData),
                },
                include: this.include,
              });
              return ok(this.code('UPDATE_MANY_SUCCESS'), `Updated id:${id}`, record);
            } catch (error) {
              return fail(this.code('UPDATE_MANY_FAILED'), `Failed id:${id}: ${error}`);
            }
          })
        );
      }, { timeout: Math.max(15000, validInputs.length * 200) }); // Reduced timeout

      const successCount = results.filter((r) => r.isSuccess).length;
      results.forEach((r) => r.isSuccess && this.publish(r.data));

      return {
        isSuccess: successCount === validInputs.length,
        code: this.code('UPDATE_MANY_SUCCESS'),
        message: `Updated ${successCount} of ${validInputs.length} ${this.modelName} records`,
        data: results.filter((r) => r.isSuccess).map((r) => r.data),
      };
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ UpdateMany ${this.modelName}:`, error);
      return fail(
        this.code('UPDATE_MANY_FAILED'),
        `Failed to updateMany ${this.modelName}: ${message}`,
      );
    }
  }

  async remove(input: RemoveInput) {
    console.log(`📝 Remove ${this.modelName} id:${input.id}`);
    const { id, currentUserId } = input;
    if (!id) return fail(this.code('DELETE_ONE_FAILED'), `id is required`);

    try {
      // Ensure record exists to avoid Prisma throwing internal findUniqueOrThrow
      const existing = await this.delegate.findUnique({
        where: { id } as FindManyArgs<PrismaModel>['where'],
        include: this.include,
      });

      if (!existing) {
        return fail(
          this.code('DELETE_ONE_FAILED'),
          `No ${this.modelName} found with id ${id}`,
        );
      }

      // Sanitize oldDetails to a plain JSON object to avoid any lazy relation lookups
      const oldDetails = JSON.parse(JSON.stringify(existing));

      // Create audit + delete in one transaction to avoid race conditions
      const [audit, record] = await this.prisma.$transaction(async (tx) => {
        const createdAudit = await (tx.auditLog as any).create({
          data: {
            modelId: id,
            ...buildAuditLog({
              modelName: this.modelName,
              action: 'DELETE',
              actorId: currentUserId,
              oldDetails,
              newDetails: null,
              timestamp: this.time,
            }).create,
          },
        });

        const deleted = await (tx[this.prismaModel] as any).delete({
          where: { id } as FindManyArgs<PrismaModel>['where'],
        });

        return [createdAudit, deleted];
      });

      this.publish(record);
      return ok(this.code('DELETE_ONE_SUCCESS'), `Deleted ${this.modelName} id:${id}`, record);
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ Remove ${this.modelName}:`, error);
      return fail(
        this.code('DELETE_ONE_FAILED'),
        `Failed to delete ${this.modelName} id:${input.id}: ${message}`,
      );
    }
  }

  async removeMany(input: RemoveManyInput) {
    console.log(`📝 RemoveMany ${this.modelName}`, input);
    const { ids, currentUserId } = input;
    if (!ids?.length) return fail(this.code('DELETE_MANY_FAILED'), `ids array is empty`);

    try {
      // ⚡ PERF: Use deleteMany in single tx instead of per-record deletes
      const result = await this.prisma.$transaction(
        async (tx) => {
          const delegate = tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>;

          // Delete all records matching IDs in single query
          const deleted = await delegate.deleteMany({
            where: { id: { in: ids } } as FindManyArgs<PrismaModel>['where'],
          });

          // Log audit per deleted ID (minimal overhead)
          const deletedCount = (deleted as unknown as { count?: number }).count || 0;
          if (deletedCount > 0) {
            await Promise.all(
              ids.map((id) =>
                (tx.auditLog as unknown as PrismaModelMethods<PrismaModel>).create({
                  data: {
                    modelId: id,
                    ...buildAuditLog({
                      modelName: this.modelName,
                      action: 'DELETE',
                      actorId: currentUserId,
                      oldDetails: null,
                      newDetails: { record: null, userId: currentUserId },
                      timestamp: this.time,
                    }).create,
                  },
                })
              )
            );
          }

          return deletedCount;
        },
        { timeout: Math.max(10000, ids.length * 100) }
      );

      return {
        isSuccess: true,
        code: this.code('DELETE_MANY_SUCCESS'),
        message: `Deleted ${result} ${this.modelName} records`,
        data: ids.map((id) => ({ id })),
      };
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ RemoveMany ${this.modelName}:`, error);
      return fail(
        this.code('DELETE_MANY_FAILED'),
        `Failed to removeMany ${this.modelName}: ${message}`,
      );
    }
  }

  async removeAll() {
    console.log(`📝 RemoveAll ${this.modelName}`);
    try {
      const deleted = await this.delegate.deleteMany({
        where: {}, // delete all records
      });
      return ok(this.code('DELETE_ALL_SUCCESS'), `Deleted all ${this.modelName} records`, deleted);
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ RemoveAll ${this.modelName}:`, error);
      return fail(
        this.code('DELETE_ALL_FAILED'),
        `Failed to delete all ${this.modelName} records: ${message}`,
      );
    }
  }

  private async toggleActive(
    id: string,
    currentUserId: string,
    isActive: boolean,
    action: 'ARCHIVE' | 'RESTORE',
    opCode: string,
    tx?: PrismaModelMethods<PrismaModel>,
  ) {
    const delegate = tx ?? this.delegate;

    try {
      // ⚡ PERF: Just try to update directly - Prisma throws if not found (eliminates N+1 findUnique)
      const record = await delegate.update({
        where: { id } as FindManyArgs<PrismaModel>['where'],
        data: {
          isActive,
          auditLogs: this.audit(
            action,
            currentUserId,
            { isActive, userId: currentUserId },
            { isActive: !isActive, userId: currentUserId },
          ),
        },
        include: this.include,
      });
      return ok(this.code(`${opCode}_SUCCESS`), `${action} ${this.modelName} id:${id}`, record);
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      return fail(this.code(`${opCode}_FAILED`), `${action} failed id:${id}: ${message}`);
    }
  }

  async archive(input: ArchiveInput) {
    console.log(`📝 Archive ${this.modelName} id:${input.id}`);
    if (!input.id) return fail(this.code('ARCHIVE_ONE_FAILED'), `id is required`);
    try {
      // ⚡ PERF: toggleActive handles existence check + update in one op (eliminates N+1)
      return await this.toggleActive(
        input.id,
        input.currentUserId,
        false,
        'ARCHIVE',
        'ARCHIVE_ONE',
      );
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ Archive ${this.modelName}:`, error);
      return fail(
        this.code('ARCHIVE_ONE_FAILED'),
        `Failed to archive ${this.modelName} id:${input.id}: ${message}`,
      );
    }
  }

  async archiveMany(input: ArchiveManyInput) {
    console.log(`📝 ArchiveMany ${this.modelName}`, input);
    const { ids, currentUserId } = input;
    if (!ids?.length) return fail(this.code('ARCHIVE_MANY_FAILED'), `ids array is empty`);

    try {
      const results = await this.prisma.$transaction(
        async (tx) =>
          Promise.all(
            ids.map(async (id) => {
              try {
                const txDelegate = tx[
                  this.prismaModel
                ] as unknown as PrismaModelMethods<PrismaModel>;
                return await this.toggleActive(
                  id,
                  currentUserId,
                  false,
                  'ARCHIVE',
                  'ARCHIVE_MANY',
                  txDelegate,
                );
              } catch (error) {
                return fail(this.code('ARCHIVE_MANY_FAILED'), `Failed id:${id}: ${error}`);
              }
            }),
          ),
        { timeout: Math.max(20000, ids.length * 1000) },
      );

      const successCount = results.filter((r) => r.isSuccess).length;
      return {
        isSuccess: successCount === ids.length,
        code: this.code('ARCHIVE_MANY_SUCCESS'),
        message: `Archived ${successCount} of ${ids.length} ${this.modelName} records`,
        data: results.filter((r) => r.isSuccess).map((r) => r.data),
      };
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ ArchiveMany ${this.modelName}:`, error);
      return fail(
        this.code('ARCHIVE_MANY_FAILED'),
        `Failed to archiveMany ${this.modelName}: ${message}`,
      );
    }
  }

  async restore(input: ArchiveInput) {
    console.log(`📝 Restore ${this.modelName} id:${input.id}`);
    if (!input.id) return fail(this.code('RESTORE_ONE_FAILED'), `id is required`);
    try {
      // ⚡ PERF: toggleActive handles existence check + update in one op (eliminates N+1)
      return await this.toggleActive(input.id, input.currentUserId, true, 'RESTORE', 'RESTORE_ONE');
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ Restore ${this.modelName}:`, error);
      return fail(
        this.code('RESTORE_ONE_FAILED'),
        `Failed to restore ${this.modelName} id:${input.id}: ${message}`,
      );
    }
  }

  async restoreMany(input: ArchiveManyInput) {
    console.log(`📝 RestoreMany ${this.modelName}`, input);
    const { ids, currentUserId } = input;
    if (!ids?.length) return fail(this.code('RESTORE_MANY_FAILED'), `ids array is empty`);

    try {
      const results = await this.prisma.$transaction(
        async (tx) =>
          Promise.all(
            ids.map(async (id) => {
              try {
                const txDelegate = tx[
                  this.prismaModel
                ] as unknown as PrismaModelMethods<PrismaModel>;
                return await this.toggleActive(
                  id,
                  currentUserId,
                  true,
                  'RESTORE',
                  'RESTORE_MANY',
                  txDelegate,
                );
              } catch (error) {
                return fail(this.code('RESTORE_MANY_FAILED'), `Failed id:${id}: ${error}`);
              }
            }),
          ),
        { timeout: Math.max(20000, ids.length * 1000) },
      );

      const successCount = results.filter((r) => r.isSuccess).length;
      return {
        isSuccess: successCount === ids.length,
        code: this.code('RESTORE_MANY_SUCCESS'),
        message: `Restored ${successCount} of ${ids.length} ${this.modelName} records`,
        data: results.filter((r) => r.isSuccess).map((r) => r.data),
      };
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ RestoreMany ${this.modelName}:`, error);
      return fail(
        this.code('RESTORE_MANY_FAILED'),
        `Failed to restoreMany ${this.modelName}: ${message}`,
      );
    }
  }
private normalizeCsvColumns(columns?: string[]): string[] | undefined {
  if (!columns?.length) return undefined;

  const cleaned = columns
    .map((col) => String(col).trim())
    .filter(Boolean);

  // Remove parent relation keys when nested paths exist
  return cleaned.filter((col) => {
    if (col.includes('.')) return true;
    return !cleaned.some((other) => other.startsWith(`${col}.`));
  });
}

private buildCsvSelectFromColumns(columns?: string[]): Record<string, unknown> | undefined {
  const normalized = this.normalizeCsvColumns(columns);
  if (!normalized?.length) return undefined;

  const select: Record<string, unknown> = {};

  for (const column of normalized) {
    const parts = column
      .split('.')
      .map((p) => p.trim())
      .filter(Boolean);

    if (!parts.length) continue;

    // Top-level scalar field
    if (parts.length === 1) {
      select[parts[0]] = true;
      continue;
    }

    // Nested relation path
    let current = select;

    for (let i = 0; i < parts.length; i += 1) {
      const key = parts[i];
      const isLast = i === parts.length - 1;

      if (isLast) {
        current[key] = true;
        break;
      }

      if (!current[key] || current[key] === true) {
        current[key] = { select: {} };
      }

      const node = current[key] as Record<string, unknown>;
      if (!node.select || typeof node.select !== 'object') {
        node.select = {};
      }

      current = node.select as Record<string, unknown>;
    }
  }

  return Object.keys(select).length ? select : undefined;
}

async exportCsv(input: ExportCsvInput<PrismaModel>) {
  try {
    const select = this.buildCsvSelectFromColumns(input.columns);

    const where = {
      ...(typeof input.isActive === 'boolean' ? { isActive: input.isActive } : {}),
      ...(input.filter || {}),
    } as FindManyArgs<PrismaModel>['where'];

    if (input.search?.trim() && input.searchFields?.length) {
      (where as Record<string, unknown>).OR = input.searchFields.map((field) => ({
        [field]: { contains: input.search, mode: 'insensitive' },
      }));
    }

    const batchSize = 500;
    const uploadToSpaces = input.uploadToSpaces ?? false;
    const maxRecords = Math.min(
      input.maxRecords ?? (uploadToSpaces ? 1_000_000 : 50_000),
      1_000_000,
    );

    if (maxRecords > 500_000) {
      console.warn(
        `⚠️  LARGE EXPORT WARNING for ${this.modelName}: exporting ${maxRecords.toLocaleString()} records. ` +
          `This may consume significant memory. Consider using pagination or streaming instead.`,
      );
    }

    let columns = this.normalizeCsvColumns(input.columns?.map(String));
    let exportedCount = 0;
    let csvParts: string[] = [];

    const estimatedBatches = Math.ceil(maxRecords / batchSize);
    csvParts = new Array(estimatedBatches + 1);
    let partIndex = 0;

    if (columns?.length) {
      csvParts[partIndex++] = Papa.unparse(
        [Object.fromEntries(columns.map((col) => [col, '']))],
        { columns, header: true },
      ).split('\n')[0];
    }

    const isPrimitive = (value: unknown): value is string | number | boolean =>
      typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';

    const pickPreferredScalar = (value: unknown): string | number | boolean | '' => {
      if (value == null) return '';
      if (isPrimitive(value)) return value;
      if (value instanceof Date) return value.toISOString();

      if (Array.isArray(value)) {
        return value
          .map((item) => pickPreferredScalar(item))
          .filter((v) => v !== '')
          .join(';');
      }

      if (typeof value === 'object') {
        const obj = value as Record<string, unknown>;
        const preferred =
          obj.id ??
          obj._id ??
          obj.name ??
          obj.code ??
          obj.permissionId ??
          obj.roleId ??
          obj.modelName;

        return preferred != null ? String(preferred) : '';
      }

      return String(value);
    };

    const getValuesByPath = (record: unknown, path: string): unknown[] => {
      const parts = path.split('.').filter(Boolean);
      if (!parts.length) return [];

      const walk = (current: unknown, index: number): unknown[] => {
        if (current == null) return [];

        if (index >= parts.length) {
          if (Array.isArray(current)) return current.flatMap((item) => walk(item, index));
          return [current];
        }

        if (Array.isArray(current)) {
          return current.flatMap((item) => walk(item, index));
        }

        if (typeof current === 'object') {
          const next = (current as Record<string, unknown>)[parts[index]];
          return walk(next, index + 1);
        }

        return [];
      };

      return walk(record, 0);
    };

    const normalizePathValue = (record: unknown, path: string): string | number | boolean => {
      const values = getValuesByPath(record, path);
      if (!values.length) return '';

      const primitiveValues = values
        .flatMap((value) => (Array.isArray(value) ? value : [value]))
        .filter((v) => v !== undefined && v !== null)
        .map((value) => {
          if (value instanceof Date) return value.toISOString();
          if (isPrimitive(value)) return value;
          return pickPreferredScalar(value);
        })
        .filter((v) => v !== '');

      if (!primitiveValues.length) return '';
      return primitiveValues.length === 1
        ? primitiveValues[0]
        : primitiveValues.map(String).join(';');
    };

    let cursor: string | undefined;
    let hasMore = true;

    while (hasMore && exportedCount < maxRecords) {
      const batch = (await this.delegate.findMany({
        where,
        orderBy: this.orderBy,
        take: batchSize,
        ...(cursor ? { cursor: { id: cursor } as FindManyArgs<PrismaModel>['where'], skip: 1 } : {}),
        ...(select ? { select } : {}),
      })) as Array<Record<string, unknown> & { id: string }>;

      if (!batch.length) {
        hasMore = false;
        break;
      }

      if (!columns?.length && batch[0]) {
        columns = Object.keys(batch[0]).filter((k) => {
          if (['password', 'otpCode'].includes(k)) return false;
          const value = batch[0][k];
          return value === null || value === undefined || isPrimitive(value) || value instanceof Date;
        });

        csvParts[0] = Papa.unparse([], { columns, header: true }).split('\n')[0];
        partIndex = 1;
      }

      const rows = batch.map((row) =>
        columns!.reduce((acc, column) => {
          acc[column] = this.toTabularValue(normalizePathValue(row, column));
          return acc;
        }, {} as Record<string, string | number | boolean>),
      );

      const csvChunk = Papa.unparse(rows, { columns, header: false });
      if (csvChunk) csvParts[partIndex++] = csvChunk;

      exportedCount += batch.length;
      cursor = batch[batch.length - 1].id;
      hasMore = batch.length === batchSize && exportedCount < maxRecords;
    }

    csvParts = csvParts.slice(0, partIndex);

    const effectiveFileName = this.sanitizeFileName(input.fileName ?? `${this.prismaModel}.csv`);
    const excelFileName = effectiveFileName.replace(/\.csv$/i, '.xls');
    const excelMimeType = 'application/vnd.ms-excel';

    if (!exportedCount) {
      return ok(this.code('EXPORT_CSV_SUCCESS'), `No ${this.modelName} data`, {
        fileName: effectiveFileName,
        mimeType: 'text/csv',
        csv: '',
        rowCount: 0,
        excelFileName,
        excelMimeType,
        excelBase64: '',
        fileUrl: null,
        fileKey: null,
        wasTruncated: false,
      });
    }

    const csv = csvParts.join('\n');
    const excelBase64 = uploadToSpaces ? '' : this.buildExcelBase64(columns ?? [], []);

    let fileUrl: string | null = null;
    let fileKey: string | null = null;

    if (uploadToSpaces) {
      fileKey = `${Date.now()}-${effectiveFileName}`;
      await spacesClient.send(
        new PutObjectCommand({
          Bucket: DO_BUCKET,
          Key: fileKey,
          Body: Buffer.from(csv, 'utf8'),
          ContentType: 'text/csv',
          ACL: 'public-read',
        }),
      );
      fileUrl = this.buildSpacesUrl(fileKey);
    }

    return ok(this.code('EXPORT_CSV_SUCCESS'), `Exported ${exportedCount} ${this.modelName} rows`, {
      fileName: effectiveFileName,
      mimeType: 'text/csv',
      csv: uploadToSpaces ? '' : csv,
      rowCount: exportedCount,
      excelFileName,
      excelMimeType,
      excelBase64,
      fileUrl,
      fileKey,
      wasTruncated: exportedCount >= maxRecords,
    });
  } catch (error) {
    const { message } = getPrismaErrorMessage(error);
    return fail(this.code('EXPORT_CSV_FAILED'), `Failed to export CSV: ${message}`);
  }
}


  async groupBy(groupByInput: GroupByInput<PrismaModel>) {
    try {

      const result = await this.delegate.groupBy({
        by: groupByInput.by,
        ...(groupByInput.where && { where: groupByInput.where }),
        ...(groupByInput.orderBy && { orderBy: groupByInput.orderBy }),
        ...(groupByInput._count && { _count: groupByInput._count }),
        ...(groupByInput._sum && { _sum: groupByInput._sum }),
        ...(groupByInput._avg && { _avg: groupByInput._avg }),
        ...(groupByInput._min && { _min: groupByInput._min }),
        ...(groupByInput._max && { _max: groupByInput._max }),
      });

      return ok(
        this.code('GROUP_BY_SUCCESS'),
        `Grouped ${this.modelName} records`,
        result,
      );
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ GroupBy ${this.modelName}:`, error);
      return fail(
        this.code('GROUP_BY_FAILED'),
        `Failed to perform groupBy: ${message}`,
      );
    }
  }
}
