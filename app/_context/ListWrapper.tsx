'use client';
import ListProvider from '@/app/_context/ListContext/ListProvider';
import { modelGQL } from '@/lib/api/crud.gql';
import { Query, Subscription } from '@/lib/generated/api/customHookAPI/graphql';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import useColumns from '../_hooks/useColumns';

const modelAPI = modelGQL;

type ListPageProps<ModelShape extends { id?: string | null }> = {
  modelName: string;
  children: React.ReactNode;
  extraColumns?: ColumnDef<ModelShape, unknown>[];
  initialColumnVisibility: Record<string, boolean>;
  initialFilter: Record<string, unknown>;
  showActions: boolean;
  initialColumnFilters?: ColumnFiltersState;
  actionComponent: (row: ModelShape) => React.ReactNode;
  initialSearchField: string[];
};

const ListPage = <ModelShape extends { id?: string | null }>({
  modelName,
  children,
  extraColumns = [],
  initialColumnVisibility,
  initialFilter,
  showActions,
  initialColumnFilters = [],
  actionComponent,
  initialSearchField = [],
}: ListPageProps<ModelShape>) => {
  const columns = useColumns<ModelShape>({
    extraColumns,
    showActions,
    actionCell: actionComponent,
  });

  // TODO: ROLE ACCESS FOR VIEW -> IF UNAUTHORIZARE SHOW 403 PAGE OR SOMETHING THAT YOU ARE NOT ALLOWED TO VIEW THIS PAGE

  return (
    <ListProvider<
      Pick<Query, `${string}FindAllWithCursor` & keyof Query>,
      Pick<Subscription, `${string}Subscription` & keyof Subscription>,
      ModelShape
    >
      modelGQL={modelAPI}
      columns={columns}
      initialFilter={initialFilter}
      initialColumnVisibility={initialColumnVisibility}
      modelName={modelName}
      initialColumnFilters={initialColumnFilters} // Pass this down
      initialSearchField={initialSearchField}
    >

      {children}
    </ListProvider>
  );
};

export default ListPage;
