import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type CustomOTPInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label: string;
  type?: 'text' | 'number';
  length: number;
};

const CustomOTPInput = <TFormValues extends FieldValues>(
  props: CustomOTPInputProps<TFormValues>,
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>
          <InputOTP
            maxLength={props.length}
            id={props.name}
            inputMode={props.type === 'number' ? 'numeric' : 'text'}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            aria-invalid={fieldState.invalid}
            onChange={field.onChange} // ← instead of {...field}
            onBlur={field.onBlur}
          >
            <InputOTPGroup className="w-full flex flex-row justify-center gap-2 sm:gap-3">
              {Array.from({ length: props.length }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="rounded-sm border-2 first:rounded-sm! last:rounded-sm!"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default CustomOTPInput;
