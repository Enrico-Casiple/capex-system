import { ConfigCondition } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = ConfigCondition;
const ModelName = "ConfigCondition";
const ListModelName = "Manage Config Condition List";
const ListDescription = "Manage your Config Condition effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "configId",
    header: "ConfigId",
    accessorKey: "configId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "nodeType",
    header: "NodeType",
    accessorKey: "nodeType",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "logicalOperator",
    header: "LogicalOperator",
    accessorKey: "logicalOperator",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "field",
    header: "Field",
    accessorKey: "field",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "operator",
    header: "Operator",
    accessorKey: "operator",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "value",
    header: "Value",
    accessorKey: "value",
    meta: { searchable: false, type: "object" },
  },
  {
    id: "parentConditionId",
    header: "ParentConditionId",
    accessorKey: "parentConditionId",
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
        key: "configId",
        label: "ConfigId",
        default: null,
      },
      {
        key: "nodeType",
        label: "NodeType",
        default: null,
      },
      {
        key: "logicalOperator",
        label: "LogicalOperator",
        default: null,
      },
      {
        key: "field",
        label: "Field",
        default: null,
      },
      {
        key: "operator",
        label: "Operator",
        default: null,
      },
      {
        key: "value",
        label: "Value",
        default: null,
      },
      {
        key: "parentConditionId",
        label: "ParentConditionId",
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
        key: "configId",
        label: "ConfigId",
        default: null,
      },
      {
        key: "nodeType",
        label: "NodeType",
        default: null,
      },
      {
        key: "logicalOperator",
        label: "LogicalOperator",
        default: null,
      },
      {
        key: "field",
        label: "Field",
        default: null,
      },
      {
        key: "operator",
        label: "Operator",
        default: null,
      },
      {
        key: "value",
        label: "Value",
        default: null,
      },
      {
        key: "parentConditionId",
        label: "ParentConditionId",
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
      { id: "configId", label: "ConfigId" },
      { id: "nodeType", label: "NodeType" },
      { id: "logicalOperator", label: "LogicalOperator" },
      { id: "field", label: "Field" },
      { id: "operator", label: "Operator" },
      { id: "value", label: "Value" },
      { id: "parentConditionId", label: "ParentConditionId" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const configCondition = {
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
            configId: row.configId ? String(row.configId) : null,
            nodeType: row.nodeType ? String(row.nodeType) : null,
            logicalOperator: row.logicalOperator ? String(row.logicalOperator) : null,
            field: row.field ? String(row.field) : null,
            operator: row.operator ? String(row.operator) : null,
            value: row.value ? JSON.stringify(row.value) : null,
            parentConditionId: row.parentConditionId ? String(row.parentConditionId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            configId: row.configId ? String(row.configId) : null,
            nodeType: row.nodeType ? String(row.nodeType) : null,
            logicalOperator: row.logicalOperator ? String(row.logicalOperator) : null,
            field: row.field ? String(row.field) : null,
            operator: row.operator ? String(row.operator) : null,
            value: row.value ? JSON.stringify(row.value) : null,
            parentConditionId: row.parentConditionId ? String(row.parentConditionId) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;