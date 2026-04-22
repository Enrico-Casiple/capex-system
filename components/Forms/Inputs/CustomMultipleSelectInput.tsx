'use client';

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useQuery } from '@apollo/client/react';
import { DocumentNode } from 'graphql';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';

// ─── Types ──────────────────────────────────────────────────
export type ComboboxOption = { label: string; value: string };

// ─── Constants ──────────────────────────────────────────────
const INITIAL_TAKE = 20;
const LOAD_MORE_TAKE = 20;
const MAX_TAKE = 100;

// ─── Debounce hook ──────────────────────────────────────────
const useDebounce = (value: string, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

// ─── Combobox data hook ─────────────────────────────────────
const useComboboxData = ({
  debouncedSearch,
  gql,
  cursorVariables,
  mapOption,
}: {
  debouncedSearch: string;
  gql: DocumentNode;
  cursorVariables: (search: string, cursor: string | null, take: number) => Record<string, unknown>;
  mapOption: (item: unknown) => ComboboxOption;
}) => {
  const [loadMoreCursor, setLoadMoreCursor] = useState<string | null>(null);
  const [extraOptions, setExtraOptions] = useState<ComboboxOption[]>([]);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [totalLoaded, setTotalLoaded] = useState(INITIAL_TAKE);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { loading, fetchMore, data } = useQuery<Record<string, unknown>>(gql, {
    variables: cursorVariables(debouncedSearch, null, INITIAL_TAKE),
  });

  const responseKey = Object.keys(data ?? {})[0] ?? '';
  const responseData =
    (data?.[responseKey] as {
      data?: unknown[];
      nextCursor?: string | null;
    }) ?? {};

  const baseOptions: ComboboxOption[] = (responseData.data ?? []).map(mapOption);
  const nextCursor = responseData.nextCursor ?? null;
  const hasReachedMax = totalLoaded >= MAX_TAKE;
  const activeCursor = hasReachedMax ? null : hasLoadedMore ? loadMoreCursor : nextCursor;

  const allOptions = [
    ...baseOptions,
    ...extraOptions.filter((extra) => !baseOptions.some((base) => base.value === extra.value)),
  ];

  const loadMore = useCallback(async () => {
    const cursorToUse = hasLoadedMore ? loadMoreCursor : nextCursor;
    if (!cursorToUse || loading || isFetchingMore || hasReachedMax) return;

    setIsFetchingMore(true);
    try {
      const result = await fetchMore({
        variables: cursorVariables(debouncedSearch, cursorToUse, LOAD_MORE_TAKE),
      });

      if (!result.data) return;

      const resultKey = Object.keys(result.data)[0] ?? '';
      const resultData =
        (result.data[resultKey] as {
          data?: unknown[];
          nextCursor?: string | null;
        }) ?? {};

      const newOptions = (resultData.data ?? []).map(mapOption);
      setExtraOptions((prev) => [...prev, ...newOptions]);
      setLoadMoreCursor(resultData.nextCursor ?? null);
      setHasLoadedMore(true);
      setTotalLoaded((prev) => prev + newOptions.length);
    } finally {
      setIsFetchingMore(false);
    }
  }, [
    hasLoadedMore,
    loadMoreCursor,
    nextCursor,
    loading,
    isFetchingMore,
    hasReachedMax,
    debouncedSearch,
    fetchMore,
    cursorVariables,
    mapOption,
  ]);

  const resetSearch = () => {
    setLoadMoreCursor(null);
    setExtraOptions([]);
    setHasLoadedMore(false);
    setTotalLoaded(INITIAL_TAKE);
  };

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node) return;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) loadMore();
        },
        { threshold: 0.1 },
      );
      observerRef.current.observe(node);
    },
    [loadMore],
  );

  return {
    allOptions,
    activeCursor,
    hasReachedMax,
    totalLoaded,
    isLoading: loading || isFetchingMore,
    sentinelRef,
    resetSearch,
  };
};

