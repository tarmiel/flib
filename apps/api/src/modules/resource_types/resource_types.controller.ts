import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ResourceTypesService } from './resource_types.service';
import { IdParamDto } from 'src/common/dto/id-param.dto';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { CreateResourceTypeDto } from './dto/create-resource_type.dto';
import { UpdateResourceTypeDto } from './dto/update-resource_type.dto';

@Controller('resource-types')
export class ResourceTypesController {
  constructor(private readonly resourceTypesService: ResourceTypesService) {}

  @Get()
  findAll() {
    return this.resourceTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: IdParamDto) {
    return this.resourceTypesService.findOne(id);
  }

  @Roles('admin')
  @Post()
  create(@Body() createResourceTypeDto: CreateResourceTypeDto) {
    return this.resourceTypesService.create(createResourceTypeDto);
  }

  @Roles('admin')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResourceTypeDto: UpdateResourceTypeDto,
  ) {
    return this.resourceTypesService.update(+id, updateResourceTypeDto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceTypesService.remove(+id);
  }
}
