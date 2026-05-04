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
        default: "",
      },
      {
        key: "middleName",
        label: "MiddleName",
        default: "",
      },
      {
        key: "lastName",
        label: "LastName",
        default: "",
      },
      {
        key: "suffix",
        label: "Suffix",
        default: "",
      },
      {
        key: "fullName",
        label: "FullName",
        default: "",
      },
      {
        key: "birthDate",
        label: "BirthDate",
        default: "",
      },
      {
        key: "gender",
        label: "Gender",
        default: "",
      },
      {
        key: "phoneNumber",
        label: "PhoneNumber",
        default: "",
      },
      {
        key: "address",
        label: "Address",
        default: "",
      },
      {
        key: "city",
        label: "City",
        default: "",
      },
      {
        key: "province",
        label: "Province",
        default: "",
      },
      {
        key: "country",
        label: "Country",
        default: "",
      },
      {
        key: "userId",
        label: "UserId",
        default: "",
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      }
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
      { key: "id", label: "ID", default: "" },
      {
        key: "firstName",
        label: "FirstName",
        default: "",
      },
      {
        key: "middleName",
        label: "MiddleName",
        default: "",
      },
      {
        key: "lastName",
        label: "LastName",
        default: "",
      },
      {
        key: "suffix",
        label: "Suffix",
        default: "",
      },
      {
        key: "fullName",
        label: "FullName",
        default: "",
      },
      {
        key: "birthDate",
        label: "BirthDate",
        default: "",
      },
      {
        key: "gender",
        label: "Gender",
        default: "",
      },
      {
        key: "phoneNumber",
        label: "PhoneNumber",
        default: "",
      },
      {
        key: "address",
        label: "Address",
        default: "",
      },
      {
        key: "city",
        label: "City",
        default: "",
      },
      {
        key: "province",
        label: "Province",
        default: "",
      },
      {
        key: "country",
        label: "Country",
        default: "",
      },
      {
        key: "userId",
        label: "UserId",
        default: "",
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
            firstName: row.firstName,
            middleName: row.middleName,
            lastName: row.lastName,
            suffix: row.suffix,
            fullName: row.fullName,
            birthDate: row.birthDate,
            gender: row.gender,
            phoneNumber: row.phoneNumber,
            address: row.address,
            city: row.city,
            province: row.province,
            country: row.country,
            userId: row.userId,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            firstName: row.firstName,
            middleName: row.middleName,
            lastName: row.lastName,
            suffix: row.suffix,
            fullName: row.fullName,
            birthDate: row.birthDate,
            gender: row.gender,
            phoneNumber: row.phoneNumber,
            address: row.address,
            city: row.city,
            province: row.province,
            country: row.country,
            userId: row.userId,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;