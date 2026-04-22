// store/list.store.ts
import { ModelGQLMap } from '@/lib/api/crud.gql';
import { Subscription } from '@/lib/generated/api/customHookAPI/graphql';
import { ColumnDef } from '@tanstack/react-table';
import { create } from 'zustand';

const MAX_TAKE = 20;

type ListState<TModel = unknown> = {
  // config (set once on init)
  singleKey: string; // ← changed from keyof Query
  cursorKey: string; // ← changed from keyof Query
  subscriptionKey: keyof Subscription;
  modelGQL: ModelGQLMap;
  model: keyof ModelGQLMap;
  columns: ColumnDef<TModel, unknown>[];
  initialFilter: Record<string, unknown>;
  initialColumnVisibility: Record<string, boolean>;

  // state
  cursor: string | null;
  active: boolean;
  filter: Record<string, unknown> | null;
  take: number;
  newItems: TModel[];
  paginationPageIndex: { pageIndex: number; pageSize: number };
  columnVisibility: Record<string, boolean>;

  // actions
  setCursor: (cursor: string | null) => void;
  setActive: (active: boolean) => void;
  setFilter: (filter: Record<string, unknown> | null) => void;
  setTake: (take: number) => void;
  setNewItems: (items: TModel[]) => void;
  setPaginationPageIndex: (p: { pageIndex: number; pageSize: number }) => void;
  setColumnVisibility: (v: Record<string, boolean>) => void;
  reset: () => void;
};

export const createListStore = <TModel = unknown>(
  init: Pick<
    ListState<TModel>,
    | 'singleKey'
    | 'cursorKey'
    | 'subscriptionKey'
    | 'modelGQL'
    | 'model'
    | 'columns'
    | 'initialFilter'
    | 'initialColumnVisibility'
  >,
) =>
  create<ListState<TModel>>((set) => ({
    ...init,
    cursor: null,
    active: true,
    filter: init.initialFilter,
    take: MAX_TAKE,
    newItems: [],
    paginationPageIndex: { pageIndex: 0, pageSize: MAX_TAKE },
    columnVisibility: init.initialColumnVisibility,
    setCursor: (cursor) => set({ cursor }),
    setActive: (active) => set({ active }),
    setFilter: (filter) => set({ filter }),
    setTake: (take) => set({ take }),
    setNewItems: (newItems) => set({ newItems }),
    setPaginationPageIndex: (paginationPageIndex) => set({ paginationPageIndex }),
    setColumnVisibility: (columnVisibility) => set({ columnVisibility }),
    reset: () =>
      set({
        cursor: null,
        active: true,
        filter: init.initialFilter,
        take: MAX_TAKE,
        newItems: [],
        paginationPageIndex: { pageIndex: 0, pageSize: MAX_TAKE },
        columnVisibility: init.initialColumnVisibility,
      }),
  }));

export type ListStoreApi<TModel = unknown> = ReturnType<typeof createListStore<TModel>>;
