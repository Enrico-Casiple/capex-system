import { CapitalRecoveryFactor } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = CapitalRecoveryFactor;
const ModelName = "CapitalRecoveryFactor";
const ListModelName = "Manage Capital Recovery Factor List";
const ListDescription = "Manage your Capital Recovery Factor effectively with our comprehensive management system.";

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
    id: "description",
    header: "Description",
    accessorKey: "description",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "crfReferenceNo",
    header: "CrfReferenceNo",
    accessorKey: "crfReferenceNo",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "statusId",
    header: "StatusId",
    accessorKey: "statusId",
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
    id: "utilizedBudget",
    header: "UtilizedBudget",
    accessorKey: "utilizedBudget",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "approvedAmount",
    header: "ApprovedAmount",
    accessorKey: "approvedAmount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "requestedAmount",
    header: "RequestedAmount",
    accessorKey: "requestedAmount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "newBalanceAmmount",
    header: "NewBalanceAmmount",
    accessorKey: "newBalanceAmmount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "projectedBudget",
    header: "ProjectedBudget",
    accessorKey: "projectedBudget",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "remark",
    header: "Remark",
    accessorKey: "remark",
    meta: { searchable: false, type: "object" },
  },
  {
    id: "remainingAmount",
    header: "RemainingAmount",
    accessorKey: "remainingAmount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "requestId",
    header: "RequestId",
    accessorKey: "requestId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "budgetId",
    header: "BudgetId",
    accessorKey: "budgetId",
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
        key: "name",
        label: "Name",
        default: null,
      },
      {
        key: "description",
        label: "Description",
        default: null,
      },
      {
        key: "crfReferenceNo",
        label: "CrfReferenceNo",
        default: null,
      },
      {
        key: "statusId",
        label: "StatusId",
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
        key: "utilizedBudget",
        label: "UtilizedBudget",
        default: null,
      },
      {
        key: "approvedAmount",
        label: "ApprovedAmount",
        default: null,
      },
      {
        key: "requestedAmount",
        label: "RequestedAmount",
        default: null,
      },
      {
        key: "newBalanceAmmount",
        label: "NewBalanceAmmount",
        default: null,
      },
      {
        key: "projectedBudget",
        label: "ProjectedBudget",
        default: null,
      },
      {
        key: "remark",
        label: "Remark",
        default: null,
      },
      {
        key: "remainingAmount",
        label: "RemainingAmount",
        default: null,
      },
      {
        key: "requestId",
        label: "RequestId",
        default: null,
      },
      {
        key: "budgetId",
        label: "BudgetId",
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
        key: "name",
        label: "Name",
        default: null,
      },
      {
        key: "description",
        label: "Description",
        default: null,
      },
      {
        key: "crfReferenceNo",
        label: "CrfReferenceNo",
        default: null,
      },
      {
        key: "statusId",
        label: "StatusId",
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
        key: "utilizedBudget",
        label: "UtilizedBudget",
        default: null,
      },
      {
        key: "approvedAmount",
        label: "ApprovedAmount",
        default: null,
      },
      {
        key: "requestedAmount",
        label: "RequestedAmount",
        default: null,
      },
      {
        key: "newBalanceAmmount",
        label: "NewBalanceAmmount",
        default: null,
      },
      {
        key: "projectedBudget",
        label: "ProjectedBudget",
        default: null,
      },
      {
        key: "remark",
        label: "Remark",
        default: null,
      },
      {
        key: "remainingAmount",
        label: "RemainingAmount",
        default: null,
      },
      {
        key: "requestId",
        label: "RequestId",
        default: null,
      },
      {
        key: "budgetId",
        label: "BudgetId",
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
      { id: "name", label: "Name" },
      { id: "description", label: "Description" },
      { id: "crfReferenceNo", label: "CrfReferenceNo" },
      { id: "statusId", label: "StatusId" },
      { id: "companyId", label: "CompanyId" },
      { id: "departmentId", label: "DepartmentId" },
      { id: "categoryId", label: "CategoryId" },
      { id: "utilizedBudget", label: "UtilizedBudget" },
      { id: "approvedAmount", label: "ApprovedAmount" },
      { id: "requestedAmount", label: "RequestedAmount" },
      { id: "newBalanceAmmount", label: "NewBalanceAmmount" },
      { id: "projectedBudget", label: "ProjectedBudget" },
      { id: "remark", label: "Remark" },
      { id: "remainingAmount", label: "RemainingAmount" },
      { id: "requestId", label: "RequestId" },
      { id: "budgetId", label: "BudgetId" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const capitalRecoveryFactor = {
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
            name: row.name ? String(row.name) : null,
            description: row.description ? String(row.description) : null,
            crfReferenceNo: row.crfReferenceNo ? String(row.crfReferenceNo) : null,
            statusId: row.statusId ? String(row.statusId) : null,
            companyId: row.companyId ? String(row.companyId) : null,
            departmentId: row.departmentId ? String(row.departmentId) : null,
            categoryId: row.categoryId ? String(row.categoryId) : null,
            utilizedBudget: row.utilizedBudget ? Number(row.utilizedBudget) : null,
            approvedAmount: row.approvedAmount ? Number(row.approvedAmount) : null,
            requestedAmount: row.requestedAmount ? Number(row.requestedAmount) : null,
            newBalanceAmmount: row.newBalanceAmmount ? Number(row.newBalanceAmmount) : null,
            projectedBudget: row.projectedBudget ? Number(row.projectedBudget) : null,
            remark: row.remark ? JSON.stringify(row.remark) : null,
            remainingAmount: row.remainingAmount ? Number(row.remainingAmount) : null,
            requestId: row.requestId ? String(row.requestId) : null,
            budgetId: row.budgetId ? String(row.budgetId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            name: row.name ? String(row.name) : null,
            description: row.description ? String(row.description) : null,
            crfReferenceNo: row.crfReferenceNo ? String(row.crfReferenceNo) : null,
            statusId: row.statusId ? String(row.statusId) : null,
            companyId: row.companyId ? String(row.companyId) : null,
            departmentId: row.departmentId ? String(row.departmentId) : null,
            categoryId: row.categoryId ? String(row.categoryId) : null,
            utilizedBudget: row.utilizedBudget ? Number(row.utilizedBudget) : null,
            approvedAmount: row.approvedAmount ? Number(row.approvedAmount) : null,
            requestedAmount: row.requestedAmount ? Number(row.requestedAmount) : null,
            newBalanceAmmount: row.newBalanceAmmount ? Number(row.newBalanceAmmount) : null,
            projectedBudget: row.projectedBudget ? Number(row.projectedBudget) : null,
            remark: row.remark ? JSON.stringify(row.remark) : null,
            remainingAmount: row.remainingAmount ? Number(row.remainingAmount) : null,
            requestId: row.requestId ? String(row.requestId) : null,
            budgetId: row.budgetId ? String(row.budgetId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;