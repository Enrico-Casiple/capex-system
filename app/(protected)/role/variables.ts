import { Role } from "@/lib/generated/api/customHookAPI/graphql";
import { CellContext, ColumnDef, ColumnFiltersState } from "@tanstack/react-table";

interface InitialFilter {
  [key: string]: unknown;
}

class TableConfig {
  public readonly modelName: string = 'Role';
  // Action CRUD, CreateMany, UpdateMany, DeleteMany, etc. can be added as needed and the actionComponent can be designed to handle different actions based on the row data or other parameters.
  public readonly modelDescription: string = 'Role model represents the Roles of the application, containing fields such as name, email, password, and other relevant information. It is used to manage Role accounts and authentication.';
  public readonly showActions: boolean = true;
  
  public readonly extraColumns: ColumnDef<Role, unknown>[] = [
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'description', header: 'Description', accessorKey: 'description' },
    { id: 'roleType', header: 'Role Type', accessorKey: 'roleType' },
    { 
      id: 'isDefault', 
      header: 'Is Default', 
      accessorKey: 'isDefault', 
      cell: ({ getValue }: CellContext<Role, unknown>) => (getValue() ? 'Yes' : 'No'),
    },
  ];

  public readonly initialColumnVisibility = {
    id: false, 
    updatedAt: false
  };

  public readonly initialFilter: InitialFilter = {};
  
  public readonly initialColumnFilters: ColumnFiltersState = [];

  // Helper methods
  public getColumnById(id: string): ColumnDef<Role, unknown> | undefined {
    return this.extraColumns.find(col => col.id === id);
  }

  public setColumnFilter(columnId: string, value: unknown): ColumnFiltersState {
    return [{ id: columnId, value }];
  }

  public toggleColumnVisibility(columnId: string): Record<string, boolean> {
    return {
      ...this.initialColumnVisibility,
      [columnId]: !this.initialColumnVisibility[columnId as keyof typeof this.initialColumnVisibility]
    };
  }
}

// Export singleton instance
export const RoleData = new TableConfig();

// Or export individual properties for backward compatibility
export const {
  extraColumns,
  modelName: MODEL_NAME,
  modelDescription,
  initialColumnVisibility,
  initialFilter,
  showActions,
  initialColumnFilters
} = RoleData;
