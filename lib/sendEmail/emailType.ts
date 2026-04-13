// ─────────────────────────────────────────────────────────────
// EMAIL CONFIGURATION & TYPES
// ─────────────────────────────────────────────────────────────

export type EmailConfig = {
  templatePath: string;
  subject: string;
  bccHandling?: 'single' | 'array'; // single: wrap in array, array: use as-is
};

export type EmailTemplateMap = {
 otpNotification: EmailConfig;
 welcomeEmail: EmailConfig;
};

// Email Template Configurations
export const EMAIL_TEMPLATES: EmailTemplateMap = {
  otpNotification: {
    templatePath: '/emailTemplates/otp.html',
    subject: 'One Time Passcode (OTP) for Your Account',
    bccHandling: 'single',
  },
  welcomeEmail: {
    templatePath: '/emailTemplates/welcome.html',
    subject: 'Welcome to Our Service',
    bccHandling: 'single',
  },
};


export type OtpEmailParams = {
  purpose: 'Login' | 'Verification' | 'Password Reset';  // Type-safe options
  otp_code: string;
  expires_in: string;
  bcc: string[];
};
