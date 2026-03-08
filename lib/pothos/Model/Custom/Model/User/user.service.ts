import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';
import { prisma } from '../../../../../prisma/prisma';
import { createResponse } from '../../../../../util/createResponse';
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

export const login = async (input: LoginArgs) => {
  const { account, password, otp, ipAddress = 'unknown' } = input;

  try {
    // ✅ Early validation
    if (!account?.trim() || !password?.trim()) {
      return createResponse<'User'>(
        false,
        'SERVICE_LOGIN_INVALID_INPUT',
        'Account and password are required.',
        null,
      );
    }

    // ✅ Rate limit check (fail fast)
    const rateLimitKey = `${account}_${ipAddress}`;
    try {
      await rateLimiter.consume(rateLimitKey);
    } catch (rejRes) {
      const secondsRemaining = Math.round((rejRes as RateLimiterRes).msBeforeNext / 1000);
      return createResponse<'User'>(
        false,
        'SERVICE_LOGIN_RATE_LIMITED',
        `Too many login attempts. Please try again in ${secondsRemaining} seconds.`,
        null,
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
      return createResponse<'User'>(
        false,
        'SERVICE_LOGIN_USER_NOT_FOUND',
        'User not found with the provided account.',
        null,
      );
    }

    const isPasswordValid = password === user.password; // Replace with real hash comparison in production
    if (!isPasswordValid) {
      return createResponse<'User'>(
        false,
        'SERVICE_LOGIN_INVALID_PASSWORD',
        'Please check your credentials and try again.',
        null,
      );
    }

    // ✅ If 2FA disabled, return immediately
    if (!user.isTwoFactorAuthEnabled) {
      // Reset rate limit on success
      await rateLimiter.delete(rateLimitKey).catch(() => {});

      return createResponse<'User'>(
        true,
        'SERVICE_LOGIN_SUCCESS',
        `Login successful. Welcome back, ${user.name}. Please consider enabling two-factor authentication for enhanced security.`,
        user, // Return full user object (or a safe subset in production
      );
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
      return createResponse<'User'>(
        false,
        'SERVICE_LOGIN_OTP_REQUIRED',
        'Two-factor authentication is enabled. Please provide your OTP code.',
        null,
      );
    }

    // ✅ Validate OTP
    if (otp !== user.otpCode) {
      return createResponse<'User'>(
        false,
        'SERVICE_LOGIN_INVALID_OTP',
        'Invalid OTP code. Please try again.',
        null,
      );
    }

    // ✅ Clear OTP on success
    await prisma.user.update({
      where: { id: user.id },
      data: { otpCode: null },
    });

    // Reset rate limit
    await rateLimiter.delete(rateLimitKey).catch(() => {});

    return createResponse<'User'>(
      true,
      'SERVICE_LOGIN_SUCCESS',
      `Login successful. Welcome back, ${user.name}.`,
      user,
    );
  } catch (error) {
    const errorMessage = getPrismaErrorMessage(error);

    console.error('Login service error:', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : 'No stack trace',
      type: error?.constructor?.name,
    });
    return createResponse<'User'>(
      false,
      'SERVICE_LOGIN_FAILED',
      `Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      null,
    );
  }
};
