'use client';
import ListProvider from '@/app/_context/ListContext/ListProvider';
import { modelGQL } from '@/lib/api/crud.gql';
import { Query, Subscription } from '@/lib/generated/api/customHookAPI/graphql';
import useColumns from '../_hooks/useColumns';
import { ColumnDef } from '@tanstack/react-table';

const modelAPI = modelGQL;

type ListPageProps<
  TModelName extends string,
  TReturnModel extends { id: string } = { id: string }
> = {
  modelName: TModelName;
  returnModel: TReturnModel;
  children: React.ReactNode;
  filter: Record<string, unknown>;
  extraColumns?: ColumnDef<TReturnModel, unknown>[];
};

const ListPage = <
  TModelName extends string,
  TReturnModel extends { id: string } = { id: string }
>({
  modelName,
  children,
  returnModel,
  extraColumns = [],
}: ListPageProps<TModelName, TReturnModel>) => {

  const columns = useColumns<TReturnModel>({
    extraColumns,
    showActions: false,
  });

  return (
    <ListProvider<
      Pick<Query, `${TModelName}FindAllWithCursor` & keyof Query>,
      Pick<Subscription, `${TModelName}Subscription` & keyof Subscription>,
      TReturnModel
    >
      singleKey={`${modelName}FindUnique` as keyof Query}
      cursorKey={`${modelName}FindAllWithCursor` as keyof Query}
      subscriptionKey={`${modelName}Subscription` as keyof Subscription}
      modelGQL={modelAPI}
      model={`${modelName}GQL` as keyof typeof modelAPI}
      returnModel={returnModel}
      columns={columns}
      initialFilter={{}}
      initialColumnVisibility={{}}
    >
      {children}
    </ListProvider>
  );
};

export default ListPage;
