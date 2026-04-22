/* eslint-disable */
import type { Prisma, User, BasicInformation, WorkInformation, GroupOfCompany, Company, Department, Position, JobLevel, Location, ShiftingSchedule, Holiday, Role, Permission, RolePermission, UserRole, AuditLog, WorkFlowTemplate, WorkFlowTemplateScope, WorkFlowStepTemplate, WorkFlowInstance, WorkFlowInstanceStep, Signature, Type, Category, ConfigCondition, Config, Status, Request, CapitalRecoveryFactor, Budget, BudgetLedger, BudgetSnapshot, RequestItem } from "../../generated/prisma/client/client.js";
import type { PothosPrismaDatamodel } from "@pothos/plugin-prisma";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: Prisma.UserCreateInput;
        Update: Prisma.UserUpdateInput;
        RelationName: "basicInformations" | "auditLogs" | "actions" | "userRoles" | "userAssignedBy" | "workFlowStepTemplate" | "workFlowInstanceStep" | "requester" | "budgetRequester";
        ListRelations: "auditLogs" | "actions" | "userRoles" | "userAssignedBy" | "workFlowStepTemplate" | "workFlowInstanceStep" | "requester" | "budgetRequester";
        Relations: {
            basicInformations: {
                Shape: BasicInformation | null;
                Name: "BasicInformation";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
            actions: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
            userRoles: {
                Shape: UserRole[];
                Name: "UserRole";
                Nullable: false;
            };
            userAssignedBy: {
                Shape: UserRole[];
                Name: "UserRole";
                Nullable: false;
            };
            workFlowStepTemplate: {
                Shape: WorkFlowStepTemplate[];
                Name: "WorkFlowStepTemplate";
                Nullable: false;
            };
            workFlowInstanceStep: {
                Shape: WorkFlowInstanceStep[];
                Name: "WorkFlowInstanceStep";
                Nullable: false;
            };
            requester: {
                Shape: Request[];
                Name: "Request";
                Nullable: false;
            };
            budgetRequester: {
                Shape: Budget[];
                Name: "Budget";
                Nullable: false;
            };
        };
    };
    BasicInformation: {
        Name: "BasicInformation";
        Shape: BasicInformation;
        Include: Prisma.BasicInformationInclude;
        Select: Prisma.BasicInformationSelect;
        OrderBy: Prisma.BasicInformationOrderByWithRelationInput;
        WhereUnique: Prisma.BasicInformationWhereUniqueInput;
        Where: Prisma.BasicInformationWhereInput;
        Create: Prisma.BasicInformationCreateInput;
        Update: Prisma.BasicInformationUpdateInput;
        RelationName: "user" | "reportingManager" | "workInformations" | "auditLogs";
        ListRelations: "reportingManager" | "workInformations" | "auditLogs";
        Relations: {
            user: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            reportingManager: {
                Shape: WorkInformation[];
                Name: "WorkInformation";
                Nullable: false;
            };
            workInformations: {
                Shape: WorkInformation[];
                Name: "WorkInformation";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    WorkInformation: {
        Name: "WorkInformation";
        Shape: WorkInformation;
        Include: Prisma.WorkInformationInclude;
        Select: Prisma.WorkInformationSelect;
        OrderBy: Prisma.WorkInformationOrderByWithRelationInput;
        WhereUnique: Prisma.WorkInformationWhereUniqueInput;
        Where: Prisma.WorkInformationWhereInput;
        Create: Prisma.WorkInformationCreateInput;
        Update: Prisma.WorkInformationUpdateInput;
        RelationName: "employee" | "groupOfCompany" | "company" | "department" | "position" | "jobLevel" | "employmentType" | "employmentStatus" | "reportingManager" | "workLocation" | "workSetupType" | "shiftingSchedule" | "auditLogs";
        ListRelations: "auditLogs";
        Relations: {
            employee: {
                Shape: BasicInformation | null;
                Name: "BasicInformation";
                Nullable: true;
            };
            groupOfCompany: {
                Shape: GroupOfCompany | null;
                Name: "GroupOfCompany";
                Nullable: true;
            };
            company: {
                Shape: Company | null;
                Name: "Company";
                Nullable: true;
            };
            department: {
                Shape: Department | null;
                Name: "Department";
                Nullable: true;
            };
            position: {
                Shape: Position | null;
                Name: "Position";
                Nullable: true;
            };
            jobLevel: {
                Shape: JobLevel | null;
                Name: "JobLevel";
                Nullable: true;
            };
            employmentType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            employmentStatus: {
                Shape: Status | null;
                Name: "Status";
                Nullable: true;
            };
            reportingManager: {
                Shape: BasicInformation | null;
                Name: "BasicInformation";
                Nullable: true;
            };
            workLocation: {
                Shape: Location | null;
                Name: "Location";
                Nullable: true;
            };
            workSetupType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            shiftingSchedule: {
                Shape: ShiftingSchedule | null;
                Name: "ShiftingSchedule";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    GroupOfCompany: {
        Name: "GroupOfCompany";
        Shape: GroupOfCompany;
        Include: Prisma.GroupOfCompanyInclude;
        Select: Prisma.GroupOfCompanySelect;
        OrderBy: Prisma.GroupOfCompanyOrderByWithRelationInput;
        WhereUnique: Prisma.GroupOfCompanyWhereUniqueInput;
        Where: Prisma.GroupOfCompanyWhereInput;
        Create: Prisma.GroupOfCompanyCreateInput;
        Update: Prisma.GroupOfCompanyUpdateInput;
        RelationName: "industryType" | "headquarters" | "companies" | "auditLogs" | "workInformations";
        ListRelations: "companies" | "auditLogs" | "workInformations";
        Relations: {
            industryType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            headquarters: {
                Shape: Location | null;
                Name: "Location";
                Nullable: true;
            };
            companies: {
                Shape: Company[];
                Name: "Company";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
            workInformations: {
                Shape: WorkInformation[];
                Name: "WorkInformation";
                Nullable: false;
            };
        };
    };
    Company: {
        Name: "Company";
        Shape: Company;
        Include: Prisma.CompanyInclude;
        Select: Prisma.CompanySelect;
        OrderBy: Prisma.CompanyOrderByWithRelationInput;
        WhereUnique: Prisma.CompanyWhereUniqueInput;
        Where: Prisma.CompanyWhereInput;
        Create: Prisma.CompanyCreateInput;
        Update: Prisma.CompanyUpdateInput;
        RelationName: "groupOfCompany" | "locations" | "departments" | "jobLevels" | "auditLogs" | "workInformations" | "scopeType" | "request" | "budget" | "crfCompany";
        ListRelations: "departments" | "jobLevels" | "auditLogs" | "workInformations" | "request" | "budget" | "crfCompany";
        Relations: {
            groupOfCompany: {
                Shape: GroupOfCompany | null;
                Name: "GroupOfCompany";
                Nullable: true;
            };
            locations: {
                Shape: Location | null;
                Name: "Location";
                Nullable: true;
            };
            departments: {
                Shape: Department[];
                Name: "Department";
                Nullable: false;
            };
            jobLevels: {
                Shape: JobLevel[];
                Name: "JobLevel";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
            workInformations: {
                Shape: WorkInformation[];
                Name: "WorkInformation";
                Nullable: false;
            };
            scopeType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            request: {
                Shape: Request[];
                Name: "Request";
                Nullable: false;
            };
            budget: {
                Shape: Budget[];
                Name: "Budget";
                Nullable: false;
            };
            crfCompany: {
                Shape: CapitalRecoveryFactor[];
                Name: "CapitalRecoveryFactor";
                Nullable: false;
            };
        };
    };
    Department: {
        Name: "Department";
        Shape: Department;
        Include: Prisma.DepartmentInclude;
        Select: Prisma.DepartmentSelect;
        OrderBy: Prisma.DepartmentOrderByWithRelationInput;
        WhereUnique: Prisma.DepartmentWhereUniqueInput;
        Where: Prisma.DepartmentWhereInput;
        Create: Prisma.DepartmentCreateInput;
        Update: Prisma.DepartmentUpdateInput;
        RelationName: "company" | "auditLogs" | "workInformations" | "scopeType" | "request" | "budget" | "requestResponsibilityCenter" | "crfDepartment";
        ListRelations: "auditLogs" | "workInformations" | "request" | "budget" | "requestResponsibilityCenter" | "crfDepartment";
        Relations: {
            company: {
                Shape: Company | null;
                Name: "Company";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
            workInformations: {
                Shape: WorkInformation[];
                Name: "WorkInformation";
                Nullable: false;
            };
            scopeType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            request: {
                Shape: Request[];
                Name: "Request";
                Nullable: false;
            };
            budget: {
                Shape: Budget[];
                Name: "Budget";
                Nullable: false;
            };
            requestResponsibilityCenter: {
                Shape: Request[];
                Name: "Request";
                Nullable: false;
            };
            crfDepartment: {
                Shape: CapitalRecoveryFactor[];
                Name: "CapitalRecoveryFactor";
                Nullable: false;
            };
        };
    };
    Position: {
        Name: "Position";
        Shape: Position;
        Include: Prisma.PositionInclude;
        Select: Prisma.PositionSelect;
        OrderBy: Prisma.PositionOrderByWithRelationInput;
        WhereUnique: Prisma.PositionWhereUniqueInput;
        Where: Prisma.PositionWhereInput;
        Create: Prisma.PositionCreateInput;
        Update: Prisma.PositionUpdateInput;
        RelationName: "auditLogs" | "workInformations" | "scopeType";
        ListRelations: "auditLogs" | "workInformations";
        Relations: {
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
            workInformations: {
                Shape: WorkInformation[];
                Name: "WorkInformation";
                Nullable: false;
            };
            scopeType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
        };
    };
    JobLevel: {
        Name: "JobLevel";
        Shape: JobLevel;
        Include: Prisma.JobLevelInclude;
        Select: Prisma.JobLevelSelect;
        OrderBy: Prisma.JobLevelOrderByWithRelationInput;
        WhereUnique: Prisma.JobLevelWhereUniqueInput;
        Where: Prisma.JobLevelWhereInput;
        Create: Prisma.JobLevelCreateInput;
        Update: Prisma.JobLevelUpdateInput;
        RelationName: "jobcodeType" | "company" | "workInformations" | "auditLogs";
        ListRelations: "workInformations" | "auditLogs";
        Relations: {
            jobcodeType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            company: {
                Shape: Company | null;
                Name: "Company";
                Nullable: true;
            };
            workInformations: {
                Shape: WorkInformation[];
                Name: "WorkInformation";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    Location: {
        Name: "Location";
        Shape: Location;
        Include: Prisma.LocationInclude;
        Select: Prisma.LocationSelect;
        OrderBy: Prisma.LocationOrderByWithRelationInput;
        WhereUnique: Prisma.LocationWhereUniqueInput;
        Where: Prisma.LocationWhereInput;
        Create: Prisma.LocationCreateInput;
        Update: Prisma.LocationUpdateInput;
        RelationName: "workInformations" | "groupOfCompaniesLocation" | "companiesLocation" | "auditLogs";
        ListRelations: "workInformations" | "groupOfCompaniesLocation" | "companiesLocation" | "auditLogs";
        Relations: {
            workInformations: {
                Shape: WorkInformation[];
                Name: "WorkInformation";
                Nullable: false;
            };
            groupOfCompaniesLocation: {
                Shape: GroupOfCompany[];
                Name: "GroupOfCompany";
                Nullable: false;
            };
            companiesLocation: {
                Shape: Company[];
                Name: "Company";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    ShiftingSchedule: {
        Name: "ShiftingSchedule";
        Shape: ShiftingSchedule;
        Include: Prisma.ShiftingScheduleInclude;
        Select: Prisma.ShiftingScheduleSelect;
        OrderBy: Prisma.ShiftingScheduleOrderByWithRelationInput;
        WhereUnique: Prisma.ShiftingScheduleWhereUniqueInput;
        Where: Prisma.ShiftingScheduleWhereInput;
        Create: Prisma.ShiftingScheduleCreateInput;
        Update: Prisma.ShiftingScheduleUpdateInput;
        RelationName: "workInformation" | "auditLogs";
        ListRelations: "auditLogs";
        Relations: {
            workInformation: {
                Shape: WorkInformation | null;
                Name: "WorkInformation";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    Holiday: {
        Name: "Holiday";
        Shape: Holiday;
        Include: Prisma.HolidayInclude;
        Select: Prisma.HolidaySelect;
        OrderBy: Prisma.HolidayOrderByWithRelationInput;
        WhereUnique: Prisma.HolidayWhereUniqueInput;
        Where: Prisma.HolidayWhereInput;
        Create: Prisma.HolidayCreateInput;
        Update: Prisma.HolidayUpdateInput;
        RelationName: "auditLogs";
        ListRelations: "auditLogs";
        Relations: {
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    Role: {
        Name: "Role";
        Shape: Role;
        Include: Prisma.RoleInclude;
        Select: Prisma.RoleSelect;
        OrderBy: Prisma.RoleOrderByWithRelationInput;
        WhereUnique: Prisma.RoleWhereUniqueInput;
        Where: Prisma.RoleWhereInput;
        Create: Prisma.RoleCreateInput;
        Update: Prisma.RoleUpdateInput;
        RelationName: "parentRole" | "childRoles" | "rolePermissions" | "userRoles" | "auditLogs";
        ListRelations: "childRoles" | "rolePermissions" | "userRoles" | "auditLogs";
        Relations: {
            parentRole: {
                Shape: Role | null;
                Name: "Role";
                Nullable: true;
            };
            childRoles: {
                Shape: Role[];
                Name: "Role";
                Nullable: false;
            };
            rolePermissions: {
                Shape: RolePermission[];
                Name: "RolePermission";
                Nullable: false;
            };
            userRoles: {
                Shape: UserRole[];
                Name: "UserRole";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    Permission: {
        Name: "Permission";
        Shape: Permission;
        Include: Prisma.PermissionInclude;
        Select: Prisma.PermissionSelect;
        OrderBy: Prisma.PermissionOrderByWithRelationInput;
        WhereUnique: Prisma.PermissionWhereUniqueInput;
        Where: Prisma.PermissionWhereInput;
        Create: Prisma.PermissionCreateInput;
        Update: Prisma.PermissionUpdateInput;
        RelationName: "rolePermissions" | "auditLogs";
        ListRelations: "rolePermissions" | "auditLogs";
        Relations: {
            rolePermissions: {
                Shape: RolePermission[];
                Name: "RolePermission";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    RolePermission: {
        Name: "RolePermission";
        Shape: RolePermission;
        Include: Prisma.RolePermissionInclude;
        Select: Prisma.RolePermissionSelect;
        OrderBy: Prisma.RolePermissionOrderByWithRelationInput;
        WhereUnique: Prisma.RolePermissionWhereUniqueInput;
        Where: Prisma.RolePermissionWhereInput;
        Create: Prisma.RolePermissionCreateInput;
        Update: Prisma.RolePermissionUpdateInput;
        RelationName: "conditions" | "role" | "permission" | "auditLogs";
        ListRelations: "conditions" | "auditLogs";
        Relations: {
            conditions: {
                Shape: Config[];
                Name: "Config";
                Nullable: false;
            };
            role: {
                Shape: Role | null;
                Name: "Role";
                Nullable: true;
            };
            permission: {
                Shape: Permission | null;
                Name: "Permission";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    UserRole: {
        Name: "UserRole";
        Shape: UserRole;
        Include: Prisma.UserRoleInclude;
        Select: Prisma.UserRoleSelect;
        OrderBy: Prisma.UserRoleOrderByWithRelationInput;
        WhereUnique: Prisma.UserRoleWhereUniqueInput;
        Where: Prisma.UserRoleWhereInput;
        Create: Prisma.UserRoleCreateInput;
        Update: Prisma.UserRoleUpdateInput;
        RelationName: "userAssignedBy" | "user" | "role" | "auditLogs";
        ListRelations: "auditLogs";
        Relations: {
            userAssignedBy: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            user: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            role: {
                Shape: Role | null;
                Name: "Role";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    AuditLog: {
        Name: "AuditLog";
        Shape: AuditLog;
        Include: Prisma.AuditLogInclude;
        Select: Prisma.AuditLogSelect;
        OrderBy: Prisma.AuditLogOrderByWithRelationInput;
        WhereUnique: Prisma.AuditLogWhereUniqueInput;
        Where: Prisma.AuditLogWhereInput;
        Create: Prisma.AuditLogCreateInput;
        Update: Prisma.AuditLogUpdateInput;
        RelationName: "actionType" | "actor" | "holiday" | "shiftSchedule" | "position" | "jobLevel" | "type" | "status" | "location" | "user" | "basicInformation" | "workInformation" | "groupOfCompany" | "company" | "department" | "userRole" | "rolePermission" | "permission" | "role" | "workFlowTemplate" | "configCondition" | "config" | "workFlowStepTemplate" | "workFlowInstance" | "workFlowInstanceStep" | "signature" | "workFlowTemplateScope" | "requestItem" | "budgetSnapshot" | "budgetLedger" | "budget" | "request" | "category" | "parent" | "auditLogs";
        ListRelations: "auditLogs";
        Relations: {
            actionType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            actor: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            holiday: {
                Shape: Holiday | null;
                Name: "Holiday";
                Nullable: true;
            };
            shiftSchedule: {
                Shape: ShiftingSchedule | null;
                Name: "ShiftingSchedule";
                Nullable: true;
            };
            position: {
                Shape: Position | null;
                Name: "Position";
                Nullable: true;
            };
            jobLevel: {
                Shape: JobLevel | null;
                Name: "JobLevel";
                Nullable: true;
            };
            type: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            status: {
                Shape: Status | null;
                Name: "Status";
                Nullable: true;
            };
            location: {
                Shape: Location | null;
                Name: "Location";
                Nullable: true;
            };
            user: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            basicInformation: {
                Shape: BasicInformation | null;
                Name: "BasicInformation";
                Nullable: true;
            };
            workInformation: {
                Shape: WorkInformation | null;
                Name: "WorkInformation";
                Nullable: true;
            };
            groupOfCompany: {
                Shape: GroupOfCompany | null;
                Name: "GroupOfCompany";
                Nullable: true;
            };
            company: {
                Shape: Company | null;
                Name: "Company";
                Nullable: true;
            };
            department: {
                Shape: Department | null;
                Name: "Department";
                Nullable: true;
            };
            userRole: {
                Shape: UserRole | null;
                Name: "UserRole";
                Nullable: true;
            };
            rolePermission: {
                Shape: RolePermission | null;
                Name: "RolePermission";
                Nullable: true;
            };
            permission: {
                Shape: Permission | null;
                Name: "Permission";
                Nullable: true;
            };
            role: {
                Shape: Role | null;
                Name: "Role";
                Nullable: true;
            };
            workFlowTemplate: {
                Shape: WorkFlowTemplate | null;
                Name: "WorkFlowTemplate";
                Nullable: true;
            };
            configCondition: {
                Shape: ConfigCondition | null;
                Name: "ConfigCondition";
                Nullable: true;
            };
            config: {
                Shape: Config | null;
                Name: "Config";
                Nullable: true;
            };
            workFlowStepTemplate: {
                Shape: WorkFlowStepTemplate | null;
                Name: "WorkFlowStepTemplate";
                Nullable: true;
            };
            workFlowInstance: {
                Shape: WorkFlowInstance | null;
                Name: "WorkFlowInstance";
                Nullable: true;
            };
            workFlowInstanceStep: {
                Shape: WorkFlowInstanceStep | null;
                Name: "WorkFlowInstanceStep";
                Nullable: true;
            };
            signature: {
                Shape: Signature | null;
                Name: "Signature";
                Nullable: true;
            };
            workFlowTemplateScope: {
                Shape: WorkFlowTemplateScope | null;
                Name: "WorkFlowTemplateScope";
                Nullable: true;
            };
            requestItem: {
                Shape: RequestItem | null;
                Name: "RequestItem";
                Nullable: true;
            };
            budgetSnapshot: {
                Shape: BudgetSnapshot | null;
                Name: "BudgetSnapshot";
                Nullable: true;
            };
            budgetLedger: {
                Shape: BudgetLedger | null;
                Name: "BudgetLedger";
                Nullable: true;
            };
            budget: {
                Shape: Budget | null;
                Name: "Budget";
                Nullable: true;
            };
            request: {
                Shape: Request | null;
                Name: "Request";
                Nullable: true;
            };
            category: {
                Shape: Category | null;
                Name: "Category";
                Nullable: true;
            };
            parent: {
                Shape: AuditLog | null;
                Name: "AuditLog";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    WorkFlowTemplate: {
        Name: "WorkFlowTemplate";
        Shape: WorkFlowTemplate;
        Include: Prisma.WorkFlowTemplateInclude;
        Select: Prisma.WorkFlowTemplateSelect;
        OrderBy: Prisma.WorkFlowTemplateOrderByWithRelationInput;
        WhereUnique: Prisma.WorkFlowTemplateWhereUniqueInput;
        Where: Prisma.WorkFlowTemplateWhereInput;
        Create: Prisma.WorkFlowTemplateCreateInput;
        Update: Prisma.WorkFlowTemplateUpdateInput;
        RelationName: "scope" | "steps" | "workFlowInstance" | "request" | "budget" | "auditLogs";
        ListRelations: "scope" | "steps" | "workFlowInstance" | "request" | "budget" | "auditLogs";
        Relations: {
            scope: {
                Shape: WorkFlowTemplateScope[];
                Name: "WorkFlowTemplateScope";
                Nullable: false;
            };
            steps: {
                Shape: WorkFlowStepTemplate[];
                Name: "WorkFlowStepTemplate";
                Nullable: false;
            };
            workFlowInstance: {
                Shape: WorkFlowInstance[];
                Name: "WorkFlowInstance";
                Nullable: false;
            };
            request: {
                Shape: Request[];
                Name: "Request";
                Nullable: false;
            };
            budget: {
                Shape: Budget[];
                Name: "Budget";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    WorkFlowTemplateScope: {
        Name: "WorkFlowTemplateScope";
        Shape: WorkFlowTemplateScope;
        Include: Prisma.WorkFlowTemplateScopeInclude;
        Select: Prisma.WorkFlowTemplateScopeSelect;
        OrderBy: Prisma.WorkFlowTemplateScopeOrderByWithRelationInput;
        WhereUnique: Prisma.WorkFlowTemplateScopeWhereUniqueInput;
        Where: Prisma.WorkFlowTemplateScopeWhereInput;
        Create: Prisma.WorkFlowTemplateScopeCreateInput;
        Update: Prisma.WorkFlowTemplateScopeUpdateInput;
        RelationName: "template" | "scopeType" | "auditLogs";
        ListRelations: "auditLogs";
        Relations: {
            template: {
                Shape: WorkFlowTemplate | null;
                Name: "WorkFlowTemplate";
                Nullable: true;
            };
            scopeType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    WorkFlowStepTemplate: {
        Name: "WorkFlowStepTemplate";
        Shape: WorkFlowStepTemplate;
        Include: Prisma.WorkFlowStepTemplateInclude;
        Select: Prisma.WorkFlowStepTemplateSelect;
        OrderBy: Prisma.WorkFlowStepTemplateOrderByWithRelationInput;
        WhereUnique: Prisma.WorkFlowStepTemplateWhereUniqueInput;
        Where: Prisma.WorkFlowStepTemplateWhereInput;
        Create: Prisma.WorkFlowStepTemplateCreateInput;
        Update: Prisma.WorkFlowStepTemplateUpdateInput;
        RelationName: "workflowTemplate" | "assignmentType" | "assignedToUser" | "conditions" | "workFlowInstanceStep" | "auditLogs";
        ListRelations: "conditions" | "workFlowInstanceStep" | "auditLogs";
        Relations: {
            workflowTemplate: {
                Shape: WorkFlowTemplate | null;
                Name: "WorkFlowTemplate";
                Nullable: true;
            };
            assignmentType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            assignedToUser: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            conditions: {
                Shape: Config[];
                Name: "Config";
                Nullable: false;
            };
            workFlowInstanceStep: {
                Shape: WorkFlowInstanceStep[];
                Name: "WorkFlowInstanceStep";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    WorkFlowInstance: {
        Name: "WorkFlowInstance";
        Shape: WorkFlowInstance;
        Include: Prisma.WorkFlowInstanceInclude;
        Select: Prisma.WorkFlowInstanceSelect;
        OrderBy: Prisma.WorkFlowInstanceOrderByWithRelationInput;
        WhereUnique: Prisma.WorkFlowInstanceWhereUniqueInput;
        Where: Prisma.WorkFlowInstanceWhereInput;
        Create: Prisma.WorkFlowInstanceCreateInput;
        Update: Prisma.WorkFlowInstanceUpdateInput;
        RelationName: "template" | "status" | "referenceType" | "steps" | "signatures" | "request" | "budget" | "auditLogs";
        ListRelations: "steps" | "signatures" | "auditLogs";
        Relations: {
            template: {
                Shape: WorkFlowTemplate | null;
                Name: "WorkFlowTemplate";
                Nullable: true;
            };
            status: {
                Shape: Status | null;
                Name: "Status";
                Nullable: true;
            };
            referenceType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            steps: {
                Shape: WorkFlowInstanceStep[];
                Name: "WorkFlowInstanceStep";
                Nullable: false;
            };
            signatures: {
                Shape: Signature[];
                Name: "Signature";
                Nullable: false;
            };
            request: {
                Shape: Request | null;
                Name: "Request";
                Nullable: true;
            };
            budget: {
                Shape: Budget | null;
                Name: "Budget";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    WorkFlowInstanceStep: {
        Name: "WorkFlowInstanceStep";
        Shape: WorkFlowInstanceStep;
        Include: Prisma.WorkFlowInstanceStepInclude;
        Select: Prisma.WorkFlowInstanceStepSelect;
        OrderBy: Prisma.WorkFlowInstanceStepOrderByWithRelationInput;
        WhereUnique: Prisma.WorkFlowInstanceStepWhereUniqueInput;
        Where: Prisma.WorkFlowInstanceStepWhereInput;
        Create: Prisma.WorkFlowInstanceStepCreateInput;
        Update: Prisma.WorkFlowInstanceStepUpdateInput;
        RelationName: "instance" | "stepTemplate" | "status" | "assignedToUser" | "signature" | "auditLogs";
        ListRelations: "signature" | "auditLogs";
        Relations: {
            instance: {
                Shape: WorkFlowInstance | null;
                Name: "WorkFlowInstance";
                Nullable: true;
            };
            stepTemplate: {
                Shape: WorkFlowStepTemplate | null;
                Name: "WorkFlowStepTemplate";
                Nullable: true;
            };
            status: {
                Shape: Status | null;
                Name: "Status";
                Nullable: true;
            };
            assignedToUser: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            signature: {
                Shape: Signature[];
                Name: "Signature";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    Signature: {
        Name: "Signature";
        Shape: Signature;
        Include: Prisma.SignatureInclude;
        Select: Prisma.SignatureSelect;
        OrderBy: Prisma.SignatureOrderByWithRelationInput;
        WhereUnique: Prisma.SignatureWhereUniqueInput;
        Where: Prisma.SignatureWhereInput;
        Create: Prisma.SignatureCreateInput;
        Update: Prisma.SignatureUpdateInput;
        RelationName: "instance" | "step" | "auditLogs";
        ListRelations: "auditLogs";
        Relations: {
            instance: {
                Shape: WorkFlowInstance | null;
                Name: "WorkFlowInstance";
                Nullable: true;
            };
            step: {
                Shape: WorkFlowInstanceStep | null;
                Name: "WorkFlowInstanceStep";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    Type: {
        Name: "Type";
        Shape: Type;
        Include: Prisma.TypeInclude;
        Select: Prisma.TypeSelect;
        OrderBy: Prisma.TypeOrderByWithRelationInput;
        WhereUnique: Prisma.TypeWhereUniqueInput;
        Where: Prisma.TypeWhereInput;
        Create: Prisma.TypeCreateInput;
        Update: Prisma.TypeUpdateInput;
        RelationName: "employmentType" | "workSetupType" | "industryType" | "companies" | "departments" | "jobPositions" | "jobLevels" | "actionType" | "auditLogs" | "workFlowTemplateScope" | "stepAssignmentType" | "workFlowInstance" | "budgetMovementType" | "sourceDocumentType";
        ListRelations: "employmentType" | "workSetupType" | "industryType" | "companies" | "departments" | "jobPositions" | "jobLevels" | "actionType" | "auditLogs" | "workFlowTemplateScope" | "stepAssignmentType" | "workFlowInstance" | "budgetMovementType" | "sourceDocumentType";
        Relations: {
            employmentType: {
                Shape: WorkInformation[];
                Name: "WorkInformation";
                Nullable: false;
            };
            workSetupType: {
                Shape: WorkInformation[];
                Name: "WorkInformation";
                Nullable: false;
            };
            industryType: {
                Shape: GroupOfCompany[];
                Name: "GroupOfCompany";
                Nullable: false;
            };
            companies: {
                Shape: Company[];
                Name: "Company";
                Nullable: false;
            };
            departments: {
                Shape: Department[];
                Name: "Department";
                Nullable: false;
            };
            jobPositions: {
                Shape: Position[];
                Name: "Position";
                Nullable: false;
            };
            jobLevels: {
                Shape: JobLevel[];
                Name: "JobLevel";
                Nullable: false;
            };
            actionType: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
            workFlowTemplateScope: {
                Shape: WorkFlowTemplateScope[];
                Name: "WorkFlowTemplateScope";
                Nullable: false;
            };
            stepAssignmentType: {
                Shape: WorkFlowStepTemplate[];
                Name: "WorkFlowStepTemplate";
                Nullable: false;
            };
            workFlowInstance: {
                Shape: WorkFlowInstance[];
                Name: "WorkFlowInstance";
                Nullable: false;
            };
            budgetMovementType: {
                Shape: BudgetLedger[];
                Name: "BudgetLedger";
                Nullable: false;
            };
            sourceDocumentType: {
                Shape: BudgetLedger[];
                Name: "BudgetLedger";
                Nullable: false;
            };
        };
    };
    Category: {
        Name: "Category";
        Shape: Category;
        Include: Prisma.CategoryInclude;
        Select: Prisma.CategorySelect;
        OrderBy: Prisma.CategoryOrderByWithRelationInput;
        WhereUnique: Prisma.CategoryWhereUniqueInput;
        Where: Prisma.CategoryWhereInput;
        Create: Prisma.CategoryCreateInput;
        Update: Prisma.CategoryUpdateInput;
        RelationName: "budget" | "crfCategory" | "auditLogs";
        ListRelations: "budget" | "crfCategory" | "auditLogs";
        Relations: {
            budget: {
                Shape: Budget[];
                Name: "Budget";
                Nullable: false;
            };
            crfCategory: {
                Shape: CapitalRecoveryFactor[];
                Name: "CapitalRecoveryFactor";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    ConfigCondition: {
        Name: "ConfigCondition";
        Shape: ConfigCondition;
        Include: Prisma.ConfigConditionInclude;
        Select: Prisma.ConfigConditionSelect;
        OrderBy: Prisma.ConfigConditionOrderByWithRelationInput;
        WhereUnique: Prisma.ConfigConditionWhereUniqueInput;
        Where: Prisma.ConfigConditionWhereInput;
        Create: Prisma.ConfigConditionCreateInput;
        Update: Prisma.ConfigConditionUpdateInput;
        RelationName: "config" | "parentCondition" | "subConditions" | "auditLogs";
        ListRelations: "subConditions" | "auditLogs";
        Relations: {
            config: {
                Shape: Config | null;
                Name: "Config";
                Nullable: true;
            };
            parentCondition: {
                Shape: ConfigCondition | null;
                Name: "ConfigCondition";
                Nullable: true;
            };
            subConditions: {
                Shape: ConfigCondition[];
                Name: "ConfigCondition";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    Config: {
        Name: "Config";
        Shape: Config;
        Include: Prisma.ConfigInclude;
        Select: Prisma.ConfigSelect;
        OrderBy: Prisma.ConfigOrderByWithRelationInput;
        WhereUnique: Prisma.ConfigWhereUniqueInput;
        Where: Prisma.ConfigWhereInput;
        Create: Prisma.ConfigCreateInput;
        Update: Prisma.ConfigUpdateInput;
        RelationName: "conditions" | "rolePermission" | "workFlowStepTemplate" | "auditLogs";
        ListRelations: "conditions" | "auditLogs";
        Relations: {
            conditions: {
                Shape: ConfigCondition[];
                Name: "ConfigCondition";
                Nullable: false;
            };
            rolePermission: {
                Shape: RolePermission | null;
                Name: "RolePermission";
                Nullable: true;
            };
            workFlowStepTemplate: {
                Shape: WorkFlowStepTemplate | null;
                Name: "WorkFlowStepTemplate";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    Status: {
        Name: "Status";
        Shape: Status;
        Include: Prisma.StatusInclude;
        Select: Prisma.StatusSelect;
        OrderBy: Prisma.StatusOrderByWithRelationInput;
        WhereUnique: Prisma.StatusWhereUniqueInput;
        Where: Prisma.StatusWhereInput;
        Create: Prisma.StatusCreateInput;
        Update: Prisma.StatusUpdateInput;
        RelationName: "workInformations" | "workFlowInstanceSteps" | "workFlowInstances" | "request" | "requestItems" | "auditLogs" | "budget" | "crfStatus";
        ListRelations: "workInformations" | "workFlowInstanceSteps" | "workFlowInstances" | "request" | "requestItems" | "auditLogs" | "budget" | "crfStatus";
        Relations: {
            workInformations: {
                Shape: WorkInformation[];
                Name: "WorkInformation";
                Nullable: false;
            };
            workFlowInstanceSteps: {
                Shape: WorkFlowInstanceStep[];
                Name: "WorkFlowInstanceStep";
                Nullable: false;
            };
            workFlowInstances: {
                Shape: WorkFlowInstance[];
                Name: "WorkFlowInstance";
                Nullable: false;
            };
            request: {
                Shape: Request[];
                Name: "Request";
                Nullable: false;
            };
            requestItems: {
                Shape: RequestItem[];
                Name: "RequestItem";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
            budget: {
                Shape: Budget[];
                Name: "Budget";
                Nullable: false;
            };
            crfStatus: {
                Shape: CapitalRecoveryFactor[];
                Name: "CapitalRecoveryFactor";
                Nullable: false;
            };
        };
    };
    Request: {
        Name: "Request";
        Shape: Request;
        Include: Prisma.RequestInclude;
        Select: Prisma.RequestSelect;
        OrderBy: Prisma.RequestOrderByWithRelationInput;
        WhereUnique: Prisma.RequestWhereUniqueInput;
        Where: Prisma.RequestWhereInput;
        Create: Prisma.RequestCreateInput;
        Update: Prisma.RequestUpdateInput;
        RelationName: "requester" | "company" | "department" | "responsibilityCenter" | "requestedCRF" | "requestItems" | "workflowTemplate" | "workFlowInstance" | "status" | "auditLogs";
        ListRelations: "requestItems" | "auditLogs";
        Relations: {
            requester: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            company: {
                Shape: Company | null;
                Name: "Company";
                Nullable: true;
            };
            department: {
                Shape: Department | null;
                Name: "Department";
                Nullable: true;
            };
            responsibilityCenter: {
                Shape: Department | null;
                Name: "Department";
                Nullable: true;
            };
            requestedCRF: {
                Shape: CapitalRecoveryFactor | null;
                Name: "CapitalRecoveryFactor";
                Nullable: true;
            };
            requestItems: {
                Shape: RequestItem[];
                Name: "RequestItem";
                Nullable: false;
            };
            workflowTemplate: {
                Shape: WorkFlowTemplate | null;
                Name: "WorkFlowTemplate";
                Nullable: true;
            };
            workFlowInstance: {
                Shape: WorkFlowInstance | null;
                Name: "WorkFlowInstance";
                Nullable: true;
            };
            status: {
                Shape: Status | null;
                Name: "Status";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    CapitalRecoveryFactor: {
        Name: "CapitalRecoveryFactor";
        Shape: CapitalRecoveryFactor;
        Include: Prisma.CapitalRecoveryFactorInclude;
        Select: Prisma.CapitalRecoveryFactorSelect;
        OrderBy: Prisma.CapitalRecoveryFactorOrderByWithRelationInput;
        WhereUnique: Prisma.CapitalRecoveryFactorWhereUniqueInput;
        Where: Prisma.CapitalRecoveryFactorWhereInput;
        Create: Prisma.CapitalRecoveryFactorCreateInput;
        Update: Prisma.CapitalRecoveryFactorUpdateInput;
        RelationName: "status" | "company" | "department" | "category" | "request" | "budget";
        ListRelations: "budget";
        Relations: {
            status: {
                Shape: Status | null;
                Name: "Status";
                Nullable: true;
            };
            company: {
                Shape: Company | null;
                Name: "Company";
                Nullable: true;
            };
            department: {
                Shape: Department | null;
                Name: "Department";
                Nullable: true;
            };
            category: {
                Shape: Category | null;
                Name: "Category";
                Nullable: true;
            };
            request: {
                Shape: Request | null;
                Name: "Request";
                Nullable: true;
            };
            budget: {
                Shape: Budget[];
                Name: "Budget";
                Nullable: false;
            };
        };
    };
    Budget: {
        Name: "Budget";
        Shape: Budget;
        Include: Prisma.BudgetInclude;
        Select: Prisma.BudgetSelect;
        OrderBy: Prisma.BudgetOrderByWithRelationInput;
        WhereUnique: Prisma.BudgetWhereUniqueInput;
        Where: Prisma.BudgetWhereInput;
        Create: Prisma.BudgetCreateInput;
        Update: Prisma.BudgetUpdateInput;
        RelationName: "crf" | "statusBudget" | "company" | "department" | "category" | "requester" | "workflowTemplate" | "workflowInstance" | "budgetLedgers" | "budgetSnapshot" | "auditLogs";
        ListRelations: "budgetLedgers" | "budgetSnapshot" | "auditLogs";
        Relations: {
            crf: {
                Shape: CapitalRecoveryFactor | null;
                Name: "CapitalRecoveryFactor";
                Nullable: true;
            };
            statusBudget: {
                Shape: Status | null;
                Name: "Status";
                Nullable: true;
            };
            company: {
                Shape: Company | null;
                Name: "Company";
                Nullable: true;
            };
            department: {
                Shape: Department | null;
                Name: "Department";
                Nullable: true;
            };
            category: {
                Shape: Category | null;
                Name: "Category";
                Nullable: true;
            };
            requester: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            workflowTemplate: {
                Shape: WorkFlowTemplate | null;
                Name: "WorkFlowTemplate";
                Nullable: true;
            };
            workflowInstance: {
                Shape: WorkFlowInstance | null;
                Name: "WorkFlowInstance";
                Nullable: true;
            };
            budgetLedgers: {
                Shape: BudgetLedger[];
                Name: "BudgetLedger";
                Nullable: false;
            };
            budgetSnapshot: {
                Shape: BudgetSnapshot[];
                Name: "BudgetSnapshot";
                Nullable: false;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    BudgetLedger: {
        Name: "BudgetLedger";
        Shape: BudgetLedger;
        Include: Prisma.BudgetLedgerInclude;
        Select: Prisma.BudgetLedgerSelect;
        OrderBy: Prisma.BudgetLedgerOrderByWithRelationInput;
        WhereUnique: Prisma.BudgetLedgerWhereUniqueInput;
        Where: Prisma.BudgetLedgerWhereInput;
        Create: Prisma.BudgetLedgerCreateInput;
        Update: Prisma.BudgetLedgerUpdateInput;
        RelationName: "budget" | "type" | "sourceType" | "auditLogs";
        ListRelations: "auditLogs";
        Relations: {
            budget: {
                Shape: Budget | null;
                Name: "Budget";
                Nullable: true;
            };
            type: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            sourceType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    BudgetSnapshot: {
        Name: "BudgetSnapshot";
        Shape: BudgetSnapshot;
        Include: Prisma.BudgetSnapshotInclude;
        Select: Prisma.BudgetSnapshotSelect;
        OrderBy: Prisma.BudgetSnapshotOrderByWithRelationInput;
        WhereUnique: Prisma.BudgetSnapshotWhereUniqueInput;
        Where: Prisma.BudgetSnapshotWhereInput;
        Create: Prisma.BudgetSnapshotCreateInput;
        Update: Prisma.BudgetSnapshotUpdateInput;
        RelationName: "budget" | "auditLogs";
        ListRelations: "auditLogs";
        Relations: {
            budget: {
                Shape: Budget | null;
                Name: "Budget";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
    RequestItem: {
        Name: "RequestItem";
        Shape: RequestItem;
        Include: Prisma.RequestItemInclude;
        Select: Prisma.RequestItemSelect;
        OrderBy: Prisma.RequestItemOrderByWithRelationInput;
        WhereUnique: Prisma.RequestItemWhereUniqueInput;
        Where: Prisma.RequestItemWhereInput;
        Create: Prisma.RequestItemCreateInput;
        Update: Prisma.RequestItemUpdateInput;
        RelationName: "request" | "status" | "auditLogs";
        ListRelations: "auditLogs";
        Relations: {
            request: {
                Shape: Request | null;
                Name: "Request";
                Nullable: true;
            };
            status: {
                Shape: Status | null;
                Name: "Status";
                Nullable: true;
            };
            auditLogs: {
                Shape: AuditLog[];
                Name: "AuditLog";
                Nullable: false;
            };
        };
    };
}
export function getDatamodel(): PothosPrismaDatamodel { return JSON.parse("{\"datamodel\":{\"models\":{\"User\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"email\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"password\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"emailVerified\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"image\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"BasicInformation\",\"kind\":\"object\",\"name\":\"basicInformations\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BasicInformationToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isTwoFactorAuthEnabled\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"otpCode\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"actions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserAsActor\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"UserRole\",\"kind\":\"object\",\"name\":\"userRoles\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserToUserRole\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"UserRole\",\"kind\":\"object\",\"name\":\"userAssignedBy\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserAsRoleAssigner\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"emailOtpExpiresAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"incrementalLoginAttempts\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowStepTemplate\",\"kind\":\"object\",\"name\":\"workFlowStepTemplate\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"StepAssignedToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstanceStep\",\"kind\":\"object\",\"name\":\"workFlowInstanceStep\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"StepAssignedToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Request\",\"kind\":\"object\",\"name\":\"requester\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestRequester\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Budget\",\"kind\":\"object\",\"name\":\"budgetRequester\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetRequester\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"BasicInformation\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"firstName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"middleName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"lastName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"suffix\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"fullName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"birthDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"gender\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"phoneNumber\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"address\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"city\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"province\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"country\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BasicInformationToUser\",\"relationFromFields\":[\"userId\"],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"reportingManager\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Manager\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Employee\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToBasicInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"WorkInformation\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"employeeNumber\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"employeeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"BasicInformation\",\"kind\":\"object\",\"name\":\"employee\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Employee\",\"relationFromFields\":[\"employeeId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"groupOfCompanyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"GroupOfCompany\",\"kind\":\"object\",\"name\":\"groupOfCompany\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"GroupOfCompanyToWorkInformation\",\"relationFromFields\":[\"groupOfCompanyId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"companyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"company\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyToWorkInformation\",\"relationFromFields\":[\"companyId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"departmentId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Department\",\"kind\":\"object\",\"name\":\"department\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DepartmentToWorkInformation\",\"relationFromFields\":[\"departmentId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"positionId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Position\",\"kind\":\"object\",\"name\":\"position\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PositionToWorkInformation\",\"relationFromFields\":[\"positionId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"jobLevelId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"JobLevel\",\"kind\":\"object\",\"name\":\"jobLevel\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"JobLevelToWorkInformation\",\"relationFromFields\":[\"jobLevelId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"employmentTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"employmentType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"EmploymentType\",\"relationFromFields\":[\"employmentTypeId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"employmentStatusId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Status\",\"kind\":\"object\",\"name\":\"employmentStatus\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"EmploymentStatus\",\"relationFromFields\":[\"employmentStatusId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"reportingManagerId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"BasicInformation\",\"kind\":\"object\",\"name\":\"reportingManager\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Manager\",\"relationFromFields\":[\"reportingManagerId\"],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"hireDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"regularizationDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"firstProbationEvaluationDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"finalProbationEvaluationDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"contractEndDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"seasonalEndDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"endDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"workLocationId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Location\",\"kind\":\"object\",\"name\":\"workLocation\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkLocation\",\"relationFromFields\":[\"workLocationId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"workSetupTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"workSetupType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkSetupType\",\"relationFromFields\":[\"workSetupTypeId\"],\"isUpdatedAt\":false},{\"type\":\"ShiftingSchedule\",\"kind\":\"object\",\"name\":\"shiftingSchedule\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ShiftingSchedule\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"GroupOfCompany\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"acronym\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"industryTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"industryType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"IndustryType\",\"relationFromFields\":[\"industryTypeId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"headquartersId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Location\",\"kind\":\"object\",\"name\":\"headquarters\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"GroupOfCompanyLocation\",\"relationFromFields\":[\"headquartersId\"],\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"companies\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyToGroupOfCompany\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToGroupOfCompany\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"GroupOfCompanyToWorkInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"name\",\"acronym\"]}]},\"Company\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"acronym\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"groupOfCompanyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"GroupOfCompany\",\"kind\":\"object\",\"name\":\"groupOfCompany\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyToGroupOfCompany\",\"relationFromFields\":[\"groupOfCompanyId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"locationsid\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Location\",\"kind\":\"object\",\"name\":\"locations\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompaniesLocation\",\"relationFromFields\":[\"locationsid\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"conctactNumber\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"email\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Department\",\"kind\":\"object\",\"name\":\"departments\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyDepartments\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"logo\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"JobLevel\",\"kind\":\"object\",\"name\":\"jobLevels\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyJobLevels\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToCompany\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyToWorkInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"scopeType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyType\",\"relationFromFields\":[\"scopeTypeId\"],\"isUpdatedAt\":false},{\"type\":\"Request\",\"kind\":\"object\",\"name\":\"request\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyToRequest\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Budget\",\"kind\":\"object\",\"name\":\"budget\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToCompany\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"CapitalRecoveryFactor\",\"kind\":\"object\",\"name\":\"crfCompany\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CRFCompany\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"name\",\"acronym\"]}]},\"Department\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"acronym\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"companyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"company\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyDepartments\",\"relationFromFields\":[\"companyId\"],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToDepartment\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DepartmentToWorkInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"scopeType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DepartmentType\",\"relationFromFields\":[\"scopeTypeId\"],\"isUpdatedAt\":false},{\"type\":\"Request\",\"kind\":\"object\",\"name\":\"request\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DepartmentToRequest\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Budget\",\"kind\":\"object\",\"name\":\"budget\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToDepartment\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Request\",\"kind\":\"object\",\"name\":\"requestResponsibilityCenter\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestResponsibilityCenter\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"CapitalRecoveryFactor\",\"kind\":\"object\",\"name\":\"crfDepartment\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CRFDepartment\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"name\",\"acronym\"]}]},\"Position\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"acronym\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToPosition\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PositionToWorkInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"scopeType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PositionType\",\"relationFromFields\":[\"scopeTypeId\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"name\",\"acronym\"]}]},\"JobLevel\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"acronym\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"jobcodeTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"jobcodeType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"JobCodeType\",\"relationFromFields\":[\"jobcodeTypeId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"companyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"company\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyJobLevels\",\"relationFromFields\":[\"companyId\"],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"JobLevelToWorkInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToJobLevel\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"name\",\"acronym\"]}]},\"Location\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkLocation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"GroupOfCompany\",\"kind\":\"object\",\"name\":\"groupOfCompaniesLocation\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"GroupOfCompanyLocation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"companiesLocation\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompaniesLocation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToLocation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"ShiftingSchedule\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"startTime\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"endTime\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"lunchStart\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"lunchEnd\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"breakStart\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"breakEnd\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"workDays\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"restDays\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"workInformationId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformation\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ShiftingSchedule\",\"relationFromFields\":[\"workInformationId\"],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToShiftingSchedule\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Holiday\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"date\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isRecurring\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToHoliday\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Role\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"roleType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isDefault\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"parentRoleId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Role\",\"kind\":\"object\",\"name\":\"parentRole\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RoleHierarchy\",\"relationFromFields\":[\"parentRoleId\"],\"isUpdatedAt\":false},{\"type\":\"Role\",\"kind\":\"object\",\"name\":\"childRoles\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RoleHierarchy\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"RolePermission\",\"kind\":\"object\",\"name\":\"rolePermissions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RoleToRolePermission\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"UserRole\",\"kind\":\"object\",\"name\":\"userRoles\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RoleToUserRole\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToRole\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Permission\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"module\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"resource\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"action\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"displayOrder\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isGlobal\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isAdmin\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"globalLimit\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"RolePermission\",\"kind\":\"object\",\"name\":\"rolePermissions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PermissionToRolePermission\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToPermission\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"module\",\"resource\",\"action\"]}]},\"RolePermission\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"roleId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"permissionId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeValues\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Config\",\"kind\":\"object\",\"name\":\"conditions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PermissionScopeView\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Role\",\"kind\":\"object\",\"name\":\"role\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RoleToRolePermission\",\"relationFromFields\":[\"roleId\"],\"isUpdatedAt\":false},{\"type\":\"Permission\",\"kind\":\"object\",\"name\":\"permission\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PermissionToRolePermission\",\"relationFromFields\":[\"permissionId\"],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToRolePermission\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"roleId\",\"permissionId\",\"scopeValues\"]}]},\"UserRole\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"roleId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeValues\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"conditionOverrides\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"assignedById\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"userAssignedBy\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserAsRoleAssigner\",\"relationFromFields\":[\"assignedById\"],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"expiresAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserToUserRole\",\"relationFromFields\":[\"userId\"],\"isUpdatedAt\":false},{\"type\":\"Role\",\"kind\":\"object\",\"name\":\"role\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RoleToUserRole\",\"relationFromFields\":[\"roleId\"],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToUserRole\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"roleId\",\"scopeTypeId\"]}]},\"AuditLog\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"modelId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"modelName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"action\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"actionTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"actionType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActionType\",\"relationFromFields\":[\"actionTypeId\"],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"timestamp\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"actorId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"actor\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserAsActor\",\"relationFromFields\":[\"actorId\"],\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"oldDetails\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"newDetails\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Holiday\",\"kind\":\"object\",\"name\":\"holiday\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToHoliday\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"ShiftingSchedule\",\"kind\":\"object\",\"name\":\"shiftSchedule\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToShiftingSchedule\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Position\",\"kind\":\"object\",\"name\":\"position\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToPosition\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"JobLevel\",\"kind\":\"object\",\"name\":\"jobLevel\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToJobLevel\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"type\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToType\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Status\",\"kind\":\"object\",\"name\":\"status\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToStatus\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Location\",\"kind\":\"object\",\"name\":\"location\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToLocation\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToUser\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"BasicInformation\",\"kind\":\"object\",\"name\":\"basicInformation\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToBasicInformation\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformation\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkInformation\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"GroupOfCompany\",\"kind\":\"object\",\"name\":\"groupOfCompany\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToGroupOfCompany\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"company\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToCompany\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Department\",\"kind\":\"object\",\"name\":\"department\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToDepartment\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"UserRole\",\"kind\":\"object\",\"name\":\"userRole\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToUserRole\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"RolePermission\",\"kind\":\"object\",\"name\":\"rolePermission\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToRolePermission\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Permission\",\"kind\":\"object\",\"name\":\"permission\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToPermission\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Role\",\"kind\":\"object\",\"name\":\"role\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToRole\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"WorkFlowTemplate\",\"kind\":\"object\",\"name\":\"workFlowTemplate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkFlowTemplate\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"ConfigCondition\",\"kind\":\"object\",\"name\":\"configCondition\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToConfigCondition\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Config\",\"kind\":\"object\",\"name\":\"config\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToConfig\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"WorkFlowStepTemplate\",\"kind\":\"object\",\"name\":\"workFlowStepTemplate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkFlowStepTemplate\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstance\",\"kind\":\"object\",\"name\":\"workFlowInstance\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkFlowInstance\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstanceStep\",\"kind\":\"object\",\"name\":\"workFlowInstanceStep\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkFlowInstanceStep\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Signature\",\"kind\":\"object\",\"name\":\"signature\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToSignature\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"WorkFlowTemplateScope\",\"kind\":\"object\",\"name\":\"workFlowTemplateScope\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkFlowTemplateScope\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"RequestItem\",\"kind\":\"object\",\"name\":\"requestItem\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToRequestItem\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"BudgetSnapshot\",\"kind\":\"object\",\"name\":\"budgetSnapshot\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToBudgetSnapshot\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"BudgetLedger\",\"kind\":\"object\",\"name\":\"budgetLedger\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToBudgetLedger\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Budget\",\"kind\":\"object\",\"name\":\"budget\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToBudget\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Request\",\"kind\":\"object\",\"name\":\"request\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToRequest\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Category\",\"kind\":\"object\",\"name\":\"category\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToCategory\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"parentId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"parent\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ParentLog\",\"relationFromFields\":[\"parentId\"],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ParentLog\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"WorkFlowTemplate\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isGlobal\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"version\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowTemplateScope\",\"kind\":\"object\",\"name\":\"scope\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkFlowTemplateToWorkFlowTemplateScope\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkFlowStepTemplate\",\"kind\":\"object\",\"name\":\"steps\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkFlowStepTemplateToWorkFlowTemplate\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstance\",\"kind\":\"object\",\"name\":\"workFlowInstance\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkFlowInstanceToWorkFlowTemplate\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Request\",\"kind\":\"object\",\"name\":\"request\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestToWorkFlowTemplate\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Budget\",\"kind\":\"object\",\"name\":\"budget\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToWorkFlowTemplate\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkFlowTemplate\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"WorkFlowTemplateScope\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"templateId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowTemplate\",\"kind\":\"object\",\"name\":\"template\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkFlowTemplateToWorkFlowTemplateScope\",\"relationFromFields\":[\"templateId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"scopeType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ScopeType\",\"relationFromFields\":[\"scopeTypeId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeReferenceId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"priority\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkFlowTemplateScope\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"WorkFlowStepTemplate\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"workflowTemplateId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowTemplate\",\"kind\":\"object\",\"name\":\"workflowTemplate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkFlowStepTemplateToWorkFlowTemplate\",\"relationFromFields\":[\"workflowTemplateId\"],\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"stepNumber\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"assignmentTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"assignmentType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"StepAssignmentType\",\"relationFromFields\":[\"assignmentTypeId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"assignedToUserId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"assignedToUser\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"StepAssignedToUser\",\"relationFromFields\":[\"assignedToUserId\"],\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"assignmentRules\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Config\",\"kind\":\"object\",\"name\":\"conditions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"StepConditions\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isParallel\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"requiredApprovals\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"slaHours\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"escalationRules\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"esignatureRequired\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"attachmentRequired\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstanceStep\",\"kind\":\"object\",\"name\":\"workFlowInstanceStep\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkFlowInstanceStepToWorkFlowStepTemplate\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkFlowStepTemplate\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"workflowTemplateId\",\"stepNumber\"]}]},\"WorkFlowInstance\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"templateId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowTemplate\",\"kind\":\"object\",\"name\":\"template\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkFlowInstanceToWorkFlowTemplate\",\"relationFromFields\":[\"templateId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"title\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"statusId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Status\",\"kind\":\"object\",\"name\":\"status\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"StatusToWorkFlowInstance\",\"relationFromFields\":[\"statusId\"],\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"currentStep\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"referenceTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"referenceType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ReferenceType\",\"relationFromFields\":[\"referenceTypeId\"],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"startedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"completedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstanceStep\",\"kind\":\"object\",\"name\":\"steps\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkFlowInstanceToWorkFlowInstanceStep\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Signature\",\"kind\":\"object\",\"name\":\"signatures\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SignatureToWorkFlowInstance\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"requestId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Request\",\"kind\":\"object\",\"name\":\"request\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestToWorkFlowInstance\",\"relationFromFields\":[\"requestId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"budgetId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Budget\",\"kind\":\"object\",\"name\":\"budget\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToWorkFlowInstance\",\"relationFromFields\":[\"budgetId\"],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkFlowInstance\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"WorkFlowInstanceStep\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"instanceId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstance\",\"kind\":\"object\",\"name\":\"instance\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkFlowInstanceToWorkFlowInstanceStep\",\"relationFromFields\":[\"instanceId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"stepTemplateId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowStepTemplate\",\"kind\":\"object\",\"name\":\"stepTemplate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkFlowInstanceStepToWorkFlowStepTemplate\",\"relationFromFields\":[\"stepTemplateId\"],\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"stepNumber\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"statusId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Status\",\"kind\":\"object\",\"name\":\"status\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"StatusToWorkFlowInstanceStep\",\"relationFromFields\":[\"statusId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"assignedToUserId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"assignedToUser\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"StepAssignedToUser\",\"relationFromFields\":[\"assignedToUserId\"],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"startedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"actionAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"comments\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isEditable\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"source\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isRequired\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Signature\",\"kind\":\"object\",\"name\":\"signature\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SignatureToWorkFlowInstanceStep\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkFlowInstanceStep\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Signature\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"instanceId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstance\",\"kind\":\"object\",\"name\":\"instance\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SignatureToWorkFlowInstance\",\"relationFromFields\":[\"instanceId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"stepId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstanceStep\",\"kind\":\"object\",\"name\":\"step\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SignatureToWorkFlowInstanceStep\",\"relationFromFields\":[\"stepId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"attachmentUrl\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"signatureHash\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"payload\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"ipAddress\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userAgent\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToSignature\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Type\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"modelNameType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"employmentType\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"EmploymentType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workSetupType\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkSetupType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"GroupOfCompany\",\"kind\":\"object\",\"name\":\"industryType\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"IndustryType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"companies\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Department\",\"kind\":\"object\",\"name\":\"departments\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DepartmentType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Position\",\"kind\":\"object\",\"name\":\"jobPositions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PositionType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"JobLevel\",\"kind\":\"object\",\"name\":\"jobLevels\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"JobCodeType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"actionType\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActionType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkFlowTemplateScope\",\"kind\":\"object\",\"name\":\"workFlowTemplateScope\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ScopeType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkFlowStepTemplate\",\"kind\":\"object\",\"name\":\"stepAssignmentType\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"StepAssignmentType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstance\",\"kind\":\"object\",\"name\":\"workFlowInstance\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ReferenceType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"BudgetLedger\",\"kind\":\"object\",\"name\":\"budgetMovementType\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetMovementType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"BudgetLedger\",\"kind\":\"object\",\"name\":\"sourceDocumentType\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SourceDocumentType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"name\",\"modelNameType\"]}]},\"Category\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"acronym\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"modelNameType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Budget\",\"kind\":\"object\",\"name\":\"budget\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToCategory\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"CapitalRecoveryFactor\",\"kind\":\"object\",\"name\":\"crfCategory\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CRFCategory\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToCategory\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"name\",\"acronym\",\"modelNameType\"]}]},\"ConfigCondition\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"configId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Config\",\"kind\":\"object\",\"name\":\"config\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Config\",\"relationFromFields\":[\"configId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"nodeType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"logicalOperator\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"field\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"operator\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"value\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"parentConditionId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"ConfigCondition\",\"kind\":\"object\",\"name\":\"parentCondition\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ConditionTree\",\"relationFromFields\":[\"parentConditionId\"],\"isUpdatedAt\":false},{\"type\":\"ConfigCondition\",\"kind\":\"object\",\"name\":\"subConditions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ConditionTree\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToConfigCondition\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Config\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"modelName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"group\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"codeKey\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"code\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"codeLabel\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"value\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"ConfigCondition\",\"kind\":\"object\",\"name\":\"conditions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Config\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"modelId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"RolePermission\",\"kind\":\"object\",\"name\":\"rolePermission\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PermissionScopeView\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"WorkFlowStepTemplate\",\"kind\":\"object\",\"name\":\"workFlowStepTemplate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"StepConditions\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"sortOrder\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToConfig\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"modelName\",\"modelId\",\"group\",\"codeKey\"]}]},\"Status\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"modelNameType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"EmploymentStatus\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstanceStep\",\"kind\":\"object\",\"name\":\"workFlowInstanceSteps\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"StatusToWorkFlowInstanceStep\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstance\",\"kind\":\"object\",\"name\":\"workFlowInstances\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"StatusToWorkFlowInstance\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Request\",\"kind\":\"object\",\"name\":\"request\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestToStatus\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"RequestItem\",\"kind\":\"object\",\"name\":\"requestItems\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestItemToStatus\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToStatus\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Budget\",\"kind\":\"object\",\"name\":\"budget\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetStatus\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"CapitalRecoveryFactor\",\"kind\":\"object\",\"name\":\"crfStatus\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CRFStatus\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"name\",\"modelNameType\"]}]},\"Request\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"title\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"requestNumber\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"requesterId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"requester\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestRequester\",\"relationFromFields\":[\"requesterId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"companyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"company\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyToRequest\",\"relationFromFields\":[\"companyId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"departmentId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Department\",\"kind\":\"object\",\"name\":\"department\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DepartmentToRequest\",\"relationFromFields\":[\"departmentId\"],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"dateNeeded\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"responsibilityCenterId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Department\",\"kind\":\"object\",\"name\":\"responsibilityCenter\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestResponsibilityCenter\",\"relationFromFields\":[\"responsibilityCenterId\"],\"isUpdatedAt\":false},{\"type\":\"CapitalRecoveryFactor\",\"kind\":\"object\",\"name\":\"requestedCRF\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CapitalRecoveryFactorToRequest\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"RequestItem\",\"kind\":\"object\",\"name\":\"requestItems\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestToRequestItem\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"quotationUrl\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"quotationAmount\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"currency\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"workflowTemplateId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowTemplate\",\"kind\":\"object\",\"name\":\"workflowTemplate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestToWorkFlowTemplate\",\"relationFromFields\":[\"workflowTemplateId\"],\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstance\",\"kind\":\"object\",\"name\":\"workFlowInstance\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestToWorkFlowInstance\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"approvedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"statusId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Status\",\"kind\":\"object\",\"name\":\"status\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestToStatus\",\"relationFromFields\":[\"statusId\"],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToRequest\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"CapitalRecoveryFactor\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"crfReferenceNo\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"statusId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Status\",\"kind\":\"object\",\"name\":\"status\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CRFStatus\",\"relationFromFields\":[\"statusId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"companyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"company\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CRFCompany\",\"relationFromFields\":[\"companyId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"departmentId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Department\",\"kind\":\"object\",\"name\":\"department\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CRFDepartment\",\"relationFromFields\":[\"departmentId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"categoryId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Category\",\"kind\":\"object\",\"name\":\"category\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CRFCategory\",\"relationFromFields\":[\"categoryId\"],\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"utilizedBudget\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"approvedAmount\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"requestedAmount\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"remainingAmount\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"projectedBudget\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"remark\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"requestId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Request\",\"kind\":\"object\",\"name\":\"request\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CapitalRecoveryFactorToRequest\",\"relationFromFields\":[\"requestId\"],\"isUpdatedAt\":false},{\"type\":\"Budget\",\"kind\":\"object\",\"name\":\"budget\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToCapitalRecoveryFactor\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Budget\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"crfId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"CapitalRecoveryFactor\",\"kind\":\"object\",\"name\":\"crf\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToCapitalRecoveryFactor\",\"relationFromFields\":[\"crfId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"fiscalYear\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"statusId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Status\",\"kind\":\"object\",\"name\":\"statusBudget\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetStatus\",\"relationFromFields\":[\"statusId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"budgetRefNo\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"companyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"company\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToCompany\",\"relationFromFields\":[\"companyId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"departmentId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Department\",\"kind\":\"object\",\"name\":\"department\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToDepartment\",\"relationFromFields\":[\"departmentId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"categoryId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Category\",\"kind\":\"object\",\"name\":\"category\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToCategory\",\"relationFromFields\":[\"categoryId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"requesterId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"requester\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetRequester\",\"relationFromFields\":[\"requesterId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"purpose\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"specs\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"quantity\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"remark\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"workflowTemplateId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkFlowTemplate\",\"kind\":\"object\",\"name\":\"workflowTemplate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToWorkFlowTemplate\",\"relationFromFields\":[\"workflowTemplateId\"],\"isUpdatedAt\":false},{\"type\":\"WorkFlowInstance\",\"kind\":\"object\",\"name\":\"workflowInstance\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToWorkFlowInstance\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"submittedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"approvedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"rejectedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"requestedAmount\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"approvedAmount\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"remainingAmount\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"currency\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"BudgetLedger\",\"kind\":\"object\",\"name\":\"budgetLedgers\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToBudgetLedger\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"BudgetSnapshot\",\"kind\":\"object\",\"name\":\"budgetSnapshot\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToBudgetSnapshot\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isFrozen\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"freezeReason\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"frozenAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToBudget\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"BudgetLedger\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"budgetId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Budget\",\"kind\":\"object\",\"name\":\"budget\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToBudgetLedger\",\"relationFromFields\":[\"budgetId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"typeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"type\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetMovementType\",\"relationFromFields\":[\"typeId\"],\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"amount\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"currency\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"sourceTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"sourceType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SourceDocumentType\",\"relationFromFields\":[\"sourceTypeId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"sourceId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"referenceNo\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"remark\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToBudgetLedger\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"BudgetSnapshot\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"budgetId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Budget\",\"kind\":\"object\",\"name\":\"budget\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BudgetToBudgetSnapshot\",\"relationFromFields\":[\"budgetId\"],\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"approvedAmount\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"committedAmount\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"actualAmount\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"availableAmount\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"currency\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToBudgetSnapshot\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"RequestItem\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"requestId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Request\",\"kind\":\"object\",\"name\":\"request\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestToRequestItem\",\"relationFromFields\":[\"requestId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"statusId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Status\",\"kind\":\"object\",\"name\":\"status\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RequestItemToStatus\",\"relationFromFields\":[\"statusId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"quantity\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"unitPrice\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"totalPrice\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"attachmentUrl\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToRequestItem\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]}}}}"); }