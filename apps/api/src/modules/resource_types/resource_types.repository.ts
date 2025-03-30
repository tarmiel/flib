import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateResourceTypeDto } from './dto/update-resource_type.dto';
import { CreateResourceTypeDto } from './dto/create-resource_type.dto';

@Injectable()
export class ResourceTypesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.resourceType.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.resourceType.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createResourceTypeDto: CreateResourceTypeDto) {
    return await this.prisma.resourceType.create({
      data: {
        name: createResourceTypeDto.name,
        description: createResourceTypeDto.description,
      },
    });
  }

  async update(id: number, updateResourceTypeDto: UpdateResourceTypeDto) {
    return await this.prisma.resourceType.update({
      where: {
        id,
      },
      data: {
        name: updateResourceTypeDto.name,
        description: updateResourceTypeDto.description,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.resourceType.delete({
      where: {
        id,
      },
    });
  }
}
