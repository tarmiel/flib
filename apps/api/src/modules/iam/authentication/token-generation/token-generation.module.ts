import { Module } from '@nestjs/common';
import { TokenGenerationService } from './token-generation.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { Logger } from 'nestjs-pino';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig.asProvider())],
  providers: [
    ConfigService,
    Logger,
    JwtService,
    ConfigService,
    TokenGenerationService,
  ],
  exports: [TokenGenerationService],
})
export class TokenGenerationModule {}
