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

    // Basic CRUD Operations
    this.addCRUDPermissions(order);
    order += 10;

    // Bulk Operations
    this.addBulkPermissions(order);
    order += 10;

    // Archive/Restore Operations
    this.addArchivePermissions(order);
    order += 10;

    // Import/Export Operations
    this.addImportExportPermissions(order);
    order += 10;

    // Approval Workflow (if enabled)
    if (this.hasApproval) {
      this.addApprovalPermissions(order);
      order += 10;
    }

    // Custom Actions
    this.addCustomPermissions(order);
  }

  private addCRUDPermissions(startOrder: number): void {
    const crudActions = [
      { action: 'create', name: 'Create', description: `Create new ${this.resource}` },
      { action: 'read', name: 'View', description: `View ${this.resource} details` },
      { action: 'update', name: 'Edit', description: `Edit ${this.resource}` },
      { action: 'delete', name: 'Delete', description: `Delete ${this.resource}` },
    ];

    crudActions.forEach((item, index) => {
      this.permissions.push({
        module: this.module,
        resource: this.resource,
        action: item.action,
        name: `${item.name} ${this.displayName}`,
        description: item.description,
        displayOrder: startOrder + index,
      });
    });
  }

  private addBulkPermissions(startOrder: number): void {
    const bulkActions = [
      { action: 'bulk_create', name: 'Bulk Create' },
      { action: 'bulk_update', name: 'Bulk Update' },
      { action: 'bulk_delete', name: 'Bulk Delete' },
      { action: 'bulk_archive', name: 'Bulk Archive' },
      { action: 'bulk_restore', name: 'Bulk Restore' },
    ];

    bulkActions.forEach((item, index) => {
      this.permissions.push({
        module: this.module,
        resource: this.resource,
        action: item.action,
        name: `${item.name} ${this.displayName}s`,
        description: `${item.name} multiple ${this.resource}s at once`,
        displayOrder: startOrder + index,
      });
    });
  }

  private addArchivePermissions(startOrder: number): void {
    const archiveActions = [
      { action: 'archive', name: 'Archive', description: `Archive ${this.resource}` },
      { action: 'restore', name: 'Restore', description: `Restore archived ${this.resource}` },
      { action: 'view_archived', name: 'View Archived', description: `View archived ${this.resource}s` },
    ];

    archiveActions.forEach((item, index) => {
      this.permissions.push({
        module: this.module,
        resource: this.resource,
        action: item.action,
        name: `${item.name} ${this.displayName}`,
        description: item.description,
        displayOrder: startOrder + index,
      });
    });
  }

  private addImportExportPermissions(startOrder: number): void {
    const importExportActions = [
      { action: 'export', name: 'Export', description: `Export ${this.resource}s to file` },
      { action: 'import', name: 'Import', description: `Import ${this.resource}s from file` },
      { action: 'download_template', name: 'Download Template', description: 'Download import template' },
    ];

    importExportActions.forEach((item, index) => {
      this.permissions.push({
        module: this.module,
        resource: this.resource,
        action: item.action,
        name: `${item.name} ${this.displayName}s`,
        description: item.description,
        displayOrder: startOrder + index,
      });
    });
  }

  private addApprovalPermissions(startOrder: number): void {
    const approvalActions = [
      { action: 'submit_for_approval', name: 'Submit for Approval', description: `Submit ${this.resource} for approval` },
      { action: 'approve', name: 'Approve', description: `Approve ${this.resource}` },
      { action: 'reject', name: 'Reject', description: `Reject ${this.resource}` },
      { action: 'cancel_approval', name: 'Cancel Approval', description: `Cancel approval request` },
      { action: 'view_approval_history', name: 'View Approval History', description: 'View approval workflow history' },
      { action: 'reassign_approver', name: 'Reassign Approver', description: 'Reassign to different approver' },
    ];

    approvalActions.forEach((item, index) => {
      this.permissions.push({
        module: this.module,
        resource: this.resource,
        action: item.action,
        name: `${item.name}`,
        description: item.description,
        displayOrder: startOrder + index,
      });
    });
  }

  private addCustomPermissions(startOrder: number): void {
    this.customActions.forEach((item, index) => {
      this.permissions.push({
        module: this.module,
        resource: this.resource,
        action: item.action,
        name: item.name,
        description: item.description,
        displayOrder: startOrder + index,
      });
    });
  }

  public getPermissions(): PermissionDefinition[] {
    return this.permissions;
  }

  public getPermissionsByCategory(): Record<string, PermissionDefinition[]> {
    return {
      'Basic Operations': this.permissions.filter(p => 
        ['create', 'read', 'update', 'delete'].includes(p.action)
      ),
      'Bulk Operations': this.permissions.filter(p => 
        p.action.startsWith('bulk_')
      ),
      'Archive & Restore': this.permissions.filter(p => 
        ['archive', 'restore', 'view_archived'].includes(p.action)
      ),
      'Import & Export': this.permissions.filter(p => 
        ['import', 'export', 'download_template'].includes(p.action)
      ),
      ...(this.hasApproval && {
        'Approval Workflow': this.permissions.filter(p => 
          ['submit_for_approval', 'approve', 'reject', 'cancel_approval', 'view_approval_history', 'reassign_approver'].includes(p.action)
        ),
      }),
      ...(this.customActions.length > 0 && {
        'Custom Actions': this.permissions.filter(p => 
          this.customActions.some(ca => ca.action === p.action)
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
    {
      action: 'assign_role',
      name: 'Assign Role',
      description: 'Assign roles to users'
    },
    {
      action: 'remove_role',
      name: 'Remove Role',
      description: 'Remove roles from users'
    },
    {
      action: 'reset_password',
      name: 'Reset Password',
      description: 'Reset user passwords'
    },
    {
      action: 'change_password',
      name: 'Change Password',
      description: 'Change user passwords'
    },
    {
      action: 'activate',
      name: 'Activate User',
      description: 'Activate user accounts'
    },
    {
      action: 'deactivate',
      name: 'Deactivate User',
      description: 'Deactivate user accounts'
    },
    {
      action: 'view_activity',
      name: 'View Activity',
      description: 'View user activity logs'
    },
  ]
});

export const createRolePermissions = (moduleName: string, resourceName: string, displayName: string, hasApproval?: boolean, customActions?: Array<{ action: string; name: string; description?: string }>) => {
  const rolePermissionTemplate = new PermissionTemplate({
    moduleName,
    resourceName,
    displayName,
    hasApproval,
    customActions,
  });
  return rolePermissionTemplate.getPermissions();
}