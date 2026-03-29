'use server';

import { fail, ok } from '@/lib/util/reponseUtil';
import LoginSchema, { LoginType } from '../schema/Login';

const loginAction = async (data: LoginType) => {
  try {
    const validatedData = LoginSchema.safeParse(data);

    if (!validatedData.success) {
      const errorMessages = validatedData.error.issues.map((err) => err.message).join(', ');
      return fail('VALIDATION_ERROR', `Validation failed: ${errorMessages}`);
    }

    const result = validatedData.data;

    // await signIn('credentials', { ...result, redirectTo: '/home' });
    return ok('LOGIN_SUCCESS', 'Login successful', result);
  } catch (error) {
    return fail(
      'LOGIN_FAILED',
      `Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

export default loginAction;
