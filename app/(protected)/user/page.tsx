'use client';
import UserData from '@/app/_component/UserData';
import ListPage from '@/app/_context/ListWrapper';
import { User } from '@/lib/generated/api/customHookAPI/graphql';
import { ColumnDef } from '@tanstack/react-table';

const extraColumns: ColumnDef<User, unknown>[] = [
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'name', header: 'Name', accessorKey: 'name' },
];

const UserPage = () => (
  <ListPage modelName="User" extraColumns={extraColumns}>
    <UserData />
  </ListPage>
);

export default UserPage;
