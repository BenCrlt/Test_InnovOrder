import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserStub} from './user.stub'

jest.mock('./user.service');

describe('UserService', () => {
  let userService : UserService;
  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
          }
        }
      ]
    }).compile();

    userService = userModule.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('findUserByID', () => {
    let user: User;
    describe('when findUserByID is called', () => {
      beforeEach(async () => {
        user = await userService.findUserByID(UserStub()._id);
      })
      test(' it should return a user', () => {
        expect(user).toEqual(UserStub())
      })
    })
  })

  describe('findUserByName', () => {
    let user: User;
    describe('when findUserByName is called', () => {
      beforeEach(async () => {
        user = await userService.findUserByName(UserStub().username);
      })
      test(' it should return a user', () => {
        expect(user).toEqual(UserStub())
      })
    })
  })

  describe('create', () => {
    let user: User;
    describe('when create is called', () => {
      beforeEach(async () => {
        user = await userService.create({username: UserStub().username, password: UserStub().password});
      })
      test(' it should return the user created', () => {
        expect(user).toEqual(UserStub())
      })
    })
  })
  
});
