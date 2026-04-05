import { Prisma } from '@/lib/generated/prisma/client';
import PrismaTypes from '@/lib/pothos/pothos-prisma-types';
import {
  CreateArgs,
  CreateManyArgs,
  FindManyArgs,
  FindUniqueArgs,
  UpdateArgs,
  UpdateManyArgs,
} from './prismaArgs.type';

export type PrismaModelMethods<PrismaModel extends Prisma.ModelName> = {
  findUnique: (args: {
    where: FindUniqueArgs<PrismaModel>['where'];
    include?: FindUniqueArgs<PrismaModel>['include'];
  }) => Promise<PrismaTypes[keyof PrismaTypes]['Shape'] | null>;
  findFirst: (args: {
    where?: FindManyArgs<PrismaModel>['where'];
    orderBy?: FindManyArgs<PrismaModel>['orderBy'];
    include?: FindManyArgs<PrismaModel>['include'];
  }) => Promise<PrismaTypes[PrismaModel]['Shape'] | null>;
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
  deleteMany: (args: {
    where?: UpdateManyArgs<PrismaModel>['where'];
  }) => Promise<PrismaTypes[PrismaModel]['Shape'] | null>;
};
