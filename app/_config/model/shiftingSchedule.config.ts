import { ShiftingSchedule } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = ShiftingSchedule;
const ModelName = "ShiftingSchedule";
const ListModelName = "Manage Shifting Schedule List";
const ListDescription = "Manage your Shifting Schedule effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "startTime",
    header: "StartTime",
    accessorKey: "startTime",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "endTime",
    header: "EndTime",
    accessorKey: "endTime",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "lunchStart",
    header: "LunchStart",
    accessorKey: "lunchStart",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "lunchEnd",
    header: "LunchEnd",
    accessorKey: "lunchEnd",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "breakStart",
    header: "BreakStart",
    accessorKey: "breakStart",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "breakEnd",
    header: "BreakEnd",
    accessorKey: "breakEnd",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "workDays",
    header: "WorkDays",
    accessorKey: "workDays",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "restDays",
    header: "RestDays",
    accessorKey: "restDays",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "workInformationId",
    header: "WorkInformationId",
    accessorKey: "workInformationId",
    meta: { searchable: false, type: "string" },
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
        key: "name",
        label: "Name",
        default: "",
      },
      {
        key: "description",
        label: "Description",
        default: "",
      },
      {
        key: "startTime",
        label: "StartTime",
        default: "",
      },
      {
        key: "endTime",
        label: "EndTime",
        default: "",
      },
      {
        key: "lunchStart",
        label: "LunchStart",
        default: "",
      },
      {
        key: "lunchEnd",
        label: "LunchEnd",
        default: "",
      },
      {
        key: "breakStart",
        label: "BreakStart",
        default: "",
      },
      {
        key: "breakEnd",
        label: "BreakEnd",
        default: "",
      },
      {
        key: "workDays",
        label: "WorkDays",
        default: 0,
      },
      {
        key: "restDays",
        label: "RestDays",
        default: 0,
      },
      {
        key: "workInformationId",
        label: "WorkInformationId",
        default: "",
      }
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
      { key: "id", label: "ID", default: "" },
      {
        key: "name",
        label: "Name",
        default: "",
      },
      {
        key: "description",
        label: "Description",
        default: "",
      },
      {
        key: "startTime",
        label: "StartTime",
        default: "",
      },
      {
        key: "endTime",
        label: "EndTime",
        default: "",
      },
      {
        key: "lunchStart",
        label: "LunchStart",
        default: "",
      },
      {
        key: "lunchEnd",
        label: "LunchEnd",
        default: "",
      },
      {
        key: "breakStart",
        label: "BreakStart",
        default: "",
      },
      {
        key: "breakEnd",
        label: "BreakEnd",
        default: "",
      },
      {
        key: "workDays",
        label: "WorkDays",
        default: 0,
      },
      {
        key: "restDays",
        label: "RestDays",
        default: 0,
      },
      {
        key: "workInformationId",
        label: "WorkInformationId",
        default: "",
      }
];

const exportColumns = [
      { id: "id", label: "ID" },
      { id: "name", label: "Name" },
      { id: "description", label: "Description" },
      { id: "startTime", label: "StartTime" },
      { id: "endTime", label: "EndTime" },
      { id: "lunchStart", label: "LunchStart" },
      { id: "lunchEnd", label: "LunchEnd" },
      { id: "breakStart", label: "BreakStart" },
      { id: "breakEnd", label: "BreakEnd" },
      { id: "workDays", label: "WorkDays" },
      { id: "restDays", label: "RestDays" },
      { id: "workInformationId", label: "WorkInformationId" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const shiftingSchedule = {
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
            name: row.name,
            description: row.description,
            startTime: row.startTime,
            endTime: row.endTime,
            lunchStart: row.lunchStart,
            lunchEnd: row.lunchEnd,
            breakStart: row.breakStart,
            breakEnd: row.breakEnd,
            workDays: row.workDays,
            restDays: row.restDays,
            workInformationId: row.workInformationId,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            name: row.name,
            description: row.description,
            startTime: row.startTime,
            endTime: row.endTime,
            lunchStart: row.lunchStart,
            lunchEnd: row.lunchEnd,
            breakStart: row.breakStart,
            breakEnd: row.breakEnd,
            workDays: row.workDays,
            restDays: row.restDays,
            workInformationId: row.workInformationId,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;