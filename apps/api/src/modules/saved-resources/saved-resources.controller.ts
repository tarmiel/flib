import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SavedResourcesService } from './saved-resources.service';
import { CreateSavedResourceDto } from './dto/create-saved-resource.dto';
import { User } from '../iam/authentication/decorators/user.decorator';
import { AuthenticatedUser } from 'src/common/interfaces/authenticated-user.interface';

@Controller('saved-resources')
export class SavedResourcesController {
  constructor(private readonly savedResourcesService: SavedResourcesService) {}

  @Post()
  async create(
    @Body() createSavedResourceDto: CreateSavedResourceDto,
    @User() user: AuthenticatedUser,
  ) {
    return this.savedResourcesService.create(
      createSavedResourceDto,
      user.userId,
    );
  }

  @Get()
  async findAll(@User() user: AuthenticatedUser) {
    const { resources = [] } = await this.savedResourcesService.findAllByUser(
      user.userId,
    );

    return {
      data: resources,
    };
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.savedResourcesService.delete(+id);
  // }

  @Delete(':resourceId')
  async remove(
    @Param('resourceId') resourceId: string,
    @User() user: AuthenticatedUser,
  ) {
    return this.savedResourcesService.remove(user.userId, +resourceId);
  }
}
