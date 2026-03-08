/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatInTimeZone } from 'date-fns-tz';
import { Prisma, PrismaClient } from '../../../generated/prisma/client';
import { getPrismaErrorMessage } from '../../../util/getPrismaErrorMessage';
import { createInputRefs } from '../../Inputs';
import PrismaTypes from '../../pothos-prisma-types';

export type FindManyArgs<PrismaModel extends Prisma.ModelName> = Prisma.Args<
  PrismaClient[Uncapitalize<PrismaModel>],
  'findMany'
>;
export type FindUniqueArgs<PrismaModel extends Prisma.ModelName> = Prisma.Args<
  PrismaClient[Uncapitalize<PrismaModel>],
  'findUnique'
>;
export type CreateArgs<PrismaModel extends Prisma.ModelName> =
  Prisma.TypeMap['model'][PrismaModel]['operations']['create']['args'];
export type CreateManyArgs<PrismaModel extends Prisma.ModelName> =
  Prisma.TypeMap['model'][PrismaModel]['operations']['createMany']['args'];
export type UpdateArgs<PrismaModel extends Prisma.ModelName> =
  Prisma.TypeMap['model'][PrismaModel]['operations']['update']['args'];
export type UpdateManyArgs<PrismaModel extends Prisma.ModelName> =
  Prisma.TypeMap['model'][PrismaModel]['operations']['updateMany']['args'];
export type PrismaModelShape<PrismaModel extends Prisma.ModelName> =
  PrismaTypes[PrismaModel]['Shape'];

export type PrismaModelMethods<PrismaModel extends Prisma.ModelName> = {
  findUnique: (args: {
    where: FindUniqueArgs<PrismaModel>['where'];
    include?: FindUniqueArgs<PrismaModel>['include'];
  }) => Promise<PrismaTypes[keyof PrismaTypes]['Shape'] | null>;
  findMany: (args: {
    where?: FindManyArgs<PrismaModel>['where'];
    orderBy?: FindManyArgs<PrismaModel>['orderBy'];
    skip?: FindManyArgs<PrismaModel>['skip'];
    take?: FindManyArgs<PrismaModel>['take'];
    include?: FindManyArgs<PrismaModel>['include'];
  }) => Promise<PrismaTypes[PrismaModel]['Shape'][] | null>;
  count: (args?: { where?: FindManyArgs<PrismaModel>['where'] }) => Promise<number>;
  create: (args: {
    data: CreateArgs<PrismaModel>['data'];
    include?: CreateArgs<PrismaModel>['include'];
  }) => Promise<PrismaTypes[keyof PrismaTypes]['Shape'] | null>;
  createMany: (args: {
    data: CreateManyArgs<PrismaModel>['data'];
    skipDuplicates?: boolean;
  }) => Promise<PrismaTypes[PrismaModel]['Shape'][] | null>;
  update: (args: {
    where: UpdateArgs<PrismaModel>['where'];
    data: UpdateArgs<PrismaModel>['data'];
    include?: UpdateArgs<PrismaModel>['include'];
  }) => Promise<PrismaTypes[PrismaModel]['Shape'] | null>;
  updateMany: (args: {
    where: UpdateManyArgs<PrismaModel>['where'];
    data: UpdateManyArgs<PrismaModel>['data'];
  }) => Promise<PrismaTypes[PrismaModel]['Shape'] | null>;
  delete: (args: {
    where: UpdateArgs<PrismaModel>['where'];
  }) => Promise<PrismaTypes[PrismaModel]['Shape'] | null>;
};

export type CreateInput<PrismaModel extends Prisma.ModelName> = {
  data: (typeof createInputRefs)[PrismaModel];
  currentUserId?: string | null;
};
export type CreateManyInput<PrismaModel extends Prisma.ModelName> = {
  data: (typeof createInputRefs)[PrismaModel][];
  currentUserId: string;
};

export type UpdateInput<PrismaModel extends Prisma.ModelName> = {
  data: Partial<UpdateArgs<PrismaModel>['data']> & { id: UpdateArgs<PrismaModel>['where']['id'] };
  currentUserId: string;
};

export type RemoveInput = {
  id: string;
  currentUserId: string;
};

export type RemoveManyInput = {
  ids: string[];
  currentUserId: string;
};

export type ArchiveInput = {
  id: string;
  currentUserId: string;
};

export type ArchiveManyInput = {
  ids: string[];
  currentUserId: string;
};

export type PaginationInput<PrismaModel extends Prisma.ModelName> = {
  isActive: boolean;
  currentPage: number;
  pageSize: number;
  filter?: FindManyArgs<PrismaModel>['where'];
  search?: string;
};

