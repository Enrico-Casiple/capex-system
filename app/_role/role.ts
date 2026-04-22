// lib/permissions/PermissionTemplate.ts

export interface PermissionDefinition {
  module: string;
  resource: string;
  action: string;
  name: string;
  description?: string;
  displayOrder?: number;
  isGlobal?: boolean;
  isAdmin?: boolean;
}

export interface ModuleConfig {
  moduleName: string;
  resourceName: string;
  displayName: string;
  hasApproval?: boolean;
  customActions?: Array<{
    action: string;
    name: string;
    description?: string;
  }>;
}

export const GLOBAL_ACCESS_PERMISSION: PermissionDefinition = {
  name: 'Global Access',
  module: 'SYSTEM',
  resource: '*',
  action: '*',
  description: 'Grants full access to all resources and actions in the system.',
  isGlobal: true,
  isAdmin: true,
  displayOrder: 0,
};

export class PermissionTemplate {
  private module: string;
  private resource: string;
  private displayName: string;
  private hasApproval: boolean;
  private customActions: Array<{ action: string; name: string; description?: string }>;
  private permissions: PermissionDefinition[] = [];

  constructor(config: ModuleConfig) {
    this.module = config.moduleName;
    this.resource = config.resourceName;
    this.displayName = config.displayName;
    this.hasApproval = config.hasApproval || false;
    this.customActions = config.customActions || [];
    this.generatePermissions();
  }

  private generatePermissions(): void {
    let order = 0;
    this.addCRUDPermissions(order);
    order += 10;
    this.addBulkPermissions(order);
    order += 10;
    this.addArchivePermissions(order);
    order += 10;
    this.addImportExportPermissions(order);
    order += 10;
    if (this.hasApproval) {
      this.addApprovalPermissions(order);
      order += 10;
    }
    this.addCustomPermissions(order);
  }

  private addCRUDPermissions(startOrder: number): void {
    [
      { action: 'create', name: 'Create', description: `Create new ${this.resource}` },
      { action: 'read', name: 'View', description: `View ${this.resource} details` },
      { action: 'update', name: 'Edit', description: `Edit ${this.resource}` },
      { action: 'delete', name: 'Delete', description: `Delete ${this.resource}` },
      { action: 'duplicate', name: 'Duplicate', description: `Duplicate ${this.resource}` },
    ].forEach((item, i) =>
      this.permissions.push({
        module: this.module,
        resource: this.resource,
        action: item.action,
        name: `${item.name} ${this.displayName}`,
        description: item.description,
        displayOrder: startOrder + i,
      }),
    );
  }

  private addBulkPermissions(startOrder: number): void {
    [
      { action: 'bulk_create', name: 'Bulk Create' },
      { action: 'bulk_update', name: 'Bulk Update' },
      { action: 'bulk_delete', name: 'Bulk Delete' },
      { action: 'bulk_archive', name: 'Bulk Archive' },
      { action: 'bulk_restore', name: 'Bulk Restore' },
    ].forEach((item, i) =>
      this.permissions.push({
        module: this.module,
        resource: this.resource,
        action: item.action,
        name: `${item.name} ${this.displayName}s`,
        description: `${item.name} multiple ${this.resource}s at once`,
        displayOrder: startOrder + i,
      }),
    );
  }

  private addArchivePermissions(startOrder: number): void {
    [
      { action: 'archive', name: 'Archive', description: `Archive ${this.resource}` },
      { action: 'restore', name: 'Restore', description: `Restore archived ${this.resource}` },
      {
        action: 'view_archived',
        name: 'View Archived',
        description: `View archived ${this.resource}s`,
      },
    ].forEach((item, i) =>
      this.permissions.push({
        module: this.module,
        resource: this.resource,
        action: item.action,
        name: `${item.name} ${this.displayName}`,
        description: item.description,
        displayOrder: startOrder + i,
      }),
    );
  }

  private addImportExportPermissions(startOrder: number): void {
    [
      { action: 'export', name: 'Export', description: `Export ${this.resource}s to file` },
      { action: 'import', name: 'Import', description: `Import ${this.resource}s from file` },
      {
        action: 'download_template',
        name: 'Download Template',
        description: 'Download import template',
      },
    ].forEach((item, i) =>
      this.permissions.push({
        module: this.module,
        resource: this.resource,
        action: item.action,
        name: `${item.name} ${this.displayName}s`,
        description: item.description,
        displayOrder: startOrder + i,
      }),
    );
  }

