import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Control, Controller, FieldValues, Path, UseFormSetValue, useWatch } from 'react-hook-form';

type CustomDateRangeInputProps<TFormValues extends FieldValues> = {
  startName: Path<TFormValues>;
  endName: Path<TFormValues>;
  control: Control<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  label: string;
  numberOfMonths?: number;
};

const CustomDateRangeInput = <TFormValues extends FieldValues>({
  startName,
  endName,
  control,
  setValue,
  label,
  numberOfMonths = 2,
}: CustomDateRangeInputProps<TFormValues>) => {
  const startDate = useWatch({ control, name: startName }) as Date | undefined;
  const endDate = useWatch({ control, name: endName }) as Date | undefined;

  return (
    <Controller
      name={startName}
      control={control}
      render={({ formState }) => (
        <Field data-invalid={!!formState.errors[startName] || !!formState.errors[endName]}>
          <FieldLabel htmlFor={startName}>{label}</FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id={startName}
                className="justify-start px-2.5 font-normal"
              >
                <CalendarIcon />
                {startDate && endDate ? (
                  <>{format(startDate, 'LLL dd, y')} – {format(endDate, 'LLL dd, y')}</>
                ) : startDate ? (
                  format(startDate, 'LLL dd, y')
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={startDate}
                selected={{ from: startDate, to: endDate }}
                onSelect={(range) => {
                  setValue(startName, range?.from as TFormValues[typeof startName], { shouldValidate: true });
                  setValue(endName, range?.to as TFormValues[typeof endName], { shouldValidate: true });
                }}
                numberOfMonths={numberOfMonths}
                showOutsideDays={false}
              />
            </PopoverContent>
          </Popover>
          <FieldError
            errors={[
              (formState.errors[startName] ?? formState.errors[endName]) as { message?: string } | undefined,
            ]}
          />
        </Field>
      )}
    />
  );
};

export default CustomDateRangeInput;

{/* <CustomDateRangeInput
    startName="startDate"
    endName="endDate"
    control={form.control}
    setValue={form.setValue}
    label="Date Range"
    numberOfMonths={2}
/> */}