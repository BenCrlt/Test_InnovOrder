import { UserStub } from "../user.stub";

export const UserService = jest.fn().mockReturnValue({
    findUserByID: jest.fn().mockResolvedValue(UserStub()),
    findUserByName: jest.fn().mockResolvedValue(UserStub()),
    create: jest.fn().mockResolvedValue(UserStub())
});