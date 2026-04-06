'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

// ─── Types ──────────────────────────────────────────────────
type StaticOption = { label: string; value: string };

type CustomStaticSelectInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label: string;
  options: StaticOption[];
  placeholder?: string;
};

// ─── Component ──────────────────────────────────────────────
const CustomStaticSelectInput = <TFormValues extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = 'Select...',
}: CustomStaticSelectInputProps<TFormValues>) => {
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={String(name)}>{label}</FieldLabel>
          <Select
            value={field.value}
            onValueChange={(val) => {
              field.onChange(val);
            }}
            onOpenChange={(open) => {
              if (!open) {
                setSearch('');
                field.onBlur(); // ← call onBlur when dropdown closes instead
              }
            }}
          >
            <SelectTrigger
              id={String(name)}
              className={`w-full ${fieldState.invalid ? 'border-destructive' : ''}`}
              aria-invalid={fieldState.invalid}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent
              // position="popper"
              side="bottom"
              sideOffset={1}
              className="w-(--radix-select-trigger-width)"
            >
              {/* ─── Options ─────────────────────────────── */}
              <SelectGroup>
                {filteredOptions.length === 0 ? (
                  <div className="py-2 text-center text-sm text-muted-foreground">
                    No results found.
                  </div>
                ) : (
                  filteredOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default CustomStaticSelectInput;
