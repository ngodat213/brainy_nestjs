import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/user.interface';
import { CreateUserDto, UserResponseDto } from '../../dtos/user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    return this.userRepository.create(dto);
  }
} 