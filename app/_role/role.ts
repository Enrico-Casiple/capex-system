import { MODEL_DISPLAY_NAMES } from "@/generated/model-names";
import { getDatamodel } from "@/lib/pothos/pothos-prisma-types";

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
  description: 'Grants unrestricted access to all system resources, operations, and administrative functions.',
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
      { action: 'create', name: 'Create', description: `Create and add new ${this.resource} records to the system` },
      { action: 'read', name: 'View', description: `Access and view ${this.resource} information and details` },
      { action: 'update', name: 'Edit', description: `Modify and update existing ${this.resource} data and attributes` },
      { action: 'delete', name: 'Delete', description: `Permanently remove ${this.resource} from the system` },
      { action: 'duplicate', name: 'Duplicate', description: `Create a copy of existing ${this.resource} with all settings` },
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
      { action: 'bulk_create', name: 'Bulk Create', description: `Add multiple ${this.resource}s simultaneously using batch operations` },
      { action: 'bulk_update', name: 'Bulk Update', description: `Edit multiple ${this.resource}s at once with mass updates` },
      { action: 'bulk_delete', name: 'Bulk Delete', description: `Remove multiple ${this.resource}s in a single operation` },
      { action: 'bulk_archive', name: 'Bulk Archive', description: `Archive multiple ${this.resource}s for inactive or historical records` },
      { action: 'bulk_restore', name: 'Bulk Restore', description: `Reactivate and restore multiple archived ${this.resource}s` },
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

  private addArchivePermissions(startOrder: number): void {
    [
      { action: 'archive', name: 'Archive', description: `Move ${this.resource} to archived status without permanent deletion` },
      { action: 'restore', name: 'Restore', description: `Restore previously archived ${this.resource} back to active status` },
      {
        action: 'view_archived',
        name: 'View Archived',
        description: `Access and display archived ${this.resource}s in reports and lists`,
      },
      {
        action: 'view_itself',
        name: 'View Itself',
        description: `Allow users to view ${this.resource} records they created or own`,
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
      { action: 'export', name: 'Export', description: `Download ${this.resource}s as Excel, CSV, or other file formats` },
      { action: 'import', name: 'Import', description: `Upload and process ${this.resource}s from files into the system` },
      {
        action: 'download_template',
        name: 'Download Template',
        description: `Get pre-formatted import template with correct columns and structure`,
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
        description: `Send ${this.resource} to designated approvers for review and authorization`,
      },
      { action: 'approve', name: 'Approve', description: `Review and authorize ${this.resource} submissions` },
      { action: 'reject', name: 'Reject', description: `Decline ${this.resource} and return to submitter with feedback` },
      {
        action: 'cancel_approval',
        name: 'Cancel Approval',
        description: `Withdraw approval request and revert to draft status`,
      },
      {
        action: 'view_approval_history',
        name: 'View Approval History',
        description: `Track approval workflow including submitter, approver, timestamps, and comments`,
      },
      {
        action: 'reassign_approver',
        name: 'Reassign Approver',
        description: `Transfer approval responsibility to another authorized user or department`,
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

const prismaDataModel = getDatamodel();
const allModels = Object.keys(prismaDataModel.datamodel.models);

export const allModelPermissions = allModels.flatMap((model) =>
  createRolePermissions(
    `${model.toUpperCase()}_MANAGEMENT`,
    MODEL_DISPLAY_NAMES[model as keyof typeof MODEL_DISPLAY_NAMES].toLowerCase(),
    MODEL_DISPLAY_NAMES[model as keyof typeof MODEL_DISPLAY_NAMES],
    false,
    [],
  ),
);