export class ModelService<PrismaModel extends Prisma.ModelName> {
  private readonly modelName: PrismaModel = '' as PrismaModel;
  private readonly prismaModel: Uncapitalize<PrismaModel> = '' as Uncapitalize<PrismaModel>;
  private readonly time: string = formatInTimeZone(
    new Date(),
    'Asia/Manila',
    "yyyy-MM-dd'T'HH:mm:ssXXX",
  );
  private readonly orderBy: FindManyArgs<PrismaModel>['orderBy'] = [
    { createdAt: 'desc' },
  ] as FindManyArgs<PrismaModel>['orderBy'];
  private readonly include: FindManyArgs<PrismaModel>['include'] = undefined;
  private readonly searchableFields: (keyof PrismaTypes[PrismaModel]['Shape'])[] = [];
  private readonly createMapping: (
    data: CreateInput<PrismaModel>['data'],
  ) => CreateArgs<PrismaModel>['data'] = (data) => data;
  private readonly createManyMapping: (
    data: CreateManyInput<PrismaModel>['data'],
  ) => CreateManyArgs<PrismaModel>['data'] = (data) => data;
  private readonly updateMapping: (
    data: UpdateInput<PrismaModel>['data'],
  ) => UpdateArgs<PrismaModel>['data'] = (data) => data;

  constructor(
    modelName: PrismaModel,
    prismaModel: Uncapitalize<PrismaModel>,
    protected readonly prisma: PrismaClient,
  ) {
    this.modelName = modelName;
    this.prismaModel = prismaModel;
    console.log(
      `Initializing ${this.constructor.name} for model: ${this.modelName} at ${this.time}`,
    );
  }

  // private get session() {
  //   getSession().then((session) => {
  //     if (!session) {
  //       console.warn(`No active session found for ${this.modelName} operations`);
  //     }

  //     return session;
  //   });
  // }

  private get deligate() {
    const deligate = this.prisma[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>;
    if (!deligate) {
      throw new Error(
        `Failed to initialize ${this.constructor.name}: No Prisma model found for ${this.modelName}`,
      );
    }
    return deligate;
  }

  // ✅ MongoDB Optimal Batch Size Calculator
  private getMongoDBOptimalBatchSize(dataArray: CreateManyInput<PrismaModel>['data']): number {
    const avgRecordSize = JSON.stringify(dataArray[0] || {}).length;
    const totalSize = avgRecordSize * dataArray.length;

    // MongoDB transaction limits: 16MB per transaction
    const MONGODB_MAX_SIZE = 16 * 1024 * 1024; // 16MB
    const SAFETY_MARGIN = 0.8; // Use 80% of limit

    // Calculate safe batch size
    const safeSize = Math.floor((MONGODB_MAX_SIZE * SAFETY_MARGIN) / avgRecordSize);

    // Recommended limits for enterprise MongoDB
    if (totalSize < 1000000) return Math.min(500, safeSize); // < 1MB: 500 records
    if (totalSize < 5000000) return Math.min(200, safeSize); // < 5MB: 200 records
    if (totalSize < 10000000) return Math.min(100, safeSize); // < 10MB: 100 records
    console.log(
      `⚠️ Large batch detected: total size ${totalSize} bytes. Using reduced batch size of ${Math.min(50, safeSize)} to avoid MongoDB transaction limits.`,
    );
    return Math.min(50, safeSize); // > 10MB: 50 records
  }

  // ✅ MongoDB Optimized Batch Processing
  private async processMongoDBBatch(
    dataArray: CreateManyInput<PrismaModel>['data'],
    currentUserId: string,
  ): Promise<{
    isSuccess: boolean;
    message: string;
    code: string;
    data: PrismaTypes[PrismaModel]['Shape'][] | null;
  }> {
    try {
      console.log(
        `🟢 Processing batch of ${dataArray.length} records for ${this.modelName} at ${this.time}`,
      );
      const createdRecords: PrismaTypes[PrismaModel]['Shape'][] = await this.prisma.$transaction(
        async (tx): Promise<PrismaTypes[PrismaModel]['Shape'][]> => {
          const inserted = await Promise.all(
            dataArray.map((recordData) =>
              (tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>).create({
                data: {
                  ...recordData,
                  auditLogs: {
                    create: {
                      modelName: this.modelName,
                      action: 'CREATE',
                      actorId: currentUserId,
                      timestamp: this.time,
                      newDetails: JSON.stringify(recordData),
                    },
                  },
                } as CreateArgs<PrismaModel>['data'],
                include: this.include,
              }),
            ),
          );
          return inserted.flat() as PrismaTypes[PrismaModel]['Shape'][];
        },
        {
          timeout: Math.max(20000, dataArray.length * 500), // 20s base + 500ms per record
        },
      );

      return {
        isSuccess: true,
        message: `Successfully created ${createdRecords.length} ${this.modelName} records`,
        code: `${this.modelName.toUpperCase()}_CREATE_MANY_SUCCESS`,
        data: createdRecords,
      };
    } catch (error) {
      console.error(`❌ Batch processing error:`, error);
      return {
        isSuccess: false,
        message: `Failed to create batch: ${error}`,
        code: `${this.modelName.toUpperCase()}_CREATE_MANY_FAILED`,
        data: null,
      };
    }
  }
  // ✅ Helper: Split into batches
  private splitIntoBatches<T>(array: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < array.length; i += batchSize) {
      batches.push(array.slice(i, i + batchSize));
    }
    console.log(`🟢 Split data into ${batches.length} batches with batch size of ${batchSize}`);
    return batches;
  }

