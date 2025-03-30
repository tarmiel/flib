import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';
import { Logger } from 'nestjs-pino';

@Module({
  imports: [RolesModule],
  providers: [PrismaService, RolesRepository, Logger, RolesService],
  exports: [RolesService, RolesRepository],
})
export class RolesModule {}
