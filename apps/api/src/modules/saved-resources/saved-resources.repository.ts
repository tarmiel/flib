import { Injectable } from '@nestjs/common';
import { SavedResource } from './entities/saved-resource.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SavedResourcesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number) {
    return await this.prisma.savedResources.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.savedResources.findUnique({
      where: {
        id,
      },
    });
  }

  async create(savedResource: SavedResource) {
    return await this.prisma.savedResources.create({
      data: {
        resource_id: savedResource.resourceId,
        user_id: savedResource.userId,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.savedResources.delete({
      where: {
        id,
      },
    });
  }
}
