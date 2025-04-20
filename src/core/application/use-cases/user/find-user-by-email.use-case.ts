import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
} 