import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '@/core/application/interfaces/auth.interface';
import { UserRepository } from './user.repository';
import { User } from '@/core/domain/entities/user.entity';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async createUser(email: string, password: string, username: string): Promise<User> {
    return this.userRepository.create({
      email,
      password,
      username,
      fullName: username,
    });
  }
} 