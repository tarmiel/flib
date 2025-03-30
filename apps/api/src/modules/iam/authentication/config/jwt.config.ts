import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  () =>
    ({
      secret: process.env.JWT_SECRET,
      expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '3600'),
    }) as JwtModuleOptions,
);
