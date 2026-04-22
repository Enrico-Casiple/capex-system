import { checkRateLimit } from '../pothos/rateLimiter';
import { Context } from '../pothos/subscription';

// Helper to enforce rate limit and return error response if exceeded
export const enforceRateLimit = async (ctx: Context, modelName: string) => {
  const consume = await checkRateLimit(ctx.session?.user?.email ?? 'anonymous');
  if (!consume.allowed) {
    console.log(`==================================================================================`);
    console.log(`🚦 Rate limit exceeded for user email: ${ctx.session?.user?.email}`);
    console.log(`==================================================================================`);

    return {
      isSuccess: false,
      message: `Rate limit exceeded. Please try again in ${consume.retryAfter} seconds.`,
      code: `${modelName.toUpperCase()}_RATE_LIMIT_EXCEEDED`,
      data: null,
      allCount: 0,
      active: 0,
      inActive: 0,
      pageinfo: null,
    };
  }

  console.log(`==================================================================================`);
  console.log(
    `🚦 Rate limit check passed for user email: ${ctx.session?.user?.email}. Remaining points: ${consume.remainingPoints}`,
  );
  console.log(`==================================================================================`);
  return null;
};
