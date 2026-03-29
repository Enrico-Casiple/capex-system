'use client';

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
} from '@/components/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useQuery } from '@apollo/client/react';
import { DocumentNode } from 'graphql';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

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
  emptyAllSelectedMessage = 'All selected.',
  emptyMessage = 'No results found.',
  maxVisible = 1,
  cursorVariables,
  countVariables,
  allIdsVariables,
  mapOption,
}: CustomMultipleSelectInputProps<TFormValues>) => {
  const [search, setSearch] = useState('');
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
        const unselectedOptions = comboData.allOptions.filter(
          (opt) => !selectedValues.includes(opt.value),
        );
        const allSelected = totalCount > 0 && selectedValues.length >= totalCount;

        return (
          <Field data-invalid={fieldState.invalid}>
            {/* ─── Label + Select All ──────────────── */}
            <div className="flex items-center justify-between">
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

            <Combobox
              multiple
              items={unselectedOptions}
              value={selectedValues}
              onValueChange={(val: string[]) => {
                field.onChange(val);
                field.onBlur();
              }}
            >
              {/* ─── Chips ───────────────────────────── */}
              <ComboboxChips
                aria-invalid={fieldState.invalid}
                className={fieldState.invalid ? 'has-aria-invalid:border-destructive' : ''}
              >
                {selectedValues.slice(0, maxVisible).map((id) => {
                  const chipLabel =
                    comboData.allOptions.find((opt) => opt.value === id)?.label ?? id;
                  return <ComboboxChip key={id}>{chipLabel}</ComboboxChip>;
                })}
                {selectedValues.length > maxVisible && (
                  <span className="flex h-[calc(--spacing(5.25))] items-center rounded-none bg-muted px-1.5 text-xs font-medium text-foreground">
                    +{selectedValues.length - maxVisible} more
                  </span>
                )}
                <ComboboxChipsInput placeholder={selectedValues.length === 0 ? placeholder : ''} />
              </ComboboxChips>

              <ComboboxContent className="max-h-60 overflow-y-auto">
                {/* ─── Search ──────────────────────── */}
                <div className="sticky top-0 z-10 bg-popover p-2">
                  <Input
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      comboData.resetSearch();
                    }}
                  />
                  {search !== debouncedSearch && (
                    <p className="mt-1 text-xs text-muted-foreground">Searching...</p>
                  )}
                </div>

                <ComboboxEmpty>
                  {comboData.isLoading
                    ? 'Loading...'
                    : unselectedOptions.length === 0 && selectedValues.length > 0
                      ? emptyAllSelectedMessage
                      : comboData.allOptions.length === 0
                        ? emptyMessage
                        : 'Please select.'}
                </ComboboxEmpty>

                {unselectedOptions.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}

                {/* ─── Footer ──────────────────────── */}
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
                {!comboData.activeCursor &&
                  !comboData.hasReachedMax &&
                  !comboData.isLoading &&
                  unselectedOptions.length > 0 && (
                    <div className="py-2 text-center text-xs text-muted-foreground">
                      {unselectedOptions.length} remaining · {selectedValues.length} selected
                    </div>
                  )}
              </ComboboxContent>
            </Combobox>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default CustomMultipleSelectInput;
