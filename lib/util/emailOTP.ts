// import * as fs from 'fs/promises';
// import * as path from 'path';
// import { prisma } from '../../lib/prisma/prisma';
// import { getEmailService } from '../../lib/sendEmail';

// export interface OTPResult {
//   isSuccess: boolean;
//   message: string;
//   code?: string;
//   data?: Record<string, unknown>;
// }

// export class EmailOTPService {
//   /**
//    * Generate a random 6-digit OTP
//    */
//   private generateOTP(): string {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   }

//   /**
//    * Create and send OTP to email
//    */
//   async generateAndSendOTP(
//     email: string,
//     purpose: 'login' | 'verification' | 'password-reset' = 'login',
//     userId?: string
//   ): Promise<OTPResult> {
//     try {
//       // Invalidate previous OTPs for this email/purpose
//       await prisma.emailOTP.updateMany({
//         where: {
//           email,
//           purpose,
//           isUsed: false,
//         },
//         data: {
//           isUsed: true,
//           usedAt: new Date(),
//         },
//       });

//       // Generate OTP
//       const code = this.generateOTP();
//       const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//       // Save OTP to database
//       const otpRecord = await prisma.emailOTP.create({
//         data: {
//           email,
//           code,
//           purpose,
//           expiresAt,
//           userId,
//         },
//       });

//       // Load OTP email template
//       const templatePath = path.join(process.cwd(), '/public/emailTemplates/otp.html');
//       let htmlContent = await fs.readFile(templatePath, 'utf-8');

//       // Replace placeholders
//       htmlContent = htmlContent
//         .replace('{{otp_code}}', code)
//         .replace('{{expires_in}}', '10 minutes')
//         .replace('{{purpose}}', purpose === 'login' ? 'Login' : purpose === 'verification' ? 'Verification' : 'Password Reset');

//       // Send email
//       const emailResult = await getEmailService().sendEmail({
//         to: email,
//         subject: `Your ${purpose === 'login' ? 'Login' : purpose === 'verification' ? 'Verification' : 'Password Reset'} Code is ${code}`,
//         htmlContent,
//         emailType: 'otp',
//         relatedId: otpRecord.id,
//         userId,
//         metadata: {
//           otpId: otpRecord.id,
//           purpose,
//         },
//       });

//       if (emailResult.isSuccess) {
//         return {
//           isSuccess: true,
//           message: `OTP sent to ${email}`,
//           code: code, // Only for development - remove in production
//         };
//       } else {
//         return {
//           isSuccess: false,
//           message: 'Failed to send OTP email',
//         };
//       }
//     } catch (error) {
//       console.error('Error generating/sending OTP:', error);
//       return {
//         isSuccess: false,
//         message: error instanceof Error ? error.message : 'Failed to generate OTP',
//       };
//     }
//   }

//   /**
//    * Verify OTP code
//    */
//   async verifyOTP(
//     email: string,
//     code: string,
//     purpose: 'login' | 'verification' | 'password-reset' = 'login'
//   ): Promise<OTPResult> {
//     try {
//       // Find OTP record
//       const otpRecord = await prisma.emailOTP.findFirst({
//         where: {
//           email,
//           code,
//           purpose,
//           isUsed: false,
//         },
//       });

//       if (!otpRecord) {
//         return {
//           isSuccess: false,
//           message: 'Invalid OTP code',
//         };
//       }

//       // Check if expired
//       if (new Date() > otpRecord.expiresAt) {
//         await prisma.emailOTP.update({
//           where: { id: otpRecord.id },
//           data: {
//             isUsed: true,
//             usedAt: new Date(),
//           },
//         });

//         return {
//           isSuccess: false,
//           message: 'OTP has expired',
//         };
//       }

//       // Check max attempts
//       if (otpRecord.attempts >= otpRecord.maxAttempts) {
//         await prisma.emailOTP.update({
//           where: { id: otpRecord.id },
//           data: {
//             isUsed: true,
//             usedAt: new Date(),
//           },
//         });

//         return {
//           isSuccess: false,
//           message: 'Maximum OTP attempts exceeded',
//         };
//       }

//       // Mark as used
//       await prisma.emailOTP.update({
//         where: { id: otpRecord.id },
//         data: {
//           isUsed: true,
//           usedAt: new Date(),
//         },
//       });

//       return {
//         isSuccess: true,
//         message: 'OTP verified successfully',
//         data: {
//           email,
//           userId: otpRecord.userId,
//           purpose,
//         },
//       };
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       return {
//         isSuccess: false,
//         message: error instanceof Error ? error.message : 'Failed to verify OTP',
//       };
//     }
//   }

//   /**
//    * Increment OTP attempt count
//    */
//   async incrementOTPAttempts(email: string, code: string): Promise<void> {
//     try {
//       await prisma.emailOTP.updateMany({
//         where: {
//           email,
//           code,
//           isUsed: false,
//         },
//         data: {
//           attempts: {
//             increment: 1,
//           },
//         },
//       });
//     } catch (error) {
//       console.error('Error incrementing OTP attempts:', error);
//     }
//   }

//   /**
//    * Invalidate all OTPs for an email
//    */
//   async invalidateAllOTPs(email: string): Promise<OTPResult> {
//     try {
//       await prisma.emailOTP.updateMany({
//         where: {
//           email,
//           isUsed: false,
//         },
//         data: {
//           isUsed: true,
//           usedAt: new Date(),
//         },
//       });

//       return {
//         isSuccess: true,
//         message: 'All OTPs invalidated',
//       };
//     } catch (error) {
//       console.error('Error invalidating OTPs:', error);
//       return {
//         isSuccess: false,
//         message: 'Failed to invalidate OTPs',
//       };
//     }
//   }

//   /**
//    * Get OTP status (for debugging)
//    */
//   async getOTPStatus(email: string, purpose: string) {
//     try {
//       const otpRecord = await prisma.emailOTP.findFirst({
//         where: {
//           email,
//           purpose,
//           isUsed: false,
//         },
//         orderBy: {
//           createdAt: 'desc',
//         },
//       });

//       if (!otpRecord) {
//         return {
//           isSuccess: false,
//           message: 'No active OTP found',
//         };
//       }

//       return {
//         isSuccess: true,
//         message: 'OTP status retrieved',
//         data: {
//           expiresAt: otpRecord.expiresAt,
//           attempts: otpRecord.attempts,
//           maxAttempts: otpRecord.maxAttempts,
//           isExpired: new Date() > otpRecord.expiresAt,
//           createdAt: otpRecord.createdAt,
//         },
//       };
//     } catch (error) {
//       console.error('Error getting OTP status:', error);
//       return {
//         isSuccess: false,
//         message: 'Failed to get OTP status',
//       };
//     }
//   }

//   /**
//    * Cleanup expired OTPs (run via cron job)
//    */
//   async cleanupExpiredOTPs(): Promise<OTPResult> {
//     try {
//       const result = await prisma.emailOTP.deleteMany({
//         where: {
//           expiresAt: {
//             lt: new Date(),
//           },
//           isUsed: true,
//         },
//       });

//       return {
//         isSuccess: true,
//         message: `Cleaned up ${result.count} expired OTP records`,
//       };
//     } catch (error) {
//       console.error('Error cleaning up expired OTPs:', error);
//       return {
//         isSuccess: false,
//         message: 'Failed to cleanup expired OTPs',
//       };
//     }
//   }
// }

// // Export singleton instance
// export const emailOTPService = new EmailOTPService();

// export default emailOTPService;
