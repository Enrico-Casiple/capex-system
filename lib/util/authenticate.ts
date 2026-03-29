import { prisma } from '../prisma/prisma';

const authenticate = async (id: string): Promise<boolean> => {
  if (!id || id.length !== 24 || !id.match(/^[0-9a-fA-F]{24}$/)) return false;
  try {
    const record = await prisma.user.findUnique({ where: { id } });
    return !!record;
  } catch {
    return false;
  }
};

export default authenticate;