  // findAll
  async findAll(paginationInput: PaginationInput<PrismaModel>) {
    // For Debugging: Log the incoming pagination input
    console.log(`🟢 Find called for ${this.modelName} with pagination input:`, paginationInput);
    const where = {
      isActive: paginationInput.isActive,
      ...(paginationInput.filter || {}),
    } as FindManyArgs<PrismaModel>['where'];

    if (paginationInput.search && paginationInput.search.trim() !== '') {
      if (where) {
        where.OR = this.searchableFields.map((field) => ({
          [field]: { contains: paginationInput?.search, mode: 'insensitive' },
        }));
      }
    }

    try {
      const [inActive, active, total, filtered, records] = await Promise.all([
        this.deligate.count({ where: { isActive: false } }),
        this.deligate.count({ where: { isActive: true } }),
        this.deligate.count(),
        this.deligate.count({ where }),
        this.deligate.findMany({
          where,
          orderBy: this.orderBy || [{ createdAt: 'desc' }],
          skip: (paginationInput.currentPage - 1) * paginationInput.pageSize,
          take: paginationInput.pageSize,
          include: this.include,
        }),
      ]);

      const pageSize = paginationInput.pageSize;
      const currentPage = paginationInput.currentPage;
      const relevantCount = filtered;
      const totalPages = Math.ceil(relevantCount / pageSize);
      const currentPageData = records ?? [];
      const hasNextPage = currentPage < totalPages;
      const hasPreviousPage = currentPage > 1;

      return {
        isSuccess: true,
        message: `Successfully retrieved ${this.modelName} records`,
        code: `${this.modelName.toUpperCase()}_RETRIEVE_ALL_SUCCESS`,
        data: currentPageData,
        allCount: total,
        active,
        inActive,
        pageinfo: {
          hasNextPage,
          hasPreviousPage,
          pageSize: pageSize ?? relevantCount,
          currentPage,
          totalPages,
          totalCount: relevantCount,
        },
      };
    } catch (error) {
      const errorMessage = getPrismaErrorMessage(error);

      console.error(`❌ Find All ${this.modelName} error:`, {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: error?.constructor?.name,
      });

      return {
        isSuccess: false,
        message: `Failed to retrieve ${this.modelName} records: ${errorMessage.message || error}`,
        code: `${this.modelName.toUpperCase()}_RETRIEVE_ALL_FAILED`,
        data: null,
        allCount: 0,
        active: 0,
        inActive: 0,
        pageinfo: null,
      };
    }
  }

  // findUnique
  async findUnique(id: string) {
    // For Debugging: Log the incoming ID for findUnique
    console.log(`🟢 FindUnique called for ${this.modelName} with id:`, id);
    try {
      const record = await this.deligate.findUnique({
        where: { id } as FindUniqueArgs<PrismaModel>['where'],
        include: this.include,
      });
      if (!record) {
        return {
          isSuccess: false,
          message: `No ${this.modelName} record found with the provided id.`,
          code: `${this.modelName.toUpperCase()}_RETRIEVE_UNIQUE_NOT_FOUND`,
          data: null,
        };
      }
      return {
        isSuccess: true,
        message: `Successfully retrieved ${this.modelName} record with id ${id}`,
        code: `${this.modelName.toUpperCase()}_RETRIEVE_UNIQUE_SUCCESS`,
        data: record as unknown as PrismaModelShape<PrismaModel>,
      };
    } catch (error) {
      const errorMessage = getPrismaErrorMessage(error);

      console.error(`❌ Find Unique ${this.modelName} error:`, {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: error?.constructor?.name,
      });

      return {
        isSuccess: false,
        message: `Failed to retrieve ${this.modelName} record with id ${id}: ${errorMessage.message || error}`,
        code: `${this.modelName.toUpperCase()}_RETRIEVE_UNIQUE_FAILED`,
        data: null,
      };
    }
  }

  // create
  async create(input: CreateInput<PrismaModel>) {
    // For Debugging: Log the incoming data for create
    console.log(`🟢 Create called for ${this.modelName} with data:`, input);
    const { data } = input;
    try {
      const mappedData = this.createMapping(data);
      const createdRecord = await this.deligate.create({
        data: {
          ...mappedData,
          auditLogs: {
            create: {
              modelName: this.modelName,
              action: 'CREATE',
              actorId: input.currentUserId ?? null,
              timestamp: this.time,
              newDetails: JSON.stringify(mappedData),
            },
          },
        },
        include: this.include,
      });

      return {
        isSuccess: true,
        message: `Successfully created ${this.modelName} record`,
        code: `${this.modelName.toUpperCase()}_CREATE_ONE_SUCCESS`,
        data: createdRecord,
      };
    } catch (error) {
      const errorMessage = getPrismaErrorMessage(error);

      console.error(`❌ Create ${this.modelName} error:`, {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: error?.constructor?.name,
      });

      return {
        isSuccess: false,
        message: `Failed to create one ${this.modelName} record: ${errorMessage.message || error}`,
        code: `${this.modelName.toUpperCase()}_CREATE_ONE_FAILED`,
        data: null,
      };
    }
  }

