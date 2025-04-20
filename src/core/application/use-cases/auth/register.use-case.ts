import { Injectable, Inject } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from '../../interfaces/auth.interface';
import { RegisterDto, TokenPair } from '../../dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: RegisterDto): Promise<TokenPair> {
    if (!dto.email) {
      throw new Error('Email is required');
    }

    if (!dto.password) {
      throw new Error('Password is required');
    }

    if (dto.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    if (!dto.username) {
      throw new Error('User name is required');
    }

    const existingUser = await this.authRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const user = await this.authRepository.createUser(
      dto.email,
      dto.password,
      dto.username,
    );

    const accessToken = this.jwtService.sign({ sub: user.id });
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }
} 