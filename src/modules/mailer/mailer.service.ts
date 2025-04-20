import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NestMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordEmail(email: string, resetCode: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Your Password',
      template: 'reset-password',
      context: {
        resetCode,
      },
    });
  }

  async sendVerificationEmail(email: string, verificationCode: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify Your Email',
      template: 'verify-email',
      context: {
        verificationCode,
      },
    });
  }
} 