  // createMany  OPTIMIZED FOR MONGODB
  async createMany(input: CreateManyInput<PrismaModel>) {
    console.log(`🟢 CreateMany called for ${this.modelName} with data:`, input);
    const { data, currentUserId } = input;
    try {
      const mappedData = this.createManyMapping(data);
      const dataArray = Array.isArray(mappedData) ? mappedData : [mappedData];

      // MongoDB optimal batch sizes
      const BATCH_SIZE = this.getMongoDBOptimalBatchSize(dataArray);

      if (dataArray.length <= BATCH_SIZE) {
        return this.processMongoDBBatch(dataArray, currentUserId);
      }

      // Split into batches for large datasets
      const batches = this.splitIntoBatches(dataArray, BATCH_SIZE);
      const results: PrismaTypes[PrismaModel]['Shape'][] = [];

      for (const batch of batches) {
        const result = await this.processMongoDBBatch(batch, currentUserId);
        if (result.isSuccess && result.data) {
          results.push(...result.data);
        } else {
          console.error(`Batch failed:`, result.message);
        }
      }

      return {
        isSuccess: results.length === dataArray.length,
        message: `Successfully created ${results.length} of ${dataArray.length} ${this.modelName} records`,
        code: `${this.modelName.toUpperCase()}_CREATE_MANY_SUCCESS`,
        data: results,
      };
    } catch (error) {
      const errorMessage = getPrismaErrorMessage(error);

      console.error(`❌ Create Many ${this.modelName} error:`, {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: error?.constructor?.name,
      });
      return {
        isSuccess: false,
        message: `Failed to create ${this.modelName} records: ${errorMessage.message || error}`,
        code: `${this.modelName.toUpperCase()}_CREATE_MANY_FAILED`,
        data: null,
      };
    }
  }
  // update
  async update(input: UpdateInput<PrismaModel>) {
    console.log(`🟢 Update called for ${this.modelName} with data:`, input);
    try {
      const { data, currentUserId } = input;
      const mappedData = this.updateMapping(data);

      if (!data.id) {
        return {
          isSuccess: false,
          message: `Failed to update ${this.modelName} record: id is required`,
          code: `${this.modelName.toUpperCase()}_UPDATE_ONE_FAILED`,
          data: null,
        };
      }
      const existingRecord = await this.findUnique(data.id);

      if (!existingRecord.isSuccess) {
        return {
          isSuccess: false,
          message: `Failed to update ${this.modelName} record: ${existingRecord.message}`,
          code: `${this.modelName.toUpperCase()}_UPDATE_ONE_FAILED`,
          data: null,
        };
      }

      // ✅ Strip `id` from mappedData — Prisma does not allow `id` inside `data`
      const { id: _, ...safeData } = mappedData as typeof mappedData & { id?: string };

      const updatedRecord = await this.deligate.update({
        where: { id: data.id } as FindManyArgs<PrismaModel>['where'],
        data: {
          ...safeData,
          auditLogs: {
            create: {
              modelName: this.modelName,
              action: 'UPDATE',
              actorId: currentUserId,
              timestamp: this.time,
              oldDetails: JSON.stringify(existingRecord.data),
              newDetails: JSON.stringify(safeData),
            },
          },
        },
        include: this.include,
      });
      return {
        isSuccess: true,
        message: `Successfully updated ${this.modelName} record with id ${data.id}`,
        code: `${this.modelName.toUpperCase()}_UPDATE_ONE_SUCCESS`,
        data: updatedRecord,
      };
    } catch (error) {
      const errorMessage = getPrismaErrorMessage(error);

      console.error(`❌ Update One ${this.modelName} error:`, {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: error?.constructor?.name,
      });
      return {
        isSuccess: false,
        message: `Failed to update one ${this.modelName} record with id ${input.data.id}: ${errorMessage.message || error}`,
        code: `${this.modelName.toUpperCase()}_UPDATE_ONE_FAILED`,
        data: null,
      };
    }
  }

