import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import { fail, ok } from '../util/reponseUtil';
import { EMAIL_TEMPLATES, EmailTemplateMap, OtpEmailParams } from './emailType';

// ─────────────────────────────────────────────────────────────
// EMAIL SERVICE
// ─────────────────────────────────────────────────────────────

export class SendEmailService {
  private mailerSend = new MailerSend({
    apiKey: process.env.NEXT_PUBLIC_MAILERSEND_API_KEY || process.env.NEXTAUTH_MAILERSEND_API_KEY || '',
  });

  private SENDER_EMAIL =process.env.NEXT_PUBLIC_MAILERSEND_SENDER_EMAIL || process.env.NEXTAUTH_MAILERSEND_SENDER_EMAIL || '';
  private SENDER_NAME = process.env.NEXT_PUBLIC_MAILERSEND_SENDER_NAME || process.env.NEXTAUTH_MAILERSEND_SENDER_NAME || '';
  private BASE_URL =
    process.env.NEXTAUTH_SITE || process.env.NEXT_PUBLIC_SITE || 'http://localhost:3000';

  /**
   * Load email template from URL
   */
  private async loadTemplate(templatePath: string): Promise<string> {
    const templateUrl = `${this.BASE_URL}${templatePath}`;
    const response = await fetch(templateUrl);
    if (!response.ok) {
      throw new Error(`Failed to load email template: ${response.statusText}`);
    }
    return response.text();
  }

  /**
   * Replace placeholders in template
   */
  private replacePlaceholders(
    template: string,
    placeholders: Record<string, string | number | null | undefined>
  ): string {
    let result = template;
    Object.entries(placeholders).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      result = result.replace(new RegExp(placeholder, 'g'), String(value ?? ''));
    });
    return result;
  }

  /**
   * Normalize BCC based on configuration
   */
  private normalizeBcc(
    bcc: string | string[] | undefined,
    handling?: 'single' | 'array'
  ): string[] {
    if (!bcc) return [];
    if (typeof bcc === 'string') return handling === 'single' ? [bcc] : [bcc];
    return Array.isArray(bcc) ? bcc : [];
  }

  /**
   * Core email sending method
   */
  async sendEmail(
    recipient: string | null,
    subject: string,
    htmlContent: string,
    cc: string[] = [],
    bcc: string[] = []
): Promise<ReturnType<typeof ok> | ReturnType<typeof fail>> {
    try {
      const sentFrom = new Sender(this.SENDER_EMAIL, this.SENDER_NAME);
      const toRecipients = recipient ? [new Recipient(recipient)] : [new Recipient(this.SENDER_EMAIL)];
      const ccRecipients = cc.map((email) => new Recipient(email));
      const bccRecipients = bcc.map((email) => new Recipient(email));

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(toRecipients)
        .setCc(ccRecipients)
        .setBcc(bccRecipients)
        .setSubject(subject)
        .setHtml(htmlContent);

      await this.mailerSend.email.send(emailParams);
      console.log(`Email sent successfully to ${recipient || 'self'} with subject: "${subject}"`);
      return ok('EMAIL_SENT_SUCCESS', `Email sent successfully to ${recipient || 'self'}` , {
        recipient: recipient || 'self',
        subject,
      });
    } catch (error) {
      console.error(`Failed to send email to ${recipient || 'self'} with subject: "${subject}". Error:`, error);
      return fail('EMAIL_SENT_FAILED', `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generic template-based email sender
   */
  private async sendTemplateEmail(
    templateType: keyof EmailTemplateMap,
    placeholders: Record<string, string | number | null | undefined>,
    bcc?: string | string[]
  ): Promise<ReturnType<typeof ok> | ReturnType<typeof fail>> {
    const config = EMAIL_TEMPLATES[templateType];
    const template = await this.loadTemplate(config.templatePath);
    const htmlContent = this.replacePlaceholders(template, placeholders);
    const bccArray = this.normalizeBcc(bcc, config.bccHandling);

    console.log(`Sending "${templateType}" email with subject: "${config.subject}" to BCC: ${bccArray.join(', ')}`);
    return this.sendEmail(null, config.subject, htmlContent, [], bccArray);
  }

  // ─────────────────────────────────────────────────────────────
  // SPECIFIC EMAIL METHODS (Clean & Simple)
  // ─────────────────────────────────────────────────────────────

  async sendOtpEmail(data: OtpEmailParams) {
    return this.sendTemplateEmail('otpNotification', {
      purpose: data.purpose,
      otp_code: data.otp_code,
      expires_in: data.expires_in,
    }, data.bcc);
  }

}


// Export singleton
let instance: SendEmailService | null = null;

export const getSendEmailService = (): SendEmailService => {
  if (!instance) {
    instance = new SendEmailService();
  }
  return instance;
};
