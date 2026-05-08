import { Company } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = Company;
const ModelName = "Company";
const ListModelName = "Manage Company List";
const ListDescription = "Manage your Company effectively with our comprehensive management system.";

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
    id: "groupOfCompanyId",
    header: "GroupOfCompanyId",
    accessorKey: "groupOfCompanyId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "locationsid",
    header: "Locationsid",
    accessorKey: "locationsid",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "conctactNumber",
    header: "ConctactNumber",
    accessorKey: "conctactNumber",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "logo",
    header: "Logo",
    accessorKey: "logo",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "scopeTypeId",
    header: "ScopeTypeId",
    accessorKey: "scopeTypeId",
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
        key: "groupOfCompanyId",
        label: "GroupOfCompanyId",
        default: null,
      },
      {
        key: "locationsid",
        label: "Locationsid",
        default: null,
      },
      {
        key: "conctactNumber",
        label: "ConctactNumber",
        default: null,
      },
      {
        key: "email",
        label: "Email",
        default: null,
      },
      {
        key: "logo",
        label: "Logo",
        default: null,
      },
      {
        key: "scopeTypeId",
        label: "ScopeTypeId",
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
        key: "groupOfCompanyId",
        label: "GroupOfCompanyId",
        default: null,
      },
      {
        key: "locationsid",
        label: "Locationsid",
        default: null,
      },
      {
        key: "conctactNumber",
        label: "ConctactNumber",
        default: null,
      },
      {
        key: "email",
        label: "Email",
        default: null,
      },
      {
        key: "logo",
        label: "Logo",
        default: null,
      },
      {
        key: "scopeTypeId",
        label: "ScopeTypeId",
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
      { id: "groupOfCompanyId", label: "GroupOfCompanyId" },
      { id: "locationsid", label: "Locationsid" },
      { id: "conctactNumber", label: "ConctactNumber" },
      { id: "email", label: "Email" },
      { id: "logo", label: "Logo" },
      { id: "scopeTypeId", label: "ScopeTypeId" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const company = {
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
            groupOfCompanyId: row.groupOfCompanyId ? String(row.groupOfCompanyId) : null,
            locationsid: row.locationsid ? String(row.locationsid) : null,
            conctactNumber: row.conctactNumber ? String(row.conctactNumber) : null,
            email: row.email ? String(row.email) : null,
            logo: row.logo ? String(row.logo) : null,
            scopeTypeId: row.scopeTypeId ? String(row.scopeTypeId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            name: row.name ? String(row.name) : null,
            acronym: row.acronym ? String(row.acronym) : null,
            description: row.description ? String(row.description) : null,
            groupOfCompanyId: row.groupOfCompanyId ? String(row.groupOfCompanyId) : null,
            locationsid: row.locationsid ? String(row.locationsid) : null,
            conctactNumber: row.conctactNumber ? String(row.conctactNumber) : null,
            email: row.email ? String(row.email) : null,
            logo: row.logo ? String(row.logo) : null,
            scopeTypeId: row.scopeTypeId ? String(row.scopeTypeId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;