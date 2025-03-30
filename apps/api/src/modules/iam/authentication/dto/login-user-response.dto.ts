import { User } from '@prisma/client';

export class LoginUserResponseDto {
  access_token: string;
  user: Omit<User, 'password_hash'> & { role: string };
}
