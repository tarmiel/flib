import { Module } from '@nestjs/common';
import { ResourceTypesService } from './resource_types.service';
import { ResourceTypesController } from './resource_types.controller';
import { ResourceTypesRepository } from './resource_types.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ResourceTypesController],
  providers: [PrismaService, ResourceTypesRepository, ResourceTypesService],
  exports: [ResourceTypesService],
})
export class ResourceTypesModule {}
