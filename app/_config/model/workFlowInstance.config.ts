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
        default: "",
      },
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
        key: "statusId",
        label: "StatusId",
        default: "",
      },
      {
        key: "currentStep",
        label: "CurrentStep",
        default: 0,
      },
      {
        key: "referenceTypeId",
        label: "ReferenceTypeId",
        default: "",
      },
      {
        key: "startedAt",
        label: "StartedAt",
        default: "",
      },
      {
        key: "completedAt",
        label: "CompletedAt",
        default: "",
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
        key: "templateId",
        label: "TemplateId",
        default: "",
      },
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
        key: "statusId",
        label: "StatusId",
        default: "",
      },
      {
        key: "currentStep",
        label: "CurrentStep",
        default: 0,
      },
      {
        key: "referenceTypeId",
        label: "ReferenceTypeId",
        default: "",
      },
      {
        key: "startedAt",
        label: "StartedAt",
        default: "",
      },
      {
        key: "completedAt",
        label: "CompletedAt",
        default: "",
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
            templateId: row.templateId,
            title: row.title,
            description: row.description,
            statusId: row.statusId,
            currentStep: row.currentStep,
            referenceTypeId: row.referenceTypeId,
            startedAt: row.startedAt,
            completedAt: row.completedAt,
            requestId: row.requestId,
            budgetId: row.budgetId,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            templateId: row.templateId,
            title: row.title,
            description: row.description,
            statusId: row.statusId,
            currentStep: row.currentStep,
            referenceTypeId: row.referenceTypeId,
            startedAt: row.startedAt,
            completedAt: row.completedAt,
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