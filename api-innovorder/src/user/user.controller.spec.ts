import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService : UserService;
  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create(username: string, password: string) {
              return {
                ID: "1",
                username: "Benoit",
                password: "Test"
              }
            }
          }
        }
      ]
    }).compile();

    userController = userModule.get<UserController>(UserController);
    userService = userModule.get<UserService>(UserService);
  });

  describe('createUser', () => {
      it("Should be return test", () => {
        expect("TEST").toBe("TEST");
      })
      it('should return the created user', async() => {
        let spy = jest.spyOn(userService, 'create').mockImplementation(() => create);
        let userToCreate : CreateUserDto = {
          username: 'Benoit',
          password: 'test'
        };
        let result : User = {
          ID: "123",
          username: 'Benoit',
          password: 'test'
        }
        
        test('Check', async () => {
          return userService.create(userToCreate).then((user) => {
            expect(user).toBe(result);
          })
        })
      })
  });
  
});
