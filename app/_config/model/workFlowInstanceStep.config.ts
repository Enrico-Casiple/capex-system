import { WorkFlowInstanceStep } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = WorkFlowInstanceStep;
const ModelName = "WorkFlowInstanceStep";
const ListModelName = "Manage Work Flow Instance Step List";
const ListDescription = "Manage your Work Flow Instance Step effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "instanceId",
    header: "InstanceId",
    accessorKey: "instanceId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "stepTemplateId",
    header: "StepTemplateId",
    accessorKey: "stepTemplateId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "stepNumber",
    header: "StepNumber",
    accessorKey: "stepNumber",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "statusId",
    header: "StatusId",
    accessorKey: "statusId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "assignedToUserId",
    header: "AssignedToUserId",
    accessorKey: "assignedToUserId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "startedAt",
    header: "StartedAt",
    accessorKey: "startedAt",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "actionAt",
    header: "ActionAt",
    accessorKey: "actionAt",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "comments",
    header: "Comments",
    accessorKey: "comments",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "isEditable",
    header: "IsEditable",
    accessorKey: "isEditable",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "source",
    header: "Source",
    accessorKey: "source",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "isRequired",
    header: "IsRequired",
    accessorKey: "isRequired",
    meta: { searchable: false, type: "boolean" },
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
        key: "instanceId",
        label: "InstanceId",
        default: null,
      },
      {
        key: "stepTemplateId",
        label: "StepTemplateId",
        default: null,
      },
      {
        key: "stepNumber",
        label: "StepNumber",
        default: null,
      },
      {
        key: "statusId",
        label: "StatusId",
        default: null,
      },
      {
        key: "assignedToUserId",
        label: "AssignedToUserId",
        default: null,
      },
      {
        key: "startedAt",
        label: "StartedAt",
        default: null,
      },
      {
        key: "actionAt",
        label: "ActionAt",
        default: null,
      },
      {
        key: "comments",
        label: "Comments",
        default: null,
      },
      {
        key: "isEditable",
        label: "IsEditable",
        default: false,
      },
      {
        key: "source",
        label: "Source",
        default: null,
      },
      {
        key: "isRequired",
        label: "IsRequired",
        default: false,
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
        key: "instanceId",
        label: "InstanceId",
        default: null,
      },
      {
        key: "stepTemplateId",
        label: "StepTemplateId",
        default: null,
      },
      {
        key: "stepNumber",
        label: "StepNumber",
        default: null,
      },
      {
        key: "statusId",
        label: "StatusId",
        default: null,
      },
      {
        key: "assignedToUserId",
        label: "AssignedToUserId",
        default: null,
      },
      {
        key: "startedAt",
        label: "StartedAt",
        default: null,
      },
      {
        key: "actionAt",
        label: "ActionAt",
        default: null,
      },
      {
        key: "comments",
        label: "Comments",
        default: null,
      },
      {
        key: "isEditable",
        label: "IsEditable",
        default: false,
      },
      {
        key: "source",
        label: "Source",
        default: null,
      },
      {
        key: "isRequired",
        label: "IsRequired",
        default: false,
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      }
];

const exportColumns = [
      { id: "id", label: "ID" },
      { id: "instanceId", label: "InstanceId" },
      { id: "stepTemplateId", label: "StepTemplateId" },
      { id: "stepNumber", label: "StepNumber" },
      { id: "statusId", label: "StatusId" },
      { id: "assignedToUserId", label: "AssignedToUserId" },
      { id: "startedAt", label: "StartedAt" },
      { id: "actionAt", label: "ActionAt" },
      { id: "comments", label: "Comments" },
      { id: "isEditable", label: "IsEditable" },
      { id: "source", label: "Source" },
      { id: "isRequired", label: "IsRequired" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const workFlowInstanceStep = {
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
            instanceId: row.instanceId ? String(row.instanceId) : null,
            stepTemplateId: row.stepTemplateId ? String(row.stepTemplateId) : null,
            stepNumber: row.stepNumber ? Number(row.stepNumber) : null,
            statusId: row.statusId ? String(row.statusId) : null,
            assignedToUserId: row.assignedToUserId ? String(row.assignedToUserId) : null,
            startedAt: row.startedAt ? new Date(row.startedAt) : null,
            actionAt: row.actionAt ? new Date(row.actionAt) : null,
            comments: row.comments ? String(row.comments) : null,
            isEditable: row.isEditable != null ? Boolean(row.isEditable) : null,
            source: row.source ? String(row.source) : null,
            isRequired: row.isRequired != null ? Boolean(row.isRequired) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            instanceId: row.instanceId ? String(row.instanceId) : null,
            stepTemplateId: row.stepTemplateId ? String(row.stepTemplateId) : null,
            stepNumber: row.stepNumber ? Number(row.stepNumber) : null,
            statusId: row.statusId ? String(row.statusId) : null,
            assignedToUserId: row.assignedToUserId ? String(row.assignedToUserId) : null,
            startedAt: row.startedAt ? new Date(row.startedAt) : null,
            actionAt: row.actionAt ? new Date(row.actionAt) : null,
            comments: row.comments ? String(row.comments) : null,
            isEditable: row.isEditable != null ? Boolean(row.isEditable) : null,
            source: row.source ? String(row.source) : null,
            isRequired: row.isRequired != null ? Boolean(row.isRequired) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;