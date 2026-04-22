import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Control, Controller, FieldValues, Path, useWatch } from 'react-hook-form';

type CustomDateInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label: string;
  numberOfMonths?: number;
};

const CustomDateInput = <TFormValues extends FieldValues>({
  name,
  control,
  label,
  numberOfMonths = 1,
}: CustomDateInputProps<TFormValues>) => {
  const selected = useWatch({ control, name }) as Date | undefined;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                ref={triggerRef}
                variant="outline"
                id={name}
                className="justify-start px-2.5 font-normal"
                onClick={() => {
                  if (triggerRef.current) {
                    setTriggerWidth(triggerRef.current.offsetWidth);
                  }
                }}
              >
                <CalendarIcon />
                {selected ? format(selected, 'LLL dd, y') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-full p-0"
              align="start"
              style={{
                width: triggerWidth ? `256px` : '256px',
              }}
            >
              <Calendar
                mode="single"
                defaultMonth={selected}
                selected={selected}
                onSelect={(day) => {
                  field.onChange(day);
                }}
                numberOfMonths={numberOfMonths}
                showOutsideDays={false}
                className="w-full rounded-md border"
              />
            </PopoverContent>
          </Popover>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
};

export default CustomDateInput;

// <CustomDateInput
//   name="startDate"
//   control={form.control}
//   label="Start Date"
// />
