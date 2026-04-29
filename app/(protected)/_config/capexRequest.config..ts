import { Request } from "@/lib/generated/api/customHookAPI/graphql";

import {
  extractSearchFieldsFromColumns,
  ListConfigItem,
  SearchableColumnDef,
} from "./shared";
import formatDate from "@/lib/util/formatDate";

const requestExtraColumns: SearchableColumnDef<Request>[] = [
  {
    id: "requestNumber",
    header: "Requester Number",
    accessorKey: "requestNumber",
    meta: { searchable: true },
  },
  {
    id: "requester",
    header: "Requester Name",
    accessorKey: "requester",
    meta: { searchable: true },
    cell: ({ row }) => {
      const requester = row.original.requester;
      return requester ? requester.name : "N/A";
    },
  },
  {
    id: "company",
    header: "Company Name",
    accessorKey: "company",
    meta: { searchable: true },
    cell: ({ row }) => {
      const company = row.original.company;
      return company ? company.name : "N/A";
    }
  },
  {
    id: "department.name",
    header: "Department Name",
    accessorKey: "department",
    meta: { searchable: true },
    cell: ({ row }) => {
      const department = row.original.department;
      return department ? department.name : "N/A";
    }
  },
  {
    id: "dateNeeded",
    header: "Date Needed",
    accessorKey: "dateNeeded",
    meta: { searchable: false }, // important
    cell: ({ row }) => {
      const dateNeeded = row.original.dateNeeded;
      return dateNeeded ? formatDate(dateNeeded) : "N/A";
    }
  },
  {
    id: "responsibilityCenter.name",
    header: "Responsibility Center",
    accessorKey: "responsibilityCenter",
    meta: { searchable: true },
    cell: ({ row }) => {
      const responsibilityCenter = row.original.responsibilityCenter;
      return responsibilityCenter ? responsibilityCenter.name : "N/A";
    }
  },
   {
    id: "status.name",
    header: "Status",
    accessorKey: "status",
    meta: { searchable: true },
    cell: ({ row }) => {
      const status = row.original.status;
      return status ? status.name : "N/A";
    }
  },
];

export const capexRequest = {
  modelName: "Request",
  listName: "Manage Capital Expenditure Requests",
  description:
    "Manage your capital expenditure requests effectively with our comprehensive management system. View, edit, and organize all your capex requests seamlessly in one place.",
  extraColumns: requestExtraColumns,
  initialColumnVisibility: {
    id: false,
    updatedAt: false,
  },
  initialFilter: {},
  showActions: true,
  initialSearchField: extractSearchFieldsFromColumns(requestExtraColumns),
} satisfies ListConfigItem<Request>;
