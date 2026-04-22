import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type CustomNumberInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label: string;
  placeholder: string;
  inputProps?: React.ComponentProps<typeof Input>;
};

const CustomNumberInput = <TFormValues extends FieldValues>(
  props: CustomNumberInputProps<TFormValues>,
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>
          <Input
            {...field}
            {...props.inputProps}
            id={props.name}
            placeholder={props.placeholder}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            type="number"
            min={0}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default CustomNumberInput;
