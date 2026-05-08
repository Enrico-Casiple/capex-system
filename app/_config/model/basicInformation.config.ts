import { BasicInformation } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = BasicInformation;
const ModelName = "BasicInformation";
const ListModelName = "Manage Basic Information List";
const ListDescription = "Manage your Basic Information effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "firstName",
    header: "FirstName",
    accessorKey: "firstName",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "middleName",
    header: "MiddleName",
    accessorKey: "middleName",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "lastName",
    header: "LastName",
    accessorKey: "lastName",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "suffix",
    header: "Suffix",
    accessorKey: "suffix",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "fullName",
    header: "FullName",
    accessorKey: "fullName",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "birthDate",
    header: "BirthDate",
    accessorKey: "birthDate",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "gender",
    header: "Gender",
    accessorKey: "gender",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "phoneNumber",
    header: "PhoneNumber",
    accessorKey: "phoneNumber",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "address",
    header: "Address",
    accessorKey: "address",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "city",
    header: "City",
    accessorKey: "city",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "province",
    header: "Province",
    accessorKey: "province",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "country",
    header: "Country",
    accessorKey: "country",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "userId",
    header: "UserId",
    accessorKey: "userId",
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
        key: "firstName",
        label: "FirstName",
        default: null,
      },
      {
        key: "middleName",
        label: "MiddleName",
        default: null,
      },
      {
        key: "lastName",
        label: "LastName",
        default: null,
      },
      {
        key: "suffix",
        label: "Suffix",
        default: null,
      },
      {
        key: "fullName",
        label: "FullName",
        default: null,
      },
      {
        key: "birthDate",
        label: "BirthDate",
        default: null,
      },
      {
        key: "gender",
        label: "Gender",
        default: null,
      },
      {
        key: "phoneNumber",
        label: "PhoneNumber",
        default: null,
      },
      {
        key: "address",
        label: "Address",
        default: null,
      },
      {
        key: "city",
        label: "City",
        default: null,
      },
      {
        key: "province",
        label: "Province",
        default: null,
      },
      {
        key: "country",
        label: "Country",
        default: null,
      },
      {
        key: "userId",
        label: "UserId",
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
        key: "firstName",
        label: "FirstName",
        default: null,
      },
      {
        key: "middleName",
        label: "MiddleName",
        default: null,
      },
      {
        key: "lastName",
        label: "LastName",
        default: null,
      },
      {
        key: "suffix",
        label: "Suffix",
        default: null,
      },
      {
        key: "fullName",
        label: "FullName",
        default: null,
      },
      {
        key: "birthDate",
        label: "BirthDate",
        default: null,
      },
      {
        key: "gender",
        label: "Gender",
        default: null,
      },
      {
        key: "phoneNumber",
        label: "PhoneNumber",
        default: null,
      },
      {
        key: "address",
        label: "Address",
        default: null,
      },
      {
        key: "city",
        label: "City",
        default: null,
      },
      {
        key: "province",
        label: "Province",
        default: null,
      },
      {
        key: "country",
        label: "Country",
        default: null,
      },
      {
        key: "userId",
        label: "UserId",
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
      { id: "firstName", label: "FirstName" },
      { id: "middleName", label: "MiddleName" },
      { id: "lastName", label: "LastName" },
      { id: "suffix", label: "Suffix" },
      { id: "fullName", label: "FullName" },
      { id: "birthDate", label: "BirthDate" },
      { id: "gender", label: "Gender" },
      { id: "phoneNumber", label: "PhoneNumber" },
      { id: "address", label: "Address" },
      { id: "city", label: "City" },
      { id: "province", label: "Province" },
      { id: "country", label: "Country" },
      { id: "userId", label: "UserId" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const basicInformation = {
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
            firstName: row.firstName ? String(row.firstName) : null,
            middleName: row.middleName ? String(row.middleName) : null,
            lastName: row.lastName ? String(row.lastName) : null,
            suffix: row.suffix ? String(row.suffix) : null,
            fullName: row.fullName ? String(row.fullName) : null,
            birthDate: row.birthDate ? new Date(row.birthDate) : null,
            gender: row.gender ? String(row.gender) : null,
            phoneNumber: row.phoneNumber ? String(row.phoneNumber) : null,
            address: row.address ? String(row.address) : null,
            city: row.city ? String(row.city) : null,
            province: row.province ? String(row.province) : null,
            country: row.country ? String(row.country) : null,
            userId: row.userId ? String(row.userId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            firstName: row.firstName ? String(row.firstName) : null,
            middleName: row.middleName ? String(row.middleName) : null,
            lastName: row.lastName ? String(row.lastName) : null,
            suffix: row.suffix ? String(row.suffix) : null,
            fullName: row.fullName ? String(row.fullName) : null,
            birthDate: row.birthDate ? new Date(row.birthDate) : null,
            gender: row.gender ? String(row.gender) : null,
            phoneNumber: row.phoneNumber ? String(row.phoneNumber) : null,
            address: row.address ? String(row.address) : null,
            city: row.city ? String(row.city) : null,
            province: row.province ? String(row.province) : null,
            country: row.country ? String(row.country) : null,
            userId: row.userId ? String(row.userId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;