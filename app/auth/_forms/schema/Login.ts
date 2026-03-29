import z from 'zod';

const LoginSchema = z.object({
  account: z.string().min(1, 'Account is required'),
  password: z.string().min(1, 'Password is required'),
  otp: z.string().optional(),
});

export type LoginType = z.infer<typeof LoginSchema>;

export default LoginSchema;
