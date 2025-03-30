import { Module } from '@nestjs/common';
import { AuthController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from 'src/modules/users/users.module';
import { HashingModule } from './hashing/hashing.module';
import { TokenGenerationModule } from './token-generation/token-generation.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from '../authorization/guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule, HashingModule, TokenGenerationModule],
  controllers: [AuthController],
  providers: [
    AuthenticationService,
    JwtStrategy,
    JwtAuthGuard,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  // exports: [JwtAuthGuard, AuthenticationService],
})
export class AuthenticationModule {}
