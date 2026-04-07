/* eslint-disable */
import type { Prisma, User, BasicInformation, WorkInformation, GroupOfCompany, Company, Department, Position, JobLevel, Type, Status, Location, ShiftingSchedule, Holiday, Role, Permission, RolePermission, UserRole, AuditLog } from "../generated/prisma/client.js";
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
        RelationName: "basicInformations" | "auditLogs" | "actions" | "userRoles" | "userAssignedBy";
        ListRelations: "auditLogs" | "actions" | "userRoles" | "userAssignedBy";
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
        RelationName: "groupOfCompany" | "locations" | "departments" | "jobLevels" | "auditLogs" | "workInformations" | "scopeType";
        ListRelations: "departments" | "jobLevels" | "auditLogs" | "workInformations";
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
        RelationName: "company" | "auditLogs" | "workInformations" | "scopeType";
        ListRelations: "auditLogs" | "workInformations";
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
        RelationName: "employmentType" | "workSetupType" | "industryType" | "companies" | "departments" | "jobPositions" | "jobLevels" | "actionType" | "auditLogs" | "rolePermissions";
        ListRelations: "employmentType" | "workSetupType" | "industryType" | "companies" | "departments" | "jobPositions" | "jobLevels" | "actionType" | "auditLogs" | "rolePermissions";
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
            rolePermissions: {
                Shape: RolePermission[];
                Name: "RolePermission";
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
        RelationName: "workInformations" | "auditLogs";
        ListRelations: "workInformations" | "auditLogs";
        Relations: {
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
        RelationName: "scopeType" | "role" | "permission" | "auditLogs";
        ListRelations: "auditLogs";
        Relations: {
            scopeType: {
                Shape: Type | null;
                Name: "Type";
                Nullable: true;
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
        RelationName: "actionType" | "actor" | "holiday" | "shiftSchedule" | "position" | "jobLevel" | "type" | "status" | "location" | "user" | "basicInformation" | "workInformation" | "groupOfCompany" | "company" | "department" | "userRole" | "rolePermission" | "permission" | "role" | "parent" | "auditLogs";
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
}
export function getDatamodel(): PothosPrismaDatamodel { return JSON.parse("{\"datamodel\":{\"models\":{\"User\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"email\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"password\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"emailVerified\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"image\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"BasicInformation\",\"kind\":\"object\",\"name\":\"basicInformations\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BasicInformationToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isTwoFactorAuthEnabled\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"otpCode\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"actions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserAsActor\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"UserRole\",\"kind\":\"object\",\"name\":\"userRoles\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserToUserRole\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"UserRole\",\"kind\":\"object\",\"name\":\"userAssignedBy\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserAsRoleAssigner\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"BasicInformation\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"firstName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"middleName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"lastName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"suffix\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"fullName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"birthDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"gender\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"phoneNumber\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"address\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"city\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"province\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"country\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BasicInformationToUser\",\"relationFromFields\":[\"userId\"],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"reportingManager\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Manager\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Employee\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToBasicInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"WorkInformation\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"employeeNumber\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"employeeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"BasicInformation\",\"kind\":\"object\",\"name\":\"employee\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Employee\",\"relationFromFields\":[\"employeeId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"groupOfCompanyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"GroupOfCompany\",\"kind\":\"object\",\"name\":\"groupOfCompany\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"GroupOfCompanyToWorkInformation\",\"relationFromFields\":[\"groupOfCompanyId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"companyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"company\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyToWorkInformation\",\"relationFromFields\":[\"companyId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"departmentId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Department\",\"kind\":\"object\",\"name\":\"department\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DepartmentToWorkInformation\",\"relationFromFields\":[\"departmentId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"positionId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Position\",\"kind\":\"object\",\"name\":\"position\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PositionToWorkInformation\",\"relationFromFields\":[\"positionId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"jobLevelId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"JobLevel\",\"kind\":\"object\",\"name\":\"jobLevel\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"JobLevelToWorkInformation\",\"relationFromFields\":[\"jobLevelId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"employmentTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"employmentType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"EmploymentType\",\"relationFromFields\":[\"employmentTypeId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"employmentStatusId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Status\",\"kind\":\"object\",\"name\":\"employmentStatus\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"EmploymentStatus\",\"relationFromFields\":[\"employmentStatusId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"reportingManagerId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"BasicInformation\",\"kind\":\"object\",\"name\":\"reportingManager\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Manager\",\"relationFromFields\":[\"reportingManagerId\"],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"hireDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"regularizationDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"firstProbationEvaluationDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"finalProbationEvaluationDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"contractEndDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"seasonalEndDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"endDate\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"workLocationId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Location\",\"kind\":\"object\",\"name\":\"workLocation\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkLocation\",\"relationFromFields\":[\"workLocationId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"workSetupTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"workSetupType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkSetupType\",\"relationFromFields\":[\"workSetupTypeId\"],\"isUpdatedAt\":false},{\"type\":\"ShiftingSchedule\",\"kind\":\"object\",\"name\":\"shiftingSchedule\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ShiftingSchedule\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"GroupOfCompany\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"acronym\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"industryTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"industryType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"IndustryType\",\"relationFromFields\":[\"industryTypeId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"headquartersId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Location\",\"kind\":\"object\",\"name\":\"headquarters\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"GroupOfCompanyLocation\",\"relationFromFields\":[\"headquartersId\"],\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"companies\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyToGroupOfCompany\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToGroupOfCompany\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"GroupOfCompanyToWorkInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Company\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"acronym\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"groupOfCompanyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"GroupOfCompany\",\"kind\":\"object\",\"name\":\"groupOfCompany\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyToGroupOfCompany\",\"relationFromFields\":[\"groupOfCompanyId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"locationsid\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Location\",\"kind\":\"object\",\"name\":\"locations\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompaniesLocation\",\"relationFromFields\":[\"locationsid\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"conctactNumber\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"email\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Department\",\"kind\":\"object\",\"name\":\"departments\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyDepartments\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"logo\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"JobLevel\",\"kind\":\"object\",\"name\":\"jobLevels\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyJobLevels\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToCompany\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyToWorkInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"scopeType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyType\",\"relationFromFields\":[\"scopeTypeId\"],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Department\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"acronym\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"companyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"company\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyDepartments\",\"relationFromFields\":[\"companyId\"],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToDepartment\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DepartmentToWorkInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"scopeType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DepartmentType\",\"relationFromFields\":[\"scopeTypeId\"],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Position\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"acronym\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToPosition\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PositionToWorkInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"scopeType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PositionType\",\"relationFromFields\":[\"scopeTypeId\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"JobLevel\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"acronym\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"jobcodeTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"jobcodeType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"JobCodeType\",\"relationFromFields\":[\"jobcodeTypeId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"companyId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"company\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyJobLevels\",\"relationFromFields\":[\"companyId\"],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"JobLevelToWorkInformation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToJobLevel\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Type\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"modelNameType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"employmentType\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"EmploymentType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workSetupType\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkSetupType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"GroupOfCompany\",\"kind\":\"object\",\"name\":\"industryType\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"IndustryType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"companies\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompanyType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Department\",\"kind\":\"object\",\"name\":\"departments\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DepartmentType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Position\",\"kind\":\"object\",\"name\":\"jobPositions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PositionType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"JobLevel\",\"kind\":\"object\",\"name\":\"jobLevels\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"JobCodeType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"actionType\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActionType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"RolePermission\",\"kind\":\"object\",\"name\":\"rolePermissions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PermissionScopeType\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"name\",\"modelNameType\"]}]},\"Status\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"modelNameType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"EmploymentStatus\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToStatus\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Location\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformations\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"WorkLocation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"GroupOfCompany\",\"kind\":\"object\",\"name\":\"groupOfCompaniesLocation\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"GroupOfCompanyLocation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"companiesLocation\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CompaniesLocation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToLocation\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"ShiftingSchedule\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"startTime\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"endTime\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"lunchStart\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"lunchEnd\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"breakStart\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"breakEnd\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"workDays\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"restDays\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"workInformationId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformation\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ShiftingSchedule\",\"relationFromFields\":[\"workInformationId\"],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToShiftingSchedule\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Holiday\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"date\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isRecurring\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToHoliday\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Role\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"roleType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isDefault\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"parentRoleId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Role\",\"kind\":\"object\",\"name\":\"parentRole\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RoleHierarchy\",\"relationFromFields\":[\"parentRoleId\"],\"isUpdatedAt\":false},{\"type\":\"Role\",\"kind\":\"object\",\"name\":\"childRoles\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RoleHierarchy\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"RolePermission\",\"kind\":\"object\",\"name\":\"rolePermissions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RoleToRolePermission\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"UserRole\",\"kind\":\"object\",\"name\":\"userRoles\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RoleToUserRole\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToRole\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Permission\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"module\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"resource\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"action\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"displayOrder\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isGlobal\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isAdmin\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"globalLimit\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"RolePermission\",\"kind\":\"object\",\"name\":\"rolePermissions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PermissionToRolePermission\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToPermission\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":\"module_resource_action\",\"fields\":[\"module\",\"resource\",\"action\"]}]},\"RolePermission\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"roleId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"permissionId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"scopeType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PermissionScopeType\",\"relationFromFields\":[\"scopeTypeId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeValues\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"conditions\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Role\",\"kind\":\"object\",\"name\":\"role\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RoleToRolePermission\",\"relationFromFields\":[\"roleId\"],\"isUpdatedAt\":false},{\"type\":\"Permission\",\"kind\":\"object\",\"name\":\"permission\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PermissionToRolePermission\",\"relationFromFields\":[\"permissionId\"],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToRolePermission\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"roleId\",\"permissionId\",\"scopeTypeId\"]}]},\"UserRole\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"roleId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"scopeValues\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"conditionOverrides\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"assignedById\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"userAssignedBy\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserAsRoleAssigner\",\"relationFromFields\":[\"assignedById\"],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"expiresAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserToUserRole\",\"relationFromFields\":[\"userId\"],\"isUpdatedAt\":false},{\"type\":\"Role\",\"kind\":\"object\",\"name\":\"role\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RoleToUserRole\",\"relationFromFields\":[\"roleId\"],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToUserRole\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"roleId\",\"scopeTypeId\"]}]},\"AuditLog\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"modelId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"modelName\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"action\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"actionTypeId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"actionType\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActionType\",\"relationFromFields\":[\"actionTypeId\"],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"timestamp\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"actorId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"actor\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserAsActor\",\"relationFromFields\":[\"actorId\"],\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"oldDetails\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"newDetails\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Holiday\",\"kind\":\"object\",\"name\":\"holiday\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToHoliday\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"ShiftingSchedule\",\"kind\":\"object\",\"name\":\"shiftSchedule\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToShiftingSchedule\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Position\",\"kind\":\"object\",\"name\":\"position\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToPosition\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"JobLevel\",\"kind\":\"object\",\"name\":\"jobLevel\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToJobLevel\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Type\",\"kind\":\"object\",\"name\":\"type\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToType\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Status\",\"kind\":\"object\",\"name\":\"status\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToStatus\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Location\",\"kind\":\"object\",\"name\":\"location\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToLocation\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToUser\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"BasicInformation\",\"kind\":\"object\",\"name\":\"basicInformation\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToBasicInformation\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"WorkInformation\",\"kind\":\"object\",\"name\":\"workInformation\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToWorkInformation\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"GroupOfCompany\",\"kind\":\"object\",\"name\":\"groupOfCompany\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToGroupOfCompany\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Company\",\"kind\":\"object\",\"name\":\"company\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToCompany\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Department\",\"kind\":\"object\",\"name\":\"department\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToDepartment\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"UserRole\",\"kind\":\"object\",\"name\":\"userRole\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToUserRole\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"RolePermission\",\"kind\":\"object\",\"name\":\"rolePermission\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToRolePermission\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Permission\",\"kind\":\"object\",\"name\":\"permission\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToPermission\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"Role\",\"kind\":\"object\",\"name\":\"role\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AuditLogToRole\",\"relationFromFields\":[\"modelId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"parentId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"parent\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ParentLog\",\"relationFromFields\":[\"parentId\"],\"isUpdatedAt\":false},{\"type\":\"AuditLog\",\"kind\":\"object\",\"name\":\"auditLogs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ParentLog\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isActive\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueIndexes\":[]}}}}"); }