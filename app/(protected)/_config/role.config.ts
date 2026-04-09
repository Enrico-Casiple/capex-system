import { Role } from '@/lib/generated/api/customHookAPI/graphql';

import { CellContext } from '@tanstack/react-table';
import { extractSearchFieldsFromColumns, ListConfigItem, SearchableColumnDef } from './shared';

const roleExtraColumns: SearchableColumnDef<Role>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', meta: { searchable: true } },
  {
    id: 'description',
    header: 'Description',
    accessorKey: 'description',
    meta: { searchable: true },
  },
  { id: 'roleType', header: 'Role Type', accessorKey: 'roleType', meta: { searchable: true } },
  {
    id: 'isDefault',
    header: 'Is Default',
    accessorKey: 'isDefault',
    cell: ({ getValue }: CellContext<Role, unknown>) => (getValue() ? 'Yes' : 'No'),
    meta: { searchable: false }, // important
  },
];

export const role = {
  modelName: 'Role',
  listName: 'Manage Roles',
  description:
    'Manage your roles effectively with our role management system. View, edit, and organize role information seamlessly.',
  extraColumns: roleExtraColumns,
  initialColumnVisibility: {
    id: false,
    updatedAt: false,
  },
  initialFilter: {},
  showActions: true,
  initialSearchField: extractSearchFieldsFromColumns(roleExtraColumns),
} satisfies ListConfigItem<Role>;
