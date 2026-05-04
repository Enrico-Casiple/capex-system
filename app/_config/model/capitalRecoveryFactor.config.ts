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
        default: "",
      },
      {
        key: "description",
        label: "Description",
        default: "",
      },
      {
        key: "crfReferenceNo",
        label: "CrfReferenceNo",
        default: "",
      },
      {
        key: "statusId",
        label: "StatusId",
        default: "",
      },
      {
        key: "companyId",
        label: "CompanyId",
        default: "",
      },
      {
        key: "departmentId",
        label: "DepartmentId",
        default: "",
      },
      {
        key: "categoryId",
        label: "CategoryId",
        default: "",
      },
      {
        key: "utilizedBudget",
        label: "UtilizedBudget",
        default: 0,
      },
      {
        key: "approvedAmount",
        label: "ApprovedAmount",
        default: 0,
      },
      {
        key: "requestedAmount",
        label: "RequestedAmount",
        default: 0,
      },
      {
        key: "newBalanceAmmount",
        label: "NewBalanceAmmount",
        default: 0,
      },
      {
        key: "projectedBudget",
        label: "ProjectedBudget",
        default: 0,
      },
      {
        key: "remark",
        label: "Remark",
        default: {} as Record<string, unknown>,
      },
      {
        key: "remainingAmount",
        label: "RemainingAmount",
        default: 0,
      },
      {
        key: "requestId",
        label: "RequestId",
        default: "",
      },
      {
        key: "budgetId",
        label: "BudgetId",
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
        key: "name",
        label: "Name",
        default: "",
      },
      {
        key: "description",
        label: "Description",
        default: "",
      },
      {
        key: "crfReferenceNo",
        label: "CrfReferenceNo",
        default: "",
      },
      {
        key: "statusId",
        label: "StatusId",
        default: "",
      },
      {
        key: "companyId",
        label: "CompanyId",
        default: "",
      },
      {
        key: "departmentId",
        label: "DepartmentId",
        default: "",
      },
      {
        key: "categoryId",
        label: "CategoryId",
        default: "",
      },
      {
        key: "utilizedBudget",
        label: "UtilizedBudget",
        default: 0,
      },
      {
        key: "approvedAmount",
        label: "ApprovedAmount",
        default: 0,
      },
      {
        key: "requestedAmount",
        label: "RequestedAmount",
        default: 0,
      },
      {
        key: "newBalanceAmmount",
        label: "NewBalanceAmmount",
        default: 0,
      },
      {
        key: "projectedBudget",
        label: "ProjectedBudget",
        default: 0,
      },
      {
        key: "remark",
        label: "Remark",
        default: {} as Record<string, unknown>,
      },
      {
        key: "remainingAmount",
        label: "RemainingAmount",
        default: 0,
      },
      {
        key: "requestId",
        label: "RequestId",
        default: "",
      },
      {
        key: "budgetId",
        label: "BudgetId",
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
            name: row.name,
            description: row.description,
            crfReferenceNo: row.crfReferenceNo,
            statusId: row.statusId,
            companyId: row.companyId,
            departmentId: row.departmentId,
            categoryId: row.categoryId,
            utilizedBudget: row.utilizedBudget,
            approvedAmount: row.approvedAmount,
            requestedAmount: row.requestedAmount,
            newBalanceAmmount: row.newBalanceAmmount,
            projectedBudget: row.projectedBudget,
            remark: row.remark,
            remainingAmount: row.remainingAmount,
            requestId: row.requestId,
            budgetId: row.budgetId,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            name: row.name,
            description: row.description,
            crfReferenceNo: row.crfReferenceNo,
            statusId: row.statusId,
            companyId: row.companyId,
            departmentId: row.departmentId,
            categoryId: row.categoryId,
            utilizedBudget: row.utilizedBudget,
            approvedAmount: row.approvedAmount,
            requestedAmount: row.requestedAmount,
            newBalanceAmmount: row.newBalanceAmmount,
            projectedBudget: row.projectedBudget,
            remark: row.remark,
            remainingAmount: row.remainingAmount,
            requestId: row.requestId,
            budgetId: row.budgetId,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;