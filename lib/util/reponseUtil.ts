// ─────────────────────────────────────────────────────────────
// SERVICE RESPONSE HELPERS
// ─────────────────────────────────────────────────────────────

const ok = <T>(code: string, message: string, data: T) => {
  // For easy to remove console logs in the future, we can identify them with a unique prefix
  console.log('Response: OK - File OK Import', { isSuccess: true, code, message, data });
  return {
    isSuccess: true,
    code,
    message,
    data,
  }
};
const fail = (code: string, message: string) => {
  // For easy to remove console logs in the future, we can identify them with a unique prefix
  console.log('Response: FAILED - File Fail Import', { isSuccess: false, code, message, data: null });
  return {
    isSuccess: false,
    code,
    message,
    data: null,
  }
};

export { fail, ok };
