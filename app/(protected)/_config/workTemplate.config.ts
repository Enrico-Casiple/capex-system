import { WorkFlowTemplate } from "@/lib/generated/api/customHookAPI/graphql";
import {
  extractSearchFieldsFromColumns,
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "./shared";

const workFlowTemplateExtraColumns: SearchableColumnDef<WorkFlowTemplate>[] = [
  {
    id: "name",
    header: "Template Name",
    accessorKey: "name",
    meta: { searchable: true },
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    meta: { searchable: true },
  },
  {
    id: "isGlobal",
    header: "Global Template",
    accessorKey: "isGlobal",
    meta: { searchable: false },
  },
  {
    id: "version",
    header: "Version",
    accessorKey: "version",
    meta: { searchable: false },
  },
];

// ✅ FIXED: Use string | number | boolean | undefined for default values
const previewColumnsCreate: PreviewColumn<WorkFlowTemplate>[] = [
  { key: "name", label: "Template Name", default: "New Template" },
  { key: "description", label: "Description", default: "" },
  { key: "isGlobal", label: "Is Global", default: false },
  { key: "version", label: "Version", default: "1" },
];

const previewColumnsUpdate: PreviewColumn<WorkFlowTemplate>[] = [
  { key: "id", label: "ID", default: "" },
  ...previewColumnsCreate.map(col => ({ ...col })),
];
const exportColumns = [ 
   ...previewColumnsCreate.map(col => ({ id: col.key, label: col.label })),
  { id: 'createdAt', label: 'Created At' },
  { id: 'updatedAt', label: 'Updated At' },
]

const defaultExportColumns = exportColumns.map(col => col.id)

export const workFlowTemplate = {
  modelName: "WorkFlowTemplate",
  listName: "Manage Workflow Templates",
  description:
    "Manage your capital expenditure requests effectively with our comprehensive management system. View, edit, and organize all your capex requests seamlessly in one place.",
  extraColumns: workFlowTemplateExtraColumns,
  initialColumnVisibility: {
    id: false,
    updatedAt: false,
  },
  initialFilter: {},
  showActions: true,
  initialSearchField: extractSearchFieldsFromColumns(workFlowTemplateExtraColumns),
  
  transformRowCreate: async (row: WorkFlowTemplate) => {
    try {
      return {
        name: row.name,
        description: row.description,
        isGlobal: row.isGlobal,
        version: row.version,
      };
    } catch (error) {
      console.error("Error transforming row for create:", error);
      throw error;
    }
  },

  transformRowUpdate: async (row: WorkFlowTemplate) => {
    try {
      return {
        id: row.id,
        name: row.name,
        description: row.description,
        isGlobal: row.isGlobal,
        version: Number(row.version) + 1,
      };
    } catch (error) {
      console.error("Error transforming row for update:", error);
      throw error;
    }
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns: exportColumns,
  defaultExportColumns: defaultExportColumns,
} satisfies ListConfigItem<WorkFlowTemplate>;