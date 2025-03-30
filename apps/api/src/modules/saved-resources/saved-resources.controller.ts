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
    return this.savedResourcesService.findAll(user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.savedResourcesService.remove(+id);
  }
}
