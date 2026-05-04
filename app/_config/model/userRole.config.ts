import { UserRole } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = UserRole;
const ModelName = "UserRole";
const ListModelName = "Manage User Role List";
const ListDescription = "Manage your User Role effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "userId",
    header: "UserId",
    accessorKey: "userId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "roleId",
    header: "RoleId",
    accessorKey: "roleId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "scopeTypeId",
    header: "ScopeTypeId",
    accessorKey: "scopeTypeId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "scopeValues",
    header: "ScopeValues",
    accessorKey: "scopeValues",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "conditionOverrides",
    header: "ConditionOverrides",
    accessorKey: "conditionOverrides",
    meta: { searchable: false, type: "object" },
  },
  {
    id: "assignedById",
    header: "AssignedById",
    accessorKey: "assignedById",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "expiresAt",
    header: "ExpiresAt",
    accessorKey: "expiresAt",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "isActive",
    header: "IsActive",
    accessorKey: "isActive",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "createdAt",
    header: "CreatedAt",
    accessorKey: "createdAt",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "updatedAt",
    header: "UpdatedAt",
    accessorKey: "updatedAt",
    meta: { searchable: false, type: "date" },
  }
];

const previewColumnsCreate: PreviewColumn<Model>[] = [
      {
        key: "userId",
        label: "UserId",
        default: "",
      },
      {
        key: "roleId",
        label: "RoleId",
        default: "",
      },
      {
        key: "scopeTypeId",
        label: "ScopeTypeId",
        default: "",
      },
      {
        key: "scopeValues",
        label: "ScopeValues",
        default: "",
      },
      {
        key: "conditionOverrides",
        label: "ConditionOverrides",
        default: {} as Record<string, unknown>,
      },
      {
        key: "assignedById",
        label: "AssignedById",
        default: "",
      },
      {
        key: "expiresAt",
        label: "ExpiresAt",
        default: "",
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      }
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
      { key: "id", label: "ID", default: "" },
      {
        key: "userId",
        label: "UserId",
        default: "",
      },
      {
        key: "roleId",
        label: "RoleId",
        default: "",
      },
      {
        key: "scopeTypeId",
        label: "ScopeTypeId",
        default: "",
      },
      {
        key: "scopeValues",
        label: "ScopeValues",
        default: "",
      },
      {
        key: "conditionOverrides",
        label: "ConditionOverrides",
        default: {} as Record<string, unknown>,
      },
      {
        key: "assignedById",
        label: "AssignedById",
        default: "",
      },
      {
        key: "expiresAt",
        label: "ExpiresAt",
        default: "",
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      }
];

const exportColumns = [
      { id: "id", label: "ID" },
      { id: "userId", label: "UserId" },
      { id: "roleId", label: "RoleId" },
      { id: "scopeTypeId", label: "ScopeTypeId" },
      { id: "scopeValues", label: "ScopeValues" },
      { id: "conditionOverrides", label: "ConditionOverrides" },
      { id: "assignedById", label: "AssignedById" },
      { id: "expiresAt", label: "ExpiresAt" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const userRole = {
  modelName: ModelName,
  listName: ListModelName,
  description: ListDescription,
  extraColumns: ExtraColumns,
  initialColumnVisibility: {
    id: false,
    createdAt: false,
    updatedAt: false,
  },
  initialFilter: {},
  showActions: true,
  initialSearchField: [],

  transformRowCreate: async (row: Model) => {
    return {
            userId: row.userId,
            roleId: row.roleId,
            scopeTypeId: row.scopeTypeId,
            scopeValues: row.scopeValues,
            conditionOverrides: row.conditionOverrides,
            assignedById: row.assignedById,
            expiresAt: row.expiresAt,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            userId: row.userId,
            roleId: row.roleId,
            scopeTypeId: row.scopeTypeId,
            scopeValues: row.scopeValues,
            conditionOverrides: row.conditionOverrides,
            assignedById: row.assignedById,
            expiresAt: row.expiresAt,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;