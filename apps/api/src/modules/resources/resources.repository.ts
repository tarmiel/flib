import { PrismaService } from 'src/database/prisma.service';
import { ResourceEntity } from './entities/resource.entity';
import { Injectable } from '@nestjs/common';
import { QueryResourceDto, SortOptions } from './dto/query-resource.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ResourcesRepository {
  private readonly select: Prisma.ResourceSelect = {
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
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(resource: ResourceEntity) {
    return await this.prisma.resource.create({
      data: {
        title: resource.title,
        description: resource.description,
        category_id: resource.categoryId,
        publication_date: resource.publicationDate,
        authors: resource.authors,
        keywords: resource.keywords,
        file_name: resource.fileName,
        file_format: resource.fileFormat,
        file_size: resource.fileSize,
        preview_image_url: resource.previewImageUrl,
        citation: resource.citation,
        additional_info: resource.additionalInfo,
        resource_type_id: resource.resourceTypeId,
        uploaded_by_user_id: resource.uploadedByUserId,
      },
      select: this.select,
    });
  }

  async findAll(filters: QueryResourceDto, userId: number) {
    const {
      q = '',
      sort,
      page,
      pageSize,
      resourceType,
      category,
      fileFormat,
      yearFrom = 1900,
      yearTo = new Date().getFullYear(),
    } = filters;

    const sortMapping: Record<
      SortOptions,
      Prisma.ResourceOrderByWithRelationInput
    > = {
      created_asc: { created_at: 'asc' },
      created_desc: { created_at: 'desc' },
      title_asc: { title: 'asc' },
      title_desc: { title: 'desc' },
    };

    const orderBy = (sort && sortMapping[sort]) ?? { created_at: 'desc' };

    const whereFilters: Prisma.ResourceWhereInput = {
      AND: [
        {
          OR: [
            {
              title: {
                contains: q,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: q,
                mode: 'insensitive',
              },
            },
            {
              authors: {
                hasSome: [q],
              },
            },
            {
              keywords: {
                hasSome: [q],
              },
            },
          ],
        },
        resourceType ? { resource_type: { name: { in: resourceType } } } : {},
        category ? { category: { name: { in: category } } } : {},
        yearFrom ? { publication_date: { gte: new Date(yearFrom, 0, 1) } } : {},
        yearTo ? { publication_date: { lte: new Date(yearTo, 11, 31) } } : {},
        fileFormat ? { file_format: { in: fileFormat } } : {},
      ],
    };

    const [totalCount, resources] = await this.prisma.$transaction([
      this.prisma.resource.count({
        where: whereFilters,
      }),
      this.prisma.resource.findMany({
        select: {
          ...this.select,
          saved_resources: {
            select: {
              id: true,
            },
            where: {
              user_id: userId,
            },
          },
        },
        where: whereFilters,
        orderBy: {
          ...orderBy,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return {
      totalCount,
      resources: resources.map((resource) => ({
        ...resource,
        isSaved: resource.saved_resources.length > 0,
        saved_resources: undefined,
      })),
    };
  }

  async findOne(id: number, userId: number) {
    const resource = await this.prisma.resource.findUnique({
      where: {
        id,
      },
      select: {
        ...this.select,
        saved_resources: {
          select: {
            id: true,
          },
          where: {
            user_id: userId,
          },
        },
      },
    });

    if (!resource) return null;

    return {
      ...resource,
      isSaved: resource.saved_resources.length > 0,
      saved_resources: undefined,
    };
  }

  async update(id: number, resource: ResourceEntity) {
    return await this.prisma.resource.update({
      where: {
        id,
      },
      select: this.select,
      data: {
        title: resource.title,
        description: resource.description,
        category_id: resource.categoryId,
        publication_date: resource.publicationDate,
        authors: resource.authors,
        keywords: resource.keywords,
        file_name: resource.fileName,
        file_format: resource.fileFormat,
        file_size: resource.fileSize,
        preview_image_url: resource.previewImageUrl,
        citation: resource.citation,
        additional_info: resource.additionalInfo,
        resource_type_id: resource.resourceTypeId,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.resource.delete({
      where: {
        id,
      },
    });
  }
}
