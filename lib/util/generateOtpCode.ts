// Alternative: Using character class directly
export const generateOtpCode = async (length: number) => {
  const allChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += allChars[Math.floor(Math.random() * allChars.length)];
  }
  return otp.toUpperCase();
};
