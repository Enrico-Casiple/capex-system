// prisma/seed-roles-permissions.ts
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../.env') });

import {
  GLOBAL_ACCESS_PERMISSION,
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

  for (const permission of allPermissions) {
    const isGlobalAdminPermission = permission.isGlobal && permission.isAdmin;

    await prisma.permission.upsert({
      where: {
        module_resource_action: {
          module: permission.module || '',
          resource: permission.resource || '',
          action: permission.action || '',
        },
      },
      update: {
        name: permission.name,
        description: permission.description,
        displayOrder: permission.displayOrder,
        isGlobal: permission.isGlobal || false,
        isAdmin: permission.isAdmin || false,
        globalLimit: isGlobalAdminPermission ? 3 : null, // ✅ max 3 global admins
        isActive: true,
      },
      create: {
        module: permission.module,
        resource: permission.resource,
        action: permission.action,
        name: permission.name,
        description: permission.description,
        displayOrder: permission.displayOrder,
        isGlobal: permission.isGlobal || false,
        isAdmin: permission.isAdmin || false,
        globalLimit: isGlobalAdminPermission ? 3 : null, // ✅ max 3 global admins
        isActive: true,
      },
    });
  }

  console.log(`✅ Created ${allPermissions.length} permissions`);

  // ============================================
  // 2. CREATE ROLES
  // ============================================
  console.log('\n👥 Creating roles...');

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

  const existingEmployeeRole = await prisma.role.findFirst({
    where: { name: 'Employee' },
  });

  if (!existingEmployeeRole) {
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

  console.log('✅ Created 2 roles (Global Administrator & Employee)');

  // ============================================
  // 3. ASSIGN PERMISSIONS TO GLOBAL ADMINISTRATOR
  // ============================================
  console.log('\n🔗 Assigning permissions to Global Administrator...');

  const allActivePermissions = await prisma.permission.findMany({
    where: { isActive: true },
  });

  for (const permission of allActivePermissions) {
    // Check global limit before assigning
    if (permission.isGlobal && permission.isAdmin && permission.globalLimit) {
      const currentGlobalAdminCount = await prisma.rolePermission.count({
        where: {
          permissionId: permission.id,
          isActive: true,
        },
      });

      if (currentGlobalAdminCount >= permission.globalLimit) {
        console.log(
          `⚠️  Skipping "${permission.name}" — global limit of ${permission.globalLimit} already reached`,
        );
        continue;
      }
    }

    const existingRolePermission = await prisma.rolePermission.findFirst({
      where: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });

    if (!existingRolePermission) {
      await prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          permissionId: permission.id,
          isActive: true,
        },
      });
    }
  }

  console.log(`✅ Assigned ${allActivePermissions.length} permissions to Global Administrator`);
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
