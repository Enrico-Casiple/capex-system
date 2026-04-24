import { WorkFlowTemplate } from "@/lib/generated/api/customHookAPI/graphql";

import {
  extractSearchFieldsFromColumns,
  ListConfigItem,
  SearchableColumnDef,
} from "./shared";

const workFlowTemplateExtraColumns: SearchableColumnDef<WorkFlowTemplate>[] = [
  {
    id: "name",
    header: "Template Name",
    accessorKey: "name",
    meta: { searchable: true },
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    meta: { searchable: true },
  },
  {
    id: "isGlobal",
    header: "Global Template",
    accessorKey: "isGlobal",
    meta: { searchable: true },
  },
  {
    id: "version",
    header: "Version",
    accessorKey: "version",
    meta: { searchable: false }, // important
  },
];

export const workFlowTemplate = {
  modelName: "WorkFlowTemplate",
  listName: "Manage Workflow Templates",
  description:
    "Manage your capital expenditure requests effectively with our comprehensive management system. View, edit, and organize all your capex requests seamlessly in one place.",
  extraColumns: workFlowTemplateExtraColumns,
  initialColumnVisibility: {
    id: false,
    updatedAt: false,
  },
  initialFilter: {},
  showActions: true,
  initialSearchField: extractSearchFieldsFromColumns(workFlowTemplateExtraColumns),
} satisfies ListConfigItem<WorkFlowTemplate>;
