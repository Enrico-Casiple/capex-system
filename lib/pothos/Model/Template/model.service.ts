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

import { formatInTimeZone } from 'date-fns-tz';
import { fail, ok } from '../../../../lib/util/reponseUtil';
import { Prisma, PrismaClient } from '../../../generated/prisma/client';
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

  private get time() {
    return formatInTimeZone(new Date(), 'Asia/Manila', "yyyy-MM-dd'T'HH:mm:ssXXX");
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
    return (this.strategy.mapUpdate ?? ((d) => d))(data);
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
      return { ...fail(this.code('CREATE_MANY_FAILED'), `Batch failed: ${error}`), data: null };
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

    // ← fetch all if pageSize is 0 OR pageSize is 1 with currentPage 1
    const fetchAll = input.pageSize === 0 || (input.currentPage === 1 && input.pageSize === 1);

    try {
      const [inActive, active, total, filtered, records] = await Promise.all([
        this.delegate.count({ where: { isActive: false } as FindManyArgs<PrismaModel>['where'] }),
        this.delegate.count({ where: { isActive: true } as FindManyArgs<PrismaModel>['where'] }),
        this.delegate.count(),
        this.delegate.count({ where }),
        this.delegate.findMany({
          where,
          orderBy: this.orderBy,
          // ← skip/take only when paginating normally
          ...(!fetchAll
            ? {
                skip: (input.currentPage - 1) * input.pageSize,
                take: input.pageSize,
              }
            : {}),
          include: this.include,
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
        allCount: total,
        active,
        inActive,
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
        active: 0,
        inActive: 0,
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

    if (input.search?.trim() && input.searchFields?.length) {
      where!.OR = input.searchFields.map((field) => ({
        [field]: { contains: input.search, mode: 'insensitive' },
      }));
    }

    try {
      const records = await this.delegate.findMany({
        where,
        orderBy:
          direction === 'backward'
            ? this.reverseOrderBy() // reverse sort for backward
            : this.orderBy,
        take: take + 1,
        ...(input.cursor
          ? {
              cursor: { id: input.cursor } as FindManyArgs<PrismaModel>['where'],
              skip: 1,
            }
          : {}),
        include: this.include,
      });

      const safeRecords = records ?? [];
      const hasMore = safeRecords.length > take;
      let data = hasMore ? safeRecords.slice(0, take) : safeRecords;

      // re-reverse so UI always gets consistent order
      if (direction === 'backward') data = data.reverse();

      const nextCursor =
        direction === 'forward' && hasMore ? (data[data.length - 1] as { id: string }).id : null;

      const prevCursor =
        direction === 'backward' && hasMore ? (data[0] as { id: string }).id : null;

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

      if (dataArray.length <= batchSize) return this.processBatch(dataArray, input.currentUserId);

      const results: PrismaTypes[PrismaModel]['Shape'][] = [];
      for (const batch of this.splitIntoBatches(dataArray, batchSize)) {
        const result = await this.processBatch(batch, input.currentUserId);
        if (result.isSuccess && result.data) results.push(...result.data);
        else console.error(`Batch failed:`, result.message);
      }

      results.forEach((record) => this.publish(record));

      return ok(
        this.code('CREATE_MANY_SUCCESS'),
        `Created ${results.length} of ${dataArray.length} ${this.modelName} records`,
        results,
      );
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ CreateMany ${this.modelName}:`, error);
      return fail(
        this.code('CREATE_MANY_FAILED'),
        `Failed to createMany ${this.modelName}: ${message}`,
      );
    }
  }

  async update(input: UpdateInput<PrismaModel>) {
    console.log(`📝 Update ${this.modelName}`, input);
    try {
      const { data, currentUserId } = input;
      if (!data.id) return fail(this.code('UPDATE_ONE_FAILED'), `id is required`);

      const existing = await this.findUnique(data.id);
      if (!existing.isSuccess) return fail(this.code('UPDATE_ONE_FAILED'), existing.message);

      const mappedData = this.mapUpdate(data);
      const { id: _id, ...safeData } = mappedData as typeof mappedData & { id?: string };

      const record = await this.delegate.update({
        where: { id: data.id } as FindManyArgs<PrismaModel>['where'],
        data: {
          ...safeData,
          auditLogs: this.audit('UPDATE', currentUserId, safeData, existing.data),
        },
        include: this.include,
      });
      this.publish(record);
      return ok(this.code('UPDATE_ONE_SUCCESS'), `Updated ${this.modelName} id:${data.id}`, record);
    } catch (error) {
      const { message } = getPrismaErrorMessage(error);
      console.error(`❌ Update ${this.modelName}:`, error);
      return fail(
        this.code('UPDATE_ONE_FAILED'),
        `Failed to update ${this.modelName} id:${input.data.id}: ${message}`,
      );
    }
  }

  async updateMany(inputs: UpdateInput<PrismaModel>[] | UpdateInput<PrismaModel>) {
    console.log(`📝 UpdateMany ${this.modelName}`, inputs);
    try {
      const inputArray = Array.isArray(inputs) ? inputs : [inputs];
      const allData: Array<{
        data: Partial<UpdateArgs<PrismaModel>['data']> & { id: string };
        currentUserId: string;
      }> = [];

      inputArray.forEach((input) => {
        const items = Array.isArray(input.data) ? input.data : [input.data];
        items.forEach((item) => {
          if (item.id) allData.push({ data: item, currentUserId: input.currentUserId });
          else console.warn(`Skipping record without id:`, item);
        });
      });

      if (!allData.length)
        return fail(this.code('UPDATE_MANY_FAILED'), `No valid records — all missing id`);

      const results = await this.prisma.$transaction(
        async (tx) =>
          Promise.all(
            allData.map(async ({ data, currentUserId }) => {
              try {
                const existing = await (
                  tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>
                ).findUnique({
                  where: { id: data.id } as FindUniqueArgs<PrismaModel>['where'],
                  include: this.include,
                });
                if (!existing)
                  return fail(this.code('UPDATE_MANY_FAILED'), `Record not found id:${data.id}`);

                const mappedData = this.mapUpdate(data);
                const { id: _id, ...safeData } = mappedData as typeof mappedData & { id?: string };

                const record = await (
                  tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>
                ).update({
                  where: { id: data.id } as FindManyArgs<PrismaModel>['where'],
                  data: {
                    ...safeData,
                    auditLogs: this.audit('UPDATE', currentUserId, safeData, existing),
                  },
                  include: this.include,
                });
                return ok(
                  this.code('UPDATE_MANY_SUCCESS'),
                  `Updated ${this.modelName} id:${data.id}`,
                  record,
                );
              } catch (error) {
                console.error(`❌ UpdateMany item ${this.modelName}:`, error);
                return fail(this.code('UPDATE_MANY_FAILED'), `Failed id:${data.id}: ${error}`);
              }
            }),
          ),
        { timeout: Math.max(20000, allData.length * 1000) },
      );

      const successCount = results.filter((r) => r.isSuccess).length;
      results.forEach((r) => r.isSuccess && this.publish(r.data));
      return {
        isSuccess: successCount === allData.length,
        code: this.code('UPDATE_MANY_SUCCESS'),
        message: `Updated ${successCount} of ${allData.length} ${this.modelName} records`,
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
    try {
      const { id, currentUserId } = input;
      if (!id) return fail(this.code('DELETE_ONE_FAILED'), `id is required`);

      const existing = await this.findUnique(id);
      if (!existing.isSuccess) return fail(this.code('DELETE_ONE_FAILED'), existing.message);

      const record = await this.delegate.delete({
        where: { id } as FindManyArgs<PrismaModel>['where'],
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
      const results = await this.prisma.$transaction(
        async (tx) =>
          Promise.all(
            ids.map(async (id) => {
              try {
                const existing = await (
                  tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>
                ).findUnique({
                  where: { id } as FindUniqueArgs<PrismaModel>['where'],
                  include: this.include,
                });
                if (!existing)
                  return fail(this.code('DELETE_MANY_FAILED'), `Record not found id:${id}`);

                await (tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>).delete({
                  where: { id } as FindManyArgs<PrismaModel>['where'],
                });

                await (tx.auditLog as unknown as PrismaModelMethods<PrismaModel>).create({
                  data: {
                    modelId: id,
                    ...buildAuditLog({
                      modelName: this.modelName,
                      action: 'DELETE',
                      actorId: currentUserId,
                      oldDetails: existing,
                      newDetails: { record: null, userId: currentUserId },
                      timestamp: this.time,
                    }).create,
                  },
                });

                return ok(this.code('DELETE_MANY_SUCCESS'), `Deleted ${this.modelName} id:${id}`, {
                  id,
                });
              } catch (error) {
                console.error(`❌ RemoveMany item ${this.modelName}:`, error);
                return fail(this.code('DELETE_MANY_FAILED'), `Failed id:${id}: ${error}`);
              }
            }),
          ),
        { timeout: Math.max(20000, ids.length * 1000) },
      );

      const successCount = results.filter((r) => r.isSuccess).length;
      results.forEach((r) => r.isSuccess && this.publish(r.data));
      return {
        isSuccess: successCount === ids.length,
        code: this.code('DELETE_MANY_SUCCESS'),
        message: `Deleted ${successCount} of ${ids.length} ${this.modelName} records`,
        data: results.filter((r) => r.isSuccess).map((r) => r.data),
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
    const existing = tx
      ? await delegate.findUnique({
          where: { id } as FindUniqueArgs<PrismaModel>['where'],
          include: this.include,
        })
      : (await this.findUnique(id)).data;

    if (!existing) return fail(this.code(`${opCode}_FAILED`), `Record not found id:${id}`);

    const record = await (tx ? delegate : this.delegate).update({
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
  }

  async archive(input: ArchiveInput) {
    console.log(`📝 Archive ${this.modelName} id:${input.id}`);
    if (!input.id) return fail(this.code('ARCHIVE_ONE_FAILED'), `id is required`);
    const existing = await this.findUnique(input.id);
    if (!existing.isSuccess) return fail(this.code('ARCHIVE_ONE_FAILED'), existing.message);
    try {
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
    const existing = await this.findUnique(input.id);
    if (!existing.isSuccess) return fail(this.code('RESTORE_ONE_FAILED'), existing.message);
    try {
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
}
