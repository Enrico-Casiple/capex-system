import { Prisma } from '../../../../../generated/prisma/client/client';
import PrismaTypes from '../../../../../lib/pothos/pothos-prisma-types';
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
    include?: Prisma.Args<PrismaModel, 'findUnique'>['include'];
  }) => Promise<PrismaTypes[keyof PrismaTypes]['Shape'] | null>;
  findFirst: (args: {
    where?: FindManyArgs<PrismaModel>['where'];
    orderBy?: FindManyArgs<PrismaModel>['orderBy'];
    include?:Prisma.Args<PrismaModel, 'findFirst'>['include'];
  }) => Promise<PrismaTypes[PrismaModel]['Shape'] | null>;
  findMany: (args: {
    where?: FindManyArgs<PrismaModel>['where'];
    orderBy?: FindManyArgs<PrismaModel>['orderBy'];
    skip?: FindManyArgs<PrismaModel>['skip'];
    take?: FindManyArgs<PrismaModel>['take'];
    include?: Prisma.Args<PrismaModel, 'findMany'>['include'];
  }) => Promise<PrismaTypes[PrismaModel]['Shape'][] | null>;
  count: (args?: { where?: FindManyArgs<PrismaModel>['where'] }) => Promise<number>;
  create: (args: {
    data: CreateArgs<PrismaModel>['data'];
    include?: Prisma.Args<PrismaModel, 'create'>['include'];
  }) => Promise<PrismaTypes[keyof PrismaTypes]['Shape'] | null>;
  createMany: (args: {
    data: CreateManyArgs<PrismaModel>['data'];
    skipDuplicates?: boolean;
  }) => Promise<PrismaTypes[PrismaModel]['Shape'][] | null>;
  update: (args: {
    where: UpdateArgs<PrismaModel>['where'];
    data: UpdateArgs<PrismaModel>['data'];
    include?: Prisma.Args<PrismaModel, 'update'>['include'];
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

  groupBy: (args: {
    by: (keyof PrismaTypes[PrismaModel]['Shape'])[];
    where?: Prisma.Args<PrismaModel, 'groupBy'>['where'];
    orderBy?: Prisma.Args<PrismaModel, 'groupBy'>['orderBy'];
    _count?: Prisma.Args<PrismaModel, 'groupBy'>['_count'];
    _avg?: Prisma.Args<PrismaModel, 'groupBy'>['_avg'];
    _sum?: Prisma.Args<PrismaModel, 'groupBy'>['_sum'];
    _min?: Prisma.Args<PrismaModel, 'groupBy'>['_min'];
    _max?: Prisma.Args<PrismaModel, 'groupBy'>['_max'];
  }) => Promise<Record<string, unknown>[] | null>;
};