  private addApprovalPermissions(startOrder: number): void {
    [
      {
        action: 'submit_for_approval',
        name: 'Submit for Approval',
        description: `Submit ${this.resource} for approval`,
      },
      { action: 'approve', name: 'Approve', description: `Approve ${this.resource}` },
      { action: 'reject', name: 'Reject', description: `Reject ${this.resource}` },
      {
        action: 'cancel_approval',
        name: 'Cancel Approval',
        description: 'Cancel approval request',
      },
      {
        action: 'view_approval_history',
        name: 'View Approval History',
        description: 'View approval workflow history',
      },
      {
        action: 'reassign_approver',
        name: 'Reassign Approver',
        description: 'Reassign to different approver',
      },
    ].forEach((item, i) =>
      this.permissions.push({
        module: this.module,
        resource: this.resource,
        action: item.action,
        name: item.name,
        description: item.description,
        displayOrder: startOrder + i,
      }),
    );
  }

  private addCustomPermissions(startOrder: number): void {
    this.customActions.forEach((item, i) =>
      this.permissions.push({
        module: this.module,
        resource: this.resource,
        action: item.action,
        name: item.name,
        description: item.description,
        displayOrder: startOrder + i,
      }),
    );
  }

  public getPermissions(): PermissionDefinition[] {
    return this.permissions;
  }

  public getPermissionsByCategory(): Record<string, PermissionDefinition[]> {
    return {
      'Basic Operations': this.permissions.filter((p) =>
        ['create', 'read', 'update', 'delete'].includes(p.action),
      ),
      'Bulk Operations': this.permissions.filter((p) => p.action.startsWith('bulk_')),
      'Archive & Restore': this.permissions.filter((p) =>
        ['archive', 'restore', 'view_archived'].includes(p.action),
      ),
      'Import & Export': this.permissions.filter((p) =>
        ['import', 'export', 'download_template'].includes(p.action),
      ),
      ...(this.hasApproval && {
        'Approval Workflow': this.permissions.filter((p) =>
          [
            'submit_for_approval',
            'approve',
            'reject',
            'cancel_approval',
            'view_approval_history',
            'reassign_approver',
          ].includes(p.action),
        ),
      }),
      ...(this.customActions.length > 0 && {
        'Custom Actions': this.permissions.filter((p) =>
          this.customActions.some((ca) => ca.action === p.action),
        ),
      }),
    };
  }
}

export const userManagementPermissions = new PermissionTemplate({
  moduleName: 'USER_MANAGEMENT',
  resourceName: 'user',
  displayName: 'User',
  hasApproval: false,
  customActions: [
    { action: 'assign_role', name: 'Assign Role', description: 'Assign roles to users' },
    { action: 'remove_role', name: 'Remove Role', description: 'Remove roles from users' },
    { action: 'reset_password', name: 'Reset Password', description: 'Reset user passwords' },
    { action: 'change_password', name: 'Change Password', description: 'Change user passwords' },
    { action: 'activate', name: 'Activate User', description: 'Activate user accounts' },
    { action: 'deactivate', name: 'Deactivate User', description: 'Deactivate user accounts' },
    { action: 'view_activity', name: 'View Activity', description: 'View user activity logs' },
  ],
}).getPermissions();

export const roleManagementPermissions = new PermissionTemplate({
  moduleName: 'ROLE_MANAGEMENT',
  resourceName: 'role',
  displayName: 'Role',
  hasApproval: false,
  customActions: [
    {
      action: 'assign_permissions',
      name: 'Assign Permissions',
      description: 'Assign permissions to roles',
    },
    { action: 'clone', name: 'Clone Role', description: 'Clone existing role' },
  ],
}).getPermissions();

export const createRolePermissions = (
  moduleName: string,
  resourceName: string,
  displayName: string,
  hasApproval?: boolean,
  customActions?: Array<{ action: string; name: string; description?: string }>,
) =>
  new PermissionTemplate({
    moduleName,
    resourceName,
    displayName,
    hasApproval,
    customActions,
  }).getPermissions();
