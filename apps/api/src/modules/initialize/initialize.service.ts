import { Logger } from 'nestjs-pino';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { HashingService } from 'src/modules/iam/authentication/hashing/hashing.service';
import { ROLES } from '../iam/authorization/roles.constants';

@Injectable()
export class InitializeService implements OnApplicationBootstrap {
  constructor(
    private readonly logger: Logger,
    private readonly hashingService: HashingService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('Application bootstrapping - checking for admin user');
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    try {
      const adminRoleName = ROLES.admin;

      await this.prisma.$transaction(async (tx) => {
        let adminRole = await tx.role.findFirst({
          where: { name: ROLES.admin },
        });

        if (!adminRole) {
          this.logger.log('Admin role does not exist, creating...');
          adminRole = await tx.role.create({
            data: {
              name: adminRoleName,
            },
          });
          this.logger.log(`Created role: ${adminRole.name}`);
        }

        const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
        const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

        if (!adminEmail || !adminPassword) {
          this.logger.warn(
            'No default admin credentials provided in environment. Default Admin user creation skipped.',
          );
          return;
        }

        const existingAdmin = await tx.user.findUnique({
          where: { email: adminEmail },
        });

        if (existingAdmin) {
          this.logger.log(`Default Admin user already exists: ${adminEmail}`);
          return;
        }

        const hashedPassword = this.hashingService.hash(adminPassword);

        const admin = await tx.user.create({
          data: {
            email: adminEmail,
            password_hash: hashedPassword,
            user_role_id: adminRole.id,
            first_name: 'Admin',
            last_name: 'Default',
            is_confirmed: true,
          },
        });

        this.logger.log(`Admin user created: ${admin.email}`);
      });
    } catch (error) {
      this.logger.error('Failed to seed admin user:', error);
    }
  }
}
