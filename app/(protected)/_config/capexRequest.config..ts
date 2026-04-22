import { Request } from '@/lib/generated/api/customHookAPI/graphql';

import { extractSearchFieldsFromColumns, ListConfigItem, SearchableColumnDef } from './shared';

const requestExtraColumns: SearchableColumnDef<Request>[] = [
  {
    id: 'requester.name',
    header: 'Requester Name',
    accessorKey: 'requester',
    meta: { searchable: true } },
  {
    id: 'company.name',
    header: 'Company Name',
    accessorKey: 'company',
    meta: { searchable: true },
  },
  { id: 'department.name',
    header: 'Department Name',
    accessorKey: 'department',
     meta: { searchable: true }
  },
   {
    id: 'dateNeeded',
    header: 'Date Needed',
    accessorKey: 'dateNeeded',
    meta: { searchable: false }, // important
  },
   {
    id: 'responsibilityCenter.name',
    header: 'Responsibility Center',
    accessorKey: 'responsibilityCenter',
    meta: { searchable: true },
  },
  {
    id: 'requestedBudget.approvedAmount',
    header: 'Requested Budget',
    accessorKey: 'requestedBudget',
    meta: { searchable: true },
  },
   {
    id: 'quotaionAmount',
    header: 'Quotation Amount',
    accessorKey: 'quotaionAmount',
    meta: { searchable: true },
  },

];

export const capexRequest = {
  modelName: 'Request',
  listName: 'Manage Capital Expenditure Requests',
  description:
    'Manage your capital expenditure requests effectively with our comprehensive management system. View, edit, and organize all your capex requests seamlessly in one place.',
  extraColumns: requestExtraColumns,
  initialColumnVisibility: {
    id: false,
    updatedAt: false,
  },
  initialFilter: {},
  showActions: true,
  initialSearchField: extractSearchFieldsFromColumns(requestExtraColumns),
} satisfies ListConfigItem<Request>;
