import { User, BasicInformation, WorkInformation, GroupOfCompany, Company, Department, Position, JobLevel, Location, ShiftingSchedule, Holiday, Role, Permission, RolePermission, UserRole, AuditLog, WorkFlowTemplate, WorkFlowTemplateScope, WorkFlowStepTemplate, WorkFlowInstance, WorkFlowInstanceStep, Signature, Type, Category, ConfigCondition, Config, Status, Request, CapitalRecoveryFactor, Budget, BudgetLedger, BudgetSnapshot, RequestItem, InventoryItem } from '@/lib/generated/api/customHookAPI/graphql';
import { createTableConfig, ListConfigItem } from './shared';
import { user } from './model/user.config';
import { basicInformation } from './model/basicInformation.config';
import { workInformation } from './model/workInformation.config';
import { groupOfCompany } from './model/groupOfCompany.config';
import { company } from './model/company.config';
import { department } from './model/department.config';
import { position } from './model/position.config';
import { jobLevel } from './model/jobLevel.config';
import { location } from './model/location.config';
import { shiftingSchedule } from './model/shiftingSchedule.config';
import { holiday } from './model/holiday.config';
import { role } from './model/role.config';
import { permission } from './model/permission.config';
import { rolePermission } from './model/rolePermission.config';
import { userRole } from './model/userRole.config';
import { auditLog } from './model/auditLog.config';
import { workFlowTemplate } from './model/workFlowTemplate.config';
import { workFlowTemplateScope } from './model/workFlowTemplateScope.config';
import { workFlowStepTemplate } from './model/workFlowStepTemplate.config';
import { workFlowInstance } from './model/workFlowInstance.config';
import { workFlowInstanceStep } from './model/workFlowInstanceStep.config';
import { signature } from './model/signature.config';
import { type } from './model/type.config';
import { category } from './model/category.config';
import { configCondition } from './model/configCondition.config';
import { config } from './model/config.config';
import { status } from './model/status.config';
import { request } from './model/request.config';
import { capitalRecoveryFactor } from './model/capitalRecoveryFactor.config';
import { budget } from './model/budget.config';
import { budgetLedger } from './model/budgetLedger.config';
import { budgetSnapshot } from './model/budgetSnapshot.config';
import { requestItem } from './model/requestItem.config';
import { inventoryItem } from './model/inventoryItem.config';

type ListConfigMap = {
  user: ListConfigItem<User>;
  basicInformation: ListConfigItem<BasicInformation>;
  workInformation: ListConfigItem<WorkInformation>;
  groupOfCompany: ListConfigItem<GroupOfCompany>;
  company: ListConfigItem<Company>;
  department: ListConfigItem<Department>;
  position: ListConfigItem<Position>;
  jobLevel: ListConfigItem<JobLevel>;
  location: ListConfigItem<Location>;
  shiftingSchedule: ListConfigItem<ShiftingSchedule>;
  holiday: ListConfigItem<Holiday>;
  role: ListConfigItem<Role>;
  permission: ListConfigItem<Permission>;
  rolePermission: ListConfigItem<RolePermission>;
  userRole: ListConfigItem<UserRole>;
  auditLog: ListConfigItem<AuditLog>;
  workFlowTemplate: ListConfigItem<WorkFlowTemplate>;
  workFlowTemplateScope: ListConfigItem<WorkFlowTemplateScope>;
  workFlowStepTemplate: ListConfigItem<WorkFlowStepTemplate>;
  workFlowInstance: ListConfigItem<WorkFlowInstance>;
  workFlowInstanceStep: ListConfigItem<WorkFlowInstanceStep>;
  signature: ListConfigItem<Signature>;
  type: ListConfigItem<Type>;
  category: ListConfigItem<Category>;
  configCondition: ListConfigItem<ConfigCondition>;
  config: ListConfigItem<Config>;
  status: ListConfigItem<Status>;
  request: ListConfigItem<Request>;
  capitalRecoveryFactor: ListConfigItem<CapitalRecoveryFactor>;
  budget: ListConfigItem<Budget>;
  budgetLedger: ListConfigItem<BudgetLedger>;
  budgetSnapshot: ListConfigItem<BudgetSnapshot>;
  requestItem: ListConfigItem<RequestItem>;
  inventoryItem: ListConfigItem<InventoryItem>;
};

