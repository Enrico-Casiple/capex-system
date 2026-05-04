'use client';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import React from 'react';
import { Column } from '@tanstack/react-table';

interface ColumnFilterOption {
  label: string;
  value: string;
}

interface ColumnFilterCellProps<T> {
  column: Column<T>;
  filterType?: 'text' | 'select' | 'date';
  options?: ColumnFilterOption[];
  placeholder?: string;
}

const ColumnFilterCell = React.forwardRef<
  HTMLDivElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ColumnFilterCellProps<any>
>(
  (
    { column, filterType = 'text', options, placeholder },
    ref
  ) => {
    const filterValue = (column.getFilterValue() ?? '') as string;

    const handleFilterChange = (value: string) => {
      if (value) {
        column.setFilterValue(value);
      } else {
        column.setFilterValue(undefined);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      column.setFilterValue(undefined);
    };

    if (filterType === 'select' && options) {
      return (
        <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
          <Select value={filterValue} onValueChange={handleFilterChange}>
            <SelectTrigger size="sm" className="h-8 border-dashed text-xs">
              <SelectValue
                placeholder={placeholder || 'Filter...'}
                className="text-xs"
              />
            </SelectTrigger>
            <SelectContent align="start" side="bottom">
              {filterValue && (
                <SelectItem value="">
                  <div className="flex items-center gap-2">
                    <span>Clear</span>
                    <X className="size-3" />
                  </div>
                </SelectItem>
              )}
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (filterType === 'date') {
      return (
        <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
          <Input
            type="date"
            value={filterValue}
            onChange={(e) => handleFilterChange(e.target.value)}
            placeholder={placeholder || 'Filter by date...'}
            className="h-8 text-xs"
          />
          {filterValue && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      );
    }

    // Default: text filter
    return (
      <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
        <Input
          type="text"
          value={filterValue}
          onChange={(e) => handleFilterChange(e.target.value)}
          placeholder={placeholder || 'Filter...'}
          className="h-8 border-dashed text-xs"
        />
        {filterValue && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    );
  }
);

ColumnFilterCell.displayName = 'ColumnFilterCell';

export default ColumnFilterCell;
export type { ColumnFilterCellProps, ColumnFilterOption };
