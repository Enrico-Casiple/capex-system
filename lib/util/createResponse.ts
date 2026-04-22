import { Prisma } from '../generated/prisma/client';
import PrismaTypes from '../pothos/pothos-prisma-types';

export const createResponse = <T extends Prisma.ModelName>(
  isSuccess: boolean,
  code: string,
  message: string,
  data: PrismaTypes[T]['Shape'] | null,
) => {
  return {
    isSuccess,
    code,
    message,
    data: data,
  };
};
