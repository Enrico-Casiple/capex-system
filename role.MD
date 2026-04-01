<!-- import { fail, ok } from '@/lib/util/reponseUtil';
import { prisma } from '@/lib/prisma/prisma';
import { getPrismaErrorMessage } from '@/lib/util/getPrismaErrorMessage';
import { ModelService } from '@/lib/pothos/Model/Template/model.service';

// ─── Role Types ───────────────────────────────────────────────
export const ROLE_TYPES = {
  SYSTEM:   'SYSTEM',   // built-in, cannot be deleted or edited
  CUSTOM:   'CUSTOM',   // created by admin
  TEMPLATE: 'TEMPLATE', // used as base to clone from
} as const;

export type RoleType = keyof typeof ROLE_TYPES;

// ─── Role Service ─────────────────────────────────────────────
export const roleService = new ModelService('Role', 'role', prisma, {
  orderBy: [{ createdAt: 'desc' }],
  include: {
    rolePermissions: {
      where: { isActive: true },
      include: {
        permission: true,
        scopeType: true,
      },
    },
    parentRole: true,
    childRoles: true,
  },
});

// ─── Clone Role ───────────────────────────────────────────────
// Copies a TEMPLATE role and all its permissions into a new CUSTOM role
export const cloneRoleFromTemplate = async (input: {
  templateRoleId: string;
  newRoleName: string;
  newRoleDescription?: string;
  currentUserId: string;
}) => {
  const { templateRoleId, newRoleName, newRoleDescription, currentUserId } = input;

  try {
    // Step 1 — Find the template role
    const templateRole = await prisma.role.findUnique({
      where: { id: templateRoleId },
      include: {
        rolePermissions: {
          where: { isActive: true },
          include: { permission: true },
        },
      },
    });

    if (!templateRole)
      return fail('ROLE_CLONE_NOT_FOUND', `Template role not found with id: ${templateRoleId}`);

    if (templateRole.roleType !== ROLE_TYPES.TEMPLATE)
      return fail('ROLE_CLONE_INVALID_TYPE', `Only TEMPLATE roles can be cloned. This role is type: ${templateRole.roleType}`);

    // Step 2 — Create the new role and copy all permissions in one transaction
    const newRole = await prisma.$transaction(async (tx) => {
      const createdRole = await tx.role.create({
        data: {
          name:        newRoleName,
          description: newRoleDescription ?? templateRole.description,
          roleType:    ROLE_TYPES.CUSTOM,
          isDefault:   false,
          parentRoleId: templateRoleId,
          isActive:    true,
          rolePermissions: {
            create: templateRole.rolePermissions.map((rolePermission) => ({
              permissionId: rolePermission.permissionId,
              scopeTypeId:  rolePermission.scopeTypeId,
              scopeValues:  rolePermission.scopeValues,
              conditions:   rolePermission.conditions,
              isActive:     true,
            })),
          },
        },
        include: {
          rolePermissions: { include: { permission: true } },
          parentRole: true,
        },
      });

      return createdRole;
    });

    return ok(
      'ROLE_CLONE_SUCCESS',
      `Successfully cloned template "${templateRole.name}" into new role "${newRoleName}" with ${newRole.rolePermissions.length} permission(s)`,
      newRole,
    );
  } catch (error) {
    const { message } = getPrismaErrorMessage(error);
    console.error('❌ Clone Role:', error);
    return fail('ROLE_CLONE_FAILED', `Failed to clone role: ${message}`);
  }
};

