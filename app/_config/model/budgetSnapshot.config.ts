import { BudgetSnapshot } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = BudgetSnapshot;
const ModelName = "BudgetSnapshot";
const ListModelName = "Manage Budget Snapshot List";
const ListDescription = "Manage your Budget Snapshot effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "budgetId",
    header: "BudgetId",
    accessorKey: "budgetId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "approvedAmount",
    header: "ApprovedAmount",
    accessorKey: "approvedAmount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "committedAmount",
    header: "CommittedAmount",
    accessorKey: "committedAmount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "actualAmount",
    header: "ActualAmount",
    accessorKey: "actualAmount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "availableAmount",
    header: "AvailableAmount",
    accessorKey: "availableAmount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "currency",
    header: "Currency",
    accessorKey: "currency",
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
        key: "budgetId",
        label: "BudgetId",
        default: null,
      },
      {
        key: "approvedAmount",
        label: "ApprovedAmount",
        default: null,
      },
      {
        key: "committedAmount",
        label: "CommittedAmount",
        default: null,
      },
      {
        key: "actualAmount",
        label: "ActualAmount",
        default: null,
      },
      {
        key: "availableAmount",
        label: "AvailableAmount",
        default: null,
      },
      {
        key: "currency",
        label: "Currency",
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
        key: "budgetId",
        label: "BudgetId",
        default: null,
      },
      {
        key: "approvedAmount",
        label: "ApprovedAmount",
        default: null,
      },
      {
        key: "committedAmount",
        label: "CommittedAmount",
        default: null,
      },
      {
        key: "actualAmount",
        label: "ActualAmount",
        default: null,
      },
      {
        key: "availableAmount",
        label: "AvailableAmount",
        default: null,
      },
      {
        key: "currency",
        label: "Currency",
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
      { id: "budgetId", label: "BudgetId" },
      { id: "approvedAmount", label: "ApprovedAmount" },
      { id: "committedAmount", label: "CommittedAmount" },
      { id: "actualAmount", label: "ActualAmount" },
      { id: "availableAmount", label: "AvailableAmount" },
      { id: "currency", label: "Currency" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const budgetSnapshot = {
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
            budgetId: row.budgetId ? String(row.budgetId) : null,
            approvedAmount: row.approvedAmount ? Number(row.approvedAmount) : null,
            committedAmount: row.committedAmount ? Number(row.committedAmount) : null,
            actualAmount: row.actualAmount ? Number(row.actualAmount) : null,
            availableAmount: row.availableAmount ? Number(row.availableAmount) : null,
            currency: row.currency ? String(row.currency) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            budgetId: row.budgetId ? String(row.budgetId) : null,
            approvedAmount: row.approvedAmount ? Number(row.approvedAmount) : null,
            committedAmount: row.committedAmount ? Number(row.committedAmount) : null,
            actualAmount: row.actualAmount ? Number(row.actualAmount) : null,
            availableAmount: row.availableAmount ? Number(row.availableAmount) : null,
            currency: row.currency ? String(row.currency) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;