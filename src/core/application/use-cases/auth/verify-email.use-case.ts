import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../../interfaces/auth.interface';

@Injectable()
export class VerifyEmailUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(token: string): Promise<void> {
    if (!token) {
      throw new Error('Token is required');
    }

    // TODO: Validate token
    // TODO: Update email verification status
    throw new Error('Method not implemented.');
  }
} 