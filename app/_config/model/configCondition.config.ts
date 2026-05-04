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
        default: "",
      },
      {
        key: "nodeType",
        label: "NodeType",
        default: "",
      },
      {
        key: "logicalOperator",
        label: "LogicalOperator",
        default: "",
      },
      {
        key: "field",
        label: "Field",
        default: "",
      },
      {
        key: "operator",
        label: "Operator",
        default: "",
      },
      {
        key: "value",
        label: "Value",
        default: {} as Record<string, unknown>,
      },
      {
        key: "parentConditionId",
        label: "ParentConditionId",
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
        key: "configId",
        label: "ConfigId",
        default: "",
      },
      {
        key: "nodeType",
        label: "NodeType",
        default: "",
      },
      {
        key: "logicalOperator",
        label: "LogicalOperator",
        default: "",
      },
      {
        key: "field",
        label: "Field",
        default: "",
      },
      {
        key: "operator",
        label: "Operator",
        default: "",
      },
      {
        key: "value",
        label: "Value",
        default: {} as Record<string, unknown>,
      },
      {
        key: "parentConditionId",
        label: "ParentConditionId",
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
            configId: row.configId,
            nodeType: row.nodeType,
            logicalOperator: row.logicalOperator,
            field: row.field,
            operator: row.operator,
            value: row.value,
            parentConditionId: row.parentConditionId,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            configId: row.configId,
            nodeType: row.nodeType,
            logicalOperator: row.logicalOperator,
            field: row.field,
            operator: row.operator,
            value: row.value,
            parentConditionId: row.parentConditionId,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;