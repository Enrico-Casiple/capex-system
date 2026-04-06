'use client';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
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
    ...extraOptions.filter(
      (extra) => !baseOptions.some((base: ComboboxOption) => base.value === extra.value),
    ),
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
type CustomSingleSelectInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label: string;
  findAllWithCursorGQL: DocumentNode;
  findUniqueGQL: DocumentNode;
  defaultValueId?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptySelectedMessage?: string;
  emptyMessage?: string;
  cursorVariables: (search: string, cursor: string | null, take: number) => Record<string, unknown>;
  uniqueVariables: (id: string) => Record<string, unknown>;
  mapOption: (item: unknown) => ComboboxOption;
  mapDefaultOption: (data: unknown) => ComboboxOption | null;
};

// ─── Component ──────────────────────────────────────────────
const CustomSingleSelectInput = <TFormValues extends FieldValues>({
  name,
  control,
  label,
  findAllWithCursorGQL,
  findUniqueGQL,
  defaultValueId = '',
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptySelectedMessage = 'Already selected.',
  emptyMessage = 'No results found.',
  cursorVariables,
  uniqueVariables,
  mapOption,
  mapDefaultOption,
}: CustomSingleSelectInputProps<TFormValues>) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const comboData = useComboboxData({
    debouncedSearch,
    gql: findAllWithCursorGQL,
    cursorVariables,
    mapOption,
  });

  // ─── Default value ────────────────────────────────────────
  const { data: defaultData } = useQuery<Record<string, unknown>>(findUniqueGQL, {
    variables: uniqueVariables(defaultValueId),
    skip: !defaultValueId,
  });

  const defaultOption: ComboboxOption | null = defaultData
    ? mapDefaultOption(Object.values(defaultData)[0])
    : null;

  const allOptions =
    defaultOption &&
    !comboData.allOptions.some((opt: ComboboxOption) => opt.value === defaultOption.value)
      ? [defaultOption, ...comboData.allOptions]
      : comboData.allOptions;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const unselectedOptions = allOptions.filter(
          (opt: ComboboxOption) => opt.value !== field.value,
        );

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={String(name)}>{label}</FieldLabel>
            <Combobox
              items={unselectedOptions}
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val === field.value ? '' : val);
                field.onBlur();
              }}
            >
              <ComboboxInput
                placeholder={placeholder}
                showClear={!!field.value}
                render={
                  <Input
                    id={String(name)}
                    className={fieldState.invalid ? 'border-destructive' : ''}
                    value={
                      allOptions.find((opt: ComboboxOption) => opt.value === field.value)?.label ??
                      ''
                    }
                    readOnly
                    aria-invalid={fieldState.invalid}
                  />
                }
              />
              <ComboboxContent className="max-h-60 overflow-y-auto">
                {/* ─── Search ────────────────────────── */}
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
                    : unselectedOptions.length === 0 && field.value
                      ? emptySelectedMessage
                      : allOptions.length === 0
                        ? emptyMessage
                        : 'Please select.'}
                </ComboboxEmpty>

                {unselectedOptions.map((item: ComboboxOption) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}

                {/* ─── Footer ────────────────────────── */}
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
                      {unselectedOptions.length} results
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

export default CustomSingleSelectInput;

// {/* ─── Single Select ───────────────────────────────── */}
//         <CustomSingleSelectInput
//           name="userId"
//           control={form.control}
//           label="User"
//           findAllWithCursorGQL={modelGQL.UserGQL.findAllWithCursor}
//           findUniqueGQL={modelGQL.UserGQL.findUnique}
//           defaultValueId={DEFAULT_USER_ID}
//           placeholder="Select a user"
//           searchPlaceholder="Search by name..."
//           emptySelectedMessage="User already selected."
//           emptyMessage="No users found."
//           cursorVariables={(search, cursor, take) => ({
//             cursorInput: {
//               cursor,
//               isActive: true,
//               take,
//               filter: search ? { name: { contains: search, mode: 'insensitive' } } : undefined,
//             },
//           })}
//           uniqueVariables={(id) => ({ id })}
//           mapOption={(user: unknown) => {
//             const u = user as { id?: string; name?: string; userName?: string; email?: string };
//             return {
//               label: u.name ?? u.userName ?? u.email ?? '',
//               value: u.id ?? '',
//             };
//           }}
//           mapDefaultOption={(data: unknown) => {
//             const d = data as {
//               data?: { id?: string; name?: string; userName?: string; email?: string };
//             };
//             if (!d?.data) return null;
//             return {
//               label: d.data.name ?? d.data.userName ?? d.data.email ?? '',
//               value: d.data.id ?? '',
//             };
//           }}
//         />
