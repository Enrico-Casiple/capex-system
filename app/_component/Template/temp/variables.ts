import { User } from "@/lib/generated/api/customHookAPI/graphql";
import { CellContext, ColumnDef, ColumnFiltersState, Row } from "@tanstack/react-table";

interface UserInitialFilter {
  [key: string]: unknown;
}

class UserTableConfig {
  public readonly modelName: string = 'User';
  // Action CRUD, CreateMany, UpdateMany, DeleteMany, etc. can be added as needed and the actionComponent can be designed to handle different actions based on the row data or other parameters.
  public readonly modelDescription: string = 'User model represents the users of the application, containing fields such as name, email, password, and other relevant information. It is used to manage user accounts and authentication.';
  public readonly showActions: boolean = true;
  
  public readonly extraColumns: ColumnDef<User, unknown>[] = [
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'email', header: 'Email', accessorKey: 'email' },
    { id: 'password', header: 'Password', accessorKey: 'password' },
    { id: 'userName', header: 'User Name', accessorKey: 'userName' },
    { id: 'emailVerified', header: 'Email Verified', accessorKey: 'emailVerified' },
    { id: 'image', header: 'Image', accessorKey: 'image' },
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
      }
    },
  ];

  public readonly initialColumnVisibility = {
    id: false, 
    otpCode: false, 
    password: false, 
    emailVerified: false, 
    image: false, 
    updatedAt: false
  };

  public readonly initialFilter: UserInitialFilter = {};
  
  public readonly initialColumnFilters: ColumnFiltersState = [];

  // Helper methods
  public getColumnById(id: string): ColumnDef<User, unknown> | undefined {
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
export const userTableConfig = new UserTableConfig();

// Or export individual properties for backward compatibility
export const {
  extraColumns,
  modelName: MODEL_NAME,
  modelDescription,
  initialColumnVisibility,
  initialFilter,
  showActions,
  initialColumnFilters
} = userTableConfig;
