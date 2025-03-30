import { Logger } from 'nestjs-pino';
import { RolesRepository } from './roles.repository';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(
    private readonly logger: Logger,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async findByName(name: string): Promise<Role | null> {
    try {
      const role = await this.rolesRepository.findByName(name);
      if (!role) return null;

      return role;
    } catch (error) {
      this.logger.error(error);
      throw new ServiceUnavailableException('Cannot find role');
    }
  }
}
