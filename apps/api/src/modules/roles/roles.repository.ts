import { Role } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string): Promise<Role | null> {
    return await this.prisma.role.findUnique({
      where: {
        name,
      },
    });
  }

  async findAll(): Promise<Role[]> {
    return await this.prisma.role.findMany();
  }
}
