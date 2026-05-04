/**
 * EXAMPLE: Complete Table with Filtering
 * Shows how to integrate FilterBar and inline column filters
 *
 * This is a template - customize for your specific model
 */

'use client';
import React from 'react';
import TableWrapper from './TableWrapper';
import FilterBar, { type FilterConfig } from './FilterBar';

/**
 * Example usage in your data list component:
 */

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CapexRequestFiltersExampleProps {
  // Your table data and columns setup
}

// 1. Define filter configurations for the bar (above table)
const CAPEX_REQUEST_FILTERS: FilterConfig[] = [
  {
    field: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Draft', value: 'DRAFT' },
      { label: 'Pending', value: 'PENDING' },
      { label: 'Approved', value: 'APPROVED' },
      { label: 'Rejected', value: 'REJECTED' },
    ],
  },
  {
    field: 'priority',
    label: 'Priority',
    type: 'select',
    options: [
      { label: 'Low', value: 'LOW' },
      { label: 'Medium', value: 'MEDIUM' },
      { label: 'High', value: 'HIGH' },
    ],
  },
  {
    field: 'department',
    label: 'Department',
    type: 'select',
    options: [
      { label: 'IT', value: 'IT' },
      { label: 'HR', value: 'HR' },
      { label: 'Finance', value: 'FINANCE' },
      { label: 'Operations', value: 'OPERATIONS' },
    ],
  },
  {
    field: 'createdFromDate',
    label: 'Created From',
    type: 'date-range',
  },
];

// // 2. Define inline column filters (in header row)
// const CAPEX_REQUEST_COLUMN_FILTERS: ColumnFilterConfig[] = [
//   {
//     columnId: 'id',
//     filterType: 'text',
//     placeholder: 'Search ID...',
//   },
//   {
//     columnId: 'status',
//     filterType: 'select',
//     options: [
//       { label: 'Draft', value: 'DRAFT' },
//       { label: 'Pending', value: 'PENDING' },
//       { label: 'Approved', value: 'APPROVED' },
//       { label: 'Rejected', value: 'REJECTED' },
//     ],
//   },
//   {
//     columnId: 'createdAt',
//     filterType: 'date',
//   },
// ];

// Usage in your component:
export const CapexRequestTableExample: React.FC<CapexRequestFiltersExampleProps> = () => {
  // const { table, allRecordData, returnQuery } = useListContext();

  const handleFilterChange = (filters: Record<string, unknown>) => {
    console.log('Filters changed:', filters);
    // Filters are automatically sent to GraphQL via ListContext.setFilter
  };

  return (
    <div className="space-y-4">
      {/* Filter Bar - Above table */}
      <FilterBar filters={CAPEX_REQUEST_FILTERS} onFilterChange={handleFilterChange} />

      {/* Table with inline column filters */}
      {/* Note: TableWrapper uses ListContext internally and renders all components */}
      {/* To use inline filters, customize TableWrapper or pass columnFilters through ListProvider */}
      <TableWrapper />
    </div>
  );
};

export default CapexRequestTableExample;

/**
 * INTEGRATION GUIDE
 * ================
 *
 * 1. In your table component (e.g., app/(protected)/capexRequest/page.tsx):
 *
 *    import FilterBar, { type FilterConfig } from '@/app/_component/Table/FilterBar';
 *
 *    const MY_FILTERS: FilterConfig[] = [
 *      {
 *        field: 'department', // Must match GraphQL filter field name
 *        label: 'Department',
 *        type: 'select',
 *        options: [...]
 *      },
 *    ];
 *
 * 2. Define column filters for inline header filters:
 *
 *    const MY_COLUMN_FILTERS: ColumnFilterConfig[] = [
 *      {
 *        columnId: 'status', // Must match column.id
 *        filterType: 'select',
 *        options: [...]
 *      },
 *    ];
 *
 * 3. Add to your table:
 *
 *    <FilterBar filters={MY_FILTERS} />
 *    <TableWrapper>
 *      <TableHeaderWrapper
 *        table={table}
 *        enableColumnFilters={true}
 *        columnFilters={MY_COLUMN_FILTERS}
 *      />
 *    </TableHeaderWrapper>
 *
 * 4. Ensure your GraphQL query handles the filter parameters:
 *    - Backend should read: variables.cursorInput.filter
 *    - Backend should read: variables.cursorInput.search
 *    - Backend should read: variables.cursorInput.searchFields
 *
 * FILTER TYPES
 * ============
 *
 * Text Search (FilterBar):
 *   - Applies to all fields in searchFields
 *   - Sent as: search: "term", searchFields: ["field1", "field2"]
 *   - Best for: General search across multiple columns
 *
 * Column-Specific Filters (FilterBar + HeaderFilters):
 *   - Sent as: filter: { fieldName: value }
 *   - Best for: Exact match or range filtering
 *
 * Inline Header Filters:
 *   - Client-side or server-side based on your setup
 *   - React-table handles the columnFilters state
 *   - Can be combined with backend filtering
 *
 * DATA FLOW
 * =========
 *
 * User Input
 *   ↓
 * FilterBar / HeaderFilters
 *   ↓
 * setFilter() / columnFilters state
 *   ↓
 * GraphQL query variables
 *   ↓
 * Backend filtering
 *   ↓
 * Results displayed
 */
