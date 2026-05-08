import React from 'react'
import { UseFormReturn } from 'react-hook-form';
import { UserFormValues } from '../Method';
import CustomPasswordInput from '@/components/Forms/Inputs/CustomPasswordInput';
import { Layers } from 'lucide-react';
import CustomImportInput from '@/components/Forms/Inputs/CustomImportInput';
import CustomTextInput from '@/components/Forms/Inputs/CustomTextInput';
import { ActionType } from '@/app/_component/Row/Action';
import UnblockButton from './Button/UnblockButton';
import AuthButton from './Button/AuthenticationButton';

type UserCreateProps = {
  isViewMode: boolean;
  form: UseFormReturn<UserFormValues>;
  actionType?: ActionType;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBlocked: boolean;
  isAuth: boolean;
}

const UserCreate = ({ form, isViewMode, actionType, id, setOpen, isBlocked, isAuth }: UserCreateProps) => {
  // ✅ Extract email and set username
  const emailValue = form.watch("email");
  React.useEffect(() => {
    if (emailValue) {
      const username = emailValue.split("@")[0];
      form.setValue("userName", username);
    }
  }, [emailValue, form.setValue]);

  // ✅ Watch password and confirm password fields
  const passwordValue = form.watch("password");
  const confirmPasswordValue = form.watch("confirmPassword");

  React.useEffect(() => {
    // Clear errors if either field is empty
    if (!passwordValue || !confirmPasswordValue) {
      form.clearErrors("confirmPassword");
      return;
    }

    // Check if passwords match
    if (passwordValue !== confirmPasswordValue) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      form.clearErrors("confirmPassword");
    }
  }, [passwordValue, confirmPasswordValue, form.setError, form.clearErrors]);

  return (
    <div className="space-y-6">
      {/* Header section with Icon */}
      <div className="w-full">
        <div className="flex items-center gap-3 pb-2 border-b">
          {/* Left Content */}
          <div className="flex items-center gap-4 flex-1">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">
                User Account Configuration
              </h3>
              <p className="text-xs text-muted-foreground">
                Configure account details including profile picture, credentials, and contact information.
              </p>
            </div>
          </div>

          {/* Right Actions */}
          {actionType === "edit" && (
            <div className="flex items-center gap-2 shrink-0">
              <UnblockButton
                isViewMode={isViewMode}
                id={id}
                setOpen={setOpen}
                isBlocked={isBlocked}
              />
              <AuthButton
                isViewMode={isViewMode}
                id={id}
                setOpen={setOpen}
                isAuth={isAuth}
              />
            </div>
          )}
        </div>
      </div>

      {/* Form section */}
      <div className='grid grid-cols-1 gap-4 pb-4'>
        <div className='grid grid-cols-2 gap-4'>
          {/* Profile Picture */}
          <div className='col-span-2'>
            <CustomImportInput<UserFormValues>
              name="image"
              label="Profile Picture"
              control={form.control}
              setError={form.setError}
              clearErrors={form.clearErrors}
              maxSizeMB={10}
              allowedExtensions={["jpeg", "jpg", "png"]}
              dropzoneProps={{ maxFiles: 1 }}
              disabled={isViewMode}
            />
          </div>

          {/* Name */}
          <div className='col-span-2'>
            <CustomTextInput
              name="name"
              control={form.control}
              label="Name"
              inputProps={{ disabled: isViewMode }}
              placeholder="Please enter employee name"
            />
          </div>

          {/* Email and Username */}
          <CustomTextInput
            name="email"
            control={form.control}
            label="Email"
            inputProps={{ disabled: isViewMode }}
            placeholder="Please enter employee email"
          />
          <CustomTextInput
            name="userName"
            control={form.control}
            label="Username"
            inputProps={{ disabled: isViewMode }}
            placeholder="Please enter employee username"
          />


          {/* Password and Confirm Password */}
          {
            (actionType === 'none' || actionType === 'duplicate') && (
              <CustomPasswordInput
                name="password"
                control={form.control}
                label="Password"
                placeholder="Enter your password"
                inputProps={{ disabled: isViewMode }}
              />
            )
          }
          {
            (actionType === 'none' || actionType === 'duplicate') && (
              <CustomPasswordInput
                name="confirmPassword"
                control={form.control}
                label="Confirm Password"
                placeholder="Confirm your password"
                inputProps={{ disabled: isViewMode }}
              />
            )
          }

        </div>
      </div>
    </div>
  );
};

export default UserCreate