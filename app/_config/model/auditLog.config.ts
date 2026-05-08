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
        default: null,
      },
      {
        key: "modelName",
        label: "ModelName",
        default: null,
      },
      {
        key: "action",
        label: "Action",
        default: null,
      },
      {
        key: "actionTypeId",
        label: "ActionTypeId",
        default: null,
      },
      {
        key: "timestamp",
        label: "Timestamp",
        default: null,
      },
      {
        key: "actorId",
        label: "ActorId",
        default: null,
      },
      {
        key: "oldDetails",
        label: "OldDetails",
        default: null,
      },
      {
        key: "newDetails",
        label: "NewDetails",
        default: null,
      },
      {
        key: "parentId",
        label: "ParentId",
        default: null,
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      },
      {
        key: "inventoryItemId",
        label: "InventoryItemId",
        default: null,
      }
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
      { key: "id", label: "ID", default: null },
      {
        key: "modelId",
        label: "ModelId",
        default: null,
      },
      {
        key: "modelName",
        label: "ModelName",
        default: null,
      },
      {
        key: "action",
        label: "Action",
        default: null,
      },
      {
        key: "actionTypeId",
        label: "ActionTypeId",
        default: null,
      },
      {
        key: "timestamp",
        label: "Timestamp",
        default: null,
      },
      {
        key: "actorId",
        label: "ActorId",
        default: null,
      },
      {
        key: "oldDetails",
        label: "OldDetails",
        default: null,
      },
      {
        key: "newDetails",
        label: "NewDetails",
        default: null,
      },
      {
        key: "parentId",
        label: "ParentId",
        default: null,
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      },
      {
        key: "inventoryItemId",
        label: "InventoryItemId",
        default: null,
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
            modelId: row.modelId ? String(row.modelId) : null,
            modelName: row.modelName ? String(row.modelName) : null,
            action: row.action ? String(row.action) : null,
            actionTypeId: row.actionTypeId ? String(row.actionTypeId) : null,
            timestamp: row.timestamp ? new Date(row.timestamp) : null,
            actorId: row.actorId ? String(row.actorId) : null,
            oldDetails: row.oldDetails ? JSON.stringify(row.oldDetails) : null,
            newDetails: row.newDetails ? JSON.stringify(row.newDetails) : null,
            parentId: row.parentId ? String(row.parentId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
            inventoryItemId: row.inventoryItemId ? String(row.inventoryItemId) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            modelId: row.modelId ? String(row.modelId) : null,
            modelName: row.modelName ? String(row.modelName) : null,
            action: row.action ? String(row.action) : null,
            actionTypeId: row.actionTypeId ? String(row.actionTypeId) : null,
            timestamp: row.timestamp ? new Date(row.timestamp) : null,
            actorId: row.actorId ? String(row.actorId) : null,
            oldDetails: row.oldDetails ? JSON.stringify(row.oldDetails) : null,
            newDetails: row.newDetails ? JSON.stringify(row.newDetails) : null,
            parentId: row.parentId ? String(row.parentId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
            inventoryItemId: row.inventoryItemId ? String(row.inventoryItemId) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;