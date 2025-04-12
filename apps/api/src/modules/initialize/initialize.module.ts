// src/initialize/initialize.module.ts
import { Module } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { InitializeService } from './initialize.service';

import { ConfigModule } from '@nestjs/config';
import { HashingModule } from 'src/modules/iam/authentication/hashing/hashing.module';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [HashingModule, ConfigModule],
  providers: [PrismaService, InitializeService, Logger],
})
export class InitializeModule {}
