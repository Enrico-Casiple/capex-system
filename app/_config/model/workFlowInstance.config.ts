import { WorkFlowInstance } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = WorkFlowInstance;
const ModelName = "WorkFlowInstance";
const ListModelName = "Manage Work Flow Instance List";
const ListDescription = "Manage your Work Flow Instance effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "templateId",
    header: "TemplateId",
    accessorKey: "templateId",
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
    id: "statusId",
    header: "StatusId",
    accessorKey: "statusId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "currentStep",
    header: "CurrentStep",
    accessorKey: "currentStep",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "referenceTypeId",
    header: "ReferenceTypeId",
    accessorKey: "referenceTypeId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "startedAt",
    header: "StartedAt",
    accessorKey: "startedAt",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "completedAt",
    header: "CompletedAt",
    accessorKey: "completedAt",
    meta: { searchable: false, type: "date" },
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
        key: "templateId",
        label: "TemplateId",
        default: null,
      },
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
        key: "statusId",
        label: "StatusId",
        default: null,
      },
      {
        key: "currentStep",
        label: "CurrentStep",
        default: null,
      },
      {
        key: "referenceTypeId",
        label: "ReferenceTypeId",
        default: null,
      },
      {
        key: "startedAt",
        label: "StartedAt",
        default: null,
      },
      {
        key: "completedAt",
        label: "CompletedAt",
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
        key: "templateId",
        label: "TemplateId",
        default: null,
      },
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
        key: "statusId",
        label: "StatusId",
        default: null,
      },
      {
        key: "currentStep",
        label: "CurrentStep",
        default: null,
      },
      {
        key: "referenceTypeId",
        label: "ReferenceTypeId",
        default: null,
      },
      {
        key: "startedAt",
        label: "StartedAt",
        default: null,
      },
      {
        key: "completedAt",
        label: "CompletedAt",
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
      { id: "templateId", label: "TemplateId" },
      { id: "title", label: "Title" },
      { id: "description", label: "Description" },
      { id: "statusId", label: "StatusId" },
      { id: "currentStep", label: "CurrentStep" },
      { id: "referenceTypeId", label: "ReferenceTypeId" },
      { id: "startedAt", label: "StartedAt" },
      { id: "completedAt", label: "CompletedAt" },
      { id: "requestId", label: "RequestId" },
      { id: "budgetId", label: "BudgetId" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const workFlowInstance = {
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
            templateId: row.templateId ? String(row.templateId) : null,
            title: row.title ? String(row.title) : null,
            description: row.description ? String(row.description) : null,
            statusId: row.statusId ? String(row.statusId) : null,
            currentStep: row.currentStep ? Number(row.currentStep) : null,
            referenceTypeId: row.referenceTypeId ? String(row.referenceTypeId) : null,
            startedAt: row.startedAt ? new Date(row.startedAt) : null,
            completedAt: row.completedAt ? new Date(row.completedAt) : null,
            requestId: row.requestId ? String(row.requestId) : null,
            budgetId: row.budgetId ? String(row.budgetId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            templateId: row.templateId ? String(row.templateId) : null,
            title: row.title ? String(row.title) : null,
            description: row.description ? String(row.description) : null,
            statusId: row.statusId ? String(row.statusId) : null,
            currentStep: row.currentStep ? Number(row.currentStep) : null,
            referenceTypeId: row.referenceTypeId ? String(row.referenceTypeId) : null,
            startedAt: row.startedAt ? new Date(row.startedAt) : null,
            completedAt: row.completedAt ? new Date(row.completedAt) : null,
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