  // update many - OPTIMIZED FOR MONGODB
  async updateMany(inputs: UpdateInput<PrismaModel>[] | UpdateInput<PrismaModel>) {
    console.log(
      `🟢 Starting updateMany for ${this.modelName} at ${this.time} with inputs:`,
      inputs,
    );
    try {
      // ✅ Ensure inputs is always an array
      const inputArray = Array.isArray(inputs) ? inputs : [inputs];

      // ✅ Flatten and validate all data
      const allData: Array<{
        data: Partial<UpdateArgs<PrismaModel>['data']> & { id: string };
        currentUserId: string;
      }> = [];

      inputArray.forEach((input) => {
        const dataArray = Array.isArray(input.data) ? input.data : [input.data];
        dataArray.forEach((item) => {
          if (item.id) {
            allData.push({ data: item, currentUserId: input.currentUserId });
          } else {
            console.warn(`Skipping record without id:`, item);
          }
        });
      });

      if (allData.length === 0) {
        return {
          isSuccess: false,
          message: `No valid records to update - all records missing id`,
          code: `${this.modelName.toUpperCase()}_UPDATE_MANY_FAILED`,
          data: null,
        };
      }

      // ✅ Use transaction for atomicity
      const updatedRecords = await this.prisma.$transaction(
        async (tx) => {
          const results = await Promise.all(
            allData.map(async ({ data, currentUserId }) => {
              try {
                const recordId = data.id;
                const mappedData = this.updateMapping(data);

                // ✅ Get existing record for audit
                const existingRecord = await (
                  tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>
                ).findUnique({
                  where: { id: recordId } as FindUniqueArgs<PrismaModel>['where'],
                  include: this.include,
                });

                if (!existingRecord) {
                  return {
                    isSuccess: false,
                    message: `Record not found with id ${recordId}`,
                    code: `${this.modelName.toUpperCase()}_UPDATE_MANY_FAILED`,
                    data: null,
                  };
                }

                // ✅ Strip `id` from mappedData
                const { id, ...safeData } = mappedData as typeof mappedData & { id?: string };

                // ✅ Update record
                const updatedRecord = await (
                  tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>
                ).update({
                  where: { id: recordId } as FindManyArgs<PrismaModel>['where'],
                  data: {
                    ...safeData,
                    auditLogs: {
                      create: {
                        modelName: this.modelName,
                        action: 'UPDATE',
                        actorId: currentUserId,
                        timestamp: this.time,
                        oldDetails: JSON.stringify(existingRecord),
                        newDetails: JSON.stringify(safeData),
                      },
                    },
                  },
                  include: this.include,
                });

                return {
                  isSuccess: true,
                  message: `Successfully updated ${this.modelName} record with id ${recordId}`,
                  code: `${this.modelName.toUpperCase()}_UPDATE_MANY_SUCCESS`,
                  data: updatedRecord,
                };
              } catch (error) {
                const errorMessage = getPrismaErrorMessage(error);

                console.error(`❌ Update Many ${this.modelName} error:`, {
                  message: errorMessage,
                  stack: error instanceof Error ? error.stack : 'No stack trace',
                  type: error?.constructor?.name,
                });
                return {
                  isSuccess: false,
                  message: `Failed to update record: ${error}`,
                  code: `${this.modelName.toUpperCase()}_UPDATE_MANY_FAILED`,
                  data: null,
                };
              }
            }),
          );

          return results;
        },
        {
          timeout: Math.max(20000, allData.length * 1000), // 20s base + 1s per record
        },
      );

      const successCount = updatedRecords.filter((r) => r.isSuccess).length;

      return {
        isSuccess: successCount === allData.length,
        message: `Updated ${successCount} of ${allData.length} records`,
        code: `${this.modelName.toUpperCase()}_UPDATE_MANY_SUCCESS`,
        data: updatedRecords.filter((r) => r.isSuccess).map((r) => r.data),
      };
    } catch (error) {
      const errorMessage = getPrismaErrorMessage(error);

      console.error(`❌ Update Many ${this.modelName} error:`, {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: error?.constructor?.name,
      });
      return {
        isSuccess: false,
        message: `Failed to update ${this.modelName} records: ${errorMessage.message || error}`,
        code: `${this.modelName.toUpperCase()}_UPDATE_MANY_FAILED`,
        data: null,
      };
    }
  }

  // delete (hard delete)
  async remove(input: RemoveInput) {
    console.log(`🟢 Remove called for ${this.modelName} with id:`, input.id);
    try {
      const { id, currentUserId } = input;

      if (!id) {
        return {
          isSuccess: false,
          message: `Failed to delete ${this.modelName} record: id is required`,
          code: `${this.modelName.toUpperCase()}_DELETE_ONE_FAILED`,
          data: null,
        };
      }
      const existingRecord = await this.findUnique(id);
      if (!existingRecord.isSuccess) {
        return {
          isSuccess: false,
          message: `Failed to delete ${this.modelName} record: ${existingRecord.message}`,
          code: `${this.modelName.toUpperCase()}_DELETE_ONE_FAILED`,
          data: null,
        };
      }

      const deletedRecord = await this.deligate.update({
        where: { id } as FindManyArgs<PrismaModel>['where'],
        data: {
          isActive: false,
          auditLogs: {
            create: {
              modelName: this.modelName,
              action: 'DELETE',
              actorId: currentUserId,
              timestamp: this.time,
              oldDetails: JSON.stringify(existingRecord.data),
              newDetails: JSON.stringify({
                record: null,
                timestamp: this.time,
                userId: currentUserId,
              }),
            },
          },
        },
        include: this.include,
      });
      return {
        isSuccess: true,
        message: `Successfully deleted ${this.modelName} record with id ${id}`,
        code: `${this.modelName.toUpperCase()}_DELETE_ONE_SUCCESS`,
        data: deletedRecord,
      };
    } catch (error) {
      const errorMessage = getPrismaErrorMessage(error);

      console.error(`❌ Delete One ${this.modelName} error:`, {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: error?.constructor?.name,
      });
      return {
        isSuccess: false,
        message: `Failed to delete one ${this.modelName} record with id ${input.id}: ${errorMessage.message || error}`,
        code: `${this.modelName.toUpperCase()}_DELETE_ONE_FAILED`,
        data: null,
      };
    }
  }

