import { Permission } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = Permission;
const ModelName = "Permission";
const ListModelName = "Manage Permission List";
const ListDescription = "Manage your Permission effectively with our comprehensive management system.";

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
    id: "module",
    header: "Module",
    accessorKey: "module",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "resource",
    header: "Resource",
    accessorKey: "resource",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "action",
    header: "Action",
    accessorKey: "action",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "displayOrder",
    header: "DisplayOrder",
    accessorKey: "displayOrder",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "isGlobal",
    header: "IsGlobal",
    accessorKey: "isGlobal",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "isAdmin",
    header: "IsAdmin",
    accessorKey: "isAdmin",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "globalLimit",
    header: "GlobalLimit",
    accessorKey: "globalLimit",
    meta: { searchable: false, type: "number" },
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
        default: null,
      },
      {
        key: "description",
        label: "Description",
        default: null,
      },
      {
        key: "module",
        label: "Module",
        default: null,
      },
      {
        key: "resource",
        label: "Resource",
        default: null,
      },
      {
        key: "action",
        label: "Action",
        default: null,
      },
      {
        key: "displayOrder",
        label: "DisplayOrder",
        default: null,
      },
      {
        key: "isGlobal",
        label: "IsGlobal",
        default: false,
      },
      {
        key: "isAdmin",
        label: "IsAdmin",
        default: false,
      },
      {
        key: "globalLimit",
        label: "GlobalLimit",
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
        key: "name",
        label: "Name",
        default: null,
      },
      {
        key: "description",
        label: "Description",
        default: null,
      },
      {
        key: "module",
        label: "Module",
        default: null,
      },
      {
        key: "resource",
        label: "Resource",
        default: null,
      },
      {
        key: "action",
        label: "Action",
        default: null,
      },
      {
        key: "displayOrder",
        label: "DisplayOrder",
        default: null,
      },
      {
        key: "isGlobal",
        label: "IsGlobal",
        default: false,
      },
      {
        key: "isAdmin",
        label: "IsAdmin",
        default: false,
      },
      {
        key: "globalLimit",
        label: "GlobalLimit",
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
      { id: "name", label: "Name" },
      { id: "description", label: "Description" },
      { id: "module", label: "Module" },
      { id: "resource", label: "Resource" },
      { id: "action", label: "Action" },
      { id: "displayOrder", label: "DisplayOrder" },
      { id: "isGlobal", label: "IsGlobal" },
      { id: "isAdmin", label: "IsAdmin" },
      { id: "globalLimit", label: "GlobalLimit" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const permission = {
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
            name: row.name ? String(row.name) : null,
            description: row.description ? String(row.description) : null,
            module: row.module ? String(row.module) : null,
            resource: row.resource ? String(row.resource) : null,
            action: row.action ? String(row.action) : null,
            displayOrder: row.displayOrder ? Number(row.displayOrder) : null,
            isGlobal: row.isGlobal != null ? Boolean(row.isGlobal) : null,
            isAdmin: row.isAdmin != null ? Boolean(row.isAdmin) : null,
            globalLimit: row.globalLimit ? Number(row.globalLimit) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            name: row.name ? String(row.name) : null,
            description: row.description ? String(row.description) : null,
            module: row.module ? String(row.module) : null,
            resource: row.resource ? String(row.resource) : null,
            action: row.action ? String(row.action) : null,
            displayOrder: row.displayOrder ? Number(row.displayOrder) : null,
            isGlobal: row.isGlobal != null ? Boolean(row.isGlobal) : null,
            isAdmin: row.isAdmin != null ? Boolean(row.isAdmin) : null,
            globalLimit: row.globalLimit ? Number(row.globalLimit) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;