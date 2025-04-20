import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/user.repository.interface';
import { UserResponseDto } from '../../dtos/user.dto';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
} 