import { JwtModule, JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../schemas/user.schema';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s'}
        })
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalStrategy,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: {}
        }
      ],
    }).compile();

    authController = authModule.get<AuthController>(AuthController);
    authService = authModule.get<AuthService>(AuthService);
  });

  it('should return JWT object when credentials are valid', async () => {
    const res = await authService.validateUser({ username: 'Test', password: "azertyuiop" });
  });
});
