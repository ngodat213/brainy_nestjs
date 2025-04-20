import { Injectable, Inject } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from '../../interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RevokeTokenUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(token: string): Promise<void> {
    try {
      // Verify and decode the token
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Get the user
      const user = await this.authRepository.findById(decoded.sub);
      if (!user) {
        throw new Error('Invalid token');
      }

      // Add token to revoked tokens list
      await this.authRepository.update(user.id, {
        revokedTokens: [...(user.revokedTokens || []), token],
      });
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
} 