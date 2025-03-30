import { AccessTokenPayload } from '../interfaces/access-token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenGenerationService {
  constructor(
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(
        {
          sub: userId,
          email,
          iat: Math.floor(Date.now() / 1000),
          role,
        } as AccessTokenPayload,
        this.configService.get('jwt'),
      );

      return token;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error generating token');
    }
  }
}
