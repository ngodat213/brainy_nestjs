import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../../interfaces/auth.interface';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(userId: string): Promise<void> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // TODO: Invalidate tokens
    throw new Error('Method not implemented.');
  }
} 