export const listConfig = {
  user: user,
  basicInformation: basicInformation,
  workInformation: workInformation,
  groupOfCompany: groupOfCompany,
  company: company,
  department: department,
  position: position,
  jobLevel: jobLevel,
  location: location,
  shiftingSchedule: shiftingSchedule,
  holiday: holiday,
  role: role,
  permission: permission,
  rolePermission: rolePermission,
  userRole: userRole,
  auditLog: auditLog,
  workFlowTemplate: workFlowTemplate,
  workFlowTemplateScope: workFlowTemplateScope,
  workFlowStepTemplate: workFlowStepTemplate,
  workFlowInstance: workFlowInstance,
  workFlowInstanceStep: workFlowInstanceStep,
  signature: signature,
  type: type,
  category: category,
  configCondition: configCondition,
  config: config,
  status: status,
  request: request,
  capitalRecoveryFactor: capitalRecoveryFactor,
  budget: budget,
  budgetLedger: budgetLedger,
  budgetSnapshot: budgetSnapshot,
  requestItem: requestItem,
  inventoryItem: inventoryItem,
} satisfies ListConfigMap;

export const userTableConfig = createTableConfig<User>(listConfig.user);
export const basicInformationTableConfig = createTableConfig<BasicInformation>(listConfig.basicInformation);
export const workInformationTableConfig = createTableConfig<WorkInformation>(listConfig.workInformation);
export const groupOfCompanyTableConfig = createTableConfig<GroupOfCompany>(listConfig.groupOfCompany);
export const companyTableConfig = createTableConfig<Company>(listConfig.company);
export const departmentTableConfig = createTableConfig<Department>(listConfig.department);
export const positionTableConfig = createTableConfig<Position>(listConfig.position);
export const jobLevelTableConfig = createTableConfig<JobLevel>(listConfig.jobLevel);
export const locationTableConfig = createTableConfig<Location>(listConfig.location);
export const shiftingScheduleTableConfig = createTableConfig<ShiftingSchedule>(listConfig.shiftingSchedule);
export const holidayTableConfig = createTableConfig<Holiday>(listConfig.holiday);
export const roleTableConfig = createTableConfig<Role>(listConfig.role);
export const permissionTableConfig = createTableConfig<Permission>(listConfig.permission);
export const rolePermissionTableConfig = createTableConfig<RolePermission>(listConfig.rolePermission);
export const userRoleTableConfig = createTableConfig<UserRole>(listConfig.userRole);
export const auditLogTableConfig = createTableConfig<AuditLog>(listConfig.auditLog);
export const workFlowTemplateTableConfig = createTableConfig<WorkFlowTemplate>(listConfig.workFlowTemplate);
export const workFlowTemplateScopeTableConfig = createTableConfig<WorkFlowTemplateScope>(listConfig.workFlowTemplateScope);
export const workFlowStepTemplateTableConfig = createTableConfig<WorkFlowStepTemplate>(listConfig.workFlowStepTemplate);
export const workFlowInstanceTableConfig = createTableConfig<WorkFlowInstance>(listConfig.workFlowInstance);
export const workFlowInstanceStepTableConfig = createTableConfig<WorkFlowInstanceStep>(listConfig.workFlowInstanceStep);
export const signatureTableConfig = createTableConfig<Signature>(listConfig.signature);
export const typeTableConfig = createTableConfig<Type>(listConfig.type);
export const categoryTableConfig = createTableConfig<Category>(listConfig.category);
export const configConditionTableConfig = createTableConfig<ConfigCondition>(listConfig.configCondition);
export const configTableConfig = createTableConfig<Config>(listConfig.config);
export const statusTableConfig = createTableConfig<Status>(listConfig.status);
export const requestTableConfig = createTableConfig<Request>(listConfig.request);
export const capitalRecoveryFactorTableConfig = createTableConfig<CapitalRecoveryFactor>(listConfig.capitalRecoveryFactor);
export const budgetTableConfig = createTableConfig<Budget>(listConfig.budget);
export const budgetLedgerTableConfig = createTableConfig<BudgetLedger>(listConfig.budgetLedger);
export const budgetSnapshotTableConfig = createTableConfig<BudgetSnapshot>(listConfig.budgetSnapshot);
export const requestItemTableConfig = createTableConfig<RequestItem>(listConfig.requestItem);
export const inventoryItemTableConfig = createTableConfig<InventoryItem>(listConfig.inventoryItem);
