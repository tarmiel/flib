import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { ResourcesRepository } from './resources.repository';
import { PrismaService } from 'src/database/prisma.service';
import { MinioService } from '../minio/minio.service';
import { ResourceTypesModule } from '../resource_types/resource_types.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [ResourceTypesModule, CategoriesModule],
  controllers: [ResourcesController],
  providers: [
    PrismaService,
    ResourcesRepository,
    ResourcesService,
    MinioService,
  ],
  exports: [ResourcesService],
})
export class ResourcesModule {}
