'use client';
import ListProvider from '@/app/_context/ListContext/ListProvider';
import { modelGQL } from '@/lib/api/crud.gql';
import { Query, Subscription, User } from '@/lib/generated/api/customHookAPI/graphql';
import { ColumnDef } from '@tanstack/react-table';
import useColumns from '../_hooks/useColumns';

const modelAPI = modelGQL;

type ListPageProps = {
  modelName: string;
  children: React.ReactNode;
  extraColumns?: ColumnDef<User, unknown>[];
};

const ListPage = ({ modelName, children, extraColumns = [] }: ListPageProps) => {
  const columns = useColumns<User>({
    extraColumns,
    showActions: false,
  });

  return (
    <ListProvider<
      Pick<Query, `${string}FindAllWithCursor` & keyof Query>,
      Pick<Subscription, `${string}Subscription` & keyof Subscription>,
      User
    >
      modelGQL={modelAPI}
      columns={columns}
      initialFilter={{}}
      initialColumnVisibility={{}}
      modelName={modelName}
    >
      {children}
    </ListProvider>
  );
};

export default ListPage;
