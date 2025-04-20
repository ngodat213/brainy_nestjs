import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos/user.dto';

export interface IUserService {
  create(dto: CreateUserDto): Promise<UserResponseDto>;
  findAll(): Promise<UserResponseDto[]>;
  findById(id: string): Promise<UserResponseDto>;
  update(id: string, dto: UpdateUserDto): Promise<UserResponseDto>;
  delete(id: string): Promise<void>;
}

export interface IUserRepository {
  create(dto: CreateUserDto): Promise<UserResponseDto>;
  findAll(): Promise<UserResponseDto[]>;
  findById(id: string): Promise<UserResponseDto>;
  update(id: string, dto: UpdateUserDto): Promise<UserResponseDto>;
  delete(id: string): Promise<void>;
} 