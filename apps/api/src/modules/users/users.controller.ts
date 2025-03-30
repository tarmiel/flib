import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IdParamDto } from 'src/common/dto/id-param.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedUser } from 'src/common/interfaces/authenticated-user.interface';
import { User } from '../iam/authentication/decorators/user.decorator';
import { QueryUserDto } from './dto/query-user.dto';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { ROLES } from '../iam/authorization/roles.constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @Get()
  async getUsers(@Query() query: QueryUserDto) {
    const { totalCount, users } = await this.usersService.findAll(query);

    return {
      meta: { total: totalCount, page: query.page, pageSize: query.pageSize },
      data: users,
    };
  }

  @Get('me')
  async getMe(@User() user: AuthenticatedUser) {
    const data = await this.usersService.findOneById(user.userId);

    return data;
  }

  @Get(':id')
  async getUser(@Param() { id }: IdParamDto) {
    const data = await this.usersService.findOneById(id);

    return data;
  }

  @Patch('me')
  async updateMe(
    @Body() updateUserDto: UpdateUserDto,
    @User() user: AuthenticatedUser,
  ) {
    if (user.userId !== user.userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this user',
      );
    }
    const data = await this.usersService.update(user.userId, updateUserDto);

    return data;
  }

  @Roles('admin')
  @Patch(':id')
  async updateUser(
    @Param() { id }: IdParamDto,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: AuthenticatedUser,
  ) {
    if (user.role !== ROLES.admin) {
      throw new UnauthorizedException(
        'You are not authorized to update this user',
      );
    }
    const data = await this.usersService.updateByAdmin(id, updateUserDto);

    return data;
  }
}
