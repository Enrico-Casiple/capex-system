import { GroupOfCompany } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = GroupOfCompany;
const ModelName = "GroupOfCompany";
const ListModelName = "Manage Group Of Company List";
const ListDescription = "Manage your Group Of Company effectively with our comprehensive management system.";

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
    id: "acronym",
    header: "Acronym",
    accessorKey: "acronym",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "industryTypeId",
    header: "IndustryTypeId",
    accessorKey: "industryTypeId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "headquartersId",
    header: "HeadquartersId",
    accessorKey: "headquartersId",
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
        default: null,
      },
      {
        key: "acronym",
        label: "Acronym",
        default: null,
      },
      {
        key: "description",
        label: "Description",
        default: null,
      },
      {
        key: "industryTypeId",
        label: "IndustryTypeId",
        default: null,
      },
      {
        key: "headquartersId",
        label: "HeadquartersId",
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
        key: "acronym",
        label: "Acronym",
        default: null,
      },
      {
        key: "description",
        label: "Description",
        default: null,
      },
      {
        key: "industryTypeId",
        label: "IndustryTypeId",
        default: null,
      },
      {
        key: "headquartersId",
        label: "HeadquartersId",
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
      { id: "acronym", label: "Acronym" },
      { id: "description", label: "Description" },
      { id: "industryTypeId", label: "IndustryTypeId" },
      { id: "headquartersId", label: "HeadquartersId" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const groupOfCompany = {
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
            acronym: row.acronym ? String(row.acronym) : null,
            description: row.description ? String(row.description) : null,
            industryTypeId: row.industryTypeId ? String(row.industryTypeId) : null,
            headquartersId: row.headquartersId ? String(row.headquartersId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            name: row.name ? String(row.name) : null,
            acronym: row.acronym ? String(row.acronym) : null,
            description: row.description ? String(row.description) : null,
            industryTypeId: row.industryTypeId ? String(row.industryTypeId) : null,
            headquartersId: row.headquartersId ? String(row.headquartersId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;