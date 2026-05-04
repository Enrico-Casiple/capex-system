# Table Filtering System - Complete Guide

## Overview

Your table now has a comprehensive, two-level filtering system:

1. **FilterBar** - Advanced filter panel above the table with search + custom filters
2. **Inline Column Filters** - Quick filters directly in the table header row

Both systems work together and integrate with your GraphQL backend.

---

## Components

### 1. FilterBar Component

**File:** `/app/_component/Table/FilterBar.tsx`

**Purpose:** Display search bar + configurable filter controls above the table

**Features:**

- Global search across all fields
- Custom filters (text input, select dropdown, date picker)
- Visual filter badges showing active filters
- Clear all / individual filter removal
- Persists filter state via ListContext

**Usage:**

```tsx
import FilterBar, { type FilterConfig } from '@/app/_component/Table/FilterBar';

const MY_FILTERS: FilterConfig[] = [
  {
    field: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Active', value: 'ACTIVE' },
      { label: 'Inactive', value: 'INACTIVE' },
    ],
  },
  {
    field: 'department',
    label: 'Department',
    type: 'text',
    placeholder: 'Enter department...',
  },
  {
    field: 'createdDate',
    label: 'Created Date',
    type: 'date',
  },
];

export default function MyTable() {
  return (
    <>
      <FilterBar filters={MY_FILTERS} />
      {/* rest of table */}
    </>
  );
}
```

**FilterConfig Interface:**

```tsx
interface FilterConfig {
  field: string; // GraphQL filter field name
  label: string; // Display label
  type: 'text' | 'select' | 'date-range';
  placeholder?: string; // Input placeholder
  options?: {
    // For select type
    label: string;
    value: string;
  }[];
}
```

---

### 2. ColumnFilterCell Component

**File:** `/app/_component/Table/ColumnFilterCell.tsx`

**Purpose:** Individual column filter inputs that appear in header row

**Features:**

- Compact inline filters under each column name
- Support for text, select, and date filters
- Clear button for quick reset
- Click-stops to prevent row selection

**Usage:** (Usually via TableHeaderWrapper - see below)

```tsx
import ColumnFilterCell from '@/app/_component/Table/ColumnFilterCell';

// Manually create filter for specific column
<ColumnFilterCell
  column={column}
  filterType="select"
  options={[
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
  ]}
/>;
```

---

### 3. Updated TableHeaderWrapper

**File:** `/app/_component/Table/TableHeaderWrapper.tsx`

**Purpose:** Now includes both column headers AND inline filter row

**Features:**

- Dual-row header (names + inline filters)
- Configurable per-column filter types
- Optional (can disable inline filters)
- Maintains sort icons and click handlers

**Usage:**

```tsx
import TableHeaderWrapper, {
  type ColumnFilterConfig,
} from '@/app/_component/Table/TableHeaderWrapper';

const COLUMN_FILTERS: ColumnFilterConfig[] = [
  {
    columnId: 'id',
    filterType: 'text',
    placeholder: 'Search ID...',
  },
  {
    columnId: 'status',
    filterType: 'select',
    options: [
      { label: 'Draft', value: 'DRAFT' },
      { label: 'Active', value: 'ACTIVE' },
    ],
  },
  {
    columnId: 'createdAt',
    filterType: 'date',
  },
];

<TableHeaderWrapper table={table} enableColumnFilters={true} columnFilters={COLUMN_FILTERS} />;
```

**ColumnFilterConfig Interface:**

```tsx
interface ColumnFilterConfig {
  columnId: string; // Must match column.id exactly
  filterType?: 'text' | 'select' | 'date';
  options?: {
    // For select type
    label: string;
    value: string;
  }[];
  placeholder?: string;
}
```

---

## Integration Points

### 1. ListContext State Management

The filtering system uses existing ListContext state:

```tsx
{
  filter: Record<string, unknown> | null,      // Backend filters
  setFilter: (filter) => void,
  searchItems: string | null,                  // Global search term
  setSearchItems: (term) => void,
  searchFields: string[] | null,               // Fields to search in
  setSearchFields: (fields) => void,
  columnFilters: ColumnFiltersState,           // React-table column filters
}
```

### 2. GraphQL Query Variables

Your backend receives filter data via the GraphQL query:

```graphql
query FindAllWithCursor($cursorInput: CursorInput!) {
  capexRequestFindAllWithCursor(cursorInput: $cursorInput) {
    data { /* ... */ }
    cursor
  }
}
```

With variables:

```json
{
  "cursorInput": {
    "cursor": null,
    "take": 20,
    "filter": {
      "status": "DRAFT",
      "department": "IT"
    },
    "search": "budget",
    "searchFields": ["id", "title", "description"]
  }
}
```

### 3. Backend Implementation

Your Pothos GraphQL schema should handle these filter parameters:

