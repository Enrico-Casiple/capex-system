'use client';
import useToast from '@/app/_hooks/useToast';
import FormTemplate from '@/components/Forms/FormTemplate';
import CustomButton from '@/components/Forms/Inputs/CustomButton';
import CustomOTPInput from '@/components/Forms/Inputs/CustomOTPInput';
import CustomPasswordInput from '@/components/Forms/Inputs/CustomPasswordInput';
import CustomTextInput from '@/components/Forms/Inputs/CustomTextInput';
import { fail, ok } from '@/lib/util/reponseUtil';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import loginAction from '../_forms/action/login.action';
import LoginSchema, { LoginType } from '../_forms/schema/Login';

const SignInPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const toast = useToast();
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      account: '',
      password: '',
      otp: '',
    },
  });

  const handleToSubmit = async (
    data: LoginType,
  ): Promise<ReturnType<typeof ok> | ReturnType<typeof fail>> => {
    const login = await loginAction(data);
    if (login.code === 'SERVICE_LOGIN_OTP_SENDING') {
      setIsAuthOpen(true);
      toast.success({
        message: 'OTP Sent!',
        description:
          'An OTP has been sent to your email. Please check and enter it to verify your account.',
      });
      return fail(login.code, login.message);
    }
    if (!login.isSuccess) {
      toast.error({
        message: `Login failed! ${login.message} (Code: ${login.code})`,
        description: 'Please check your credentials and try again.',
      });
      return fail(login.code, login.message);
    }
    window.location.href = '/home';
    toast.success({
      message: 'Login successful!',
      description: `Welcome back. Message: ${login.message} Code: ${login.code}`,
    });
    return login;
  };
  return (
    <FormTemplate
      isHaveBorder={true}
      title={isAuthOpen ? 'Verify' : 'Sign In'}
      description={
        isAuthOpen
          ? 'Please enter the OTP sent to your email to verify your account.'
          : 'Please enter your account or email and password to sign in.'
      }
      form={form}
      handleToSubmit={handleToSubmit}
      isFullWidth={false}
    >
      <div className="flex flex-col gap-4">
        {isAuthOpen ? (
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex justify-end -mb-9 z-20 -mr-2">
              <CustomButton
                name="Re-send"
                loading={false}
                type="button"
                isSolo={true}
                variant="ghost"
                inputPropsSubmit={{
                  onClick: () => alert(`Hello Re-send Button`),
                  className: 'cursor-pointer',
                }}
              />
            </div>
            <CustomOTPInput name="otp" control={form.control} label="OTP" length={6} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 mb-4">
            <CustomTextInput
              name="account"
              control={form.control}
              label="Account or Email"
              placeholder="Enter your account or email"
            />
            <div className="flex justify-end -mb-10 z-20 -mr-2">
              <CustomButton
                name="Forgot Password"
                loading={false}
                type="button"
                isSolo={true}
                variant="ghost"
                inputPropsSubmit={{
                  onClick: () => alert(`Hello Forgot Button`),
                  className: 'cursor-pointer',
                }}
              />
            </div>
            <CustomPasswordInput
              name="password"
              control={form.control}
              label="Password"
              placeholder="Enter your password"
            />
          </div>
        )}

        <div className="flex justify-center -mt-3">
          <CustomButton
            name={isAuthOpen ? 'Verify' : 'Sign In'}
            loading={false}
            type="submit"
            isSolo={true}
          />
        </div>
      </div>
    </FormTemplate>
  );
};

export default SignInPage;
