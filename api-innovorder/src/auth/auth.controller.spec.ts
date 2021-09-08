import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../schemas/user.schema';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserStub } from '../user/user.stub';

jest.mock('./auth.service')
jest.mock('../user/user.service')

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
        {
          provide: getModelToken(User.name),
          useValue: {}
        }
      ],
    }).compile();

    authController = authModule.get<AuthController>(AuthController);
    authService = authModule.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe("Login", () => {
    let access_token;
    describe("when Login is called", () => {
      beforeEach(() => {
        access_token = authController.login({ username: UserStub().username, password: UserStub().password})
      })

      test("it should call validate User", () => {
          expect(authService.validateUser).toBeCalledWith({ username: UserStub().username, password: UserStub().password});
      })
    })
  })
});
