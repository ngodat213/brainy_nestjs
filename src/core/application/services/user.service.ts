import { Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user.interface';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos/user.dto';
import { CreateUserUseCase } from '../use-cases/user/create-user.use-case';
import { UpdateUserUseCase } from '../use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../use-cases/user/delete-user.use-case';
import { FindUserUseCase } from '../use-cases/user/find-user.use-case';
import { ListUsersUseCase } from '../use-cases/user/list-users.use-case';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserUseCase.execute(dto);
  }

  async findAll(): Promise<UserResponseDto[]> {
    return this.listUsersUseCase.execute();
  }

  async findById(id: string): Promise<UserResponseDto> {
    return this.findUserUseCase.execute(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    return this.updateUserUseCase.execute(id, dto);
  }

  async delete(id: string): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }
} 