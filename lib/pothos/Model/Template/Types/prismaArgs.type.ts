import { Prisma, PrismaClient } from '@/lib/generated/prisma/client';
import PrismaTypes from '@/lib/pothos/pothos-prisma-types';

export type FindManyArgs<PrismaModel extends Prisma.ModelName> = Prisma.Args<
  PrismaClient[Uncapitalize<PrismaModel>],
  'findMany'
>;
export type FindUniqueArgs<PrismaModel extends Prisma.ModelName> = Prisma.Args<
  PrismaClient[Uncapitalize<PrismaModel>],
  'findUnique'
>;
export type FindFirstArgs<PrismaModel extends Prisma.ModelName> = Prisma.Args<
  PrismaClient[Uncapitalize<PrismaModel>],
  'findFirst'
>; // ← add this
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
export type GroupByArgs<PrismaModel extends Prisma.ModelName> =
  Prisma.TypeMap['model'][PrismaModel]['operations']['groupBy']['args'];
