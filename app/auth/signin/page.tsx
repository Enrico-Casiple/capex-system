'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import loginAction from '../_forms/action/login.action';
import LoginSchema, { LoginType } from '../_forms/schema/Login';

const SignInPage = () => {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      account: '',
      password: '',
      otp: '',
    },
  });

  const handleToSubmit = async (data: LoginType) => {
    alert('Submitting form with data: ' + JSON.stringify(data));
    const login = await loginAction(data);
    if (!login.isSuccess) return login;
    alert('Login successful!');
    console.log('Login result:', login);
    return login;
  };
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Please enter your account and password to sign in. If you have 2FA enabled, you can
          </CardDescription>
          <CardContent>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleToSubmit)}>
                <div className="grid grid-cols-1 space-y-4">
                  <Controller
                    name="account"
                    control={form.control}
                    render={({ field }) => ()}
                  />
                  <div className="mb-4">
                    <Button type="submit" size={'sm'} className="rounded-sm">
                      Sign In
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SignInPage;
