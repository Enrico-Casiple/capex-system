import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';
import LoginSchema, { LoginType } from '../../../../../../app/auth/_forms/schema/Login';
import { fail, ok } from '../../../../../../lib/util/reponseUtil';
import { prisma } from '../../../../../prisma/prisma';
import { getSendEmailService } from '../../../../../sendEmail';
import { verifyPassword } from '../../../../../util/bcryptjs';
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

    const isPasswordValid = await verifyPassword(user.password as string, password); // Replace with real hash comparison in production
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

    // ✅ 2FA enabled: Generate and send OTP via email
    if (!otp) {
      const generateOTP = await generateOtpCode(6); // Replace with real OTP generation logic
      const result = await getSendEmailService().sendOtpEmail({
        purpose: 'Login',
        otp_code: generateOTP,
        expires_in: '5 minutes', // make this a 5mins
        bcc: [user.email as string],
      });

      if (result.isSuccess) {
        console.log(`OTP sent successfully to ${user.email} for account: ${account} from IP: ${ipAddress}`);
        // Save OTP to database with expiration (not implemented here, but should be done in production)
        await prisma.user.update({
          where: { id: user.id },
          data: {
            otpCode: generateOTP,
            emailOtpExpiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
          }
        });

        return fail(
          'SERVICE_LOGIN_OTP_SENDING',
          'OTP has been sent to your email. Please check and enter the code to complete login.',
        );
      } else {
        return fail(
          'SERVICE_LOGIN_OTP_SEND_FAILED',
          'Failed to send OTP. Please try again later.',
        );
      }
    }

    // ✅ Verify OTP
    const isOtpInvalid = otp !== user.otpCode || !user.emailOtpExpiresAt || user.emailOtpExpiresAt < new Date();

    if (isOtpInvalid) {
      const attempts = (user.incrementalLoginAttempts ?? 0) + 1;
      const maxAttempts = 3;
      const shouldLock = attempts >= maxAttempts;

      await prisma.user.update({
        where: { id: user.id },
        data: {
          otpCode: null,
          emailOtpExpiresAt: null,
          incrementalLoginAttempts: attempts,
          isActive: !shouldLock, // Deactivate after max attempts
        }
      });

      if (shouldLock) {
        return fail('SERVICE_LOGIN_ACCOUNT_LOCKED', `Account locked after ${maxAttempts} failed OTP attempts. Please contact support.`);
      }

      return fail('SERVICE_LOGIN_INVALID_OTP', `Invalid or expired OTP code. Attempts remaining: ${maxAttempts - attempts}`);
    }


    // ✅ OTP verified successfully, mark user as logged in
    // Reset rate limit and clear OTP data
    await rateLimiter.delete(rateLimitKey).catch(() => {});

    await prisma.user.update({
      where: { id: user.id },
      data: {
        otpCode: null,
        emailOtpExpiresAt: null,
        incrementalLoginAttempts: 0, // Reset attempts on successful login
      }
    });

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
