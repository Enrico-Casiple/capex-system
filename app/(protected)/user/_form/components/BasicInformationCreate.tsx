import React from 'react'
import { Layers } from 'lucide-react';
import CustomTextInput from '@/components/Forms/Inputs/CustomTextInput';
import CustomStaticSelectInput from '@/components/Forms/Inputs/CustomStaticSelectInput';
import { UserFormValues } from '../Method';
import { UseFormReturn } from 'react-hook-form';

type BasicInformationCreateProps = {
  isViewMode: boolean;
  form: UseFormReturn<UserFormValues>;
}

const BasicInformationCreate = ({ isViewMode, form }: BasicInformationCreateProps) => {
  // Form Watch the first name and middleNamne and last name to generate the full name
  const firstName = form.watch("basicInformations.firstName");
  const middleName = form.watch("basicInformations.middleName");
  const lastName = form.watch("basicInformations.lastName");

  React.useEffect(() => {
    const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");
    form.setValue("basicInformations.fullName", fullName);
    form.setValue("name", fullName);
  }, [firstName, middleName, lastName, form.setValue]);

  return (
    <div className="space-y-6">
      {/* Header section with Icon */}
      <div className="flex items-center gap-3 pb-2 border-b">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Basic Information Configuration</h3>
          <p className="text-xs text-muted-foreground">
            Configure the basic information including name, gender, and personal details.
          </p>
        </div>
      </div>
      {/* Form section with Icon */}
      <div className='grid grid-cols-1 gap-4 pb-4'>
        <div className='grid grid-cols-10 gap-4'>
          <div className='col-span-3'>
            <CustomTextInput
              name="basicInformations.firstName"
              control={form.control}
              label="First Name"
              placeholder="Please enter first name"
              inputProps={{ disabled: isViewMode }}
            />
          </div>
          <div className='col-span-3'>
            <CustomTextInput
              name="basicInformations.middleName"
              control={form.control}
              label="Middle Name"
              placeholder="Please enter middle name"
              inputProps={{ disabled: isViewMode }}
            />
          </div>
          <div className='col-span-3'>
            <CustomTextInput
              name="basicInformations.lastName"
              control={form.control}
              label="Last Name"
              placeholder="Please enter last name"
              inputProps={{ disabled: isViewMode }}
            />
          </div>
          <div className='col-span-1'>
            <CustomStaticSelectInput
              name="basicInformations.suffix"
              control={form.control}
              label="Suffix"
              options={[
                { label: "Junior", value: "Jr." },
                { label: "Senior", value: "Sr." },
                { label: "The Second", value: "II." },
                { label: "The Third", value: "III." },
              ]}
              placeholder="Select suffix"
              disabled={isViewMode}
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <CustomTextInput
            name="basicInformations.fullName"
            control={form.control}
            label="Full Name"
            placeholder="Please enter full name"
            inputProps={{ disabled: isViewMode }}
          />
          <CustomStaticSelectInput
            name="basicInformations.gender"
            control={form.control}
            label="Gender"
            options={[
              { label: "Male", value: "Male." },
              { label: "Female", value: "Female." },
              { label: "Other", value: "Other." },
            ]}
            placeholder="Select gender"
            disabled={isViewMode}
          />
        </div>
      </div>
    </div>
  )
}

export default BasicInformationCreate