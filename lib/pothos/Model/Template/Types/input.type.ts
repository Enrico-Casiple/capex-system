import { Prisma } from '../../../../../generated/prisma/client/client';
import PrismaTypes from '../../../../../lib/pothos/pothos-prisma-types';
import { FindManyArgs } from './prismaArgs.type';

export type CreateInput<PrismaModel extends Prisma.ModelName> = {
  // data: (typeof createInputRefs)[PrismaModel];
  data: PrismaTypes[PrismaModel]['Create'];
  currentUserId?: string | null;
};
export type CreateManyInput<PrismaModel extends Prisma.ModelName> = {
  // data: (typeof createInputRefs)[PrismaModel][];
  data: PrismaTypes[PrismaModel]['Create'][];
  currentUserId: string;
};
export type UpdateInput<PrismaModel extends Prisma.ModelName> = {
  // data: Partial<UpdateArgs<PrismaModel>['data']> & { id: UpdateArgs<PrismaModel>['where']['id'] };
  data: PrismaTypes[PrismaModel]['Update'] & PrismaTypes[PrismaModel]['WhereUnique'];
  currentUserId: string;
};
export type RemoveInput = { id: string; currentUserId: string };
export type RemoveManyInput = { ids: string[]; currentUserId: string };
export type ArchiveInput = { id: string; currentUserId: string };
export type ArchiveManyInput = { ids: string[]; currentUserId: string };
export type PaginationInput<PrismaModel extends Prisma.ModelName> = {
  isActive: boolean;
  currentPage: number;
  pageSize: number;
  filter?: FindManyArgs<PrismaModel>['where'];
  search?: string;
  searchFields?: (keyof PrismaTypes[PrismaModel]['Shape'])[]; // ← add this
};
export type CursorPaginationInput<PrismaModel extends Prisma.ModelName> = {
  isActive: boolean;
  cursor?: string | null;
  direction?: 'forward' | 'backward'; // ← add this
  take?: number;
  filter?: PrismaTypes[PrismaModel]['Where'];
  search?: string;
  searchFields?: (keyof PrismaTypes[PrismaModel]['Shape'])[]; // ← add this
};

export type CursorPaginationResult<PrismaModel extends Prisma.ModelName> = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: PrismaTypes[PrismaModel]['Shape'][] | null;
  nextCursor: string | null;
  prevCursor: string | null; // ← add this
  hasNextPage: boolean;
  hasPrevPage: boolean; // ← add this
};

export type ExportCsvInput<PrismaModel extends Prisma.ModelName> = {
  isActive?: boolean;
  filter?: FindManyArgs<PrismaModel>['where'];
  search?: string;
  searchFields?: (keyof PrismaTypes[PrismaModel]['Shape'])[];
  columns?: string[];
  fileName?: string;
};

export interface GroupByInput<PrismaModel extends Prisma.ModelName> {
  by: (keyof PrismaTypes[PrismaModel]['Shape'])[];
  where?: Prisma.Args<PrismaModel, 'groupBy'>['where'];
  orderBy?: Prisma.Args<PrismaModel, 'groupBy'>['orderBy'];
  _count?: Prisma.Args<PrismaModel, 'groupBy'>['_count'];
  _avg?: Prisma.Args<PrismaModel, 'groupBy'>['_avg'];
  _sum?: Prisma.Args<PrismaModel, 'groupBy'>['_sum'];
  _min?: Prisma.Args<PrismaModel, 'groupBy'>['_min'];
  _max?: Prisma.Args<PrismaModel, 'groupBy'>['_max'];
}