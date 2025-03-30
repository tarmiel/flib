import {
  Body,
  Controller,
  HttpCode,
  Post,
  ServiceUnavailableException,
} from '@nestjs/common';
// import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthenticationService } from './authentication.service';
import { Auth } from './decorators/auth.decorator';
// import { Response } from 'express';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
// import { LoginUserResponseDto } from './dto/login-user-response.dto';
import {
  ApiLoginDocs,
  ApiRegisterDocs,
} from './decorators/auth.docs.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserResponseDto } from './dto/login-user-response.dto';

@Auth('None')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiLoginDocs()
  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<LoginUserResponseDto> {
    const { email, password } = body;

    const { accessToken, user } = await this.authService.login(email, password);

    return {
      access_token: accessToken,
      user,
    };
  }

  @ApiRegisterDocs()
  @Post('register')
  async register(
    @Body() body: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    const registeredUser = await this.authService.register(body);

    if (!registeredUser)
      throw new ServiceUnavailableException(`Cannot register user`);

    return registeredUser;
  }
}
