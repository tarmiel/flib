import {
  BadRequestException,
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { Logger } from 'nestjs-pino';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
import { UsersService } from 'src/modules/users/users.service';
import { HashingService } from './hashing/hashing.service';
import { User } from '@prisma/client';
import { TokenGenerationService } from './token-generation/token-generation.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly tokenGenerationService: TokenGenerationService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{
    accessToken: string;
    user: Omit<User, 'password_hash'> & { role: string };
  }> {
    try {
      const user = await this.validateUser(email, password);

      if (!user) throw new BadRequestException('Invalid email or password');

      const token = await this.tokenGenerationService.generateToken(
        user.id,
        user.email,
        user.role.name,
      );

      if (!token)
        throw new BadRequestException('Login failed. Please try again.');

      return {
        accessToken: token,
        user: {
          ...user,
          role: user.role.name,
        },
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Login failed. Invalid email or password.');
    }
  }

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    try {
      const { first_name, last_name, email, password } = registerUserDto;

      const exisingUser = await this.usersService.findOne(email);

      if (exisingUser)
        throw new ConflictException('User with such email already exists');

      const hashedPassword = await this.hashingService.hash(password);

      const createdUser = await this.usersService.create({
        email,
        first_name,
        last_name,
        password_hash: hashedPassword,
      });

      if (!createdUser)
        throw new ServiceUnavailableException('Error while creating user');

      return {
        id: createdUser.id,
        email: createdUser.email,
        first_name: createdUser.first_name,
        last_name: createdUser.last_name,
        role: createdUser.role,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        error.message || 'Error while creating user',
      );
    }
  }

  private async validateUser(
    email: string,
    pass: string,
  ): Promise<
    (Omit<User, 'password_hash'> & { role: { name: string } }) | null
  > {
    try {
      const existingUser = await this.usersService.findOne(email);
      if (!existingUser) return null;

      const { password_hash, ...user } = existingUser;

      const isValidCredentials = this.hashingService.verify(
        pass,
        password_hash,
      );

      if (!isValidCredentials) return null;

      return user;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
