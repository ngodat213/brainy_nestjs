import { Injectable, Inject } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from '../../interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VerifyEmailUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(verificationCode: string): Promise<void> {
    try {
      // Verify and decode the token
      const decoded = this.jwtService.verify(verificationCode, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Get the user
      const user = await this.authRepository.findById(decoded.sub);
      if (!user) {
        throw new Error('Invalid verification code');
      }

      // Check if code matches and hasn't expired
      if (
        user.emailVerificationCode !== verificationCode ||
        !user.emailVerificationExpires ||
        user.emailVerificationExpires < new Date()
      ) {
        throw new Error('Invalid or expired verification code');
      }

      // Update user's email verification status
      await this.authRepository.update(user.id, {
        isEmailVerified: true,
        emailVerificationCode: null,
        emailVerificationExpires: null,
      });
    } catch (error) {
      throw new Error('Invalid verification code');
    }
  }
} 