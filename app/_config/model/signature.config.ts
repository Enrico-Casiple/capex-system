import { Signature } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = Signature;
const ModelName = "Signature";
const ListModelName = "Manage Signature List";
const ListDescription = "Manage your Signature effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "instanceId",
    header: "InstanceId",
    accessorKey: "instanceId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "stepId",
    header: "StepId",
    accessorKey: "stepId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "attachmentUrl",
    header: "AttachmentUrl",
    accessorKey: "attachmentUrl",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "userId",
    header: "UserId",
    accessorKey: "userId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "signatureHash",
    header: "SignatureHash",
    accessorKey: "signatureHash",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "payload",
    header: "Payload",
    accessorKey: "payload",
    meta: { searchable: false, type: "object" },
  },
  {
    id: "ipAddress",
    header: "IpAddress",
    accessorKey: "ipAddress",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "userAgent",
    header: "UserAgent",
    accessorKey: "userAgent",
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
        key: "instanceId",
        label: "InstanceId",
        default: "",
      },
      {
        key: "stepId",
        label: "StepId",
        default: "",
      },
      {
        key: "attachmentUrl",
        label: "AttachmentUrl",
        default: "",
      },
      {
        key: "userId",
        label: "UserId",
        default: "",
      },
      {
        key: "signatureHash",
        label: "SignatureHash",
        default: "",
      },
      {
        key: "payload",
        label: "Payload",
        default: {} as Record<string, unknown>,
      },
      {
        key: "ipAddress",
        label: "IpAddress",
        default: "",
      },
      {
        key: "userAgent",
        label: "UserAgent",
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
        key: "instanceId",
        label: "InstanceId",
        default: "",
      },
      {
        key: "stepId",
        label: "StepId",
        default: "",
      },
      {
        key: "attachmentUrl",
        label: "AttachmentUrl",
        default: "",
      },
      {
        key: "userId",
        label: "UserId",
        default: "",
      },
      {
        key: "signatureHash",
        label: "SignatureHash",
        default: "",
      },
      {
        key: "payload",
        label: "Payload",
        default: {} as Record<string, unknown>,
      },
      {
        key: "ipAddress",
        label: "IpAddress",
        default: "",
      },
      {
        key: "userAgent",
        label: "UserAgent",
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
      { id: "instanceId", label: "InstanceId" },
      { id: "stepId", label: "StepId" },
      { id: "attachmentUrl", label: "AttachmentUrl" },
      { id: "userId", label: "UserId" },
      { id: "signatureHash", label: "SignatureHash" },
      { id: "payload", label: "Payload" },
      { id: "ipAddress", label: "IpAddress" },
      { id: "userAgent", label: "UserAgent" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const signature = {
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
            instanceId: row.instanceId,
            stepId: row.stepId,
            attachmentUrl: row.attachmentUrl,
            userId: row.userId,
            signatureHash: row.signatureHash,
            payload: row.payload,
            ipAddress: row.ipAddress,
            userAgent: row.userAgent,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            instanceId: row.instanceId,
            stepId: row.stepId,
            attachmentUrl: row.attachmentUrl,
            userId: row.userId,
            signatureHash: row.signatureHash,
            payload: row.payload,
            ipAddress: row.ipAddress,
            userAgent: row.userAgent,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;