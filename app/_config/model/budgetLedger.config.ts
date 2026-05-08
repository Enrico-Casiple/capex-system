import { BudgetLedger } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = BudgetLedger;
const ModelName = "BudgetLedger";
const ListModelName = "Manage Budget Ledger List";
const ListDescription = "Manage your Budget Ledger effectively with our comprehensive management system.";

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
    id: "typeId",
    header: "TypeId",
    accessorKey: "typeId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "amount",
    header: "Amount",
    accessorKey: "amount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "currency",
    header: "Currency",
    accessorKey: "currency",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "sourceTypeId",
    header: "SourceTypeId",
    accessorKey: "sourceTypeId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "sourceId",
    header: "SourceId",
    accessorKey: "sourceId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "referenceNo",
    header: "ReferenceNo",
    accessorKey: "referenceNo",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "remark",
    header: "Remark",
    accessorKey: "remark",
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
        key: "typeId",
        label: "TypeId",
        default: null,
      },
      {
        key: "amount",
        label: "Amount",
        default: null,
      },
      {
        key: "currency",
        label: "Currency",
        default: null,
      },
      {
        key: "sourceTypeId",
        label: "SourceTypeId",
        default: null,
      },
      {
        key: "sourceId",
        label: "SourceId",
        default: null,
      },
      {
        key: "referenceNo",
        label: "ReferenceNo",
        default: null,
      },
      {
        key: "remark",
        label: "Remark",
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
        key: "typeId",
        label: "TypeId",
        default: null,
      },
      {
        key: "amount",
        label: "Amount",
        default: null,
      },
      {
        key: "currency",
        label: "Currency",
        default: null,
      },
      {
        key: "sourceTypeId",
        label: "SourceTypeId",
        default: null,
      },
      {
        key: "sourceId",
        label: "SourceId",
        default: null,
      },
      {
        key: "referenceNo",
        label: "ReferenceNo",
        default: null,
      },
      {
        key: "remark",
        label: "Remark",
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
      { id: "typeId", label: "TypeId" },
      { id: "amount", label: "Amount" },
      { id: "currency", label: "Currency" },
      { id: "sourceTypeId", label: "SourceTypeId" },
      { id: "sourceId", label: "SourceId" },
      { id: "referenceNo", label: "ReferenceNo" },
      { id: "remark", label: "Remark" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const budgetLedger = {
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
            typeId: row.typeId ? String(row.typeId) : null,
            amount: row.amount ? Number(row.amount) : null,
            currency: row.currency ? String(row.currency) : null,
            sourceTypeId: row.sourceTypeId ? String(row.sourceTypeId) : null,
            sourceId: row.sourceId ? String(row.sourceId) : null,
            referenceNo: row.referenceNo ? String(row.referenceNo) : null,
            remark: row.remark ? String(row.remark) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            budgetId: row.budgetId ? String(row.budgetId) : null,
            typeId: row.typeId ? String(row.typeId) : null,
            amount: row.amount ? Number(row.amount) : null,
            currency: row.currency ? String(row.currency) : null,
            sourceTypeId: row.sourceTypeId ? String(row.sourceTypeId) : null,
            sourceId: row.sourceId ? String(row.sourceId) : null,
            referenceNo: row.referenceNo ? String(row.referenceNo) : null,
            remark: row.remark ? String(row.remark) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;