import { RolePermission } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = RolePermission;
const ModelName = "RolePermission";
const ListModelName = "Manage Role Permission List";
const ListDescription = "Manage your Role Permission effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "roleId",
    header: "RoleId",
    accessorKey: "roleId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "permissionId",
    header: "PermissionId",
    accessorKey: "permissionId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "scopeValues",
    header: "ScopeValues",
    accessorKey: "scopeValues",
    meta: { searchable: false, type: "string" },
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
        key: "roleId",
        label: "RoleId",
        default: null,
      },
      {
        key: "permissionId",
        label: "PermissionId",
        default: null,
      },
      {
        key: "scopeValues",
        label: "ScopeValues",
        default: null,
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      }
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
      { key: "id", label: "ID", default: null },
      {
        key: "roleId",
        label: "RoleId",
        default: null,
      },
      {
        key: "permissionId",
        label: "PermissionId",
        default: null,
      },
      {
        key: "scopeValues",
        label: "ScopeValues",
        default: null,
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      }
];

const exportColumns = [
      { id: "id", label: "ID" },
      { id: "roleId", label: "RoleId" },
      { id: "permissionId", label: "PermissionId" },
      { id: "scopeValues", label: "ScopeValues" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const rolePermission = {
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
            roleId: row.roleId ? String(row.roleId) : null,
            permissionId: row.permissionId ? String(row.permissionId) : null,
            scopeValues: row.scopeValues ? String(row.scopeValues) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            roleId: row.roleId ? String(row.roleId) : null,
            permissionId: row.permissionId ? String(row.permissionId) : null,
            scopeValues: row.scopeValues ? String(row.scopeValues) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;