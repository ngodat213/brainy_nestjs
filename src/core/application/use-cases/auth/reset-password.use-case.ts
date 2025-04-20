import { Injectable, Inject } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from '../../interfaces/auth.interface';
import { ResetPasswordDto } from '../../dtos/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(dto: ResetPasswordDto): Promise<void> {
    const user = await this.authRepository.findByResetCode(dto.resetCode);
    if (!user) {
      throw new Error('Invalid reset code');
    }

    if (user.resetPasswordExpires < new Date()) {
      throw new Error('Reset code has expired');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.authRepository.update(user.id, {
      password: hashedPassword,
      resetPasswordCode: null,
      resetPasswordExpires: null,
    });
  }
} 