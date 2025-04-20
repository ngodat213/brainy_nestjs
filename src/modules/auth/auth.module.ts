import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { RegisterUseCase } from '@/core/application/use-cases/auth/register.use-case';
import { LoginUseCase } from '@/core/application/use-cases/auth/login.use-case';
import { RefreshTokenUseCase } from '@/core/application/use-cases/auth/refresh-token.use-case';
import { ForgotPasswordUseCase } from '@/core/application/use-cases/auth/forgot-password.use-case';
import { ResetPasswordUseCase } from '@/core/application/use-cases/auth/reset-password.use-case';
import { RevokeTokenUseCase } from '@/core/application/use-cases/auth/revoke-token.use-case';
import { VerifyEmailUseCase } from '@/core/application/use-cases/auth/verify-email.use-case';
import { SendVerificationEmailUseCase } from '@/core/application/use-cases/auth/send-verification-email.use-case';
import { AuthService } from './auth.service';
import { AuthRepository } from '@/core/infrastructure/persistence/repositories/auth.repository';
import { AUTH_REPOSITORY } from '@/core/application/interfaces/auth.interface';
import { UserRepository } from '@/core/infrastructure/persistence/repositories/user.repository';
import { User, UserSchema } from '@/core/domain/entities/user.entity';
import { NestMailerModule } from '@/modules/mailer/mailer.module';
import { NestMailerService } from '@/modules/mailer/mailer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    NestMailerModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    RevokeTokenUseCase,
    VerifyEmailUseCase,
    SendVerificationEmailUseCase,
    UserRepository,
    NestMailerService,
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {} 