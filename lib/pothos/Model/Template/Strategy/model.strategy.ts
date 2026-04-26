import { Prisma } from '@/generated/prisma/client/client';
import PrismaTypes from '@/lib/pothos/pothos-prisma-types';
import { CreateInput, CreateManyInput, UpdateInput } from '../Types/input.type';
import { CreateArgs, CreateManyArgs, FindManyArgs, UpdateArgs } from '../Types/prismaArgs.type';

export interface ModelStrategy<PrismaModel extends Prisma.ModelName> {
  orderBy?: FindManyArgs<PrismaModel>['orderBy'];
  include?: FindManyArgs<PrismaModel>['include'];
  searchableFields?: (keyof PrismaTypes[PrismaModel]['Shape'])[];
  mapCreate?: (data: CreateInput<PrismaModel>['data']) => CreateArgs<PrismaModel>['data'];
  mapCreateMany?: (
    data: CreateManyInput<PrismaModel>['data'],
  ) => CreateManyArgs<PrismaModel>['data'];
  mapUpdate?: (data: UpdateInput<PrismaModel>['data']) => UpdateArgs<PrismaModel>['data'];
}
