import { Prisma } from '@/lib/generated/prisma/client';
import { createInputRefs } from '@/lib/pothos/Inputs';
import PrismaTypes from '@/lib/pothos/pothos-prisma-types';
import { FindManyArgs, UpdateArgs } from './prismaArgs.type';

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
};
export type CursorPaginationInput<PrismaModel extends Prisma.ModelName> = {
  isActive: boolean;
  cursor?: string | null;
  direction?: 'forward' | 'backward'; // ← add this
  take?: number;
  filter?: FindManyArgs<PrismaModel>['where'];
  search?: string;
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
