import { User } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = User;
const ModelName = "User";
const ListModelName = "Manage User List";
const ListDescription = "Manage your User effectively with our comprehensive management system.";

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
    id: "email",
    header: "Email",
    accessorKey: "email",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "password",
    header: "Password",
    accessorKey: "password",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "userName",
    header: "UserName",
    accessorKey: "userName",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "emailVerified",
    header: "EmailVerified",
    accessorKey: "emailVerified",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "image",
    header: "Image",
    accessorKey: "image",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "isTwoFactorAuthEnabled",
    header: "IsTwoFactorAuthEnabled",
    accessorKey: "isTwoFactorAuthEnabled",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "otpCode",
    header: "OtpCode",
    accessorKey: "otpCode",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "emailOtpExpiresAt",
    header: "EmailOtpExpiresAt",
    accessorKey: "emailOtpExpiresAt",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "incrementalLoginAttempts",
    header: "IncrementalLoginAttempts",
    accessorKey: "incrementalLoginAttempts",
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
        default: "",
      },
      {
        key: "email",
        label: "Email",
        default: "",
      },
      {
        key: "password",
        label: "Password",
        default: "",
      },
      {
        key: "userName",
        label: "UserName",
        default: "",
      },
      {
        key: "emailVerified",
        label: "EmailVerified",
        default: "",
      },
      {
        key: "image",
        label: "Image",
        default: "",
      },
      {
        key: "isTwoFactorAuthEnabled",
        label: "IsTwoFactorAuthEnabled",
        default: false,
      },
      {
        key: "otpCode",
        label: "OtpCode",
        default: "",
      },
      {
        key: "emailOtpExpiresAt",
        label: "EmailOtpExpiresAt",
        default: "",
      },
      {
        key: "incrementalLoginAttempts",
        label: "IncrementalLoginAttempts",
        default: 0,
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
        key: "name",
        label: "Name",
        default: "",
      },
      {
        key: "email",
        label: "Email",
        default: "",
      },
      {
        key: "password",
        label: "Password",
        default: "",
      },
      {
        key: "userName",
        label: "UserName",
        default: "",
      },
      {
        key: "emailVerified",
        label: "EmailVerified",
        default: "",
      },
      {
        key: "image",
        label: "Image",
        default: "",
      },
      {
        key: "isTwoFactorAuthEnabled",
        label: "IsTwoFactorAuthEnabled",
        default: false,
      },
      {
        key: "otpCode",
        label: "OtpCode",
        default: "",
      },
      {
        key: "emailOtpExpiresAt",
        label: "EmailOtpExpiresAt",
        default: "",
      },
      {
        key: "incrementalLoginAttempts",
        label: "IncrementalLoginAttempts",
        default: 0,
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
      { id: "email", label: "Email" },
      { id: "password", label: "Password" },
      { id: "userName", label: "UserName" },
      { id: "emailVerified", label: "EmailVerified" },
      { id: "image", label: "Image" },
      { id: "isTwoFactorAuthEnabled", label: "IsTwoFactorAuthEnabled" },
      { id: "otpCode", label: "OtpCode" },
      { id: "emailOtpExpiresAt", label: "EmailOtpExpiresAt" },
      { id: "incrementalLoginAttempts", label: "IncrementalLoginAttempts" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const user = {
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
            email: row.email,
            password: row.password,
            userName: row.userName,
            emailVerified: row.emailVerified,
            image: row.image,
            isTwoFactorAuthEnabled: row.isTwoFactorAuthEnabled,
            otpCode: row.otpCode,
            emailOtpExpiresAt: row.emailOtpExpiresAt,
            incrementalLoginAttempts: row.incrementalLoginAttempts,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            name: row.name,
            email: row.email,
            password: row.password,
            userName: row.userName,
            emailVerified: row.emailVerified,
            image: row.image,
            isTwoFactorAuthEnabled: row.isTwoFactorAuthEnabled,
            otpCode: row.otpCode,
            emailOtpExpiresAt: row.emailOtpExpiresAt,
            incrementalLoginAttempts: row.incrementalLoginAttempts,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;