'use client';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';
import { Eye, EyeOff } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type CustomPasswordInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label: string;
  placeholder: string;
  inputProps?: React.ComponentProps<typeof Input>;
};

const CustomPasswordInput = <TFormValues extends FieldValues>(
  props: CustomPasswordInputProps<TFormValues>,
) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleToShow = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>
          <InputGroup>
            <Input
              {...field}
              {...props.inputProps}
              id={props.name}
              placeholder={props.placeholder}
              aria-invalid={fieldState.invalid}
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
            />
            <InputGroupAddon
              align="inline-end"
              onClick={handleToShow}
              className="cursor-pointer w-10 flex items-center justify-center ml-1"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default CustomPasswordInput;
