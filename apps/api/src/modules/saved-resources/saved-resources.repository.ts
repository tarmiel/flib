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

  async findOne(resourceId: number, userId: number) {
    return await this.prisma.savedResources.findUnique({
      where: {
        user_id_resource_id: {
          user_id: userId,
          resource_id: resourceId,
        },
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

  async delete(resourceId: number, userId: number) {
    return await this.prisma.savedResources.delete({
      where: {
        user_id_resource_id: {
          user_id: userId,
          resource_id: resourceId,
        },
      },
    });
  }

  async remove(userId: number, resourceId: number) {
    return await this.prisma.savedResources.deleteMany({
      where: {
        resource_id: resourceId,
        user_id: userId,
      },
    });
  }

  async findAllByUser(userId: number) {
    const savedResources = await this.prisma.savedResources.findMany({
      where: { user_id: userId },
      include: {
        resource: {
          select: {
            id: true,
            title: true,
            description: true,
            publication_date: true,
            authors: true,
            keywords: true,
            file_name: true,
            file_format: true,
            file_size: true,
            preview_image_url: true,
            citation: true,
            additional_info: true,
            updated_at: true,
            created_at: true,
            resource_type: {
              select: {
                id: true,
                name: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
              },
            },
            uploaded_by: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return savedResources;
  }
}