  // delete many - OPTIMIZED FOR MONGODB
  async removeMany(input: RemoveManyInput) {
    console.log(`🟢 Starting removeMany for ${this.modelName} at ${this.time} with inputs:`, input);
    const { ids, currentUserId } = input;
    try {
      if (!ids || ids.length === 0) {
        return {
          isSuccess: false,
          message: `No records to delete - ids array is empty`,
          code: `${this.modelName.toUpperCase()}_DELETE_MANY_FAILED`,
          data: null,
        };
      }

      const deletedRecords = await this.prisma.$transaction(
        async (tx) => {
          const results = await Promise.all(
            ids.map(async (id) => {
              try {
                // ✅ Get existing record for audit
                const existingRecord = await (
                  tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>
                ).findUnique({
                  where: { id } as FindUniqueArgs<PrismaModel>['where'],
                  include: this.include,
                });

                if (!existingRecord) {
                  return {
                    isSuccess: false,
                    message: `Record not found with id ${id}`,
                    code: `${this.modelName.toUpperCase()}_DELETE_MANY_FAILED`,
                    data: null,
                  };
                }

                // ✅ Delete record (hard delete - removes from DB)
                await (tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>).delete({
                  where: { id } as FindManyArgs<PrismaModel>['where'],
                });

                // ✅ Create audit log after deletion
                await (tx.auditLog as unknown as PrismaModelMethods<PrismaModel>).create({
                  data: {
                    modelId: id,
                    modelName: this.modelName,
                    action: 'DELETE',
                    actorId: currentUserId,
                    timestamp: this.time,
                    oldDetails: JSON.stringify(existingRecord),
                    newDetails: JSON.stringify({
                      record: null,
                      timestamp: this.time,
                      userId: currentUserId,
                    }),
                  },
                });

                return {
                  isSuccess: true,
                  message: `Successfully deleted ${this.modelName} record with id ${id}`,
                  code: `${this.modelName.toUpperCase()}_DELETE_MANY_SUCCESS`,
                  data: { id }, // ✅ Return only ID, not full record
                };
              } catch (error) {
                const errorMessage = getPrismaErrorMessage(error);

                console.error(`❌ Delete Many ${this.modelName} error:`, {
                  message: errorMessage,
                  stack: error instanceof Error ? error.stack : 'No stack trace',
                  type: error?.constructor?.name,
                });
                return {
                  isSuccess: false,
                  message: `Failed to delete record with id ${id}: ${error}`,
                  code: `${this.modelName.toUpperCase()}_DELETE_MANY_FAILED`,
                  data: null,
                };
              }
            }),
          );

          return results;
        },
        {
          timeout: Math.max(20000, ids.length * 1000), // 20s base + 1s per record
        },
      );

      const successCount = deletedRecords.filter((r) => r.isSuccess).length;

      return {
        isSuccess: successCount === ids.length,
        message: `Deleted ${successCount} of ${ids.length} records`,
        code: `${this.modelName.toUpperCase()}_DELETE_MANY_SUCCESS`,
        data: deletedRecords.filter((r) => r.isSuccess).map((r) => r.data),
      };
    } catch (error) {
      const errorMessage = getPrismaErrorMessage(error);

      console.error(`❌ Delete Many ${this.modelName} error:`, {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: error?.constructor?.name,
      });
      return {
        isSuccess: false,
        message: `Failed to delete ${this.modelName} records: ${errorMessage.message || error}`,
        code: `${this.modelName.toUpperCase()}_DELETE_MANY_FAILED`,
        data: null,
      };
    }
  }
  // archive (soft delete)
  async archive(input: ArchiveInput) {
    console.log(`🟢 Archive called for ${this.modelName} with id:`, input.id);
    try {
      const { id, currentUserId } = input;

      if (!id) {
        return {
          isSuccess: false,
          message: `Failed to archive ${this.modelName} record: id is required`,
          code: `${this.modelName.toUpperCase()}_ARCHIVE_ONE_FAILED`,
          data: null,
        };
      }
      const existingRecord = await this.findUnique(id);
      if (!existingRecord.isSuccess) {
        return {
          isSuccess: false,
          message: `Failed to archive ${this.modelName} record: ${existingRecord.message}`,
          code: `${this.modelName.toUpperCase()}_ARCHIVE_ONE_FAILED`,
          data: null,
        };
      }

      const archivedRecord = await this.deligate.update({
        where: { id } as FindManyArgs<PrismaModel>['where'],
        data: {
          isActive: false,
          auditLogs: {
            create: {
              modelName: this.modelName,
              action: 'ARCHIVE',
              actorId: currentUserId,
              timestamp: this.time,
              oldDetails: JSON.stringify({
                isActive: true,
                timestamp: this.time,
                userId: currentUserId,
              }),
              newDetails: JSON.stringify({
                isActive: false,
                timestamp: this.time,
                userId: currentUserId,
              }),
            },
          },
        },
        include: this.include,
      });
      return {
        isSuccess: true,
        message: `Successfully archived ${this.modelName} record with id ${id}`,
        code: `${this.modelName.toUpperCase()}_ARCHIVE_ONE_SUCCESS`,
        data: archivedRecord,
      };
    } catch (error) {
      const errorMessage = getPrismaErrorMessage(error);

      console.error(`❌ Archive One ${this.modelName} error:`, {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: error?.constructor?.name,
      });
      return {
        isSuccess: false,
        message: `Failed to archive one ${this.modelName} record with id ${input.id}: ${errorMessage.message || error}`,
        code: `${this.modelName.toUpperCase()}_ARCHIVE_ONE_FAILED`,
        data: null,
      };
    }
  }

