// Alternative: Using character class directly
export const generateOtpCode = async (length: number) => {
  const allChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += allChars[Math.floor(Math.random() * allChars.length)];
  }
  return otp.toUpperCase();
};


export const generateNumericOtpCode = async (length: number) => {
  const numericChars = '0123456789';

  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += numericChars[Math.floor(Math.random() * numericChars.length)];
  }
  return otp;

}

export const generateEmployeeNumberForWork = async (): Promise<string> => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const code = await generateNumericOtpCode(4);
  return `EMP-${year}${month.toString().padStart(2, '0')}-${code}`;
};


export const generateCRFNumberForWork = async (): Promise<string> => {
  const year = new Date().getFullYear();
  const code = await generateNumericOtpCode(4);
  return `CRF-${year}-${code}`;
};
export const generateRefNumberForWork = async (): Promise<string> => {
  const year = new Date().getFullYear();
  const code = await generateNumericOtpCode(4);
  return `CRF-${year}-${code}`;
};

export const buildRefCode = async (args: {
  yearCode: string;
  statusCode: string;
  companyAcronym?: string | null;
  fallbackName?: string | null;
}) => {
  const { yearCode, statusCode, companyAcronym, fallbackName } = args;

  let acronym = companyAcronym ?? null;

  if (!acronym && fallbackName) {
    acronym = fallbackName
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();
  }

  if (!acronym) acronym = 'NOCMP';

  const uniquePart =
    globalThis.crypto?.randomUUID?.().split('-')[0].toUpperCase() ??
    (await generateOtpCode(4));

  return `${yearCode}${statusCode}-${acronym}-${uniquePart}`;
};