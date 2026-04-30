import { BasicInformation, WorkFlowTemplate } from "@/lib/generated/api/customHookAPI/graphql";
import {
  extractSearchFieldsFromColumns,
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "./shared";

type Model = BasicInformation;
const ModelName = "BasicInformation";
const ListModelName = `Manage ${ModelName} List`;
const ListDescription = `Manage your ${ModelName} effectively with our comprehensive management system. View, edit, and organize all your ${ModelName} seamlessly in one place.`;

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "firstName",
    header: "First Name",
    accessorKey: "firstName",
    meta: { searchable: true },
  },
  {
    id: "middleName",
    header: "Middle Name",
    accessorKey: "middleName",
    meta: { searchable: true },
  },
  {
    id: "lastName",
    header: "Last Name",
    accessorKey: "lastName",
    meta: { searchable: false },
  },
  {
    id: "gender",
    header: "Gender",
    accessorKey: "gender",
    meta: { searchable: false },
  },
];

// ✅ FIXED: Use string | number | boolean | undefined for default values
const previewColumnsCreate: PreviewColumn<Model>[] = [
  { key: "firstName", label: "First Name", default: "" },
  { key: "middleName", label: "Middle Name", default: "" },
  { key: "lastName", label: "Last Name", default: false },
  { key: "gender", label: "Gender", default: "1" },
  { key: "userId", label: "User Id", default: "1" },
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
  { key: "id", label: "ID", default: "" },
  ...previewColumnsCreate.map(col => ({ ...col })),
];
const exportColumns = [ 
   ...previewColumnsCreate.map(col => ({ id: col.key, label: col.label })),
  { id: 'createdAt', label: 'Created At' },
  { id: 'updatedAt', label: 'Updated At' },
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
        firstName: row.firstName,
        middleName: row.middleName,
        lastName: row.lastName,
        fullName: `${row.firstName} ${row.middleName ? row.middleName + " " : ""}${row.lastName}`,
        gender: row.gender,
        userId: row.userId,
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
        firstName: row.firstName,
        middleName: row.middleName,
        lastName: row.lastName,
        fullName: `${row.firstName} ${row.middleName ? row.middleName + " " : ""}${row.lastName}`,
        gender: row.gender,
        userId: row.userId,
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