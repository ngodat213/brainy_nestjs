import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/user.repository.interface';
import { UserResponseDto } from '../../dtos/user.dto';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }
} 