'use client';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useQuery } from '@apollo/client/react';
import { DocumentNode } from 'graphql';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ... rest of your code stays the same until the component ...

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
  const [open, setOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 400);

  const comboData = useComboboxData({
    debouncedSearch,
    gql: findAllWithCursorGQL,
    cursorVariables,
    mapOption,
  });

  const { data: defaultData } = useQuery<Record<string, unknown>>(findUniqueGQL, {
    variables: uniqueVariables(defaultValueId),
    skip: !defaultValueId,
  });

  const defaultOption: ComboboxOption | null = defaultData
    ? mapDefaultOption(Object.values(defaultData)[0])
    : null;

  const allOptions =
    defaultOption && !comboData.allOptions.some((opt) => opt.value === defaultOption.value)
      ? [defaultOption, ...comboData.allOptions]
      : comboData.allOptions;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const unselectedOptions = allOptions.filter((opt) => opt.value !== field.value);
        const selectedOption = allOptions.find((opt) => opt.value === field.value);

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={String(name)}>{label}</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    'w-full justify-between',
                    !field.value && 'text-muted-foreground',
                    fieldState.invalid && 'border-destructive'
                  )}
                >
                  {selectedOption?.label || placeholder}
                  <div className="flex items-center gap-1">
                    {field.value && (
                      <X
                        className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          field.onChange('');
                          field.onBlur();
                        }}
                      />
                    )}
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder={searchPlaceholder}
                    value={search}
                    onValueChange={(value: string) => {
                      setSearch(value);
                      comboData.resetSearch();
                    }}
                  />
                  {search !== debouncedSearch && (
                    <p className="px-2 py-1 text-xs text-muted-foreground">Searching...</p>
                  )}
                  <CommandList className="max-h-60">
                    <CommandEmpty>
                      {comboData.isLoading
                        ? 'Loading...'
                        : unselectedOptions.length === 0 && field.value
                          ? emptySelectedMessage
                          : allOptions.length === 0
                            ? emptyMessage
                            : 'Please select.'}
                    </CommandEmpty>
                    <CommandGroup>
                      {unselectedOptions.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={item.value}
                          onSelect={(currentValue: string) => {
                            field.onChange(currentValue === field.value ? '' : currentValue);
                            field.onBlur();
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value === item.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {item.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>

                    {/* Footer */}
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