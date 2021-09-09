import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserStub } from '../user/user.stub';
import { JwtStrategy } from './jwt.strategy';
import { token } from './__mocks__/auth.service';

jest.mock('./auth.service')

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      imports: [
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
        JwtStrategy
      ],
    }).compile();

    authController = authModule.get<AuthController>(AuthController);
    authService = authModule.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe("Login", () => {
    let access_token;
    describe("when Login is called", () => {
      beforeEach(async () => {
        access_token = await authController.login({ username: UserStub().username, password: UserStub().password})
      })

      test("it should call validate User", () => {
          expect(authService.login).toBeCalled();
      })

      test("It should return a token", () => {
        expect(access_token).toEqual(token);
      })
    })
  });

  describe("Register", () => {
    describe("when Register is called", () => {
      let userCreated;
      beforeEach(async () => {
        userCreated = await authController.register({ username: UserStub().username, password: UserStub().password})
      })

      test("it should call validate User", () => {
          expect(authService.register).toBeCalled();
      })

      test("It should return the user created", () => {
        expect(userCreated).toEqual(UserStub());
      })
    })
  })
});