```ts
// lib/pothos/schema.ts
t.field('capexRequestFindAllWithCursor', (t) =>
  t.field({
    args: {
      cursorInput: t.arg({ type: CursorInput }),
    },
    resolve: async (_, { cursorInput }) => {
      const { filter, search, searchFields, cursor, take } = cursorInput;

      // Build Prisma where clause from filter
      const where = {
        ...(search &&
          searchFields?.length && {
            OR: searchFields.map((field) => ({
              [field]: { contains: search, mode: 'insensitive' },
            })),
          }),
        ...(filter && buildFilterWhere(filter)),
      };

      return prisma.capexRequest.findMany({
        where,
        cursor: cursor ? { id: cursor } : undefined,
        take,
      });
    },
  }),
);
```

---

## Complete Example

See `/app/_component/Table/FILTERING_EXAMPLE.tsx` for a full working example.

### Real Implementation Pattern:

```tsx
// app/(protected)/capexRequest/page.tsx
'use client';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import TableWrapper from '@/app/_component/Table/TableWrapper';
import TableHeaderWrapper, { type ColumnFilterConfig } from '@/app/_component/Table/TableHeaderWrapper';
import TableBodyWrapper from '@/app/_component/Table/TableBodyWrapper';
import TableFooterWrapper from '@/app/_component/Table/TableFooterWrapper';
import FilterBar, { type FilterConfig } from '@/app/_component/Table/FilterBar';

// 1. Define what filters appear in the filter bar
const FILTER_CONFIGS: FilterConfig[] = [
  { field: 'status', label: 'Status', type: 'select', options: [...] },
  { field: 'priority', label: 'Priority', type: 'select', options: [...] },
  { field: 'department', label: 'Department', type: 'text' },
];

// 2. Define which columns have inline filters
const COLUMN_FILTER_CONFIGS: ColumnFilterConfig[] = [
  { columnId: 'id', filterType: 'text' },
  { columnId: 'status', filterType: 'select', options: [...] },
];

export default function CapexRequestPage() {
  const { table, allRecordData, returnQuery } = useListContext();

  return (
    <div className="space-y-4">
      {/* Search + Filter bar above table */}
      <FilterBar filters={FILTER_CONFIGS} />

      {/* Table with inline column filters */}
      <TableWrapper table={table} isLoading={returnQuery.loading} data={allRecordData}>
        <TableHeaderWrapper
          table={table}
          enableColumnFilters={true}
          columnFilters={COLUMN_FILTER_CONFIGS}
        />
        <TableBodyWrapper table={table} data={allRecordData} />
        <TableFooterWrapper table={table} />
      </TableWrapper>
    </div>
  );
}
```

---

## Key Features

### ✅ Two-Level Filtering

- **FilterBar**: Advanced filters + global search (shown above table)
- **Inline Filters**: Quick column-specific filters (in header row)

### ✅ Filter Types

- **Text**: Simple substring search
- **Select**: Dropdown with predefined options
- **Date**: Date picker for range queries

### ✅ Visual Feedback

- Active filter badges with remove buttons
- "Clear All" button when filters are active
- Disabled state for unused columns

### ✅ State Management

- Syncs with GraphQL queries automatically
- Persists filter state in ListContext
- Supports pagination with active filters

### ✅ Accessibility

- Keyboard navigation
- Click handlers properly stop propagation
- Screen reader labels

---

## Customization

### Disable Inline Filters

```tsx
<TableHeaderWrapper
  table={table}
  enableColumnFilters={false} // Disables the filter row
/>
```

### Only Show FilterBar (No Inline)

```tsx
<FilterBar filters={FILTER_CONFIGS} />
<TableHeaderWrapper table={table} enableColumnFilters={false} />
```

### Custom Filter Styling

Edit the Tailwind classes in:

- `FilterBar.tsx` - Filter bar container styling
- `ColumnFilterCell.tsx` - Individual filter input styling

---

## Troubleshooting

### Filters not sending to backend

- ✅ Check GraphQL schema accepts `filter` parameter
- ✅ Verify `field` names in FilterConfig match backend field names
- ✅ Ensure ListContext is wrapping your table

### Inline filters not showing

- ✅ Set `enableColumnFilters={true}` on TableHeaderWrapper
- ✅ Provide `columnFilters` array with matching `columnId` values
- ✅ Verify column IDs match exactly (case-sensitive)

### Style issues with background colors

- ✅ Inline filter row uses `bg-muted/30` background
- ✅ Action/Select columns use `bg-background/50` to stand out
- ✅ Customize these in TableHeaderWrapper class names

---

## Performance Notes

- FilterBar uses debouncing on search input (controlled updates)
- ColumnFilterCell stops propagation to prevent row selection
- React-table handles client-side columnFilters efficiently
- Backend filters reduce API payload for large datasets

---

## Next Steps

1. **Customize for your model**: Create FilterConfig for your specific fields
2. **Add to your table component**: Use the pattern in FILTERING_EXAMPLE.tsx
3. **Test filtering**: Try FilterBar and inline filters together
4. **Optimize backend**: Ensure GraphQL resolver handles filters efficiently

---

## Support

For questions or issues with the filtering system:

1. Check FILTERING_EXAMPLE.tsx for usage patterns
2. Review component props and interfaces
3. Verify GraphQL schema integration
