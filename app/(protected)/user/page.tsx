'use client';
import UserData from '@/app/_component/UserData';
import ListPage from '@/app/_context/ListWrapper';
import { User } from '@/lib/generated/zod/prisma-zod-types';
import { ColumnDef } from '@tanstack/react-table';

const extraColumns: ColumnDef<User, unknown>[] = [
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'name',  header: 'Name',  accessorKey: 'name'  },
];

const UserPage = () => (
  <ListPage<'User', User>
    modelName="User"
    returnModel={null as unknown as User}
    filter={{}}
    extraColumns={extraColumns}
  >
    <UserData />
  </ListPage>
);

export default UserPage;
