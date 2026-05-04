import { Holiday } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = Holiday;
const ModelName = "Holiday";
const ListModelName = "Manage Holiday List";
const ListDescription = "Manage your Holiday effectively with our comprehensive management system.";

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
    id: "date",
    header: "Date",
    accessorKey: "date",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "isRecurring",
    header: "IsRecurring",
    accessorKey: "isRecurring",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    meta: { searchable: false, type: "string" },
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
        key: "date",
        label: "Date",
        default: "",
      },
      {
        key: "isRecurring",
        label: "IsRecurring",
        default: false,
      },
      {
        key: "description",
        label: "Description",
        default: "",
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
        key: "date",
        label: "Date",
        default: "",
      },
      {
        key: "isRecurring",
        label: "IsRecurring",
        default: false,
      },
      {
        key: "description",
        label: "Description",
        default: "",
      }
];

const exportColumns = [
      { id: "id", label: "ID" },
      { id: "name", label: "Name" },
      { id: "date", label: "Date" },
      { id: "isRecurring", label: "IsRecurring" },
      { id: "description", label: "Description" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const holiday = {
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
            date: row.date,
            isRecurring: row.isRecurring,
            description: row.description,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            name: row.name,
            date: row.date,
            isRecurring: row.isRecurring,
            description: row.description,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;