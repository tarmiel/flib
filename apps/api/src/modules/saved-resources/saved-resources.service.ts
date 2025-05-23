import {
  ConflictException,
  HttpException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateSavedResourceDto } from './dto/create-saved-resource.dto';
import { SavedResource } from './entities/saved-resource.entity';
import { SavedResourcesRepository } from './saved-resources.repository';
import { ResourcesService } from '../resources/resources.service';
import { Logger } from 'nestjs-pino';

@Injectable()
export class SavedResourcesService {
  constructor(
    private readonly logger: Logger,
    private readonly savedResourcesRepository: SavedResourcesRepository,
    private readonly resourcesService: ResourcesService,
  ) {}

  async create(createSavedResourceDto: CreateSavedResourceDto, userId: number) {
    try {
      const resource = await this.resourcesService.findOne(
        createSavedResourceDto.resource_id,
        userId,
      );
      if (!resource) throw new ConflictException('Resource does not exist');

      const existingSavedResource = await this.savedResourcesRepository.findOne(
        createSavedResourceDto.resource_id,
        userId,
      );
      if (existingSavedResource)
        throw new ConflictException('Resource is already saved by this user');

      const savedResource: SavedResource = {
        resourceId: createSavedResourceDto.resource_id,
        userId,
      };

      return await this.savedResourcesRepository.create(savedResource);
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) throw error;
      throw new ServiceUnavailableException('Error while creating resource');
    }
  }

  async findAllByUser(userId: number) {
    const savedResources =
      await this.savedResourcesRepository.findAllByUser(userId);

    return {
      resources: savedResources.map((saved) => ({
        ...saved.resource,
        is_saved: true,
      })),
    };
  }

  async findAll(userId: number) {
    const savedResources = await this.savedResourcesRepository.findAll(userId);

    return savedResources;
  }

  async delete(resourceId: number, userId: number) {
    const deletedResource = await this.savedResourcesRepository.delete(resourceId, userId);

    return deletedResource;
  }
}
