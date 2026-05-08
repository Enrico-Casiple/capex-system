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
        default: null,
      },
      {
        key: "description",
        label: "Description",
        default: null,
      },
      {
        key: "startTime",
        label: "StartTime",
        default: null,
      },
      {
        key: "endTime",
        label: "EndTime",
        default: null,
      },
      {
        key: "lunchStart",
        label: "LunchStart",
        default: null,
      },
      {
        key: "lunchEnd",
        label: "LunchEnd",
        default: null,
      },
      {
        key: "breakStart",
        label: "BreakStart",
        default: null,
      },
      {
        key: "breakEnd",
        label: "BreakEnd",
        default: null,
      },
      {
        key: "workDays",
        label: "WorkDays",
        default: null,
      },
      {
        key: "restDays",
        label: "RestDays",
        default: null,
      },
      {
        key: "workInformationId",
        label: "WorkInformationId",
        default: null,
      }
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
      { key: "id", label: "ID", default: null },
      {
        key: "name",
        label: "Name",
        default: null,
      },
      {
        key: "description",
        label: "Description",
        default: null,
      },
      {
        key: "startTime",
        label: "StartTime",
        default: null,
      },
      {
        key: "endTime",
        label: "EndTime",
        default: null,
      },
      {
        key: "lunchStart",
        label: "LunchStart",
        default: null,
      },
      {
        key: "lunchEnd",
        label: "LunchEnd",
        default: null,
      },
      {
        key: "breakStart",
        label: "BreakStart",
        default: null,
      },
      {
        key: "breakEnd",
        label: "BreakEnd",
        default: null,
      },
      {
        key: "workDays",
        label: "WorkDays",
        default: null,
      },
      {
        key: "restDays",
        label: "RestDays",
        default: null,
      },
      {
        key: "workInformationId",
        label: "WorkInformationId",
        default: null,
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
            name: row.name ? String(row.name) : null,
            description: row.description ? String(row.description) : null,
            startTime: row.startTime ? new Date(row.startTime) : null,
            endTime: row.endTime ? new Date(row.endTime) : null,
            lunchStart: row.lunchStart ? new Date(row.lunchStart) : null,
            lunchEnd: row.lunchEnd ? new Date(row.lunchEnd) : null,
            breakStart: row.breakStart ? new Date(row.breakStart) : null,
            breakEnd: row.breakEnd ? new Date(row.breakEnd) : null,
            workDays: row.workDays ? Number(row.workDays) : null,
            restDays: row.restDays ? Number(row.restDays) : null,
            workInformationId: row.workInformationId ? String(row.workInformationId) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            name: row.name ? String(row.name) : null,
            description: row.description ? String(row.description) : null,
            startTime: row.startTime ? new Date(row.startTime) : null,
            endTime: row.endTime ? new Date(row.endTime) : null,
            lunchStart: row.lunchStart ? new Date(row.lunchStart) : null,
            lunchEnd: row.lunchEnd ? new Date(row.lunchEnd) : null,
            breakStart: row.breakStart ? new Date(row.breakStart) : null,
            breakEnd: row.breakEnd ? new Date(row.breakEnd) : null,
            workDays: row.workDays ? Number(row.workDays) : null,
            restDays: row.restDays ? Number(row.restDays) : null,
            workInformationId: row.workInformationId ? String(row.workInformationId) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;