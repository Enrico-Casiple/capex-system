import { WorkInformation } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = WorkInformation;
const ModelName = "WorkInformation";
const ListModelName = "Manage Work Information List";
const ListDescription = "Manage your Work Information effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "employeeNumber",
    header: "EmployeeNumber",
    accessorKey: "employeeNumber",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "employeeId",
    header: "EmployeeId",
    accessorKey: "employeeId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "groupOfCompanyId",
    header: "GroupOfCompanyId",
    accessorKey: "groupOfCompanyId",
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
    id: "employmentTypeId",
    header: "EmploymentTypeId",
    accessorKey: "employmentTypeId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "employmentStatusId",
    header: "EmploymentStatusId",
    accessorKey: "employmentStatusId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "reportingManagerId",
    header: "ReportingManagerId",
    accessorKey: "reportingManagerId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "hireDate",
    header: "HireDate",
    accessorKey: "hireDate",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "regularizationDate",
    header: "RegularizationDate",
    accessorKey: "regularizationDate",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "firstProbationEvaluationDate",
    header: "FirstProbationEvaluationDate",
    accessorKey: "firstProbationEvaluationDate",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "finalProbationEvaluationDate",
    header: "FinalProbationEvaluationDate",
    accessorKey: "finalProbationEvaluationDate",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "contractEndDate",
    header: "ContractEndDate",
    accessorKey: "contractEndDate",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "seasonalEndDate",
    header: "SeasonalEndDate",
    accessorKey: "seasonalEndDate",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "endDate",
    header: "EndDate",
    accessorKey: "endDate",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "workLocationId",
    header: "WorkLocationId",
    accessorKey: "workLocationId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "workSetupTypeId",
    header: "WorkSetupTypeId",
    accessorKey: "workSetupTypeId",
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
        key: "employeeNumber",
        label: "EmployeeNumber",
        default: "",
      },
      {
        key: "employeeId",
        label: "EmployeeId",
        default: "",
      },
      {
        key: "groupOfCompanyId",
        label: "GroupOfCompanyId",
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
        key: "employmentTypeId",
        label: "EmploymentTypeId",
        default: "",
      },
      {
        key: "employmentStatusId",
        label: "EmploymentStatusId",
        default: "",
      },
      {
        key: "reportingManagerId",
        label: "ReportingManagerId",
        default: "",
      },
      {
        key: "hireDate",
        label: "HireDate",
        default: "",
      },
      {
        key: "regularizationDate",
        label: "RegularizationDate",
        default: "",
      },
      {
        key: "firstProbationEvaluationDate",
        label: "FirstProbationEvaluationDate",
        default: "",
      },
      {
        key: "finalProbationEvaluationDate",
        label: "FinalProbationEvaluationDate",
        default: "",
      },
      {
        key: "contractEndDate",
        label: "ContractEndDate",
        default: "",
      },
      {
        key: "seasonalEndDate",
        label: "SeasonalEndDate",
        default: "",
      },
      {
        key: "endDate",
        label: "EndDate",
        default: "",
      },
      {
        key: "workLocationId",
        label: "WorkLocationId",
        default: "",
      },
      {
        key: "workSetupTypeId",
        label: "WorkSetupTypeId",
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
        key: "employeeNumber",
        label: "EmployeeNumber",
        default: "",
      },
      {
        key: "employeeId",
        label: "EmployeeId",
        default: "",
      },
      {
        key: "groupOfCompanyId",
        label: "GroupOfCompanyId",
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
        key: "employmentTypeId",
        label: "EmploymentTypeId",
        default: "",
      },
      {
        key: "employmentStatusId",
        label: "EmploymentStatusId",
        default: "",
      },
      {
        key: "reportingManagerId",
        label: "ReportingManagerId",
        default: "",
      },
      {
        key: "hireDate",
        label: "HireDate",
        default: "",
      },
      {
        key: "regularizationDate",
        label: "RegularizationDate",
        default: "",
      },
      {
        key: "firstProbationEvaluationDate",
        label: "FirstProbationEvaluationDate",
        default: "",
      },
      {
        key: "finalProbationEvaluationDate",
        label: "FinalProbationEvaluationDate",
        default: "",
      },
      {
        key: "contractEndDate",
        label: "ContractEndDate",
        default: "",
      },
      {
        key: "seasonalEndDate",
        label: "SeasonalEndDate",
        default: "",
      },
      {
        key: "endDate",
        label: "EndDate",
        default: "",
      },
      {
        key: "workLocationId",
        label: "WorkLocationId",
        default: "",
      },
      {
        key: "workSetupTypeId",
        label: "WorkSetupTypeId",
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
      { id: "employeeNumber", label: "EmployeeNumber" },
      { id: "employeeId", label: "EmployeeId" },
      { id: "groupOfCompanyId", label: "GroupOfCompanyId" },
      { id: "companyId", label: "CompanyId" },
      { id: "departmentId", label: "DepartmentId" },
      { id: "positionId", label: "PositionId" },
      { id: "jobLevelId", label: "JobLevelId" },
      { id: "employmentTypeId", label: "EmploymentTypeId" },
      { id: "employmentStatusId", label: "EmploymentStatusId" },
      { id: "reportingManagerId", label: "ReportingManagerId" },
      { id: "hireDate", label: "HireDate" },
      { id: "regularizationDate", label: "RegularizationDate" },
      { id: "firstProbationEvaluationDate", label: "FirstProbationEvaluationDate" },
      { id: "finalProbationEvaluationDate", label: "FinalProbationEvaluationDate" },
      { id: "contractEndDate", label: "ContractEndDate" },
      { id: "seasonalEndDate", label: "SeasonalEndDate" },
      { id: "endDate", label: "EndDate" },
      { id: "workLocationId", label: "WorkLocationId" },
      { id: "workSetupTypeId", label: "WorkSetupTypeId" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const workInformation = {
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
            employeeNumber: row.employeeNumber,
            employeeId: row.employeeId,
            groupOfCompanyId: row.groupOfCompanyId,
            companyId: row.companyId,
            departmentId: row.departmentId,
            positionId: row.positionId,
            jobLevelId: row.jobLevelId,
            employmentTypeId: row.employmentTypeId,
            employmentStatusId: row.employmentStatusId,
            reportingManagerId: row.reportingManagerId,
            hireDate: row.hireDate,
            regularizationDate: row.regularizationDate,
            firstProbationEvaluationDate: row.firstProbationEvaluationDate,
            finalProbationEvaluationDate: row.finalProbationEvaluationDate,
            contractEndDate: row.contractEndDate,
            seasonalEndDate: row.seasonalEndDate,
            endDate: row.endDate,
            workLocationId: row.workLocationId,
            workSetupTypeId: row.workSetupTypeId,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            employeeNumber: row.employeeNumber,
            employeeId: row.employeeId,
            groupOfCompanyId: row.groupOfCompanyId,
            companyId: row.companyId,
            departmentId: row.departmentId,
            positionId: row.positionId,
            jobLevelId: row.jobLevelId,
            employmentTypeId: row.employmentTypeId,
            employmentStatusId: row.employmentStatusId,
            reportingManagerId: row.reportingManagerId,
            hireDate: row.hireDate,
            regularizationDate: row.regularizationDate,
            firstProbationEvaluationDate: row.firstProbationEvaluationDate,
            finalProbationEvaluationDate: row.finalProbationEvaluationDate,
            contractEndDate: row.contractEndDate,
            seasonalEndDate: row.seasonalEndDate,
            endDate: row.endDate,
            workLocationId: row.workLocationId,
            workSetupTypeId: row.workSetupTypeId,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;