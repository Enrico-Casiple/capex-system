import { WorkFlowTemplate } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = WorkFlowTemplate;
const ModelName = "WorkFlowTemplate";
const ListModelName = "Manage Work Flow Template List";
const ListDescription = "Manage your Work Flow Template effectively with our comprehensive management system.";

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
    id: "isGlobal",
    header: "IsGlobal",
    accessorKey: "isGlobal",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "version",
    header: "Version",
    accessorKey: "version",
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
        key: "isGlobal",
        label: "IsGlobal",
        default: false,
      },
      {
        key: "version",
        label: "Version",
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
        key: "isGlobal",
        label: "IsGlobal",
        default: false,
      },
      {
        key: "version",
        label: "Version",
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
      { id: "isGlobal", label: "IsGlobal" },
      { id: "version", label: "Version" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const workFlowTemplate = {
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
            isGlobal: row.isGlobal != null ? Boolean(row.isGlobal) : null,
            version: row.version ? Number(row.version) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            name: row.name ? String(row.name) : null,
            description: row.description ? String(row.description) : null,
            isGlobal: row.isGlobal != null ? Boolean(row.isGlobal) : null,
            version: row.version ? Number(row.version) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;