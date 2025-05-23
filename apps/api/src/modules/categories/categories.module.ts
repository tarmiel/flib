import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CategoriesRepository } from './categories.repository';

@Module({
  controllers: [CategoriesController],
  providers: [PrismaService, CategoriesRepository, CategoriesService],
  exports: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
