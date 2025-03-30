import { BadRequestException, Injectable } from '@nestjs/common';
import { ResourceTypesRepository } from './resource_types.repository';
import { CreateResourceTypeDto } from './dto/create-resource_type.dto';
import { UpdateResourceTypeDto } from './dto/update-resource_type.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class ResourceTypesService {
  constructor(
    private readonly logger: Logger,
    private readonly resourceTypesRepository: ResourceTypesRepository,
  ) {}

  async findAll() {
    const resourceTypes = await this.resourceTypesRepository.findAll();

    return resourceTypes;
  }

  async findOne(id: number) {
    return await this.resourceTypesRepository.findOne(id);
  }

  async create(createResourceTypeDto: CreateResourceTypeDto) {
    return await this.resourceTypesRepository.create(createResourceTypeDto);
  }

  async update(id: number, updateResourceTypeDto: UpdateResourceTypeDto) {
    try {
      const existingResourceType =
        await this.resourceTypesRepository.findOne(id);
      if (!existingResourceType)
        throw new BadRequestException('ResourceType does not exist');

      return await this.resourceTypesRepository.update(
        id,
        updateResourceTypeDto,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const existingResourceType =
        await this.resourceTypesRepository.findOne(id);
      if (!existingResourceType)
        throw new BadRequestException('ResourceType does not exist');

      return await this.resourceTypesRepository.remove(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