  // archive many - OPTIMIZED FOR MONGODB
  async archiveMany(input: ArchiveManyInput) {
    console.log(
      `🟢 Starting archiveMany for ${this.modelName} at ${this.time} with inputs:`,
      input,
    );
    const { ids, currentUserId } = input;
    try {
      if (!ids || ids.length === 0) {
        return {
          isSuccess: false,
          message: `No records to archive - ids array is empty`,
          code: `${this.modelName.toUpperCase()}_ARCHIVE_MANY_FAILED`,
          data: null,
        };
      }

      // ✅ Use transaction for atomicity
      const archivedRecords = await this.prisma.$transaction(
        async (tx) => {
          const results = await Promise.all(
            ids.map(async (id) => {
              try {
                // ✅ Get existing record for audit
                const existingRecord = await (
                  tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>
                ).findUnique({
                  where: { id } as FindUniqueArgs<PrismaModel>['where'],
                  include: this.include,
                });

                if (!existingRecord) {
                  return {
                    isSuccess: false,
                    message: `Record not found with id ${id}`,
                    code: `${this.modelName.toUpperCase()}_ARCHIVE_MANY_FAILED`,
                    data: null,
                  };
                }

                // ✅ Archive record
                const archivedRecord = await (
                  tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>
                ).update({
                  where: { id } as FindManyArgs<PrismaModel>['where'],
                  data: {
                    isActive: false,
                    auditLogs: {
                      create: {
                        modelName: this.modelName,
                        action: 'ARCHIVE',
                        actorId: currentUserId,
                        timestamp: this.time,
                        oldDetails: JSON.stringify({
                          isActive: true,
                          timestamp: this.time,
                          userId: currentUserId,
                        }),
                        newDetails: JSON.stringify({
                          isActive: false,
                          timestamp: this.time,
                          userId: currentUserId,
                        }),
                      },
                    },
                  },
                  include: this.include,
                });

                return {
                  isSuccess: true,
                  message: `Successfully archived ${this.modelName} record with id ${id}`,
                  code: `${this.modelName.toUpperCase()}_ARCHIVE_MANY_SUCCESS`,
                  data: archivedRecord,
                };
              } catch (error) {
                console.error(`Error archiving record ${id}:`, error);
                return {
                  isSuccess: false,
                  message: `Failed to archive record with id ${id}: ${error}`,
                  code: `${this.modelName.toUpperCase()}_ARCHIVE_MANY_FAILED`,
                  data: null,
                };
              }
            }),
          );

          return results;
        },
        {
          timeout: Math.max(20000, ids.length * 1000), // 20s base + 1s per record
        },
      );

      const successCount = archivedRecords.filter((r) => r.isSuccess).length;

      return {
        isSuccess: successCount === ids.length,
        message: `Archived ${successCount} of ${ids.length} records`,
        code: `${this.modelName.toUpperCase()}_ARCHIVE_MANY_SUCCESS`,
        data: archivedRecords.filter((r) => r.isSuccess).map((r) => r.data),
      };
    } catch (error) {
      const errorMessage = getPrismaErrorMessage(error);

      console.error(`❌ Archive Many ${this.modelName} error:`, {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: error?.constructor?.name,
      });
      return {
        isSuccess: false,
        message: `Failed to archive ${this.modelName} records: ${errorMessage.message || error}`,
        code: `${this.modelName.toUpperCase()}_ARCHIVE_MANY_FAILED`,
        data: null,
      };
    }
  }

