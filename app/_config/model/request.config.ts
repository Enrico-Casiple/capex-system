import { Request } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = Request;
const ModelName = "Request";
const ListModelName = "Manage Request List";
const ListDescription = "Manage your Request effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "title",
    header: "Title",
    accessorKey: "title",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "requestNumber",
    header: "RequestNumber",
    accessorKey: "requestNumber",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "requesterId",
    header: "RequesterId",
    accessorKey: "requesterId",
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
    id: "dateNeeded",
    header: "DateNeeded",
    accessorKey: "dateNeeded",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "responsibilityCenterId",
    header: "ResponsibilityCenterId",
    accessorKey: "responsibilityCenterId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "quotationUrl",
    header: "QuotationUrl",
    accessorKey: "quotationUrl",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "quotationAmount",
    header: "QuotationAmount",
    accessorKey: "quotationAmount",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "currency",
    header: "Currency",
    accessorKey: "currency",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "workflowTemplateId",
    header: "WorkflowTemplateId",
    accessorKey: "workflowTemplateId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "approvedAt",
    header: "ApprovedAt",
    accessorKey: "approvedAt",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "statusId",
    header: "StatusId",
    accessorKey: "statusId",
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
        key: "title",
        label: "Title",
        default: null,
      },
      {
        key: "description",
        label: "Description",
        default: null,
      },
      {
        key: "requestNumber",
        label: "RequestNumber",
        default: null,
      },
      {
        key: "requesterId",
        label: "RequesterId",
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
        key: "dateNeeded",
        label: "DateNeeded",
        default: null,
      },
      {
        key: "responsibilityCenterId",
        label: "ResponsibilityCenterId",
        default: null,
      },
      {
        key: "quotationUrl",
        label: "QuotationUrl",
        default: null,
      },
      {
        key: "quotationAmount",
        label: "QuotationAmount",
        default: null,
      },
      {
        key: "currency",
        label: "Currency",
        default: null,
      },
      {
        key: "workflowTemplateId",
        label: "WorkflowTemplateId",
        default: null,
      },
      {
        key: "approvedAt",
        label: "ApprovedAt",
        default: null,
      },
      {
        key: "statusId",
        label: "StatusId",
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
        key: "title",
        label: "Title",
        default: null,
      },
      {
        key: "description",
        label: "Description",
        default: null,
      },
      {
        key: "requestNumber",
        label: "RequestNumber",
        default: null,
      },
      {
        key: "requesterId",
        label: "RequesterId",
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
        key: "dateNeeded",
        label: "DateNeeded",
        default: null,
      },
      {
        key: "responsibilityCenterId",
        label: "ResponsibilityCenterId",
        default: null,
      },
      {
        key: "quotationUrl",
        label: "QuotationUrl",
        default: null,
      },
      {
        key: "quotationAmount",
        label: "QuotationAmount",
        default: null,
      },
      {
        key: "currency",
        label: "Currency",
        default: null,
      },
      {
        key: "workflowTemplateId",
        label: "WorkflowTemplateId",
        default: null,
      },
      {
        key: "approvedAt",
        label: "ApprovedAt",
        default: null,
      },
      {
        key: "statusId",
        label: "StatusId",
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
      { id: "title", label: "Title" },
      { id: "description", label: "Description" },
      { id: "requestNumber", label: "RequestNumber" },
      { id: "requesterId", label: "RequesterId" },
      { id: "companyId", label: "CompanyId" },
      { id: "departmentId", label: "DepartmentId" },
      { id: "dateNeeded", label: "DateNeeded" },
      { id: "responsibilityCenterId", label: "ResponsibilityCenterId" },
      { id: "quotationUrl", label: "QuotationUrl" },
      { id: "quotationAmount", label: "QuotationAmount" },
      { id: "currency", label: "Currency" },
      { id: "workflowTemplateId", label: "WorkflowTemplateId" },
      { id: "approvedAt", label: "ApprovedAt" },
      { id: "statusId", label: "StatusId" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const request = {
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
            title: row.title ? String(row.title) : null,
            description: row.description ? String(row.description) : null,
            requestNumber: row.requestNumber ? String(row.requestNumber) : null,
            requesterId: row.requesterId ? String(row.requesterId) : null,
            companyId: row.companyId ? String(row.companyId) : null,
            departmentId: row.departmentId ? String(row.departmentId) : null,
            dateNeeded: row.dateNeeded ? new Date(row.dateNeeded) : null,
            responsibilityCenterId: row.responsibilityCenterId ? String(row.responsibilityCenterId) : null,
            quotationUrl: row.quotationUrl ? String(row.quotationUrl) : null,
            quotationAmount: row.quotationAmount ? Number(row.quotationAmount) : null,
            currency: row.currency ? String(row.currency) : null,
            workflowTemplateId: row.workflowTemplateId ? String(row.workflowTemplateId) : null,
            approvedAt: row.approvedAt ? new Date(row.approvedAt) : null,
            statusId: row.statusId ? String(row.statusId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            title: row.title ? String(row.title) : null,
            description: row.description ? String(row.description) : null,
            requestNumber: row.requestNumber ? String(row.requestNumber) : null,
            requesterId: row.requesterId ? String(row.requesterId) : null,
            companyId: row.companyId ? String(row.companyId) : null,
            departmentId: row.departmentId ? String(row.departmentId) : null,
            dateNeeded: row.dateNeeded ? new Date(row.dateNeeded) : null,
            responsibilityCenterId: row.responsibilityCenterId ? String(row.responsibilityCenterId) : null,
            quotationUrl: row.quotationUrl ? String(row.quotationUrl) : null,
            quotationAmount: row.quotationAmount ? Number(row.quotationAmount) : null,
            currency: row.currency ? String(row.currency) : null,
            workflowTemplateId: row.workflowTemplateId ? String(row.workflowTemplateId) : null,
            approvedAt: row.approvedAt ? new Date(row.approvedAt) : null,
            statusId: row.statusId ? String(row.statusId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;