import { Config } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = Config;
const ModelName = "Config";
const ListModelName = "Manage Config List";
const ListDescription = "Manage your Config effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "modelName",
    header: "ModelName",
    accessorKey: "modelName",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "group",
    header: "Group",
    accessorKey: "group",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "codeKey",
    header: "CodeKey",
    accessorKey: "codeKey",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "code",
    header: "Code",
    accessorKey: "code",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "codeLabel",
    header: "CodeLabel",
    accessorKey: "codeLabel",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "value",
    header: "Value",
    accessorKey: "value",
    meta: { searchable: false, type: "object" },
  },
  {
    id: "modelId",
    header: "ModelId",
    accessorKey: "modelId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "sortOrder",
    header: "SortOrder",
    accessorKey: "sortOrder",
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
        key: "modelName",
        label: "ModelName",
        default: null,
      },
      {
        key: "group",
        label: "Group",
        default: null,
      },
      {
        key: "codeKey",
        label: "CodeKey",
        default: null,
      },
      {
        key: "code",
        label: "Code",
        default: null,
      },
      {
        key: "codeLabel",
        label: "CodeLabel",
        default: null,
      },
      {
        key: "value",
        label: "Value",
        default: null,
      },
      {
        key: "modelId",
        label: "ModelId",
        default: null,
      },
      {
        key: "sortOrder",
        label: "SortOrder",
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
        key: "modelName",
        label: "ModelName",
        default: null,
      },
      {
        key: "group",
        label: "Group",
        default: null,
      },
      {
        key: "codeKey",
        label: "CodeKey",
        default: null,
      },
      {
        key: "code",
        label: "Code",
        default: null,
      },
      {
        key: "codeLabel",
        label: "CodeLabel",
        default: null,
      },
      {
        key: "value",
        label: "Value",
        default: null,
      },
      {
        key: "modelId",
        label: "ModelId",
        default: null,
      },
      {
        key: "sortOrder",
        label: "SortOrder",
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
      { id: "modelName", label: "ModelName" },
      { id: "group", label: "Group" },
      { id: "codeKey", label: "CodeKey" },
      { id: "code", label: "Code" },
      { id: "codeLabel", label: "CodeLabel" },
      { id: "value", label: "Value" },
      { id: "modelId", label: "ModelId" },
      { id: "sortOrder", label: "SortOrder" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const config = {
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
            modelName: row.modelName ? String(row.modelName) : null,
            group: row.group ? String(row.group) : null,
            codeKey: row.codeKey ? String(row.codeKey) : null,
            code: row.code ? String(row.code) : null,
            codeLabel: row.codeLabel ? String(row.codeLabel) : null,
            value: row.value ? JSON.stringify(row.value) : null,
            modelId: row.modelId ? String(row.modelId) : null,
            sortOrder: row.sortOrder ? Number(row.sortOrder) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            modelName: row.modelName ? String(row.modelName) : null,
            group: row.group ? String(row.group) : null,
            codeKey: row.codeKey ? String(row.codeKey) : null,
            code: row.code ? String(row.code) : null,
            codeLabel: row.codeLabel ? String(row.codeLabel) : null,
            value: row.value ? JSON.stringify(row.value) : null,
            modelId: row.modelId ? String(row.modelId) : null,
            sortOrder: row.sortOrder ? Number(row.sortOrder) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;