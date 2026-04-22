import { CellContext, Row } from '@tanstack/react-table';
import { extractSearchFieldsFromColumns, ListConfigItem, SearchableColumnDef } from './shared';
import { User } from '@/lib/generated/api/customHookAPI/graphql';

const userExtraColumns: SearchableColumnDef<User>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', meta: { searchable: true } },
  { id: 'email', header: 'Email', accessorKey: 'email', meta: { searchable: true } },
  { id: 'password', header: 'Password', accessorKey: 'password', meta: { searchable: false } },
  { id: 'userName', header: 'User Name', accessorKey: 'userName', meta: { searchable: true } },
  {
    id: 'emailVerified',
    header: 'Email Verified',
    accessorKey: 'emailVerified',
    meta: { searchable: false },
  },
  { id: 'image', header: 'Image', accessorKey: 'image', meta: { searchable: false } },
  {
    id: 'isTwoFactorAuthEnabled',
    header: 'Two-Factor Authentication',
    accessorKey: 'isTwoFactorAuthEnabled',
    cell: ({ getValue }: CellContext<User, unknown>) => (getValue() ? 'Enabled' : 'Disabled'),
  },
  { id: 'otpCode', header: 'OTP Code', accessorKey: 'otpCode' },
  {
    id: 'isActive',
    header: 'Active',
    accessorKey: 'isActive',
    cell: ({ getValue }: CellContext<User, unknown>) => (getValue() ? 'Active' : 'Inactive'),
    filterFn: (row: Row<User>, id: string, value: unknown) => {
      const rowValue = row.getValue(id);
      return rowValue === value;
    },
  },
];
export const user = {
  modelName: 'User',
  listName: 'Manage Users',
  description:
    'Manage your users effectively with our user management system. View, edit, and organize user information seamlessly.',
  extraColumns: userExtraColumns,
  initialColumnVisibility: {
    id: false,
    password: false,
    emailVerified: false,
    image: false,
    otpCode: false,
    updatedAt: false,
  },
  initialFilter: {},
  showActions: true,
  initialSearchField: extractSearchFieldsFromColumns(userExtraColumns),
} satisfies ListConfigItem<User>;
