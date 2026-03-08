import { prisma } from '../../../prisma/prisma';
import { ModelService } from '../Template/model.service';

export const UserService = new ModelService('User', 'user', prisma);

import { Prisma } from '../../../generated/prisma/client';
import { getDatamodel } from '../../pothos-prisma-types';

const prismaDataModel = getDatamodel();

// Auto-generate services for all models
const services = Object.fromEntries(
  Object.keys(prismaDataModel.datamodel.models).map((modelName) => {
    const prismaModelName = (modelName.charAt(0).toLowerCase() +
      modelName.slice(1)) as Uncapitalize<Prisma.ModelName>;
    return [modelName, new ModelService(modelName as Prisma.ModelName, prismaModelName, prisma)];
  }),
) as Record<Prisma.ModelName, ModelService<Prisma.ModelName>>;

export default services;
