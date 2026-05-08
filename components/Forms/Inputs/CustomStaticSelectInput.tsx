'use client';

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState, useRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';

// ─── Types ──────────────────────────────────────────────────
type StaticOption = { label: string; value: string };

type CustomStaticSelectInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label: string;
  options: StaticOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  required?: boolean;
  disabled?: boolean;
};

// ─── Component ──────────────────────────────────────────────
const CustomStaticSelectInput = <TFormValues extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found.',
  required = false,
  disabled = false,
}: CustomStaticSelectInputProps<TFormValues>) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedOption = options.find((opt) => opt.value === field.value);

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={String(name)}>
              {label}
              {required && <span className="text-destructive">*</span>}
            </FieldLabel>
            <Popover open={open && !disabled} onOpenChange={(newOpen) => !disabled && setOpen(newOpen)}>
              <PopoverTrigger asChild>
                <button
                  ref={triggerRef}
                  id={String(name)}
                  disabled={disabled}
                  className={cn(
                    'h-8 justify-between w-full px-3 py-2 text-sm bg-background border border-input rounded-md shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center',
                    fieldState.invalid && 'border-destructive'
                  )}
                  onClick={() => !disabled && setOpen(!open)}
                >
                  <span className={selectedOption ? '' : 'text-muted-foreground'}>
                    {selectedOption ? selectedOption.label : `Select ${label.toLowerCase()}...`}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 overflow-visible"
                align="start"
                style={{ width: triggerRef.current?.offsetWidth }}
              >
                <Command shouldFilter={false} className="w-full">
                  {/* ─── Search Input ────────────────────────── */}
                  <div className="border-b w-full">
                    <Input
                      placeholder={`Search ${label.toLowerCase()}...`}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="border-0 rounded-none focus-visible:ring-0 focus-visible:outline-none"
                    />
                  </div>

                  <CommandList
                    ref={listRef}
                    className="w-full max-h-[300px] overflow-y-scroll"
                    onWheel={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <CommandEmpty className="py-2 text-center text-sm text-muted-foreground">
                      {filteredOptions.length === 0 ? emptyMessage : null}
                    </CommandEmpty>

                    {filteredOptions.length > 0 && (
                      <CommandGroup className="w-full">
                        {filteredOptions.map((item) => (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={(value) => {
                              field.onChange(value === field.value ? '' : value);
                              setOpen(false);
                              field.onBlur();
                              setSearch('');
                            }}
                            className="cursor-pointer"
                          >
                            <Check
                              className={cn(
                                'mr-2 h-5 w-5 transition-all rounded-full p-0.5 border-2 border-input opacity-100',
                                field.value === item.value
                                  ? 'text-green-600 bg-green-100 border-green-600'
                                  : 'text-muted-foreground'
                              )}
                            />
                            {item.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
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

export default CustomStaticSelectInput;