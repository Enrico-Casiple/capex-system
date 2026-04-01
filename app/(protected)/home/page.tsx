'use client';
import FormTemplate from '@/components/Forms/FormTemplate';
import { Button } from '@/components/ui/button';
import { fail, ok } from '@/lib/util/reponseUtil';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import CustomDateRangeInput from '@/components/Forms/Inputs/CustomDateRangeInput';
import CustomDateInput from '@/components/Forms/Inputs/CustomDateInput';
import { useForm } from 'react-hook-form';

export const Schema = z.object({
  startDate: z.date({ error: 'Please select a start date' }),
  endDate: z.date({ error: 'Please select an end date' }),
});


export type SchemaType = z.infer<typeof Schema>;

const HomePage = () => {

const form = useForm<SchemaType>({
  resolver: zodResolver(Schema),
  defaultValues: {
    startDate: new Date(),
    endDate: new Date(),
  },
});


  const onSubmit = async (
    values: SchemaType,
  ): Promise<ReturnType<typeof ok> | ReturnType<typeof fail>> => {
    alert(`Submitted Start Date: ${values.startDate}\nSubmitted End Date: ${values.endDate}`);
    return ok(
      'SUCCESS',
      `Start Date: ${values.startDate.toISOString()}, End Date: ${values.endDate.toISOString()}`,
      { startDate: values.startDate.toISOString(), endDate: values.endDate.toISOString() },
    );
  };

  return (
    <div>
      <FormTemplate
        title="User Form"
        isHaveBorder={true}
        form={form}
        description="This is a user form"
        handleToSubmit={onSubmit}
        isFullWidth={true}
      >
        <div className="flex flex-col gap-4">
          <CustomDateRangeInput
            startName="startDate"
            endName="endDate"
            control={form.control}
            setValue={form.setValue}
            label="Date Range"
            numberOfMonths={2}
          />
          <CustomDateInput
            name="startDate"
            control={form.control}
            label="Start Date"
          />
        </div>
        <Button type="submit">Submit</Button>
      </FormTemplate>
    </div>
  );
};

export default HomePage;
