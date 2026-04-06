// prisma/seed-roles-permissions.ts
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../.env') });

import {
  GLOBAL_ACCESS_PERMISSION,
  PermissionTemplate,
  roleManagementPermissions,
  userManagementPermissions,
} from '@/app/_role/role';
import { prisma } from '@/lib/prisma/prisma';

const seedComplete = async () => {
  console.log('🌱 Starting complete seed...');

  // ============================================
  // 1. CREATE PERMISSIONS
  // ============================================
  console.log('\n📋 Creating permissions...');

  const allPermissions = [
    ...userManagementPermissions,
    ...roleManagementPermissions,
    GLOBAL_ACCESS_PERMISSION,
  ];

  for (const perm of allPermissions) {
    await prisma.permission.upsert({
      where: {
        module_resource_action: {
          module: perm.module || '',
          resource: perm.resource || '',
          action: perm.action || '',
        },
      },
      update: {
        name: perm.name,
        description: perm.description,
        displayOrder: perm.displayOrder,
        isGlobal: perm.isGlobal || false,
        isAdmin: perm.isAdmin || false,
        isActive: true,
      },
      create: {
        module: perm.module,
        resource: perm.resource,
        action: perm.action,
        name: perm.name,
        description: perm.description,
        displayOrder: perm.displayOrder,
        isGlobal: perm.isGlobal || false,
        isAdmin: perm.isAdmin || false,
        isActive: true,
      },
    });
  }

  console.log(`✅ Created ${allPermissions.length} permissions`);

  // ============================================
  // 2. CREATE ROLES
  // ============================================
  console.log('\n👥 Creating roles...');

  // Global Administrator (SYSTEM role)
  const adminRole =
    (await prisma.role.findFirst({
      where: { name: 'Global Administrator' },
    })) ||
    (await prisma.role.create({
      data: {
        name: 'Global Administrator',
        description: 'Full system access with all permissions across all modules',
        roleType: 'SYSTEM',
        isDefault: false,
        isActive: true,
      },
    }));

  // Employee (SYSTEM role - default for new users)
  const existingEmployee = await prisma.role.findFirst({
    where: { name: 'Employee' },
  });

  if (!existingEmployee) {
    await prisma.role.create({
      data: {
        name: 'Employee',
        description: 'Basic employee access - auto-assigned to new users',
        roleType: 'SYSTEM',
        isDefault: true,
        isActive: true,
      },
    });
  }

  console.log('✅ Created 2 roles (Admin & Employee)');

  // ============================================
  // 3. ASSIGN PERMISSIONS TO ROLES
  // ============================================
  console.log('\n🔗 Assigning permissions to roles...');

  // Get all permissions
  const allPerms = await prisma.permission.findMany({
    where: { isActive: true },
  });

  // 3.1 Global Administrator - ALL permissions
  for (const perm of allPerms) {
    const existing = await prisma.rolePermission.findFirst({
      where: {
        roleId: adminRole.id,
        permissionId: perm.id,
      },
    });

    if (!existing) {
      await prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          permissionId: perm.id,
          isActive: true,
        },
      });
    }
  }
  console.log(`✅ Assigned ${allPerms.length} permissions to Global Administrator`);

  // 3.2 Employee - NO permissions (can be assigned later via UI)
  console.log('✅ Employee role created with no permissions (assign via UI)');

  console.log('\n✅ Complete seed finished successfully!');
};

seedComplete()
  .then(() => {
    console.log('\n🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
