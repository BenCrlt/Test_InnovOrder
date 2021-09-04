import { Controller, Get } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
import { LoginUserDto } from 'src/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
      return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }
}
