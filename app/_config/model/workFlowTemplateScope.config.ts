import { WorkFlowTemplateScope } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = WorkFlowTemplateScope;
const ModelName = "WorkFlowTemplateScope";
const ListModelName = "Manage Work Flow Template Scope List";
const ListDescription = "Manage your Work Flow Template Scope effectively with our comprehensive management system.";

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
    id: "positionId",
    header: "PositionId",
    accessorKey: "positionId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "jobLevelId",
    header: "JobLevelId",
    accessorKey: "jobLevelId",
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
        key: "positionId",
        label: "PositionId",
        default: "",
      },
      {
        key: "jobLevelId",
        label: "JobLevelId",
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
        key: "positionId",
        label: "PositionId",
        default: "",
      },
      {
        key: "jobLevelId",
        label: "JobLevelId",
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
      { id: "companyId", label: "CompanyId" },
      { id: "departmentId", label: "DepartmentId" },
      { id: "positionId", label: "PositionId" },
      { id: "jobLevelId", label: "JobLevelId" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const workFlowTemplateScope = {
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
            companyId: row.companyId,
            departmentId: row.departmentId,
            positionId: row.positionId,
            jobLevelId: row.jobLevelId,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            templateId: row.templateId,
            companyId: row.companyId,
            departmentId: row.departmentId,
            positionId: row.positionId,
            jobLevelId: row.jobLevelId,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;