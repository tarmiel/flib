import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { AuthenticatedUser } from 'src/common/interfaces/authenticated-user.interface';
import { User } from '../iam/authentication/decorators/user.decorator';
import { IdParamDto } from 'src/common/dto/id-param.dto';
import { QueryResourceDto } from './dto/query-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Roles('admin', 'editor')
  @Post()
  create(
    @Body() createResourceDto: CreateResourceDto,
    @User() user: AuthenticatedUser,
  ) {
    return this.resourcesService.create(createResourceDto, user.userId);
  }

  @Get()
  async findAll(
    @Query() query: QueryResourceDto,
    @User() user: AuthenticatedUser,
  ) {
    const { totalCount, resources } = await this.resourcesService.findAll(
      query,
      user.userId,
    );

    return {
      meta: { total: totalCount, page: query.page, pageSize: query.pageSize },
      data: resources,
    };
  }

  @Get(':id')
  async findOne(@Param() { id }: IdParamDto, @User() user: AuthenticatedUser) {
    const resource = await this.resourcesService.findOne(id, user.userId);
    if (!resource) throw new NotFoundException('Resource does not exist');

    return resource;
  }

  @Roles('admin', 'editor')
  @Put(':id')
  update(
    @Param() { id }: IdParamDto,
    @Body() updateResourceDto: UpdateResourceDto,
    @User() user: AuthenticatedUser,
  ) {
    return this.resourcesService.update(id, updateResourceDto, user);
  }

  @Roles('admin', 'editor')
  @Delete(':id')
  remove(@Param() { id }: IdParamDto, @User() user: AuthenticatedUser) {
    return this.resourcesService.remove(id, user);
  }
}
