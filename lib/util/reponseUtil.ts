// ─────────────────────────────────────────────────────────────
// SERVICE RESPONSE HELPERS
// ─────────────────────────────────────────────────────────────

const ok = <T>(code: string, message: string, data: T) => ({
  isSuccess: true,
  code,
  message,
  data,
});
const fail = (code: string, message: string) => ({ isSuccess: false, code, message, data: null });

export { fail, ok };
