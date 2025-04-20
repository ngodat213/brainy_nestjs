import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../../core/application/interfaces/auth.interface';
import { RegisterDto, LoginDto, TokenPair } from '@/core/application/dtos/auth.dto';
import { RegisterUseCase } from '@/core/application/use-cases/auth/register.use-case';
import { LoginUseCase } from '@/core/application/use-cases/auth/login.use-case';
import { RefreshTokenUseCase } from '@/core/application/use-cases/auth/refresh-token.use-case';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<TokenPair> {
    return this.registerUseCase.execute(registerDto);
  }

  async login(loginDto: LoginDto): Promise<TokenPair> {
    return this.loginUseCase.execute(loginDto);
  }

  async refreshToken(refreshToken: string): Promise<TokenPair> {
    return this.refreshTokenUseCase.execute(refreshToken);
  }

  async validateUser(email: string, password: string): Promise<any> {
    return this.loginUseCase.execute({ email, password });
  }
} 