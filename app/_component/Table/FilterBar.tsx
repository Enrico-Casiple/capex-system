'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Search } from 'lucide-react';
import React from 'react';
import { useListContext } from '@/app/_context/ListContext/ListProvider';

interface FilterConfig {
  field: string;
  label: string;
  type: 'text' | 'select' | 'date-range';
  placeholder?: string;
  options?: { label: string; value: string }[];
}

interface FilterBarProps {
  filters: FilterConfig[];
  onFilterChange?: (filters: Record<string, unknown>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const { filter, setFilter, searchItems, setSearchItems } = useListContext();
  const [localFilters, setLocalFilters] = React.useState<Record<string, unknown>>(filter || {});
  const [searchTerm, setSearchTerm] = React.useState(searchItems || '');

  const handleFilterChange = (field: string, value: unknown) => {
    const newFilters = { ...localFilters, [field]: value };
    if (value === '' || value === null) {
      delete newFilters[field];
    }
    setLocalFilters(newFilters);
    setFilter(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setSearchItems(value || null);
  };

  const handleClearAll = () => {
    setLocalFilters({});
    setSearchTerm('');
    setFilter(null);
    setSearchItems(null);
  };

  const hasActiveFilters = Object.keys(localFilters).length > 0 || searchTerm.length > 0;

  return (
    <div className="mb-4 space-y-3 rounded-lg border border-border bg-card p-4">
      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search all records..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="gap-2"
          >
            <X className="size-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Filter controls */}
      {filters.length > 0 && (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {filters.map((filterConfig) => (
            <div key={filterConfig.field}>
              {filterConfig.type === 'text' && (
                <Input
                  placeholder={filterConfig.placeholder || `Filter by ${filterConfig.label}...`}
                  value={(localFilters[filterConfig.field] as string) || ''}
                  onChange={(e) => handleFilterChange(filterConfig.field, e.target.value)}
                  className="h-9 text-sm"
                />
              )}

              {filterConfig.type === 'select' && (
                <Select
                  value={(localFilters[filterConfig.field] as string) || ''}
                  onValueChange={(value) => handleFilterChange(filterConfig.field, value)}
                >
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder={`Select ${filterConfig.label}...`} />
                  </SelectTrigger>
                  <SelectContent>
                    {filterConfig.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {filterConfig.type === 'date-range' && (
                <Input
                  type="date"
                  value={(localFilters[filterConfig.field] as string) || ''}
                  onChange={(e) => handleFilterChange(filterConfig.field, e.target.value)}
                  className="h-9 text-sm"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm">
              <span>Search: <span className="font-semibold">{searchTerm}</span></span>
              <button
                onClick={() => handleSearchChange('')}
                className="ml-1 hover:text-destructive"
              >
                <X className="size-3" />
              </button>
            </div>
          )}
          {Object.entries(localFilters).map(([field, value]) => {
            const filterConfig = filters.find((f) => f.field === field);
            const label = filterConfig?.label || field;
            const displayValue = filterConfig?.type === 'select'
              ? filterConfig.options?.find((o) => o.value === value)?.label || String(value)
              : String(value);

            return (
              <div key={field} className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm">
                <span>{label}: <span className="font-semibold">{displayValue}</span></span>
                <button
                  onClick={() => handleFilterChange(field, '')}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="size-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
export type { FilterConfig, FilterBarProps };
