import { Strategy } from "passport-local";
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from "../dto/login-user.dto";
import { User } from "../schemas/user.schema";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userInfo : LoginUserDto): Promise<User> {
    const user = await this.authService.login(userInfo);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}