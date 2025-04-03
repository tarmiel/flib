import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { ResourceEntity } from './entities/resource.entity';
import { ResourcesRepository } from './resources.repository';
import { QueryResourceDto } from './dto/query-resource.dto';
import { Logger } from 'nestjs-pino';
import { MinioService } from '../minio/minio.service';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedUser } from 'src/common/interfaces/authenticated-user.interface';
import { ROLES } from '../iam/authorization/roles.constants';
import { ResourceTypesService } from '../resource_types/resource_types.service';
import { CategoriesService } from '../categories/categories.service';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesService {
  private bucketName: string;

  constructor(
    private readonly logger: Logger,
    private readonly resourcesRepository: ResourcesRepository,
    private readonly minioService: MinioService,
    private readonly configService: ConfigService,
    private readonly resourceTypesService: ResourceTypesService,
    private readonly categoriesService: CategoriesService,
  ) {
    this.bucketName = this.configService.get('MINIO_FILES_BUCKET_NAME')!;
  }

  async create(createResourceDto: CreateResourceDto, userId: number) {
    try {
      const resourceEntity: ResourceEntity = {
        title: createResourceDto.title,
        description: createResourceDto.description,
        categoryId: createResourceDto.category_id,
        publicationDate: createResourceDto.publication_date,
        authors: createResourceDto.authors,
        keywords: createResourceDto.keywords,
        fileName: createResourceDto.file_name,
        fileFormat: createResourceDto.file_format,
        fileSize: createResourceDto.file_size,
        additionalInfo: createResourceDto.additional_info,
        resourceTypeId: createResourceDto.resource_type_id,
        uploadedByUserId: userId,
      };

      const resourceType = await this.resourceTypesService.findOne(
        createResourceDto.resource_type_id,
      );
      if (!resourceType)
        throw new BadRequestException('Resource type does not exist');

      const category = await this.categoriesService.findOne(
        createResourceDto.category_id,
      );
      if (!category) throw new BadRequestException('Category does not exist');

      if (createResourceDto.preview_image_name) {
        try {
          const previewImageUrl =
            await this.minioService.getPresignedUrlForDownload(
              this.bucketName,
              createResourceDto.preview_image_name,
            );
          if (previewImageUrl) {
            resourceEntity.previewImageUrl = previewImageUrl;
          }
        } catch (error) {
          this.logger.error(error);
        }
      }

      const createdResource =
        await this.resourcesRepository.create(resourceEntity);
      if (!createdResource)
        throw new ServiceUnavailableException('Error while creating resource');

      return createdResource;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) throw error;
      throw new ServiceUnavailableException('Error while creating resource');
    }
  }

  async findAll(query: QueryResourceDto, userId: number) {
    try {
      const { totalCount, resources } = await this.resourcesRepository.findAll(
        query,
        userId,
      );

      return {
        totalCount,
        resources,
      };
    } catch (error) {
      this.logger.error(error);
      throw new ServiceUnavailableException('Error while finding resources');
    }
  }

  async findOne(id: number, userId: number) {
    try {
      const resource = await this.resourcesRepository.findOne(id, userId);

      if (!resource) return null;

      return resource;
    } catch (error) {
      this.logger.error(error);
      throw new ServiceUnavailableException('Error while finding resource');
    }
  }

  async update(
    id: number,
    updateResourceDto: UpdateResourceDto,
    user: AuthenticatedUser,
  ) {
    try {
      const existingResource = await this.resourcesRepository.findOne(
        id,
        user.userId,
      );
      if (!existingResource)
        throw new NotFoundException('Resource does not exist');

      if (
        existingResource.uploaded_by_user_id !== user.userId &&
        user.role !== ROLES.admin
      ) {
        throw new UnauthorizedException(
          'You are not authorized to update this resource',
        );
      }

      const resourceEntity: ResourceEntity = {
        title: updateResourceDto.title,
        description: updateResourceDto.description,
        categoryId: updateResourceDto.category_id,
        publicationDate: updateResourceDto.publication_date,
        authors: updateResourceDto.authors,
        keywords: updateResourceDto.keywords,
        fileName: updateResourceDto.file_name,
        fileFormat: updateResourceDto.file_format,
        fileSize: updateResourceDto.file_size,
        previewImageUrl: updateResourceDto.preview_image_name,
        citation: updateResourceDto.citation,
        additionalInfo: updateResourceDto.additional_info,
        resourceTypeId: updateResourceDto.resource_type_id,
        uploadedByUserId: id,
      };

      const resourceType = await this.resourceTypesService.findOne(
        updateResourceDto.resource_type_id,
      );
      if (!resourceType)
        throw new BadRequestException('Resource type does not exist');

      const category = await this.categoriesService.findOne(
        updateResourceDto.category_id,
      );
      if (!category) throw new BadRequestException('Category does not exist');

      if (
        !updateResourceDto.preview_image_name &&
        existingResource.preview_image_url
      ) {
        // TODO: remove preview image, delete file
      }

      if (
        updateResourceDto.preview_image_name &&
        existingResource.preview_image_url
      ) {
        // TODO: update preview image, delete old file
      }

      if (updateResourceDto.preview_image_name) {
        try {
          const existingPreviewImageUrl = await this.minioService.objectExists(
            this.bucketName,
            updateResourceDto.preview_image_name,
          );
          if (existingPreviewImageUrl) {
            const previewImageUrl =
              await this.minioService.getPresignedUrlForDownload(
                this.bucketName,
                updateResourceDto.preview_image_name,
              );
            if (previewImageUrl) {
              resourceEntity.previewImageUrl = previewImageUrl;
            }
          }
        } catch (error) {
          this.logger.error(error);
        }
      }

      const updatedResource = await this.resourcesRepository.update(
        id,
        resourceEntity,
      );

      if (!updatedResource)
        throw new ServiceUnavailableException('Error while updating resource');

      return updatedResource;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) throw error;
      throw new ServiceUnavailableException('Error while updating resource');
    }
  }

  async remove(id: number, user: AuthenticatedUser): Promise<number> {
    try {
      const resource = await this.resourcesRepository.findOne(id, user.userId);
      if (!resource) throw new NotFoundException('Resource does not exist');

      if (resource.uploaded_by.id !== user.userId && user.role !== ROLES.admin)
        throw new UnauthorizedException(
          'You are not authorized to remove this resource',
        );

      await this.minioService
        .removeObject(this.bucketName, resource.file_name)
        .catch(() => {
          this.logger.error('Error while removing file from bucket');
        });
      if (resource.preview_image_url) {
        await this.minioService
          .removeObject(this.bucketName, resource.preview_image_url!)
          .catch(() => {
            this.logger.error('Error while removing preview image from bucket');
          });
      }

      const deletedResource = await this.resourcesRepository.remove(id);
      if (!deletedResource)
        throw new ServiceUnavailableException('Error while removing resource');

      return deletedResource.id;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) throw error;
      throw new ServiceUnavailableException('Error while removing resource');
    }
  }
}
