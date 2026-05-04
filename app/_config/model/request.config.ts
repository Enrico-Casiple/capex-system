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
        default: "",
      },
      {
        key: "description",
        label: "Description",
        default: "",
      },
      {
        key: "requestNumber",
        label: "RequestNumber",
        default: "",
      },
      {
        key: "requesterId",
        label: "RequesterId",
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
        key: "dateNeeded",
        label: "DateNeeded",
        default: "",
      },
      {
        key: "responsibilityCenterId",
        label: "ResponsibilityCenterId",
        default: "",
      },
      {
        key: "quotationUrl",
        label: "QuotationUrl",
        default: "",
      },
      {
        key: "quotationAmount",
        label: "QuotationAmount",
        default: 0,
      },
      {
        key: "currency",
        label: "Currency",
        default: "",
      },
      {
        key: "workflowTemplateId",
        label: "WorkflowTemplateId",
        default: "",
      },
      {
        key: "approvedAt",
        label: "ApprovedAt",
        default: "",
      },
      {
        key: "statusId",
        label: "StatusId",
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
        key: "title",
        label: "Title",
        default: "",
      },
      {
        key: "description",
        label: "Description",
        default: "",
      },
      {
        key: "requestNumber",
        label: "RequestNumber",
        default: "",
      },
      {
        key: "requesterId",
        label: "RequesterId",
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
        key: "dateNeeded",
        label: "DateNeeded",
        default: "",
      },
      {
        key: "responsibilityCenterId",
        label: "ResponsibilityCenterId",
        default: "",
      },
      {
        key: "quotationUrl",
        label: "QuotationUrl",
        default: "",
      },
      {
        key: "quotationAmount",
        label: "QuotationAmount",
        default: 0,
      },
      {
        key: "currency",
        label: "Currency",
        default: "",
      },
      {
        key: "workflowTemplateId",
        label: "WorkflowTemplateId",
        default: "",
      },
      {
        key: "approvedAt",
        label: "ApprovedAt",
        default: "",
      },
      {
        key: "statusId",
        label: "StatusId",
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
            title: row.title,
            description: row.description,
            requestNumber: row.requestNumber,
            requesterId: row.requesterId,
            companyId: row.companyId,
            departmentId: row.departmentId,
            dateNeeded: row.dateNeeded,
            responsibilityCenterId: row.responsibilityCenterId,
            quotationUrl: row.quotationUrl,
            quotationAmount: row.quotationAmount,
            currency: row.currency,
            workflowTemplateId: row.workflowTemplateId,
            approvedAt: row.approvedAt,
            statusId: row.statusId,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            title: row.title,
            description: row.description,
            requestNumber: row.requestNumber,
            requesterId: row.requesterId,
            companyId: row.companyId,
            departmentId: row.departmentId,
            dateNeeded: row.dateNeeded,
            responsibilityCenterId: row.responsibilityCenterId,
            quotationUrl: row.quotationUrl,
            quotationAmount: row.quotationAmount,
            currency: row.currency,
            workflowTemplateId: row.workflowTemplateId,
            approvedAt: row.approvedAt,
            statusId: row.statusId,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;