import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';
import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type CustomCheckboxProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  placeholder?: string;
  inputProps?: React.ComponentProps<typeof Checkbox>;
}

const CustomCheckbox = <TFormValues extends FieldValues>(props: CustomCheckboxProps<TFormValues>) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <Field>
          {props.label && <FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>}
          <Checkbox
            {...field}
            {...props.inputProps}
            id={props.name}
            checked={!!field.value}
            onCheckedChange={(checked) => field.onChange(checked)}
          />
        </Field>
      )}
    />
  )
}

export default CustomCheckbox