// ─── Assign Permission to Role ────────────────────────────────
export const assignPermissionToRole = async (input: {
  roleId: string;
  permissionId: string;
  scopeTypeId?: string;
  scopeValues?: string[];
  conditions?: Record<string, unknown>;
  currentUserId: string;
}) => {
  const { roleId, permissionId, scopeTypeId, scopeValues, conditions, currentUserId } = input;

  try {
    // Guard — cannot modify SYSTEM roles
    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role)
      return fail('ROLE_PERMISSION_ASSIGN_NOT_FOUND', `Role not found with id: ${roleId}`);

    if (role.roleType === ROLE_TYPES.SYSTEM)
      return fail('ROLE_PERMISSION_ASSIGN_FORBIDDEN', `SYSTEM roles cannot be modified. Create a CUSTOM role instead.`);

    // Upsert — if already assigned, update the conditions/scope instead of duplicating
    const rolePermission = await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId_scopeTypeId: {
          roleId,
          permissionId,
          scopeTypeId: scopeTypeId ?? null,
        },
      },
      update: {
        scopeValues: scopeValues ?? [],
        conditions:  conditions ?? undefined,
        isActive:    true,
      },
      create: {
        roleId,
        permissionId,
        scopeTypeId:  scopeTypeId ?? null,
        scopeValues:  scopeValues ?? [],
        conditions:   conditions ?? undefined,
        isActive:     true,
      },
      include: {
        permission: true,
        role:       true,
        scopeType:  true,
      },
    });

    return ok(
      'ROLE_PERMISSION_ASSIGN_SUCCESS',
      `Permission successfully assigned to role "${role.name}"`,
      rolePermission,
    );
  } catch (error) {
    const { message } = getPrismaErrorMessage(error);
    console.error('❌ Assign Permission to Role:', error);
    return fail('ROLE_PERMISSION_ASSIGN_FAILED', `Failed to assign permission to role: ${message}`);
  }
};

// ─── Remove Permission from Role ─────────────────────────────
export const removePermissionFromRole = async (input: {
  rolePermissionId: string;
  currentUserId: string;
}) => {
  const { rolePermissionId } = input;

  try {
    const rolePermission = await prisma.rolePermission.findUnique({
      where: { id: rolePermissionId },
      include: { role: true, permission: true },
    });

    if (!rolePermission)
      return fail('ROLE_PERMISSION_REMOVE_NOT_FOUND', `Role permission not found with id: ${rolePermissionId}`);

    if (rolePermission.role?.roleType === ROLE_TYPES.SYSTEM)
      return fail('ROLE_PERMISSION_REMOVE_FORBIDDEN', `Cannot remove permissions from a SYSTEM role`);

    // Soft delete — set isActive to false instead of hard delete
    const updated = await prisma.rolePermission.update({
      where: { id: rolePermissionId },
      data:  { isActive: false },
      include: { permission: true, role: true },
    });

    return ok(
      'ROLE_PERMISSION_REMOVE_SUCCESS',
      `Permission "${rolePermission.permission?.name}" removed from role "${rolePermission.role?.name}"`,
      updated,
    );
  } catch (error) {
    const { message } = getPrismaErrorMessage(error);
    console.error('❌ Remove Permission from Role:', error);
    return fail('ROLE_PERMISSION_REMOVE_FAILED', `Failed to remove permission from role: ${message}`);
  }
};

// ─── Seed System Roles (run once on app init) ─────────────────
// These are the global administrator roles that cannot be deleted
export const seedSystemRoles = async () => {
  const systemRoles = [
    {
      name:        'Super Administrator',
      description: 'Full access to everything in the system. Cannot be modified or deleted.',
      roleType:    ROLE_TYPES.SYSTEM,
      isDefault:   false,
    },
    {
      name:        'Administrator',
      description: 'Full access to all modules except system configuration.',
      roleType:    ROLE_TYPES.SYSTEM,
      isDefault:   false,
    },
    {
      name:        'Employee',
      description: 'Default role assigned to all new users. Read-only access to own records.',
      roleType:    ROLE_TYPES.SYSTEM,
      isDefault:   true, // auto-assigned to new users
    },
  ];

  try {
    for (const roleData of systemRoles) {
      await prisma.role.upsert({
        where:  { name: roleData.name } as never,
        update: {},           // do not overwrite if already exists
        create: { ...roleData, isActive: true },
      });
    }

    console.log('✅ System roles seeded successfully');
  } catch (error) {
    console.error('❌ Failed to seed system roles:', error);
  }
}; -->

