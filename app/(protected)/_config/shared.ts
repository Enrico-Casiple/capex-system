import type { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';

export type StringValueKeys<T> = Extract<
  {
    [K in keyof T]-?: NonNullable<T[K]> extends string ? K : never;
  }[keyof T],
  string
>;

export type SearchableColumnDef<TData> = ColumnDef<TData, unknown> & {
  accessorKey?: Extract<keyof TData, string>;
  meta?: { searchable?: boolean };
};

export type ListConfigItem<TData = unknown> = {
  modelName: string;
  listName: string;
  description: string;
  extraColumns: ColumnDef<TData, unknown>[];
  initialColumnVisibility: Record<string, boolean>;
  initialFilter: Record<string, unknown>;
  showActions: boolean;
  initialColumnFilters?: ColumnFiltersState;
  initialSearchField?: StringValueKeys<TData>[];
};

export class TableConfig<TData extends Record<string, unknown> = Record<string, unknown>> {
  public readonly modelName: string;
  public readonly listName: string;
  public readonly description: string;
  public readonly extraColumns: ColumnDef<TData, unknown>[];
  public readonly initialColumnVisibility: Record<string, boolean>;
  public readonly initialFilter: Record<string, unknown>;
  public readonly showActions: boolean;
  public readonly initialColumnFilters: ColumnFiltersState;
  public readonly initialSearchField?: StringValueKeys<TData>[];

  constructor(config: ListConfigItem<TData>) {
    this.modelName = config.modelName;
    this.listName = config.listName;
    this.description = config.description;
    this.extraColumns = config.extraColumns;
    this.initialColumnVisibility = config.initialColumnVisibility;
    this.initialFilter = config.initialFilter;
    this.showActions = config.showActions;
    this.initialColumnFilters = config.initialColumnFilters ?? [];
    this.initialSearchField = config.initialSearchField;
  }

  public getColumnById(id: string): ColumnDef<TData, unknown> | undefined {
    return this.extraColumns.find((col) => col.id === id);
  }

  public setColumnFilter(columnId: string, value: unknown): ColumnFiltersState {
    return [{ id: columnId, value }];
  }

  public toggleColumnVisibility(columnId: string): Record<string, boolean> {
    return {
      ...this.initialColumnVisibility,
      [columnId]: !this.initialColumnVisibility[columnId],
    };
  }
}

export const createTableConfig = <TData extends Record<string, unknown>>(
  config: ListConfigItem<TData>,
) => new TableConfig<TData>(config);

export const extractSearchFieldsFromColumns = <TData extends Record<string, unknown>>(
  columns: SearchableColumnDef<TData>[],
): StringValueKeys<TData>[] =>
  columns
    .filter((c) => c.meta?.searchable)
    .map((c) => c.accessorKey)
    .filter((k): k is StringValueKeys<TData> => typeof k === 'string');
