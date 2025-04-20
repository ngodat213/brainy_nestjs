import { Injectable, Inject } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from '../../interfaces/auth.interface';
import { ForgotPasswordDto } from '../../dtos/auth.dto';
import { NestMailerService } from '@/modules/mailer/mailer.service';
import * as crypto from 'crypto';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly mailerService: NestMailerService,
  ) {}

  async execute(dto: ForgotPasswordDto): Promise<void> {
    const user = await this.authRepository.findByEmail(dto.email);
    if (!user) {
      // Don't reveal if email exists or not
      return;
    }

    // Generate reset code
    const resetCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    const resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save reset code to user
    await this.authRepository.update(user.id, {
      resetPasswordCode: resetCode,
      resetPasswordExpires: resetCodeExpires,
    });

    // Send email
    await this.mailerService.sendResetPasswordEmail(dto.email, resetCode);
  }
} 