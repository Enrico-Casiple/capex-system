import { Budget } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = Budget;
const ModelName = "Budget";
const ListModelName = "Manage Budget List";
const ListDescription = "Manage your Budget effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "fiscalYear",
    header: "FiscalYear",
    accessorKey: "fiscalYear",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "statusId",
    header: "StatusId",
    accessorKey: "statusId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "budgetRefNo",
    header: "BudgetRefNo",
    accessorKey: "budgetRefNo",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "companyId",
    header: "CompanyId",
    accessorKey: "companyId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "departmentId",
    header: "DepartmentId",
    accessorKey: "departmentId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "categoryId",
    header: "CategoryId",
    accessorKey: "categoryId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "requesterId",
    header: "RequesterId",
    accessorKey: "requesterId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "purpose",
    header: "Purpose",
    accessorKey: "purpose",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "specs",
    header: "Specs",
    accessorKey: "specs",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "quantity",
    header: "Quantity",
    accessorKey: "quantity",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "remark",
    header: "Remark",
    accessorKey: "remark",
    meta: { searchable: false, type: "object" },
  },
  {
    id: "workflowTemplateId",
    header: "WorkflowTemplateId",
    accessorKey: "workflowTemplateId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "submittedAt",
    header: "SubmittedAt",
    accessorKey: "submittedAt",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "approvedAt",
    header: "ApprovedAt",
    accessorKey: "approvedAt",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "rejectedAt",
    header: "RejectedAt",
    accessorKey: "rejectedAt",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "requestedAmount",
    header: "RequestedAmount",
    accessorKey: "requestedAmount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "approvedAmount",
    header: "ApprovedAmount",
    accessorKey: "approvedAmount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "remainingAmount",
    header: "RemainingAmount",
    accessorKey: "remainingAmount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "currency",
    header: "Currency",
    accessorKey: "currency",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "isFrozen",
    header: "IsFrozen",
    accessorKey: "isFrozen",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "freezeReason",
    header: "FreezeReason",
    accessorKey: "freezeReason",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "frozenAt",
    header: "FrozenAt",
    accessorKey: "frozenAt",
    meta: { searchable: false, type: "date" },
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
        key: "fiscalYear",
        label: "FiscalYear",
        default: null,
      },
      {
        key: "statusId",
        label: "StatusId",
        default: null,
      },
      {
        key: "budgetRefNo",
        label: "BudgetRefNo",
        default: null,
      },
      {
        key: "companyId",
        label: "CompanyId",
        default: null,
      },
      {
        key: "departmentId",
        label: "DepartmentId",
        default: null,
      },
      {
        key: "categoryId",
        label: "CategoryId",
        default: null,
      },
      {
        key: "requesterId",
        label: "RequesterId",
        default: null,
      },
      {
        key: "purpose",
        label: "Purpose",
        default: null,
      },
      {
        key: "specs",
        label: "Specs",
        default: null,
      },
      {
        key: "quantity",
        label: "Quantity",
        default: null,
      },
      {
        key: "remark",
        label: "Remark",
        default: null,
      },
      {
        key: "workflowTemplateId",
        label: "WorkflowTemplateId",
        default: null,
      },
      {
        key: "submittedAt",
        label: "SubmittedAt",
        default: null,
      },
      {
        key: "approvedAt",
        label: "ApprovedAt",
        default: null,
      },
      {
        key: "rejectedAt",
        label: "RejectedAt",
        default: null,
      },
      {
        key: "requestedAmount",
        label: "RequestedAmount",
        default: null,
      },
      {
        key: "approvedAmount",
        label: "ApprovedAmount",
        default: null,
      },
      {
        key: "remainingAmount",
        label: "RemainingAmount",
        default: null,
      },
      {
        key: "currency",
        label: "Currency",
        default: null,
      },
      {
        key: "isFrozen",
        label: "IsFrozen",
        default: false,
      },
      {
        key: "freezeReason",
        label: "FreezeReason",
        default: null,
      },
      {
        key: "frozenAt",
        label: "FrozenAt",
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
        key: "fiscalYear",
        label: "FiscalYear",
        default: null,
      },
      {
        key: "statusId",
        label: "StatusId",
        default: null,
      },
      {
        key: "budgetRefNo",
        label: "BudgetRefNo",
        default: null,
      },
      {
        key: "companyId",
        label: "CompanyId",
        default: null,
      },
      {
        key: "departmentId",
        label: "DepartmentId",
        default: null,
      },
      {
        key: "categoryId",
        label: "CategoryId",
        default: null,
      },
      {
        key: "requesterId",
        label: "RequesterId",
        default: null,
      },
      {
        key: "purpose",
        label: "Purpose",
        default: null,
      },
      {
        key: "specs",
        label: "Specs",
        default: null,
      },
      {
        key: "quantity",
        label: "Quantity",
        default: null,
      },
      {
        key: "remark",
        label: "Remark",
        default: null,
      },
      {
        key: "workflowTemplateId",
        label: "WorkflowTemplateId",
        default: null,
      },
      {
        key: "submittedAt",
        label: "SubmittedAt",
        default: null,
      },
      {
        key: "approvedAt",
        label: "ApprovedAt",
        default: null,
      },
      {
        key: "rejectedAt",
        label: "RejectedAt",
        default: null,
      },
      {
        key: "requestedAmount",
        label: "RequestedAmount",
        default: null,
      },
      {
        key: "approvedAmount",
        label: "ApprovedAmount",
        default: null,
      },
      {
        key: "remainingAmount",
        label: "RemainingAmount",
        default: null,
      },
      {
        key: "currency",
        label: "Currency",
        default: null,
      },
      {
        key: "isFrozen",
        label: "IsFrozen",
        default: false,
      },
      {
        key: "freezeReason",
        label: "FreezeReason",
        default: null,
      },
      {
        key: "frozenAt",
        label: "FrozenAt",
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
      { id: "fiscalYear", label: "FiscalYear" },
      { id: "statusId", label: "StatusId" },
      { id: "budgetRefNo", label: "BudgetRefNo" },
      { id: "companyId", label: "CompanyId" },
      { id: "departmentId", label: "DepartmentId" },
      { id: "categoryId", label: "CategoryId" },
      { id: "requesterId", label: "RequesterId" },
      { id: "purpose", label: "Purpose" },
      { id: "specs", label: "Specs" },
      { id: "quantity", label: "Quantity" },
      { id: "remark", label: "Remark" },
      { id: "workflowTemplateId", label: "WorkflowTemplateId" },
      { id: "submittedAt", label: "SubmittedAt" },
      { id: "approvedAt", label: "ApprovedAt" },
      { id: "rejectedAt", label: "RejectedAt" },
      { id: "requestedAmount", label: "RequestedAmount" },
      { id: "approvedAmount", label: "ApprovedAmount" },
      { id: "remainingAmount", label: "RemainingAmount" },
      { id: "currency", label: "Currency" },
      { id: "isFrozen", label: "IsFrozen" },
      { id: "freezeReason", label: "FreezeReason" },
      { id: "frozenAt", label: "FrozenAt" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const budget = {
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
            fiscalYear: row.fiscalYear ? String(row.fiscalYear) : null,
            statusId: row.statusId ? String(row.statusId) : null,
            budgetRefNo: row.budgetRefNo ? String(row.budgetRefNo) : null,
            companyId: row.companyId ? String(row.companyId) : null,
            departmentId: row.departmentId ? String(row.departmentId) : null,
            categoryId: row.categoryId ? String(row.categoryId) : null,
            requesterId: row.requesterId ? String(row.requesterId) : null,
            purpose: row.purpose ? String(row.purpose) : null,
            specs: row.specs ? String(row.specs) : null,
            quantity: row.quantity ? Number(row.quantity) : null,
            remark: row.remark ? JSON.stringify(row.remark) : null,
            workflowTemplateId: row.workflowTemplateId ? String(row.workflowTemplateId) : null,
            submittedAt: row.submittedAt ? new Date(row.submittedAt) : null,
            approvedAt: row.approvedAt ? new Date(row.approvedAt) : null,
            rejectedAt: row.rejectedAt ? new Date(row.rejectedAt) : null,
            requestedAmount: row.requestedAmount ? Number(row.requestedAmount) : null,
            approvedAmount: row.approvedAmount ? Number(row.approvedAmount) : null,
            remainingAmount: row.remainingAmount ? Number(row.remainingAmount) : null,
            currency: row.currency ? String(row.currency) : null,
            isFrozen: row.isFrozen != null ? Boolean(row.isFrozen) : null,
            freezeReason: row.freezeReason ? String(row.freezeReason) : null,
            frozenAt: row.frozenAt ? new Date(row.frozenAt) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            fiscalYear: row.fiscalYear ? String(row.fiscalYear) : null,
            statusId: row.statusId ? String(row.statusId) : null,
            budgetRefNo: row.budgetRefNo ? String(row.budgetRefNo) : null,
            companyId: row.companyId ? String(row.companyId) : null,
            departmentId: row.departmentId ? String(row.departmentId) : null,
            categoryId: row.categoryId ? String(row.categoryId) : null,
            requesterId: row.requesterId ? String(row.requesterId) : null,
            purpose: row.purpose ? String(row.purpose) : null,
            specs: row.specs ? String(row.specs) : null,
            quantity: row.quantity ? Number(row.quantity) : null,
            remark: row.remark ? JSON.stringify(row.remark) : null,
            workflowTemplateId: row.workflowTemplateId ? String(row.workflowTemplateId) : null,
            submittedAt: row.submittedAt ? new Date(row.submittedAt) : null,
            approvedAt: row.approvedAt ? new Date(row.approvedAt) : null,
            rejectedAt: row.rejectedAt ? new Date(row.rejectedAt) : null,
            requestedAmount: row.requestedAmount ? Number(row.requestedAmount) : null,
            approvedAmount: row.approvedAmount ? Number(row.approvedAmount) : null,
            remainingAmount: row.remainingAmount ? Number(row.remainingAmount) : null,
            currency: row.currency ? String(row.currency) : null,
            isFrozen: row.isFrozen != null ? Boolean(row.isFrozen) : null,
            freezeReason: row.freezeReason ? String(row.freezeReason) : null,
            frozenAt: row.frozenAt ? new Date(row.frozenAt) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;