<!-- import { prisma } from '@/lib/prisma/prisma';

// ─── Constants ────────────────────────────────────────────────
const GLOBAL_ADMIN_ROLE_NAME = 'Global Administrator';
const GLOBAL_ADMIN_MAX_USERS = 3;

// ─── System Roles to seed on first boot ──────────────────────
const SYSTEM_ROLES = [
  {
    name:        GLOBAL_ADMIN_ROLE_NAME,
    description: 'Full unrestricted access to everything in the system. Maximum 3 users allowed.',
    roleType:    'SYSTEM',
    isDefault:   false,
  },
  {
    name:        'Administrator',
    description: 'Full access to all modules. Cannot modify system configuration.',
    roleType:    'SYSTEM',
    isDefault:   false,
  },
  {
    name:        'Employee',
    description: 'Default role for all new users. Can only view their own records.',
    roleType:    'SYSTEM',
    isDefault:   true,
  },
];

// ─── System Permissions to seed on first boot ────────────────
const SYSTEM_PERMISSIONS = [
  // Global Administrator — wildcard permission, bypasses all checks
  { name: 'Global Access',  module: 'SYSTEM', resource: '*',            action: '*',      isGlobal: true,  isAdmin: true,  displayOrder: 0  },

  // User module
  { name: 'View Users',     module: 'HR',     resource: 'user',         action: 'read',   isGlobal: false, isAdmin: false, displayOrder: 10 },
  { name: 'Create Users',   module: 'HR',     resource: 'user',         action: 'create', isGlobal: false, isAdmin: false, displayOrder: 11 },
  { name: 'Update Users',   module: 'HR',     resource: 'user',         action: 'update', isGlobal: false, isAdmin: false, displayOrder: 12 },
  { name: 'Delete Users',   module: 'HR',     resource: 'user',         action: 'delete', isGlobal: false, isAdmin: true,  displayOrder: 13 },

  // Role module
  { name: 'View Roles',     module: 'SYSTEM', resource: 'role',         action: 'read',   isGlobal: false, isAdmin: true,  displayOrder: 20 },
  { name: 'Create Roles',   module: 'SYSTEM', resource: 'role',         action: 'create', isGlobal: false, isAdmin: true,  displayOrder: 21 },
  { name: 'Update Roles',   module: 'SYSTEM', resource: 'role',         action: 'update', isGlobal: false, isAdmin: true,  displayOrder: 22 },
  { name: 'Delete Roles',   module: 'SYSTEM', resource: 'role',         action: 'delete', isGlobal: false, isAdmin: true,  displayOrder: 23 },

  // Permission module
  { name: 'View Permissions',   module: 'SYSTEM', resource: 'permission', action: 'read',   isGlobal: false, isAdmin: true, displayOrder: 30 },
  { name: 'Assign Permissions', module: 'SYSTEM', resource: 'permission', action: 'assign', isGlobal: false, isAdmin: true, displayOrder: 31 },
];

// ─── Seed System Roles ────────────────────────────────────────
async function seedSystemRoles() {
  console.log('🌱 Seeding system roles...');

  for (const roleData of SYSTEM_ROLES) {
    await prisma.role.upsert({
      where:  { name: roleData.name } as never,
      update: {},        // never overwrite existing system roles
      create: { ...roleData, isActive: true },
    });
  }

  console.log(`✅ System roles ready — ${SYSTEM_ROLES.length} roles seeded`);
}

