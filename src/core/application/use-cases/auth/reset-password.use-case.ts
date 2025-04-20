import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../../interfaces/auth.interface';

@Injectable()
export class ResetPasswordUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(token: string, newPassword: string): Promise<void> {
    if (!token) {
      throw new Error('Token is required');
    }

    if (!newPassword) {
      throw new Error('New password is required');
    }

    if (newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // TODO: Validate token
    // TODO: Update password
    throw new Error('Method not implemented.');
  }
} 