// ─── Props ──────────────────────────────────────────────────
type CustomMultipleSelectInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label: string;
  findAllWithCursorGQL: DocumentNode;
  findAllGQL: DocumentNode; // ← for total count + select all
  defaultValueIds?: string[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyAllSelectedMessage?: string;
  emptyMessage?: string;
  maxVisible?: number; // ← chips visible before +N more
  cursorVariables: (search: string, cursor: string | null, take: number) => Record<string, unknown>;
  countVariables: () => Record<string, unknown>; // ← for total count query
  allIdsVariables: (take: number) => Record<string, unknown>; // ← for select all query
  mapOption: (item: unknown) => ComboboxOption;
};

// ─── Component ──────────────────────────────────────────────
const CustomMultipleSelectInput = <TFormValues extends FieldValues>({
  name,
  control,
  label,
  findAllWithCursorGQL,
  findAllGQL,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found.',
  maxVisible = 2,
  cursorVariables,
  countVariables,
  allIdsVariables,
  mapOption,
}: CustomMultipleSelectInputProps<TFormValues>) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectAllEnabled, setSelectAllEnabled] = useState(false);
  const debouncedSearch = useDebounce(search, 400);

  const comboData = useComboboxData({
    debouncedSearch,
    gql: findAllWithCursorGQL,
    cursorVariables,
    mapOption,
  });

  // ─── Total count (lightweight) ───────────────────────────
  const { data: countData } = useQuery<Record<string, unknown>>(findAllGQL, {
    variables: countVariables(),
  });

  const countKey = Object.keys(countData ?? {})[0] ?? '';
  const totalCount = (countData?.[countKey] as { allCount?: number })?.allCount ?? 0;

  // ─── Fetch all IDs (lazy — only on Select All click) ─────
  const { data: allIdsData, loading: allIdsLoading } = useQuery<Record<string, unknown>>(
    findAllWithCursorGQL,
    {
      variables: allIdsVariables(totalCount || 9999),
      skip: !selectAllEnabled || totalCount === 0,
    },
  );

  const allIdsKey = Object.keys(allIdsData ?? {})[0] ?? '';
  const allIds =
    (allIdsData?.[allIdsKey] as { data?: { id?: string }[] })?.data?.map((item) => item.id ?? '') ??
    [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedValues = (field.value ?? []) as string[];
        const allSelected = totalCount > 0 && selectedValues.length >= totalCount;
        const selectedOptions = comboData.allOptions.filter((opt) =>
          selectedValues.includes(opt.value),
        );

        return (
          <Field data-invalid={fieldState.invalid}>
            {/* ─── Label + Select All ──────────────── */}
            <div className="flex items-center justify-between mb-2">
              <FieldLabel htmlFor={String(name)}>{label}</FieldLabel>
              {totalCount > 0 && (
                <button
                  type="button"
                  className="text-xs text-primary hover:underline disabled:opacity-50"
                  disabled={allIdsLoading}
                  onClick={() => {
                    if (allSelected) {
                      field.onChange([]);
                      field.onBlur();
                      return;
                    }
                    if (!selectAllEnabled) {
                      setSelectAllEnabled(true);
                      return;
                    }
                    if (allIds.length > 0) {
                      field.onChange(allIds);
                      field.onBlur();
                    }
                  }}
                >
                  {allIdsLoading
                    ? 'Loading all...'
                    : allSelected
                      ? `Remove All (${selectedValues.length})`
                      : `Select All (${totalCount})`}
                </button>
              )}
            </div>

            {/* ─── Selected Chips ──────────────────────── */}
            {selectedOptions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedOptions.slice(0, maxVisible).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      const newValues = selectedValues.filter((val) => val !== opt.value);
                      field.onChange(newValues);
                      field.onBlur();
                    }}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {opt.label}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                {selectedOptions.length > maxVisible && (
                  <span className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-muted text-foreground">
                    +{selectedOptions.length - maxVisible} more
                  </span>
                )}
              </div>
            )}

            {/* ─── Popover + Command ──────────────────────── */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  id={String(name)}
                  className={cn(
                    'h-8 justify-between w-full px-3 py-2 text-sm bg-background border border-input rounded-md shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center',
                    fieldState.invalid && 'border-destructive'
                  )}
                  onClick={() => setOpen(!open)}
                >
                  <span className={selectedValues.length > 0 ? '' : 'text-muted-foreground'}>
                    {selectedValues.length > 0
                      ? `${selectedValues.length} selected`
                      : placeholder}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command shouldFilter={false} className="w-full">
                  {/* ─── Search Input ────────────────────────── */}
                  <div className="border-b w-full">
                    <Input
                      placeholder={searchPlaceholder}
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        comboData.resetSearch();
                      }}
                      className="border-0 rounded-none focus-visible:ring-0 focus-visible:outline-none"
                    />
                    {search !== debouncedSearch && (
                      <p className="px-2 py-1 text-xs text-muted-foreground">Searching...</p>
                    )}
                  </div>

                  <CommandList className="w-full max-h-[300px]">
                    <CommandEmpty className="py-2 text-center text-sm text-muted-foreground">
                      {comboData.isLoading ? 'Loading...' : emptyMessage}
                    </CommandEmpty>

                    {comboData.allOptions.length > 0 && (
                      <CommandGroup className="w-full">
                        {comboData.allOptions.map((item: ComboboxOption) => (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={() => {
                              const newValues = selectedValues.includes(item.value)
                                ? selectedValues.filter((val) => val !== item.value)
                                : [...selectedValues, item.value];
                              field.onChange(newValues);
                              field.onBlur();
                            }}
                            className="cursor-pointer"
                          >
                            <Check
                              className={cn(
                                'mr-2 h-5 w-5 transition-all rounded-full p-0.5 border-2 border-input opacity-100',
                                selectedValues.includes(item.value)
                                  ? 'text-green-600 bg-green-100 border-green-600'
                                  : 'text-muted-foreground'
                              )}
                            />
                            {item.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}

                    {/* ─── Load More Sentinel ────────────────────────── */}
                    {comboData.activeCursor && !comboData.isLoading && (
                      <div
                        ref={comboData.sentinelRef}
                        className="py-2 text-center text-xs text-muted-foreground"
                      >
                        ↓ Scroll for more
                      </div>
                    )}
                    {comboData.hasReachedMax && !comboData.isLoading && (
                      <div className="py-2 text-center text-xs text-muted-foreground">
                        Showing {comboData.totalLoaded} results — search to narrow down
                      </div>
                    )}
                    {comboData.isLoading && (
                      <div className="py-2 text-center text-xs text-muted-foreground animate-pulse">
                        Loading...
                      </div>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default CustomMultipleSelectInput;

    //  {/* ─── Multiple Select ─────────────────────────────── */}
    //       <CustomMultipleSelectInput
    //         name="userIds"
    //         control={form.control}
    //         label="Users (Multiple)"
    //         findAllWithCursorGQL={modelGQL.UserGQL.findAllWithCursor}
    //         findAllGQL={modelGQL.UserGQL.findAll}
    //         placeholder="Select users..."
    //         searchPlaceholder="Search by name..."
    //         emptyAllSelectedMessage="All users selected."
    //         emptyMessage="No users found."
    //         maxVisible={1}
    //         cursorVariables={(search, cursor, take) => ({
    //           cursorInput: {
    //             cursor,
    //             isActive: true,
    //             take,
    //             filter: search ? { name: { contains: search, mode: 'insensitive' } } : undefined,
    //           },
    //         })}
    //         countVariables={() => ({
    //           paginationInput: { currentPage: 1, pageSize: 1, isActive: true },
    //         })}
    //         allIdsVariables={(take) => ({
    //           cursorInput: { cursor: null, isActive: true, take },
    //         })}
    //         mapOption={(user: unknown) => {
    //           const u = user as { id?: string; name?: string; userName?: string; email?: string };
    //           return {
    //             label: u.name ?? u.userName ?? u.email ?? '',
    //             value: u.id ?? '',
    //           };
    //         }}