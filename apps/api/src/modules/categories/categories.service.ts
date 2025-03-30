import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly logger: Logger,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  findAll() {
    return this.categoriesRepository.findAll();
  }

  async findOne(id: number) {
    return await this.categoriesRepository.findOne(id);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepository.create(createCategoryDto);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const existingCategory = await this.categoriesRepository.findOne(id);
      if (!existingCategory)
        throw new BadRequestException('Category does not exist');

      return await this.categoriesRepository.update(id, updateCategoryDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const existingCategory = await this.categoriesRepository.findOne(id);
      if (!existingCategory)
        throw new BadRequestException('Category does not exist');

      return await this.categoriesRepository.remove(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
