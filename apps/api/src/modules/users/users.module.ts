import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { Logger } from 'nestjs-pino';
import { RolesModule } from '../roles/roles.module';
import { UsersController } from './users.controller';

@Module({
  imports: [RolesModule],
  controllers: [UsersController],
  providers: [PrismaService, UsersRepository, Logger, UsersService],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