// ─── Seed System Permissions ──────────────────────────────────
async function seedSystemPermissions() {
  console.log('🌱 Seeding system permissions...');

  for (const permissionData of SYSTEM_PERMISSIONS) {
    await prisma.permission.upsert({
      where:  { name: permissionData.name } as never,
      update: {},        // never overwrite existing permissions
      create: { ...permissionData, isActive: true },
    });
  }

  console.log(`✅ System permissions ready — ${SYSTEM_PERMISSIONS.length} permissions seeded`);
}

// ─── Assign Global Access Permission to Global Administrator ──
async function assignGlobalAccessToGlobalAdminRole() {
  const globalAdminRole = await prisma.role.findFirst({
    where: { name: GLOBAL_ADMIN_ROLE_NAME },
  });

  const globalAccessPermission = await prisma.permission.findFirst({
    where: { name: 'Global Access' },
  });

  if (!globalAdminRole || !globalAccessPermission) {
    console.warn('⚠️  Could not assign Global Access — role or permission not found');
    return;
  }

  // Check if already assigned
  const alreadyAssigned = await prisma.rolePermission.findFirst({
    where: {
      roleId:       globalAdminRole.id,
      permissionId: globalAccessPermission.id,
    },
  });

  if (alreadyAssigned) {
    console.log('⏭️  Global Access already assigned to Global Administrator — skipping');
    return;
  }

  await prisma.rolePermission.create({
    data: {
      roleId:       globalAdminRole.id,
      permissionId: globalAccessPermission.id,
      scopeValues:  [],
      isActive:     true,
      // No conditions — Global Administrator bypasses everything
    },
  });

  console.log('✅ Global Access permission assigned to Global Administrator role');
}

// ─── Enforce Global Administrator User Limit ─────────────────
// Runs on every boot to ensure no more than 3 users have this role
async function enforceGlobalAdminUserLimit() {
  const globalAdminRole = await prisma.role.findFirst({
    where: { name: GLOBAL_ADMIN_ROLE_NAME },
  });

  if (!globalAdminRole) return;

  const globalAdminUsers = await prisma.userRole.findMany({
    where:   { roleId: globalAdminRole.id, isActive: true },
    orderBy: { createdAt: 'asc' }, // oldest assignments are kept
    include: { user: true },
  });

  if (globalAdminUsers.length <= GLOBAL_ADMIN_MAX_USERS) {
    console.log(`✅ Global Administrator user count is within limit (${globalAdminUsers.length}/${GLOBAL_ADMIN_MAX_USERS})`);
    return;
  }

  // Deactivate the newest assignments that exceed the limit
  const usersToDeactivate = globalAdminUsers.slice(GLOBAL_ADMIN_MAX_USERS);

  for (const userRole of usersToDeactivate) {
    await prisma.userRole.update({
      where: { id: userRole.id },
      data:  { isActive: false },
    });
    console.warn(`⚠️  Deactivated Global Administrator role for user: ${userRole.user?.name ?? userRole.userId} — limit of ${GLOBAL_ADMIN_MAX_USERS} exceeded`);
  }
}

// ─── Check if this is the very first boot ────────────────────
async function isFirstBoot(): Promise<boolean> {
  const roleCount = await prisma.role.count();
  return roleCount === 0;
}

// ─── Main Bootstrap Entry Point ───────────────────────────────
export async function bootstrap() {
  console.log('\n🚀 Running system bootstrap...');

  try {
    const firstBoot = await isFirstBoot();

    if (firstBoot) {
      console.log('🆕 First boot detected — seeding system data...');
      await seedSystemRoles();
      await seedSystemPermissions();
      await assignGlobalAccessToGlobalAdminRole();
      console.log('🎉 First boot setup complete!');
    } else {
      console.log('🔄 System already initialized — running maintenance checks...');
      // Always enforce the limit on every boot in case someone
      // manually inserted records directly into the database
      await enforceGlobalAdminUserLimit();
    }

    console.log('✅ Bootstrap complete\n');
  } catch (error) {
    console.error('❌ Bootstrap failed:', error);
    // Do not crash the server — log and continue
  }
} -->
