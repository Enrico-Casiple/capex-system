import { AuditLog } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = AuditLog;
const ModelName = "AuditLog";
const ListModelName = "Manage Audit Log List";
const ListDescription = "Manage your Audit Log effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "modelId",
    header: "ModelId",
    accessorKey: "modelId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "modelName",
    header: "ModelName",
    accessorKey: "modelName",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "action",
    header: "Action",
    accessorKey: "action",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "actionTypeId",
    header: "ActionTypeId",
    accessorKey: "actionTypeId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "timestamp",
    header: "Timestamp",
    accessorKey: "timestamp",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "actorId",
    header: "ActorId",
    accessorKey: "actorId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "oldDetails",
    header: "OldDetails",
    accessorKey: "oldDetails",
    meta: { searchable: false, type: "object" },
  },
  {
    id: "newDetails",
    header: "NewDetails",
    accessorKey: "newDetails",
    meta: { searchable: false, type: "object" },
  },
  {
    id: "parentId",
    header: "ParentId",
    accessorKey: "parentId",
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
  },
  {
    id: "inventoryItemId",
    header: "InventoryItemId",
    accessorKey: "inventoryItemId",
    meta: { searchable: false, type: "string" },
  }
];

const previewColumnsCreate: PreviewColumn<Model>[] = [
      {
        key: "modelId",
        label: "ModelId",
        default: "",
      },
      {
        key: "modelName",
        label: "ModelName",
        default: "",
      },
      {
        key: "action",
        label: "Action",
        default: "",
      },
      {
        key: "actionTypeId",
        label: "ActionTypeId",
        default: "",
      },
      {
        key: "timestamp",
        label: "Timestamp",
        default: "",
      },
      {
        key: "actorId",
        label: "ActorId",
        default: "",
      },
      {
        key: "oldDetails",
        label: "OldDetails",
        default: {} as Record<string, unknown>,
      },
      {
        key: "newDetails",
        label: "NewDetails",
        default: {} as Record<string, unknown>,
      },
      {
        key: "parentId",
        label: "ParentId",
        default: "",
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      },
      {
        key: "inventoryItemId",
        label: "InventoryItemId",
        default: "",
      }
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
      { key: "id", label: "ID", default: "" },
      {
        key: "modelId",
        label: "ModelId",
        default: "",
      },
      {
        key: "modelName",
        label: "ModelName",
        default: "",
      },
      {
        key: "action",
        label: "Action",
        default: "",
      },
      {
        key: "actionTypeId",
        label: "ActionTypeId",
        default: "",
      },
      {
        key: "timestamp",
        label: "Timestamp",
        default: "",
      },
      {
        key: "actorId",
        label: "ActorId",
        default: "",
      },
      {
        key: "oldDetails",
        label: "OldDetails",
        default: {} as Record<string, unknown>,
      },
      {
        key: "newDetails",
        label: "NewDetails",
        default: {} as Record<string, unknown>,
      },
      {
        key: "parentId",
        label: "ParentId",
        default: "",
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      },
      {
        key: "inventoryItemId",
        label: "InventoryItemId",
        default: "",
      }
];

const exportColumns = [
      { id: "id", label: "ID" },
      { id: "modelId", label: "ModelId" },
      { id: "modelName", label: "ModelName" },
      { id: "action", label: "Action" },
      { id: "actionTypeId", label: "ActionTypeId" },
      { id: "timestamp", label: "Timestamp" },
      { id: "actorId", label: "ActorId" },
      { id: "oldDetails", label: "OldDetails" },
      { id: "newDetails", label: "NewDetails" },
      { id: "parentId", label: "ParentId" },
      { id: "isActive", label: "IsActive" },
      { id: "inventoryItemId", label: "InventoryItemId" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const auditLog = {
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
            modelId: row.modelId,
            modelName: row.modelName,
            action: row.action,
            actionTypeId: row.actionTypeId,
            timestamp: row.timestamp,
            actorId: row.actorId,
            oldDetails: row.oldDetails,
            newDetails: row.newDetails,
            parentId: row.parentId,
            isActive: row.isActive,
            inventoryItemId: row.inventoryItemId,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            modelId: row.modelId,
            modelName: row.modelName,
            action: row.action,
            actionTypeId: row.actionTypeId,
            timestamp: row.timestamp,
            actorId: row.actorId,
            oldDetails: row.oldDetails,
            newDetails: row.newDetails,
            parentId: row.parentId,
            isActive: row.isActive,
            inventoryItemId: row.inventoryItemId,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;