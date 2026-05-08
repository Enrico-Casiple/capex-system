import { WorkFlowStepTemplate } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = WorkFlowStepTemplate;
const ModelName = "WorkFlowStepTemplate";
const ListModelName = "Manage Work Flow Step Template List";
const ListDescription = "Manage your Work Flow Step Template effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "workflowTemplateId",
    header: "WorkflowTemplateId",
    accessorKey: "workflowTemplateId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "stepNumber",
    header: "StepNumber",
    accessorKey: "stepNumber",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "assignmentTypeId",
    header: "AssignmentTypeId",
    accessorKey: "assignmentTypeId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "assignedToUserId",
    header: "AssignedToUserId",
    accessorKey: "assignedToUserId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "assignmentRules",
    header: "AssignmentRules",
    accessorKey: "assignmentRules",
    meta: { searchable: false, type: "object" },
  },
  {
    id: "isHaveCondition",
    header: "IsHaveCondition",
    accessorKey: "isHaveCondition",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "isParallel",
    header: "IsParallel",
    accessorKey: "isParallel",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "requiredApprovals",
    header: "RequiredApprovals",
    accessorKey: "requiredApprovals",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "slaHours",
    header: "SlaHours",
    accessorKey: "slaHours",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "escalationRules",
    header: "EscalationRules",
    accessorKey: "escalationRules",
    meta: { searchable: false, type: "object" },
  },
  {
    id: "esignatureRequired",
    header: "EsignatureRequired",
    accessorKey: "esignatureRequired",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "attachmentRequired",
    header: "AttachmentRequired",
    accessorKey: "attachmentRequired",
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
        key: "workflowTemplateId",
        label: "WorkflowTemplateId",
        default: null,
      },
      {
        key: "stepNumber",
        label: "StepNumber",
        default: null,
      },
      {
        key: "assignmentTypeId",
        label: "AssignmentTypeId",
        default: null,
      },
      {
        key: "assignedToUserId",
        label: "AssignedToUserId",
        default: null,
      },
      {
        key: "assignmentRules",
        label: "AssignmentRules",
        default: null,
      },
      {
        key: "isHaveCondition",
        label: "IsHaveCondition",
        default: false,
      },
      {
        key: "isParallel",
        label: "IsParallel",
        default: false,
      },
      {
        key: "requiredApprovals",
        label: "RequiredApprovals",
        default: null,
      },
      {
        key: "slaHours",
        label: "SlaHours",
        default: null,
      },
      {
        key: "escalationRules",
        label: "EscalationRules",
        default: null,
      },
      {
        key: "esignatureRequired",
        label: "EsignatureRequired",
        default: false,
      },
      {
        key: "attachmentRequired",
        label: "AttachmentRequired",
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
        key: "workflowTemplateId",
        label: "WorkflowTemplateId",
        default: null,
      },
      {
        key: "stepNumber",
        label: "StepNumber",
        default: null,
      },
      {
        key: "assignmentTypeId",
        label: "AssignmentTypeId",
        default: null,
      },
      {
        key: "assignedToUserId",
        label: "AssignedToUserId",
        default: null,
      },
      {
        key: "assignmentRules",
        label: "AssignmentRules",
        default: null,
      },
      {
        key: "isHaveCondition",
        label: "IsHaveCondition",
        default: false,
      },
      {
        key: "isParallel",
        label: "IsParallel",
        default: false,
      },
      {
        key: "requiredApprovals",
        label: "RequiredApprovals",
        default: null,
      },
      {
        key: "slaHours",
        label: "SlaHours",
        default: null,
      },
      {
        key: "escalationRules",
        label: "EscalationRules",
        default: null,
      },
      {
        key: "esignatureRequired",
        label: "EsignatureRequired",
        default: false,
      },
      {
        key: "attachmentRequired",
        label: "AttachmentRequired",
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
      { id: "workflowTemplateId", label: "WorkflowTemplateId" },
      { id: "stepNumber", label: "StepNumber" },
      { id: "assignmentTypeId", label: "AssignmentTypeId" },
      { id: "assignedToUserId", label: "AssignedToUserId" },
      { id: "assignmentRules", label: "AssignmentRules" },
      { id: "isHaveCondition", label: "IsHaveCondition" },
      { id: "isParallel", label: "IsParallel" },
      { id: "requiredApprovals", label: "RequiredApprovals" },
      { id: "slaHours", label: "SlaHours" },
      { id: "escalationRules", label: "EscalationRules" },
      { id: "esignatureRequired", label: "EsignatureRequired" },
      { id: "attachmentRequired", label: "AttachmentRequired" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const workFlowStepTemplate = {
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
            workflowTemplateId: row.workflowTemplateId ? String(row.workflowTemplateId) : null,
            stepNumber: row.stepNumber ? Number(row.stepNumber) : null,
            assignmentTypeId: row.assignmentTypeId ? String(row.assignmentTypeId) : null,
            assignedToUserId: row.assignedToUserId ? String(row.assignedToUserId) : null,
            assignmentRules: row.assignmentRules ? JSON.stringify(row.assignmentRules) : null,
            isHaveCondition: row.isHaveCondition != null ? Boolean(row.isHaveCondition) : null,
            isParallel: row.isParallel != null ? Boolean(row.isParallel) : null,
            requiredApprovals: row.requiredApprovals ? Number(row.requiredApprovals) : null,
            slaHours: row.slaHours ? Number(row.slaHours) : null,
            escalationRules: row.escalationRules ? JSON.stringify(row.escalationRules) : null,
            esignatureRequired: row.esignatureRequired != null ? Boolean(row.esignatureRequired) : null,
            attachmentRequired: row.attachmentRequired != null ? Boolean(row.attachmentRequired) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            workflowTemplateId: row.workflowTemplateId ? String(row.workflowTemplateId) : null,
            stepNumber: row.stepNumber ? Number(row.stepNumber) : null,
            assignmentTypeId: row.assignmentTypeId ? String(row.assignmentTypeId) : null,
            assignedToUserId: row.assignedToUserId ? String(row.assignedToUserId) : null,
            assignmentRules: row.assignmentRules ? JSON.stringify(row.assignmentRules) : null,
            isHaveCondition: row.isHaveCondition != null ? Boolean(row.isHaveCondition) : null,
            isParallel: row.isParallel != null ? Boolean(row.isParallel) : null,
            requiredApprovals: row.requiredApprovals ? Number(row.requiredApprovals) : null,
            slaHours: row.slaHours ? Number(row.slaHours) : null,
            escalationRules: row.escalationRules ? JSON.stringify(row.escalationRules) : null,
            esignatureRequired: row.esignatureRequired != null ? Boolean(row.esignatureRequired) : null,
            attachmentRequired: row.attachmentRequired != null ? Boolean(row.attachmentRequired) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;