import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../../interfaces/auth.interface';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(email: string): Promise<void> {
    if (!email) {
      throw new Error('Email is required');
    }

    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // TODO: Generate reset token
    // TODO: Send reset email
    throw new Error('Method not implemented.');
  }
} 