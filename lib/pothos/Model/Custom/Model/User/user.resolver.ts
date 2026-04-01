import { builder } from '../../../../builder';
import { responseRefs } from '../../../../Response';
import { login } from './user.service';

const LoginArgs = builder.inputType('UserLoginInput', {
  fields: (t) => ({
    account: t.string({ required: true, description: 'Email or username of the user.' }),
    password: t.string({ required: true, description: 'Password of the user.' }),
    otp: t.string({ required: false, description: 'One-time password for 2FA, if enabled.' }),
    ipAddress: t.string({
      required: false,
      description:
        'IP address of the client making the login request, used for rate limiting. Optional but recommended.',
    }),
  }),
});

builder.mutationField('UserLogin', (t) =>
  t.field({
    type: responseRefs['User'],
    description:
      'Login a user with account and password, optionally with OTP and IP address for rate limiting.',
    args: {
      input: t.arg({
        type: LoginArgs,
        required: true,
        description:
          'Input for user login, including account, password, optional OTP and IP address for rate limiting.',
      }),
    },
    resolve: async (_parent, args) => {
      const result = await login({
        account: args.input.account,
        password: args.input.password,
        otp: args.input.otp || undefined,
        ipAddress: args.input.ipAddress || undefined,
      });

      if (!result.isSuccess) {
        return {
          isSuccess: false,
          code: result.code,
          message: result.message,
          data: null,
        };
      }

      return result;
    },
  }),
);
