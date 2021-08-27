import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getStringTest(): string {
    return "It's a test !";
  }
}
