import { fail, ok } from '@/lib/util/reponseUtil';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import CardWrapper from '../custom/CardWrapper';
import FormProviderWrapper from './FormProviderWrapper';

type FormTemplateProps<TFormValues extends FieldValues> = {
  title: string;
  description?: string;
  isHaveBorder: boolean;
  children: React.ReactNode;
  form: UseFormReturn<TFormValues>;
  handleToSubmit: (data: TFormValues) => Promise<ReturnType<typeof ok> | ReturnType<typeof fail>>;
  isFullWidth: boolean;
};

const FormTemplate = <TFormValues extends FieldValues>(props: FormTemplateProps<TFormValues>) => {
  return (
    <div className={`w-full ${props.isFullWidth ? '' : 'max-w-md'}`}>
      <CardWrapper
        isHaveBorder={props.isHaveBorder}
        title={props.title}
        description={props.description}
      >
        <FormProviderWrapper form={props.form} handleToSubmit={props.handleToSubmit}>
          {props.children}
        </FormProviderWrapper>
      </CardWrapper>
    </div>
  );
};

export default FormTemplate;
