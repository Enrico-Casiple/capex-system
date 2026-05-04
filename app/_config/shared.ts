import { getJSTypeFromPrisma } from '@/lib/scripts/generateConfig';
import { ColumnConfig } from '@/lib/types/export';
import type { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';

export type StringValueKeys<T> = Extract<
  {
    [K in keyof T]-?: NonNullable<T[K]> extends string ? K : never;
  }[keyof T],
  string
>;

export type SearchableColumnDef<TData> = ColumnDef<TData, unknown> & {
  accessorKey?: Extract<keyof TData, string>;
  meta?: { searchable?: boolean, type: ReturnType<typeof getJSTypeFromPrisma> };
};

// ✅ FIXED: Changed default type from unknown to string | number | boolean | undefined
export type PreviewColumn<TData = unknown> = {
  key: keyof TData | string;
  label: string;
  default?: string | number | boolean | undefined | Record<string, unknown>;
};

export type ListConfigItem<TData = unknown,
TUpdateInput extends Record<string, unknown> = Record<string, unknown>,
TCreateInput extends Record<string, unknown> = Record<string, unknown>
> = {
  modelName: string;
  listName: string;
  description: string;
  extraColumns: ColumnDef<TData, unknown>[];
  initialColumnVisibility: Record<string, boolean>;
  initialFilter: Record<string, unknown>;
  showActions: boolean;
  initialColumnFilters?: ColumnFiltersState;
  initialSearchField?: StringValueKeys<TData>[];
  transformRowUpdate?: (row: TData) => TUpdateInput | Promise<TUpdateInput>;
  previewColumnsUpdate?: PreviewColumn<TData>[];
  transformRowCreate?: (row: TData) => TCreateInput | Promise<TCreateInput>;
  previewColumnsCreate?: PreviewColumn<TData>[];
  exportColumns?: ColumnConfig[];
  defaultExportColumns?: string[];
};

export class TableConfig<TData extends Record<string, unknown> = Record<string, unknown>,
TUpdateInput extends Record<string, unknown> = Record<string, unknown>,
TCreateInput extends Record<string, unknown> = Record<string, unknown>
> {
  public readonly modelName: string;
  public readonly listName: string;
  public readonly description: string;
  public readonly extraColumns: ColumnDef<TData, unknown>[];
  public readonly initialColumnVisibility: Record<string, boolean>;
  public readonly initialFilter: Record<string, unknown>;
  public readonly showActions: boolean;
  public readonly initialColumnFilters: ColumnFiltersState;
  public readonly initialSearchField?: StringValueKeys<TData>[];
  public readonly transformRowUpdate?: (row: TData) => TUpdateInput | Promise<TUpdateInput>;
  public readonly previewColumnsUpdate?: PreviewColumn<TData>[];
  public readonly transformRowCreate?: (row: TData) => TCreateInput | Promise<TCreateInput>;
  public readonly previewColumnsCreate?: PreviewColumn<TData>[];
  public readonly exportColumns?: ColumnConfig[];
  public readonly defaultExportColumns?: string[];

  constructor(config: ListConfigItem<TData, TUpdateInput, TCreateInput>) {
    this.modelName = config.modelName;
    this.listName = config.listName;
    this.description = config.description;
    this.extraColumns = config.extraColumns;
    this.initialColumnVisibility = config.initialColumnVisibility;
    this.initialFilter = config.initialFilter;
    this.showActions = config.showActions;
    this.initialColumnFilters = config.initialColumnFilters ?? [];
    this.initialSearchField = config.initialSearchField;
    this.transformRowUpdate = config.transformRowUpdate;
    this.previewColumnsUpdate = config.previewColumnsUpdate;
    this.transformRowCreate = config.transformRowCreate;
    this.previewColumnsCreate = config.previewColumnsCreate;
    this.exportColumns = config.exportColumns;
    this.defaultExportColumns = config.defaultExportColumns;
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

  public getPreviewColumnsUpdate(): PreviewColumn<TData>[] {
    return this.previewColumnsUpdate ?? [];
  }

  public getTransformRowUpdate(): ((row: TData) => TUpdateInput | Promise<TUpdateInput>) | undefined {
    return this.transformRowUpdate;
  }

  public getCreatePreviewColumns(): PreviewColumn<TData>[] {
    return this.previewColumnsCreate ?? [];
  }

  public getTransformRowCreate(): ((row: TData) => TCreateInput | Promise<TCreateInput>) | undefined {
    return this.transformRowCreate;
  }

  public getExportColumns(): ColumnConfig[] {
    return this.exportColumns ?? [];
  }

  public getDefaultExportColumns(): string[] {
    return this.defaultExportColumns ?? [];
  }
}

export const createTableConfig = <TData extends Record<string, unknown>, TUpdateInput extends Record<string, unknown> = Record<string, unknown>, TCreateInput extends Record<string, unknown> = Record<string, unknown>>(
  config: ListConfigItem<TData, TUpdateInput, TCreateInput>,
) => new TableConfig<TData, TUpdateInput, TCreateInput>(config);

export const extractSearchFieldsFromColumns = <TData extends Record<string, unknown>>(
  columns: SearchableColumnDef<TData>[],
): StringValueKeys<TData>[] =>
  columns
    .filter((c) => c.meta?.searchable)
    .map((c) => c.accessorKey)
    .filter((k): k is StringValueKeys<TData> => typeof k === 'string');
