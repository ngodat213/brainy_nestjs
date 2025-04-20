import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../../core/application/interfaces/auth.interface';
import { RegisterDto, LoginDto, TokenPair, ForgotPasswordDto, ResetPasswordDto } from '@/core/application/dtos/auth.dto';
import { RegisterUseCase } from '@/core/application/use-cases/auth/register.use-case';
import { LoginUseCase } from '@/core/application/use-cases/auth/login.use-case';
import { RefreshTokenUseCase } from '@/core/application/use-cases/auth/refresh-token.use-case';
import { ForgotPasswordUseCase } from '@/core/application/use-cases/auth/forgot-password.use-case';
import { ResetPasswordUseCase } from '@/core/application/use-cases/auth/reset-password.use-case';
import { RevokeTokenUseCase } from '@/core/application/use-cases/auth/revoke-token.use-case';
import { VerifyEmailUseCase } from '@/core/application/use-cases/auth/verify-email.use-case';
import { SendVerificationEmailUseCase } from '@/core/application/use-cases/auth/send-verification-email.use-case';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly revokeTokenUseCase: RevokeTokenUseCase,
    private readonly verifyEmailUseCase: VerifyEmailUseCase,
    private readonly sendVerificationEmailUseCase: SendVerificationEmailUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<TokenPair> {
    const tokens = await this.registerUseCase.execute(registerDto);
    // Send verification email after successful registration
    const decoded = this.jwtService.decode(tokens.accessToken);
    if (decoded && typeof decoded === 'object' && 'sub' in decoded) {
      await this.sendVerificationEmailUseCase.execute(decoded.sub as string);
    }
    return tokens;
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

  async forgotPassword(email: string): Promise<void> {
    return this.forgotPasswordUseCase.execute({ email });
  }

  async resetPassword(resetCode: string, newPassword: string): Promise<void> {
    return this.resetPasswordUseCase.execute({ resetCode, newPassword });
  }

  async revokeToken(token: string): Promise<void> {
    return this.revokeTokenUseCase.execute(token);
  }

  async verifyEmail(verificationCode: string): Promise<void> {
    return this.verifyEmailUseCase.execute(verificationCode);
  }

  async sendVerificationEmail(userId: string): Promise<void> {
    return this.sendVerificationEmailUseCase.execute(userId);
  }
} 