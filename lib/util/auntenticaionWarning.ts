export const auntenticaionWarning = async (
  id: string | undefined,
  modelName: string,
  method: string,
) => {
  console.log(`🟢 User ID performing ${modelName}${method} operation:`, id ?? 'system');
  // If no ID is provided, default to 'system' to ensure we have a consistent identifier for automated actions
  if (!id) {
    console.warn(
      `⚠️ No user ID found in session for ${modelName}${method}. Defaulting to 'system'. Consider implementing authentication to provide user context.`,
    );
    return {
      isSuccess: false,
      message: `User authentication required to ${method} ${modelName} records. Please provide a valid user ID in the session or as an argument.`,
      code: `${modelName.toUpperCase()}_${method.toUpperCase()}_FAILED_UNAUTHENTICATED`,
      data: null,
    };
  }
};
