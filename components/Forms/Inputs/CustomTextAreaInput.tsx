import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type CustomTextAreaInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label: string;
  placeholder: string;
  inputProps?: React.ComponentProps<typeof Textarea>;
};

const CustomTextAreaInput = <TFormValues extends FieldValues>(
  props: CustomTextAreaInputProps<TFormValues>,
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>
          <Textarea
            {...field}
            {...props.inputProps}
            id={props.name}
            placeholder={props.placeholder}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default CustomTextAreaInput;
