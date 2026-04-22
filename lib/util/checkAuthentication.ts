import { Context } from '../pothos/subscription';
import authenticate from './authenticate';

// Helper to check authentication and log, returns error response if not authenticated
export const checkAuthentication = async (
  ctx: Context,
  modelName: string = 'User',
  skipForUserModel: boolean = false,
) => {
  console.log(
    `🛡️ ${modelName}: Checking user authentication by email: ${ctx.session?.user?.email}`,
  );
  const authWarning = await authenticate(ctx.session?.user?.id as string);
  if (modelName !== 'User' && !authWarning && !skipForUserModel) {
    return {
      isSuccess: false,
      message: `Authentication failed: ${'Unauthorized access'}`,
      code: `${modelName.toUpperCase()}_AUTHENTICATION_FAILED`,
      data: null,
      allCount: 0,
      active: 0,
      inActive: 0,
      pageinfo: null,
    };
  }
  if (modelName === 'User' && !authWarning && skipForUserModel) {
    return null;
  }
  if (!authWarning) {
    return {
      isSuccess: false,
      message: `Authentication failed: ${'Unauthorized access'}`,
      code: `${modelName.toUpperCase()}_AUTHENTICATION_FAILED`,
      data: null,
      allCount: 0,
      active: 0,
      inActive: 0,
      pageinfo: null,
    };
  }
  return null;
};
