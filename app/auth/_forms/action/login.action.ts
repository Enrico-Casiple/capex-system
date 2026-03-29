'use server';

import { signIn } from '@/auth';
import { login } from '@/lib/pothos/Model/Custom/Model/User/user.service';
import { fail, ok } from '@/lib/util/reponseUtil';
import { AuthError } from 'next-auth';
import { headers } from 'next/headers';
import { LoginType } from '../schema/Login';

const loginAction = async (data: LoginType) => {
  try {
    // ─── Get real IP ───────────────────────────────────────
    const headersList = await headers();
    const rawIp =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      headersList.get('x-real-ip') ??
      'unknown';

    // normalize ::1 to localhost
    const ipAddress = rawIp === '::1' ? '127.0.0.1 (localhost)' : rawIp;

    const result = await login({ ...data, ipAddress });
    if (!result.isSuccess) return fail(result.code, result.message);

    try {
      await signIn('credentials', {
        account: data.account,
        password: data.password,
        otp: data.otp ?? '',
        redirect: false,
      });
    } catch (authError) {
      if (authError instanceof AuthError) {
        switch (authError.type) {
          case 'CredentialsSignin':
            return fail('LOGIN_INVALID', 'Invalid account or password');
          default:
            return fail('LOGIN_FAILED', 'Something went wrong');
        }
      }
      throw authError;
    }

    return ok('LOGIN_SUCCESS', 'Login successful', null);
  } catch (error) {
    console.error('Login action error:', error);
    return fail('LOGIN_FAILED', 'Something went wrong');
  }
};

export default loginAction;
