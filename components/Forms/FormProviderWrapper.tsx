import { fail, ok } from '@/lib/util/reponseUtil';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { FieldGroup } from '../ui/field';

type FormProviderWrapperProps<TFormValues extends FieldValues> = {
  children: React.ReactNode;
  form: UseFormReturn<TFormValues>;
  handleToSubmit: (data: TFormValues) => Promise<ReturnType<typeof ok> | ReturnType<typeof fail>>;
};

const FormProviderWrapper = <TFormValues extends FieldValues>(
  props: FormProviderWrapperProps<TFormValues>,
) => {
  return (
    <div>
      <FormProvider {...props.form}>
        <form onSubmit={props.form.handleSubmit(props.handleToSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <FieldGroup>{props.children}</FieldGroup>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormProviderWrapper;
