import { LoginDto, RegisterDto, TokenPair } from "../dtos/auth.dto";

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface IAuthService {
  register(registerDto: RegisterDto): Promise<TokenPair>;
  login(loginDto: LoginDto): Promise<TokenPair>;
  refreshToken(refreshToken: string): Promise<TokenPair>;
  validateUser(email: string, password: string): Promise<any>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(resetCode: string, newPassword: string): Promise<void>;
}

export interface IAuthRepository {
  findByEmail(email: string): Promise<any>;
  findById(id: string): Promise<any>;
  createUser(email: string, password: string, username: string): Promise<any>;
  update(id: string, data: any): Promise<any>;
  findByResetCode(resetCode: string): Promise<any>;
} 