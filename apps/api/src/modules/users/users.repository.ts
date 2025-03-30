import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { User } from '@prisma/client';
import { QueryUserDto } from './dto/query-user.dto';
import { Prisma } from '@prisma/client';

export type UserRO = Omit<User, 'password_hash' | 'user_role_id'> & {
  role: { name: string };
};

@Injectable()
export class UsersRepository {
  private readonly select: Prisma.UserSelect = {
    id: true,
    email: true,
    first_name: true,
    last_name: true,
    additional_info: true,
    is_confirmed: true,
    created_at: true,
    updated_at: true,
    role: {
      select: {
        name: true,
      },
    },
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<UserRO> {
    return await this.prisma.user.create({
      data: {
        email: user.email,
        password_hash: user.passwordHash,
        first_name: user.firstName,
        last_name: user.lastName,
        user_role_id: user.roleId,
        additional_info: user.additionalInfo,
      },
      select: this.select,
    });
  }

  async findOne(
    email: string,
  ): Promise<(User & { role: { name: string } }) | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOneById(id: number): Promise<UserRO | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: this.select,
    });
  }

  async findAll(
    query: QueryUserDto,
  ): Promise<{ totalCount: number; users: UserRO[] }> {
    const { page, pageSize, firstName, role: roles } = query;

    const whereFilters: Prisma.UserWhereInput = {
      OR: firstName
        ? [
            {
              first_name: {
                contains: firstName,
                mode: 'insensitive',
              },
            },
            {
              last_name: {
                contains: firstName,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: firstName,
                mode: 'insensitive',
              },
            },
          ]
        : undefined,
      role: {
        name: {
          in: roles,
        },
      },
    };

    const [totalCount, users] = await this.prisma.$transaction([
      this.prisma.user.count({
        where: whereFilters,
      }),
      this.prisma.user.findMany({
        where: whereFilters,
        select: this.select,
        take: pageSize,
        skip: (page - 1) * pageSize,
      }),
    ]);

    return { totalCount, users };
  }

  async update(
    id: number,
    user: Partial<Omit<UserEntity, 'email' | 'passwordHash'>>,
  ) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      select: this.select,
      data: {
        first_name: user.firstName,
        last_name: user.lastName,
        additional_info: user.additionalInfo,
        user_role_id: user.roleId,
      },
    });
  }
}
