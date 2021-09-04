import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const auth: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = auth.get<AuthController>(AuthController);
  });

  describe('falseTest', () => {
    it("Should return test", () => {
      expect("TEST").toBe("TEST");
    })
  })
});
