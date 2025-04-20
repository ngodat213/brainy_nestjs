import { User } from '../../domain/entities/user.entity';
import { RegisterDto } from '@/core/application/dtos/auth.dto';

export interface IUserRepository {
  create(registerDto: RegisterDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]>;
} 