import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';
import LoginSchema, { LoginType } from '../../../../../../app/auth/_forms/schema/Login';
import { fail, ok } from '../../../../../../lib/util/reponseUtil';
import { prisma } from '../../../../../prisma/prisma';
import { generateOtpCode } from '../../../../../util/generateOtpCode';
import { getPrismaErrorMessage } from '../../../../../util/getPrismaErrorMessage';

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 3600,
});

export type LoginArgs = {
  account: string;
  password: string;
  otp?: string | null;
  ipAddress?: string | null;
};

export const login = async (input: LoginType) => {
  const validatedData = LoginSchema.safeParse(input);

  if (!validatedData.success) {
    const errorMessages = validatedData.error.issues.map((err) => err.message).join(', ');
    console.error('Validation errors:', validatedData.error.issues);
    return fail('VALIDATION_ERROR', `Validation failed: ${errorMessages}`);
  }

  const { account, password, otp, ipAddress = 'unknown' } = validatedData.data;
  console.log(`Login attempt for account: ${account} from IP: ${ipAddress}`);

  try {
    // ✅ Early validation
    if (!account?.trim() || !password?.trim()) {
      return fail('SERVICE_LOGIN_INVALID_INPUT', 'Account and password are required.');
    }

    // ✅ Rate limit check (fail fast)
    const rateLimitKey = `${account}_${ipAddress}`;
    try {
      await rateLimiter.consume(rateLimitKey);
    } catch (rejRes) {
      const secondsRemaining = Math.round((rejRes as RateLimiterRes).msBeforeNext / 1000);
      return fail(
        'SERVICE_LOGIN_RATE_LIMITED',
        `Too many login attempts. Please try again in ${secondsRemaining} seconds.`,
      );
    }

    // ✅ Find user + validate password in parallel preparation
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: account }, { userName: account }],
        isActive: true, // Filter early
      },
    });

    if (!user) {
      return fail('SERVICE_LOGIN_USER_NOT_FOUND', 'User not found with the provided account.');
    }

    const isPasswordValid = password === user.password; // Replace with real hash comparison in production
    if (!isPasswordValid) {
      console.warn(`Invalid password attempt for user: ${account} from IP: ${ipAddress}`);
      return fail('SERVICE_LOGIN_INVALID_PASSWORD', 'Please check your credentials and try again.');
    }

    // ✅ If 2FA disabled, return immediately
    if (!user.isTwoFactorAuthEnabled) {
      // Reset rate limit on success
      await rateLimiter.delete(rateLimitKey).catch(() => {});

      return ok('SERVICE_LOGIN_SUCCESS', `Login successful. Welcome back, ${user.name}.`, user);
    }

    // ✅ 2FA enabled: Generate OTP only if needed
    if (!otp) {
      const code = await generateOtpCode(6);

      // ✅ Update OTP asynchronously (non-blocking)
      prisma.user
        .update({
          where: { id: user.id },
          data: { otpCode: code },
        })
        .catch((err) => console.error('OTP update failed:', err));

      // TODO: Send OTP via email/SMS
      console.log(`🟢 TODO: Send OTP to ${user.email}. OTP: ${code}`);
      return fail(
        'SERVICE_LOGIN_OTP_SENDING',
        'Sending your OTP code. Please check your email and enter the code to complete login.',
      );
    }

    // ✅ Validate OTP
    if (otp !== user.otpCode) {
      return fail('SERVICE_LOGIN_INVALID_OTP', 'Invalid OTP code. Please try again.');
    }

    // ✅ Clear OTP on success
    await prisma.user.update({
      where: { id: user.id },
      data: { otpCode: null },
    });

    // Reset rate limit
    await rateLimiter.delete(rateLimitKey).catch(() => {});

    return ok('SERVICE_LOGIN_SUCCESS', `Login successful. Welcome back, ${user.name}.`, user);
  } catch (error) {
    const errorMessage = getPrismaErrorMessage(error);

    console.error('Login service error:', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : 'No stack trace',
      type: error?.constructor?.name,
    });
    return fail('SERVICE_LOGIN_FAILED', `Login failed: ${errorMessage}`);
  }
};
