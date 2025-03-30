import { User } from '@prisma/client';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {
  BadRequestException,
  HttpException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UserRO, UsersRepository } from './users.repository';
import { Logger } from 'nestjs-pino';
import { RolesService } from 'src/modules/roles/roles.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserByAdminDto } from './dto/update-user-by-admin.dto';
import { ROLES } from '../iam/authorization/roles.constants';

type UserResponse = Omit<UserRO, 'role'> & { role: string };

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: Logger,
    private readonly usersRepository: UsersRepository,
    private readonly rolesService: RolesService,
  ) {}

  async create(user: CreateUserDto): Promise<UserResponse> {
    try {
      const defaultRole = await this.rolesService.findByName(ROLES.user);

      const userEntity: UserEntity = {
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        passwordHash: user.password_hash,
        roleId: defaultRole!.id,
      };

      const createdUser = await this.usersRepository.create(userEntity);

      return {
        ...createdUser,
        role: createdUser.role.name,
      };
    } catch (error) {
      this.logger.error(error);
      throw new ServiceUnavailableException('Error creating user');
    }
  }

  async findOne(
    email: string,
  ): Promise<(User & { role: { name: string } }) | null> {
    try {
      const user = await this.usersRepository.findOne(email);

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new ServiceUnavailableException('Cannot find user');
    }
  }

  async findOneById(id: number): Promise<UserResponse | null> {
    try {
      const user = await this.usersRepository.findOneById(id);

      if (!user) return null;

      return {
        ...user,
        role: user.role.name,
      };
    } catch (error) {
      this.logger.error(error);
      throw new ServiceUnavailableException('Cannot find user');
    }
  }

  async findAll(
    query: QueryUserDto,
  ): Promise<{ totalCount: number; users: UserResponse[] }> {
    try {
      const { totalCount, users } = await this.usersRepository.findAll(query);

      const mapped = users.map((user) => ({
        ...user,
        role: user.role.name,
      }));

      return {
        totalCount,
        users: mapped,
      };
    } catch (error) {
      this.logger.error(error);
      throw new ServiceUnavailableException('Cannot find users');
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    try {
      const { first_name, last_name, additional_info } = updateUserDto;

      const existingUser = await this.usersRepository.findOneById(id);
      if (!existingUser) throw new BadRequestException('User does not exist');

      const updatedUser = await this.usersRepository.update(id, {
        firstName: first_name,
        lastName: last_name,
        additionalInfo: additional_info,
      });

      return {
        ...updatedUser,
        role: updatedUser.role.name,
      };
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) throw error;
      throw new ServiceUnavailableException('Error updating user');
    }
  }

  async updateByAdmin(
    id: number,
    updateUserDto: UpdateUserByAdminDto,
  ): Promise<UserResponse> {
    try {
      const { first_name, last_name, role, additional_info } = updateUserDto;

      const existingUser = await this.usersRepository.findOneById(id);
      if (!existingUser) throw new BadRequestException('User does not exist');

      if (!role) {
        const updatedUser = await this.usersRepository.update(id, {
          firstName: first_name,
          lastName: last_name,
          additionalInfo: additional_info,
        });
        return {
          ...updatedUser,
          role: updatedUser.role.name,
        };
      }

      const existingRole = await this.rolesService.findByName(role);
      if (!existingRole) throw new BadRequestException('Role does not exist');

      const updatedUser = await this.usersRepository.update(id, {
        firstName: first_name,
        lastName: last_name,
        additionalInfo: additional_info,
        roleId: existingRole.id,
      });

      return {
        ...updatedUser,
        role: updatedUser.role.name,
      };
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) throw error;
      throw new ServiceUnavailableException('Error updating user');
    }
  }
}
