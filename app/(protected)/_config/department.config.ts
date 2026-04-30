import { Company, Department } from "@/lib/generated/api/customHookAPI/graphql";
import {
  extractSearchFieldsFromColumns,
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "./shared";
import { GroupOfCompany } from "@/generated/prisma/client/client";

type Model = Department;
const ModelName = "Department";
const ListModelName = `Manage ${ModelName} List`;
const ListDescription = `Manage your ${ModelName} effectively with our comprehensive management system. View, edit, and organize all your ${ModelName} seamlessly in one place.`;

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "companyId",
    header: "Company",
    accessorKey: "companyId",
    meta: { searchable: false },
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    meta: { searchable: true },
  },
  {
    id: "acronym",
    header: "Short Name",
    accessorKey: "acronym",
    meta: { searchable: true },
   
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    meta: { searchable: false },
  },

];

// ✅ FIXED: Use string | number | boolean | undefined for default values
const previewColumnsCreate: PreviewColumn<Model>[] = [
  { key: "name", label: "Name", default: "" },
  { key: "acronym", label: "Short Name", default: "" },
  { key: "description", label: "Description", default: false },
  { key: "companyId", label: "Company Id", default: "" },
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
  { key: "id", label: "ID", default: "" },
  ...previewColumnsCreate.map(col => ({ ...col })),
];
const exportColumns = [ 
   ...previewColumnsCreate.map(col => ({ id: col.key, label: col.label })),
  { id: 'createdAt', label: 'Created At' },
  { id: 'updatedAt', label: 'Updated At' },
  { id: "company.name", label: "Company", default: "" },

]

const defaultExportColumns = exportColumns.map(col => col.id)

export const basicInformation = {
  modelName: ModelName,
  listName: ListModelName,
  description: ListDescription,
  extraColumns: ExtraColumns,
  initialColumnVisibility: {
    id: false,
    updatedAt: false,
  },
  initialFilter: {},
  showActions: true,
  initialSearchField: extractSearchFieldsFromColumns(ExtraColumns),
  
  transformRowCreate: async (row: Model) => {
    try {
      return {
        name: row.name,
        acronym: row.acronym,
        description: row.description,
        companyId: row.companyId ? row.companyId : null,
      };
    } catch (error) {
      console.error("Error transforming row for create:", error);
      throw error;
    }
  },

  transformRowUpdate: async (row: Model) => {
    try {
      return {
        id: row.id,
        name: row.name,
        acronym: row.acronym,
        description: row.description,
        companyId: row.companyId ? row.companyId : null,
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
} satisfies ListConfigItem<Model>;