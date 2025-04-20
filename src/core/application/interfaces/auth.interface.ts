import { LoginDto, RegisterDto, TokenPair } from "../dtos/auth.dto";

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface IAuthService {
  register(registerDto: RegisterDto): Promise<TokenPair>;
  login(loginDto: LoginDto): Promise<TokenPair>;
  refreshToken(refreshToken: string): Promise<TokenPair>;
  validateUser(email: string, password: string): Promise<any>;
}

export interface IAuthRepository {
  findByEmail(email: string): Promise<any>;
  findById(id: string): Promise<any>;
  createUser(email: string, password: string, username: string): Promise<any>;
} 