  // restore (un-archive)
  async restore(input: ArchiveInput) {
    console.log(`🟢 Restore called for ${this.modelName} with id:`, input.id);
    try {
      const { id, currentUserId } = input;

      if (!id) {
        return {
          isSuccess: false,
          message: `Failed to restore ${this.modelName} record: id is required`,
          code: `${this.modelName.toUpperCase()}_RESTORE_ONE_FAILED`,
          data: null,
        };
      }
      const existingRecord = await this.findUnique(id);
      if (!existingRecord.isSuccess) {
        return {
          isSuccess: false,
          message: `Failed to restore ${this.modelName} record: ${existingRecord.message}`,
          code: `${this.modelName.toUpperCase()}_RESTORE_ONE_FAILED`,
          data: null,
        };
      }

      const restoredRecord = await this.deligate.update({
        where: { id } as FindManyArgs<PrismaModel>['where'],
        data: {
          isActive: true, // ✅ Fixed: was `false` in original
          auditLogs: {
            create: {
              modelName: this.modelName,
              action: 'RESTORE',
              actorId: currentUserId,
              timestamp: this.time,
              oldDetails: JSON.stringify({
                isActive: false,
                timestamp: this.time,
                userId: currentUserId,
              }),
              newDetails: JSON.stringify({
                isActive: true,
                timestamp: this.time,
                userId: currentUserId,
              }),
            },
          },
        },
        include: this.include,
      });
      return {
        isSuccess: true,
        message: `Successfully restored ${this.modelName} record with id ${id}`,
        code: `${this.modelName.toUpperCase()}_RESTORE_ONE_SUCCESS`,
        data: restoredRecord,
      };
    } catch (error) {
      const errorMessage = getPrismaErrorMessage(error);

      console.error(`❌ Restore One ${this.modelName} error:`, {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: error?.constructor?.name,
      });
      return {
        isSuccess: false,
        message: `Failed to restore one ${this.modelName} record with id ${input.id}: ${errorMessage.message || error}`,
        code: `${this.modelName.toUpperCase()}_RESTORE_ONE_FAILED`,
        data: null,
      };
    }
  }

  // restore many - OPTIMIZED FOR MONGODB
  async restoreMany(input: ArchiveManyInput) {
    console.log(
      `🟢 Starting restoreMany for ${this.modelName} at ${this.time} with inputs:`,
      input,
    );
    const { ids, currentUserId } = input;
    try {
      if (!ids || ids.length === 0) {
        return {
          isSuccess: false,
          message: `No records to restore - ids array is empty`,
          code: `${this.modelName.toUpperCase()}_RESTORE_MANY_FAILED`,
          data: null,
        };
      }

      // ✅ Use transaction for atomicity
      const restoredRecords = await this.prisma.$transaction(
        async (tx) => {
          const results = await Promise.all(
            ids.map(async (id) => {
              try {
                // ✅ Get existing record for audit
                const existingRecord = await (
                  tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>
                ).findUnique({
                  where: { id } as FindUniqueArgs<PrismaModel>['where'],
                  include: this.include,
                });

                if (!existingRecord) {
                  return {
                    isSuccess: false,
                    message: `Record not found with id ${id}`,
                    code: `${this.modelName.toUpperCase()}_RESTORE_MANY_FAILED`,
                    data: null,
                  };
                }

                // ✅ Restore record
                const restoredRecord = await (
                  tx[this.prismaModel] as unknown as PrismaModelMethods<PrismaModel>
                ).update({
                  where: { id } as FindManyArgs<PrismaModel>['where'],
                  data: {
                    isActive: true,
                    auditLogs: {
                      create: {
                        modelName: this.modelName,
                        action: 'RESTORE',
                        actorId: currentUserId,
                        timestamp: this.time,
                        oldDetails: JSON.stringify({
                          isActive: false,
                          timestamp: this.time,
                          userId: currentUserId,
                        }),
                        newDetails: JSON.stringify({
                          isActive: true,
                          timestamp: this.time,
                          userId: currentUserId,
                        }),
                      },
                    },
                  },
                  include: this.include,
                });

                return {
                  isSuccess: true,
                  message: `Successfully restored ${this.modelName} record with id ${id}`,
                  code: `${this.modelName.toUpperCase()}_RESTORE_MANY_SUCCESS`,
                  data: restoredRecord,
                };
              } catch (error) {
                console.error(`Error restoring record ${id}:`, error);
                return {
                  isSuccess: false,
                  message: `Failed to restore record with id ${id}: ${error}`,
                  code: `${this.modelName.toUpperCase()}_RESTORE_MANY_FAILED`,
                  data: null,
                };
              }
            }),
          );

          return results;
        },
        {
          timeout: Math.max(20000, ids.length * 1000), // 20s base + 1s per record
        },
      );

      const successCount = restoredRecords.filter((r) => r.isSuccess).length;

      return {
        isSuccess: successCount === ids.length,
        message: `Restored ${successCount} of ${ids.length} records`,
        code: `${this.modelName.toUpperCase()}_RESTORE_MANY_SUCCESS`,
        data: restoredRecords.filter((r) => r.isSuccess).map((r) => r.data),
      };
    } catch (error) {
      const errorMessage = getPrismaErrorMessage(error);

      console.error(`❌ Restore Many ${this.modelName} error:`, {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: error?.constructor?.name,
      });
      return {
        isSuccess: false,
        message: `Failed to restore ${this.modelName} records: ${errorMessage.message || error}`,
        code: `${this.modelName.toUpperCase()}_RESTORE_MANY_FAILED`,
        data: null,
      };
    }
  }
}
