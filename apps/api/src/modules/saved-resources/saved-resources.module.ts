import { Module } from '@nestjs/common';
import { SavedResourcesService } from './saved-resources.service';
import { SavedResourcesController } from './saved-resources.controller';
import { ResourcesModule } from '../resources/resources.module';
import { SavedResourcesRepository } from './saved-resources.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [ResourcesModule],
  controllers: [SavedResourcesController],
  providers: [PrismaService, SavedResourcesRepository, SavedResourcesService],
})
export class SavedResourcesModule {}
