import { Role } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = Role;
const ModelName = "Role";
const ListModelName = "Manage Role List";
const ListDescription = "Manage your Role effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "roleType",
    header: "RoleType",
    accessorKey: "roleType",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "isDefault",
    header: "IsDefault",
    accessorKey: "isDefault",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "parentRoleId",
    header: "ParentRoleId",
    accessorKey: "parentRoleId",
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
        key: "name",
        label: "Name",
        default: "",
      },
      {
        key: "description",
        label: "Description",
        default: "",
      },
      {
        key: "roleType",
        label: "RoleType",
        default: "",
      },
      {
        key: "isDefault",
        label: "IsDefault",
        default: false,
      },
      {
        key: "parentRoleId",
        label: "ParentRoleId",
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
        key: "name",
        label: "Name",
        default: "",
      },
      {
        key: "description",
        label: "Description",
        default: "",
      },
      {
        key: "roleType",
        label: "RoleType",
        default: "",
      },
      {
        key: "isDefault",
        label: "IsDefault",
        default: false,
      },
      {
        key: "parentRoleId",
        label: "ParentRoleId",
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
      { id: "name", label: "Name" },
      { id: "description", label: "Description" },
      { id: "roleType", label: "RoleType" },
      { id: "isDefault", label: "IsDefault" },
      { id: "parentRoleId", label: "ParentRoleId" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const role = {
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
            name: row.name,
            description: row.description,
            roleType: row.roleType,
            isDefault: row.isDefault,
            parentRoleId: row.parentRoleId,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            name: row.name,
            description: row.description,
            roleType: row.roleType,
            isDefault: row.isDefault,
            parentRoleId: row.parentRoleId,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;