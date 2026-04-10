// app/_actions/checkPermission.ts
'use server';

import { prisma } from '@/lib/prisma/prisma';
import { auth } from '@/auth';

export const checkPermission = async (
  module: string | string[],
  resource: string | string[],
  action: string | string[],
) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return false;

  const modules = Array.isArray(module) ? module : [module];
  const resources = Array.isArray(resource) ? resource : [resource];
  const actions = Array.isArray(action) ? action : [action];

  const userRoles = await prisma.userRole.findMany({
    where: { userId, isActive: true },
    select: { roleId: true },
  });

  if (!userRoles.length) return false;

  const roleIds = userRoles.map((ur) => ur.roleId).filter((id): id is string => id !== null);

  const rolePermissions = await prisma.rolePermission.findMany({
    where: { roleId: { in: roleIds }, isActive: true },
    select: { permissionId: true },
  });

  if (!rolePermissions.length) return false;

  const permissionIds = rolePermissions
    .map((rp) => rp.permissionId)
    .filter((id): id is string => id !== null);

  const isGlobalAdmin = await prisma.permission.findFirst({
    where: { id: { in: permissionIds }, isGlobal: true, isAdmin: true },
  });

  if (isGlobalAdmin) return true;

  const permission = await prisma.permission.findFirst({
    where: {
      id: { in: permissionIds },
      module: { in: modules },
      resource: { in: resources },
      action: { in: actions },
    },
  });

  return !!permission;
};
