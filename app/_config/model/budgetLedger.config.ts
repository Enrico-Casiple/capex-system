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
        default: "",
      },
      {
        key: "typeId",
        label: "TypeId",
        default: "",
      },
      {
        key: "amount",
        label: "Amount",
        default: 0,
      },
      {
        key: "currency",
        label: "Currency",
        default: "",
      },
      {
        key: "sourceTypeId",
        label: "SourceTypeId",
        default: "",
      },
      {
        key: "sourceId",
        label: "SourceId",
        default: "",
      },
      {
        key: "referenceNo",
        label: "ReferenceNo",
        default: "",
      },
      {
        key: "remark",
        label: "Remark",
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
        key: "budgetId",
        label: "BudgetId",
        default: "",
      },
      {
        key: "typeId",
        label: "TypeId",
        default: "",
      },
      {
        key: "amount",
        label: "Amount",
        default: 0,
      },
      {
        key: "currency",
        label: "Currency",
        default: "",
      },
      {
        key: "sourceTypeId",
        label: "SourceTypeId",
        default: "",
      },
      {
        key: "sourceId",
        label: "SourceId",
        default: "",
      },
      {
        key: "referenceNo",
        label: "ReferenceNo",
        default: "",
      },
      {
        key: "remark",
        label: "Remark",
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
            budgetId: row.budgetId,
            typeId: row.typeId,
            amount: row.amount,
            currency: row.currency,
            sourceTypeId: row.sourceTypeId,
            sourceId: row.sourceId,
            referenceNo: row.referenceNo,
            remark: row.remark,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            budgetId: row.budgetId,
            typeId: row.typeId,
            amount: row.amount,
            currency: row.currency,
            sourceTypeId: row.sourceTypeId,
            sourceId: row.sourceId,
            referenceNo: row.referenceNo,
            remark: row.remark,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;