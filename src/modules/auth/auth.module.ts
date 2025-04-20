import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { RegisterUseCase } from '@/core/application/use-cases/auth/register.use-case';
import { LoginUseCase } from '@/core/application/use-cases/auth/login.use-case';
import { RefreshTokenUseCase } from '@/core/application/use-cases/auth/refresh-token.use-case';
import { AuthService } from './auth.service';
import { AuthRepository } from '@/core/infrastructure/persistence/repositories/auth.repository';
import { AUTH_REPOSITORY } from '@/core/application/interfaces/auth.interface';
import { UserRepository } from '@/core/infrastructure/persistence/repositories/user.repository';
import { User, UserSchema } from '@/core/domain/entities/user.entity';

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
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    UserRepository,
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {} 