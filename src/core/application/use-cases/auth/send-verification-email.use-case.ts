import { Injectable, Inject } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from '../../interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NestMailerService } from '@/modules/mailer/mailer.service';

@Injectable()
export class SendVerificationEmailUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailerService: NestMailerService,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.isEmailVerified) {
      throw new Error('Email already verified');
    }

    // Generate verification code
    const verificationCode = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '24h' },
    );

    // Set verification code and expiration
    await this.authRepository.update(user.id, {
      emailVerificationCode: verificationCode,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    // Send verification email
    await this.mailerService.sendVerificationEmail(user.email, verificationCode);
  }
} 