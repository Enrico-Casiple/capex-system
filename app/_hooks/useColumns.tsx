import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';

type ColumnsProps<Model> = {
  extraColumns: ColumnDef<Model>[];
  showActions: boolean;
  actionCell?: (row: Model) => React.ReactNode;
};

const useColumns = <Model extends { id: string }>({
  extraColumns,
  showActions,
  actionCell,
}: ColumnsProps<Model>) => {
  const columns: ColumnDef<Model>[] = [];

  // Add selection column
  columns.push({
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-start pl-3">
        <input
          type="checkbox"
          onChange={table.getToggleAllRowsSelectedHandler()}
          className="cursor-pointer"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-start pl-3">
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="cursor-pointer"
        />
      </div>
    ),
    enableSorting: false, // by default, True so we need to disable sorting for this column
    enableColumnFilter: false, // by default, True so we need to disable filtering for this column
    size: 50,
  });

  // Add the unique columns for this table
  columns.push({
    accessorKey: 'id',
    header: 'ID',
    enableSorting: false, // by default, True so we need to disable sorting for this column
    enableColumnFilter: false, // by default, True so we need to disable filtering for this column
  });

  columns.push(...extraColumns);

columns.push({
  id: 'createdAt',
  accessorKey: 'createdAt',
  header: 'Created At',
  cell: ({ getValue }) => {
    const value = getValue();
    
    // Safety checks
    if (!value) return 'Today';
    
    try {
      const date = new Date(value as string);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Today';
      }
      
      return formatDate(date, 'PPP p'); // Format as "Jun 1, 2024, 12:00 PM"
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Today';
    }
  },
  enableSorting: false,
  enableColumnFilter: false,
});

  // columns.push({
  //   id: 'updatedAt',
  //   accessorKey: 'updatedAt',
  //   header: 'Updated At',
  //   cell: ({ getValue }) => {
  //     const date = new Date(getValue() as string);
  //     return formatDate(date, 'PPP p'); // Format the date as "Jun 1, 2024, 12:00 PM"
  //   },
  //   enableSorting: false, // by default, True so we need to disable sorting for this column
  //   enableColumnFilter: false, // by default, True so we need to disable filtering for this column
  // });

  if (showActions) {
    columns.push({
      id: 'action',
      header: 'Action',
      enableSorting: false, // by default, True so we need to disable sorting for this column
      enableColumnFilter: false, // by default, True so we need to disable filtering for this column
      cell: ({ row }) => <div>{actionCell ? actionCell(row.original) : row.original.id}</div>,
      size: 50,
    });
  }

  return columns;
};

export default useColumns;
