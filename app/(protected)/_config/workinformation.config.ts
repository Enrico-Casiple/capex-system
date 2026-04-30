import { BasicInformation, WorkFlowTemplate, WorkInformation } from "@/lib/generated/api/customHookAPI/graphql";
import { Row } from '@tanstack/react-table';
import {
  extractSearchFieldsFromColumns,
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "./shared";
import { generateOtpCode } from "@/lib/util/generateOtpCode";

type Model = WorkInformation;
const ModelName = "WorkInformation";
const ListModelName = `Manage ${ModelName} List`;
const ListDescription = `Manage your ${ModelName} effectively with our comprehensive management system. View, edit, and organize all your ${ModelName} seamlessly in one place.`;

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "employeeNumber",
    header: "Employee Number",
    accessorKey: "employeeNumber",
    meta: { searchable: true },
  },
  {
    id: "employeeId",
    header: "Employee Id",
    accessorKey: "employee",
    meta: { searchable: true },
    cell: ({ row }) => {
      const employee = row.original.employee;
      return employee ? employee.fullName : "N/A";
    }
  },
  {
    id: "groupOfCompany",
    header: "Group of Company",
    accessorKey: "groupOfCompany",
     cell: ({ row }) => {
      const groupOfCompany = row.original.groupOfCompany;
      return groupOfCompany ? `${groupOfCompany.acronym} ${groupOfCompany.name}` : "N/A";
    },
    meta: { searchable: false },
  },
  {
    id: "company",
    header: "Company",
    accessorKey: "company",
     cell: ({ row }) => {
      const company = row.original.company;
      return company ? `${company.acronym} ${company.name}` : "N/A";
    },
    meta: { searchable: false },
  },
   {
    id: "department",
    header: "Department",
    accessorKey: "department",
     cell: ({ row }) => {
      const department = row.original.department;
      return department ? `${department.acronym} ${department.name}` : "N/A";
    },
    meta: { searchable: false },
  },
   {
    id: "position",
    header: "Position",
    accessorKey: "position",
     cell: ({ row }) => {
      const position = row.original.position;
      return position ? `${position.acronym} ${position.name}` : "N/A";
    },
    meta: { searchable: false },
  },
  {
    id: "jobLevel",
    header: "Job Level",
    accessorKey: "jobLevel",
     cell: ({ row }) => {
      const jobLevel = row.original.jobLevel;
      return jobLevel ? `${jobLevel.acronym} ${jobLevel.name}` : "N/A";
    },
    meta: { searchable: false },
  },
  {
    id: "employmentType",
    header: "Employment Type",
    accessorKey: "employmentType",
     cell: ({ row }) => {
      const employmentType = row.original.employmentType;
      return employmentType ? `${employmentType.name}` : "N/A";
    },
    meta: { searchable: false },
  },

    {
    id: "employmentStatus",
    header: "Employment Type",
    accessorKey: "employmentStatus",
     cell: ({ row }) => {
      const employmentStatus = row.original.employmentStatus;
      return employmentStatus ? `${employmentStatus.name}` : "N/A";
    },
    meta: { searchable: false },
  },
     {
    id: "reportingManager",
    header: "Reporting Manager",
    accessorKey: "reportingManager",
     cell: ({ row }) => {
      const reportingManager = row.original.reportingManager;
      return reportingManager ? `${reportingManager.fullName}` : "N/A";
    },
    meta: { searchable: false },
  },

];

// ✅ FIXED: Use string | number | boolean | undefined for default values
const previewColumnsCreate: PreviewColumn<Model>[] = [
  { key: "employeeNumber", label: "Employee Number", default: "" },
  { key: "employeeId", label: "Employee Id", default: "" },
  { key: "companyId", label: "Company Id", default: false },
  { key: "departmentId", label: "Department Id", default: "1" },
  { key: "groupOfCompanyId", label: "Group Of Company Id", default: "1" },
   { key: "positionId", label: "Position Id", default: "1" },
   { key: "jobLevelId", label: "Job Level Id", default: "1" },
   { key: "employmentTypeId", label: "Employement Type Id", default: "1" },
   { key: "employmentStatusId", label: "Employement Status Id", default: "1" },
   { key: "reportingManagerId", label: "Reporting Manager Id", default: "1" },
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
  { key: "id", label: "ID", default: "" },
  ...previewColumnsCreate.map(col => ({ ...col })),
];
const exportColumns = [ 
   ...previewColumnsCreate.map(col => ({ id: col.key, label: col.label })),
  { id: 'createdAt', label: 'Created At' },
  { id: 'updatedAt', label: 'Updated At' },
  {id: 'employee.fullName', label: 'Employee' },
  {id: 'groupOfCompany.name', label: 'Group Of Company' },
  {id: 'company.name', label: 'Company' },
  {id: 'department.name', label: 'Department' },
  {id: 'position.name', label: 'Position' },
  {id: 'jobLevel.name', label: 'Job Level' },
  {id: 'employmentType.name', label: 'Employement Type' },
  {id: 'employmentStatus.name', label: 'Employement Status' },
  {id: 'reportingManager.fullName', label: 'Reporting Manager' },

]

const defaultExportColumns = exportColumns.map(col => col.id)

export const basicInformation = {
  modelName: ModelName,
  listName: ListModelName,
  description: ListDescription,
  extraColumns: ExtraColumns,
  initialColumnVisibility: {
    id: false,
    updatedAt: false,
  },
  initialFilter: {},
  showActions: true,
  initialSearchField: extractSearchFieldsFromColumns(ExtraColumns),
  
  transformRowCreate: async (row: Model) => {
    try {
      return {
        employeeNumber: generateOtpCode(8),
        employeeId: row.employeeId ? row.employeeId : null,
        groupOfCompanyId: row.groupOfCompanyId ? row.groupOfCompanyId : null,
        companyId: row.companyId ? row.companyId : null,
        departmentId: row.departmentId ? row.departmentId : null,
        positionId: row.positionId ? row.positionId : null,
        jobLevelId: row.jobLevelId ? row.jobLevelId : null,
        employmentTypeId: row.employmentTypeId ? row.employmentTypeId : null,
        employmentStatusId: row.employmentStatusId ? row.employmentStatusId : null,
        reportingManagerId: row.reportingManagerId ? row.reportingManagerId : null,
      };
    } catch (error) {
      console.error("Error transforming row for create:", error);
      throw error;
    }
  },

  transformRowUpdate: async (row: Model) => {
    try {
      return {
        id: row.id,
        employeeNumber: row.employeeNumber,
        employeeId: row.employeeId ? row.employeeId : null,
        groupOfCompanyId: row.groupOfCompanyId ? row.groupOfCompanyId : null,
        companyId: row.companyId ? row.companyId : null,
        departmentId: row.departmentId ? row.departmentId : null,
        positionId: row.positionId ? row.positionId : null,
        jobLevelId: row.jobLevelId ? row.jobLevelId : null,
        employmentTypeId: row.employmentTypeId ? row.employmentTypeId : null,
        employmentStatusId: row.employmentStatusId ? row.employmentStatusId : null,
        reportingManagerId: row.reportingManagerId ? row.reportingManagerId : null,
      };
    } catch (error) {
      console.error("Error transforming row for update:", error);
      throw error;
    }
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns: exportColumns,
  defaultExportColumns: defaultExportColumns,
} satisfies ListConfigItem<Model>;